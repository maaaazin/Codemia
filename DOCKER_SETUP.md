# Docker Setup Guide

Complete guide to running the application with Docker, Nginx, Redis, and workers.

## Prerequisites

- Docker Desktop installed (or Docker + Docker Compose)
- At least 4GB RAM available
- Ports 80, 3000-3004, 6379 available

## Quick Start

### 1. Create Environment File

Create a `.env` file in the project root:

```bash
# Copy the example
cp .env.example .env

# Edit with your values
nano .env
```

Required variables:
```env
# Database
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Redis (defaults work for Docker)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# Piston API (if using external)
PISTON_URL=http://piston:2000

# Application
NODE_ENV=production
PORT=3000
USE_QUEUE=true
```

### 2. Build and Start All Services

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3. Verify Services

```bash
# Check Redis
docker-compose exec redis redis-cli ping
# Should return: PONG

# Check Backend Health
curl http://localhost/health
# Should return: {"status":"ok","timestamp":"..."}

# Check Queue Stats
curl http://localhost/api/queue/stats
# Should return queue statistics

# Check Nginx
curl -I http://localhost
# Should return HTTP 200 or 404 (expected)
```

## Service Details

### Services Running

1. **Redis** (Port 6379)
   - Queue management
   - Data persistence enabled

2. **Backend API** (3 replicas, Ports 3000-3004)
   - Express API servers
   - Load balanced by Nginx

3. **Workers** (5 replicas)
   - Process submission jobs
   - No exposed ports

4. **Nginx** (Port 80)
   - Load balancer
   - Rate limiting
   - SSL ready (configure separately)

## Common Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Restart a Service
```bash
docker-compose restart backend
docker-compose restart worker
docker-compose restart nginx
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f worker
docker-compose logs -f nginx
docker-compose logs -f redis
```

### Scale Services
```bash
# Scale backend to 5 instances
docker-compose up -d --scale backend=5

# Scale workers to 10 instances
docker-compose up -d --scale worker=10

# Scale both
docker-compose up -d --scale backend=5 --scale worker=10
```

### Rebuild After Code Changes
```bash
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Access Container Shell
```bash
# Backend container
docker-compose exec backend sh

# Worker container
docker-compose exec worker sh

# Redis CLI
docker-compose exec redis redis-cli
```

## Monitoring

### Check Queue Status
```bash
curl http://localhost/api/queue/stats
```

Response:
```json
{
  "waiting": 0,
  "active": 2,
  "completed": 150,
  "failed": 1,
  "delayed": 0,
  "total": 153
}
```

### Check Service Health
```bash
# Backend health
curl http://localhost/health

# Individual backend instances
curl http://localhost:3000/health
curl http://localhost:3001/health
curl http://localhost:3002/health
```

### View Container Stats
```bash
# Resource usage
docker stats

# Service status
docker-compose ps
```

## Troubleshooting

### Services Won't Start

1. **Check ports are available:**
```bash
# Check if ports are in use
lsof -i :80
lsof -i :3000
lsof -i :6379
```

2. **Check Docker logs:**
```bash
docker-compose logs backend
docker-compose logs worker
docker-compose logs nginx
```

3. **Verify environment variables:**
```bash
docker-compose exec backend env | grep SUPABASE
docker-compose exec backend env | grep JWT_SECRET
```

### Redis Connection Issues

```bash
# Test Redis connection
docker-compose exec redis redis-cli ping

# Check Redis logs
docker-compose logs redis

# Restart Redis
docker-compose restart redis
```

### Backend Not Responding

1. **Check if backend is running:**
```bash
docker-compose ps backend
```

2. **Check backend logs:**
```bash
docker-compose logs -f backend
```

3. **Test direct connection:**
```bash
curl http://localhost:3000/health
```

4. **Check Nginx configuration:**
```bash
docker-compose exec nginx nginx -t
```

### Workers Not Processing Jobs

1. **Check worker logs:**
```bash
docker-compose logs -f worker
```

2. **Check queue status:**
```bash
curl http://localhost/api/queue/stats
```

3. **Verify Redis connection from worker:**
```bash
docker-compose exec worker node -e "import('./src/config/redis.js').then(m => m.redisClient.ping().then(r => console.log(r)))"
```

### Nginx 502 Bad Gateway

1. **Check backend health:**
```bash
curl http://localhost:3000/health
```

2. **Check Nginx logs:**
```bash
docker-compose logs nginx
```

3. **Verify backend is in upstream:**
```bash
docker-compose exec nginx cat /etc/nginx/conf.d/default.conf
```

### Rate Limiting Too Strict

Edit `nginx/conf.d/default.conf` and adjust limits:
```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/m;
```

Then restart Nginx:
```bash
docker-compose restart nginx
```

## Production Deployment

### 1. Update Environment Variables

Create production `.env` file:
```env
NODE_ENV=production
USE_QUEUE=true
# ... other production values
```

### 2. Enable SSL/TLS (Optional)

1. Get SSL certificates (Let's Encrypt)
2. Update `nginx/conf.d/default.conf`:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... rest of config
}
```

3. Mount certificates in `docker-compose.yml`:
```yaml
nginx:
  volumes:
    - ./ssl:/etc/nginx/ssl:ro
```

### 3. Resource Limits

Add to `docker-compose.yml`:
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '1'
        memory: 512M
      reservations:
        cpus: '0.5'
        memory: 256M
```

### 4. Health Checks

Health checks are already configured. Monitor with:
```bash
docker inspect --format='{{.State.Health.Status}}' d3-backend
```

## Scaling Strategy

### Horizontal Scaling

```bash
# Scale based on load
docker-compose up -d --scale backend=5 --scale worker=10
```

### Vertical Scaling

Update resource limits in `docker-compose.yml` and restart.

### Auto-Scaling (Advanced)

Use Docker Swarm or Kubernetes for automatic scaling based on metrics.

## Cleanup

### Stop and Remove Containers
```bash
docker-compose down
```

### Remove Volumes (WARNING: Deletes Redis data)
```bash
docker-compose down -v
```

### Remove Images
```bash
docker-compose down --rmi all
```

### Complete Cleanup
```bash
docker-compose down -v --rmi all
```

## Development vs Production

### Development
- Set `USE_QUEUE=false` in `.env`
- Use fewer replicas
- Enable debug logging

### Production
- Set `USE_QUEUE=true` in `.env`
- Scale services based on load
- Enable monitoring
- Use SSL/TLS
- Set up backups

## Next Steps

1. **Set up monitoring** (Prometheus + Grafana)
2. **Configure backups** (Redis + Database)
3. **Set up CI/CD** (GitHub Actions, GitLab CI)
4. **Enable logging aggregation** (ELK stack, CloudWatch)
5. **Configure auto-scaling** (Kubernetes, Docker Swarm)

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Check port availability
4. Review this troubleshooting guide

