import rateLimit from 'express-rate-limit';
import { redisClient } from '../config/redis.js';

// Store rate limit data in Redis for distributed systems
const RedisStore = rateLimit({
  store: {
    // Simple in-memory store (for single instance)
    // For production with multiple instances, use redis-store
    incr: async (key, cb) => {
      try {
        const count = await redisClient.incr(key);
        if (count === 1) {
          await redisClient.expire(key, 60); // Set expiry on first request
        }
        cb(null, count);
      } catch (err) {
        cb(err);
      }
    },
    decrement: async (key) => {
      try {
        await redisClient.decr(key);
      } catch (err) {
        console.error('Redis decrement error:', err);
      }
    },
    resetKey: async (key) => {
      try {
        await redisClient.del(key);
      } catch (err) {
        console.error('Redis reset error:', err);
      }
    },
  },
});

/**
 * General API rate limiter - 100 requests per 15 minutes per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health' || req.path === '/api/health';
  },
});

/**
 * Per-user submission rate limiter - 10 submissions per minute per user
 */
export const submissionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each user to 10 submissions per minute
  message: 'Too many submissions. Please wait a moment before submitting again.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID from JWT token for per-user limiting
    return req.user?.user_id || req.ip;
  },
  skip: (req) => {
    // Skip if no user (shouldn't happen with auth middleware)
    return !req.user;
  },
});

/**
 * Authentication rate limiter - 5 login attempts per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

/**
 * Code execution rate limiter - 20 executions per minute per user
 */
export const executionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // Limit each user to 20 code executions per minute
  message: 'Too many code executions. Please wait a moment.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.user_id || req.ip;
  },
});

export default {
  generalLimiter,
  submissionLimiter,
  authLimiter,
  executionLimiter,
};

