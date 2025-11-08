import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
};

export const redisClient = new Redis(redisConfig);

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err.message);
  if (process.env.NODE_ENV === 'production') {
    // In production, you might want to exit or use a fallback
    console.warn('⚠️  Continuing without Redis - queue features will not work');
  }
});

redisClient.on('close', () => {
  console.log('⚠️  Redis connection closed');
});

export default redisClient;

