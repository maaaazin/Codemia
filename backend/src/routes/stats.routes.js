import express from 'express';
import {
  getTeacherDashboardStats,
  getStudentDashboardStats,
  getAssignmentStats,
  getLeaderboard
} from '../controllers/stats.controller.js';

const router = express.Router();

// Get teacher dashboard stats
router.get('/teacher/:instructorId', getTeacherDashboardStats);

// Get student dashboard stats
router.get('/student/:studentId', getStudentDashboardStats);

// Get assignment stats
router.get('/assignment/:assignmentId', getAssignmentStats);

// Get leaderboard (batchId is optional via query param)
router.get('/leaderboard', getLeaderboard);
router.get('/leaderboard/:batchId', getLeaderboard);

export default router;

