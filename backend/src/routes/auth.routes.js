import express from 'express';
import {
  signup,
  login,
  getCurrentUser
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);

// Protected route
router.get('/me', authenticateToken, getCurrentUser);

export default router;
