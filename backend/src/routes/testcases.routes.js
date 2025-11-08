import express from 'express';
import {
  getTestCases,
  getTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  getTestCasesByAssignment
} from '../controllers/testcases.controller.js';

const router = express.Router();

// Get test cases by assignment
router.get('/assignment/:assignmentId', getTestCasesByAssignment);

// Get all test cases
router.get('/', getTestCases);

// Get test case by ID
router.get('/:testCaseId', getTestCaseById);

// Create test case
router.post('/', createTestCase);

// Update test case
router.put('/:testCaseId', updateTestCase);

// Delete test case
router.delete('/:testCaseId', deleteTestCase);

export default router;

