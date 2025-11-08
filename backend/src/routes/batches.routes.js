import express from 'express';
import {
  getBatches,
  getBatchById,
  getBatchesByInstructor,
  createBatch
} from '../controllers/batches.controller.js';

const router = express.Router();

// Create batch (must be before parameterized routes)
router.post('/', createBatch);

// Get batches by instructor
router.get('/instructor/:instructorId', getBatchesByInstructor);

// Get all batches
router.get('/', getBatches);

// Get batch by ID (must be last)
router.get('/:batchId', getBatchById);

export default router;
