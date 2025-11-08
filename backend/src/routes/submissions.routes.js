import express from 'express';
import {
  getSubmissions,
  getSubmissionById,
  createSubmission,
  getSubmissionsByAssignment,
  getSubmissionsByStudent,
  executeAndSubmit
} from '../controllers/submissions.controller.js';

const router = express.Router();

// Get all submissions
router.get('/', getSubmissions);

// Get submissions by assignment
router.get('/assignment/:assignmentId', getSubmissionsByAssignment);

// Get submissions by student
router.get('/student/:studentId', getSubmissionsByStudent);

// Get submission by ID
router.get('/:submissionId', getSubmissionById);

// Create submission
router.post('/', createSubmission);

// Execute and submit code
router.post('/execute', executeAndSubmit);

export default router;

