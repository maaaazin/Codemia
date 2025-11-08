# Scalable Architecture Setup

This document describes the scalable architecture implementation for handling bulk submissions efficiently.

## Architecture Overview

```
┌─────────────┐
│   Nginx     │  Load Balancer + Rate Limiting
│  (Port 80)  │
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       │              │              │
┌──────▼──────┐ ┌────▼──────┐ ┌────▼──────┐
│  Backend 1  │ │ Backend 2 │ │ Backend 3 │  API Servers (3 replicas)
│  (Port 3000)│ │ (Port 3001)│ │ (Port 3002)│
└──────┬──────┘ └────┬──────┘ └────┬──────┘
       │              │              │
       └──────────────┴──────────────┘
                      │
              ┌───────▼───────┐
              │     Redis     │  Queue Management
              │   (Port 6379) │
              └───────┬───────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
┌──────▼──────┐ ┌────▼──────┐ ┌────▼──────┐
│  Worker 1   │ │ Worker 2  │ │ Worker 3  │  Worker Processes (5 replicas)
└─────────────┘ └───────────┘ └───────────┘
```

## Components

### 1. Redis Queue (Bull)
- **Purpose**: Asynchronous job processing for submissions
- **Benefits**: 
  - Prevents API server blocking
  - Enables horizontal scaling
  - Job retry and failure handling
  - Priority-based processing

### 2. Worker Processes
- **Count**: 5 workers (configurable)
- **Purpose**: Process submission jobs from the queue
- **Features**:
  - Automatic retry on failure
  - Exponential backoff
  - Job status tracking

### 3. Nginx Load Balancer
- **Purpose**: Distribute requests across multiple backend instances
- **Features**:
  - Least connections algorithm
  - Health checks
  - Rate limiting per endpoint
  - SSL/TLS termination (can be added)

### 4. Rate Limiting
- **Per-IP**: 100 requests per 15 minutes (general API)
- **Per-User**: 10 submissions per minute
- **Auth**: 5 login attempts per 15 minutes
- **Code Execution**: 20 executions per minute per user

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `JWT_SECRET` - Secret key for JWT tokens
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)
- `USE_QUEUE` - Enable queue processing (true/false)

### 3. Local Development

#### Start Redis
```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install locally
# macOS: brew install redis
# Ubuntu: sudo apt-get install redis-server
```

#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Worker Process
```bash
cd backend
npm run worker
```

### 4. Docker Deployment

#### Build and Start All Services
```bash
docker-compose up -d
```

#### Scale Services
```bash
# Scale backend to 5 instances
docker-compose up -d --scale backend=5

# Scale workers to 10 instances
docker-compose up -d --scale worker=10
```

#### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f worker
docker-compose logs -f nginx
```

#### Stop Services
```bash
docker-compose down
```

### 5. Monitoring

#### Queue Statistics
```bash
curl http://localhost/api/queue/stats
```

#### Health Check
```bash
curl http://localhost/health
```

## Performance Tuning

### Redis Configuration
- Adjust `maxmemory` and `maxmemory-policy` in Redis
- Use Redis persistence (AOF) for durability

### Worker Configuration
- Adjust concurrency in `submission.worker.js` (currently 5)
- Monitor worker CPU and memory usage
- Scale workers based on queue length

### Nginx Configuration
- Adjust `worker_processes` based on CPU cores
- Tune `worker_connections` based on expected load
- Configure SSL/TLS for production

### Backend Configuration
- Use PM2 or similar for process management
- Configure cluster mode for Node.js
- Monitor memory usage and implement graceful shutdown

## Rate Limiting Details

### Endpoints
- `/api/auth/*` - 5 requests per 15 minutes per IP
- `/api/submissions/execute` - 10 requests per minute per user
- `/api/*` - 100 requests per 15 minutes per IP

### Customization
Edit `backend/src/middleware/rateLimiter.middleware.js` to adjust limits.

## Queue vs Synchronous Processing

The system supports both modes:

### Queue Mode (Recommended for Production)
- Set `USE_QUEUE=true` in `.env`
- Submissions are queued and processed asynchronously
- Returns immediately with job ID
- Check status via `/api/submissions/status/:submissionId`

### Synchronous Mode (Development/Testing)
- Set `USE_QUEUE=false` in `.env`
- Processes submissions immediately
- Returns results in the same request
- Useful for testing and development

## Troubleshooting

### Redis Connection Issues
- Check Redis is running: `redis-cli ping`
- Verify `REDIS_HOST` and `REDIS_PORT` in `.env`
- Check firewall rules

### Worker Not Processing Jobs
- Check worker logs: `docker-compose logs worker`
- Verify Redis connection
- Check queue stats: `curl http://localhost/api/queue/stats`

### Nginx 502 Errors
- Check backend health: `curl http://localhost:3000/health`
- Verify backend containers are running
- Check Nginx logs: `docker-compose logs nginx`

## Production Recommendations

1. **Use Environment-Specific Configs**: Separate `.env` files for dev/staging/prod
2. **Enable SSL/TLS**: Configure Nginx with Let's Encrypt certificates
3. **Monitoring**: Set up Prometheus + Grafana for metrics
4. **Logging**: Use centralized logging (ELK stack, CloudWatch, etc.)
5. **Backup**: Regular Redis and database backups
6. **Auto-scaling**: Use Kubernetes or Docker Swarm for auto-scaling
7. **CDN**: Use CloudFlare or similar for static assets
8. **Database Connection Pooling**: Configure Supabase connection pooling

## Scaling Strategy

### Vertical Scaling
- Increase Redis memory
- Increase worker CPU/memory
- Use faster database instances

### Horizontal Scaling
- Add more backend instances
- Add more worker processes
- Use Redis Cluster for high availability
- Use database read replicas

## Cost Optimization

- Use Redis on smaller instance initially
- Monitor queue length and scale workers dynamically
- Use spot instances for workers (if on cloud)
- Implement job prioritization for important submissions

