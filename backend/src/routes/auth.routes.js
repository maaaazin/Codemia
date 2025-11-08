import express from 'express';
import {
  signup,
  login,
  getCurrentUser
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route
router.get('/me', authenticateToken, getCurrentUser);

export default router;

