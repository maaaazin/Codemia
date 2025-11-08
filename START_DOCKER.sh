#!/bin/bash

echo "🐳 Starting Docker Stack"
echo "========================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from template..."
    cat > .env << 'ENVEOF'
# Database
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# Piston API
PISTON_URL=http://localhost:2000

# Application
NODE_ENV=production
PORT=3000
USE_QUEUE=false
ENVEOF
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env with your actual values!"
    echo "   Required: SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET"
    echo ""
    read -p "Press Enter after editing .env file, or Ctrl+C to cancel..."
fi

echo "📦 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
echo "   - Redis (queue)"
echo "   - Backend API (1 instance)"
echo "   - Workers (1 instance)"
echo "   - Nginx (load balancer)"
echo ""

docker-compose up -d

echo ""
echo "⏳ Waiting for services to initialize..."
sleep 8

echo ""
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ Services started!"
echo ""
echo "📊 Quick Health Checks:"
echo "  Testing backend health..."
if curl -s http://localhost/health > /dev/null 2>&1; then
    echo "  ✅ Backend is healthy"
else
    echo "  ⚠️  Backend not responding yet (may need a few more seconds)"
fi

echo ""
echo "📝 Useful Commands:"
echo "  View logs:        docker-compose logs -f"
echo "  View backend:     docker-compose logs -f backend"
echo "  View workers:     docker-compose logs -f worker"
echo "  Stop services:    docker-compose down"
echo "  Scale backend:    docker-compose up -d --scale backend=3"
echo "  Scale workers:    docker-compose up -d --scale worker=5"
echo ""
echo "🌐 Access your application:"
echo "  - API: http://localhost"
echo "  - Health: http://localhost/health"
echo "  - Queue Stats: http://localhost/api/queue/stats"
echo ""
