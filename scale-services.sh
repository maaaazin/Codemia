#!/bin/bash

# Script to scale Docker Compose services
# Usage: ./scale-services.sh [backend_count] [worker_count]

BACKEND_COUNT=${1:-5}  # Default: 5 backend instances
WORKER_COUNT=${2:-3}   # Default: 3 worker instances

echo "🚀 Scaling services..."
echo "   Backend instances: $BACKEND_COUNT"
echo "   Worker instances: $WORKER_COUNT"
echo ""

# Stop existing services
echo "⏹️  Stopping existing services..."
docker-compose down

# Start with scaling
echo "🚀 Starting services with scaling..."
docker-compose up -d --scale backend=$BACKEND_COUNT --scale worker=$WORKER_COUNT

echo ""
echo "✅ Services scaled successfully!"
echo ""
echo "📊 Check status:"
echo "   docker-compose ps"
echo ""
echo "📈 Monitor resources:"
echo "   docker stats"
echo ""
echo "📋 View logs:"
echo "   docker-compose logs -f backend"

