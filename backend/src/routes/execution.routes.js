import express from 'express';
import { handleExecution } from '../controllers/execution.controller.js';

const router = express.Router();

router.post('/execute', handleExecution);

export default router;
