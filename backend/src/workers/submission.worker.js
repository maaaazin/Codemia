import { submissionQueue } from '../services/queue.service.js';
import { runTestCases } from '../services/testRunner.service.js';
import { calculateGrade } from '../services/grading.service.js';
import { supabase } from '../config/supabase.js';

/**
 * Worker process to handle submission processing
 * This runs test cases and grades submissions asynchronously
 */
submissionQueue.process(5, async (job) => {
  const {
    submission_id,
    assignment_id,
    code,
    language,
    student_id,
    max_score,
  } = job.data;

  console.log(`🔄 Worker processing submission ${submission_id}`);

  try {
    // Run test cases
    const testResults = await runTestCases(code, language, assignment_id);

    // Calculate score
    const score = calculateGrade(
      testResults.avgRuntime,
      testResults.avgMemory,
      testResults.passedTests,
      testResults.totalTests,
      max_score
    );

    const finalScore = Math.max(0, Math.min(max_score, Math.round(score)));

    // Update submission status
    const { error: updateError } = await supabase
      .from('submissions')
      .update({
        score: finalScore,
        status: testResults.status === 'accepted' ? 'graded' : 'error',
        avg_execution_time: testResults.avgRuntime,
        graded_at: new Date().toISOString(),
      })
      .eq('submission_id', submission_id);

    if (updateError) throw updateError;

    // Delete old test results
    await supabase
      .from('test_results')
      .delete()
      .eq('submission_id', submission_id);

    // Get test cases for this assignment
    const { data: testCases, error: testCasesError } = await supabase
      .from('test_cases')
      .select('test_case_id')
      .eq('assignment_id', assignment_id);

    if (testCasesError) throw testCasesError;

    // Save test results
    if (testCases && testCases.length > 0) {
      const testResultsToInsert = testResults.testResults
        .map((testResult) => {
          const testCase = testCases.find((tc) => tc.test_case_id === testResult.testCaseId);
          if (testCase) {
            return {
              submission_id,
              test_case_id: testCase.test_case_id,
              passed: testResult.passed,
              actual_output: testResult.actualOutput,
              execution_time: testResult.runtime,
              memory_used: Math.round(testResult.memory || 0),
              error_message: testResult.error,
              status: testResult.passed ? 'Accepted' : 'Wrong Answer',
            };
          }
          return null;
        })
        .filter((result) => result !== null);

      if (testResultsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('test_results')
          .insert(testResultsToInsert);

        if (insertError) throw insertError;
      }
    }

    // Calculate average score
    const { data: allSubmissions, error: avgError } = await supabase
      .from('submissions')
      .select('score, max_score')
      .eq('assignment_id', assignment_id)
      .eq('student_id', student_id)
      .eq('status', 'graded');

    if (avgError) throw avgError;

    let averageScore = finalScore;
    let averagePercentage = Math.round((finalScore / max_score) * 100);

    if (allSubmissions && allSubmissions.length > 0) {
      const totalScore = allSubmissions.reduce((sum, s) => sum + (s.score || 0), 0);
      averageScore = Math.round(totalScore / allSubmissions.length);
      averagePercentage = Math.round((averageScore / max_score) * 100);
    }

    console.log(`✅ Submission ${submission_id} processed successfully`);

    return {
      submission_id,
      testResults,
      score: finalScore,
      maxScore: max_score,
      percentage: Math.round((finalScore / max_score) * 100),
      status: testResults.status,
      averageScore,
      averagePercentage,
      totalSubmissions: allSubmissions?.length || 1,
    };
  } catch (error) {
    console.error(`❌ Error processing submission ${submission_id}:`, error);
    
    // Update submission with error status
    await supabase
      .from('submissions')
      .update({
        status: 'error',
      })
      .eq('submission_id', submission_id);

    throw error;
  }
});

console.log('✅ Submission worker started and listening for jobs...');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down worker gracefully...');
  await submissionQueue.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Shutting down worker gracefully...');
  await submissionQueue.close();
  process.exit(0);
});

