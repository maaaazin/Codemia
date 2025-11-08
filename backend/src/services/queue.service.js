import Queue from 'bull';
import { redisClient } from '../config/redis.js';

// Create submission processing queue
export const submissionQueue = new Queue('submission-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      age: 3600, // Keep completed jobs for 1 hour
      count: 1000, // Keep last 1000 completed jobs
    },
    removeOnFail: {
      age: 24 * 3600, // Keep failed jobs for 24 hours
    },
  },
  settings: {
    maxStalledCount: 1,
    stalledInterval: 30000, // Check for stalled jobs every 30 seconds
  },
});

// Queue event handlers
submissionQueue.on('error', (error) => {
  console.error('❌ Queue error:', error);
});

submissionQueue.on('waiting', (jobId) => {
  console.log(`⏳ Job ${jobId} is waiting`);
});

submissionQueue.on('active', (job) => {
  console.log(`🔄 Processing job ${job.id} - Submission ${job.data.submission_id || 'new'}`);
});

submissionQueue.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed - Submission ${result.submission_id}`);
});

submissionQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

submissionQueue.on('stalled', (jobId) => {
  console.warn(`⚠️  Job ${jobId} stalled`);
});

// Get queue statistics
export async function getQueueStats() {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    submissionQueue.getWaitingCount(),
    submissionQueue.getActiveCount(),
    submissionQueue.getCompletedCount(),
    submissionQueue.getFailedCount(),
    submissionQueue.getDelayedCount(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    total: waiting + active + completed + failed + delayed,
  };
}

export default submissionQueue;

