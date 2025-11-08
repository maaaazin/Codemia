import express from 'express';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByBatch,
  getAssignmentsByInstructor
} from '../controllers/assignments.controller.js';

const router = express.Router();

// Get all assignments
router.get('/', getAssignments);

// Get assignments by batch
router.get('/batch/:batchId', getAssignmentsByBatch);

// Get assignments by instructor
router.get('/instructor/:instructorId', getAssignmentsByInstructor);

// Get assignment by ID
router.get('/:assignmentId', getAssignmentById);

// Create assignment
router.post('/', createAssignment);

// Update assignment
router.put('/:assignmentId', updateAssignment);

// Delete assignment
router.delete('/:assignmentId', deleteAssignment);

export default router;

