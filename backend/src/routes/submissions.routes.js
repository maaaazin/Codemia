import express from 'express';
import {
  getSubmissions,
  getSubmissionsByAssignment,
  getSubmissionsByStudent,
  createSubmission,
  executeAndSubmit,
  getSubmissionStatus
} from '../controllers/submissions.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';
import { submissionLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Get all submissions (teacher only - to view all submissions)
router.get('/', authenticateToken, requireRole('teacher'), getSubmissions);

// Get submissions by assignment (teacher only)
router.get('/assignment/:assignmentId', authenticateToken, requireRole('teacher'), getSubmissionsByAssignment);

// Get submissions by student (student can view their own, teacher can view any)
router.get('/student/:studentId', authenticateToken, getSubmissionsByStudent);

// Get submission status (for queue-based submissions)
router.get('/status/:submissionId', authenticateToken, getSubmissionStatus);

// Create submission (authenticated users - students submit)
router.post('/', authenticateToken, createSubmission);

// Execute and submit code (authenticated users - students submit)
// Rate limited: 10 submissions per minute per user
router.post('/execute', authenticateToken, submissionLimiter, executeAndSubmit);

export default router;
