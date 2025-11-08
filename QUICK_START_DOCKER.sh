#!/bin/bash

echo "🚀 Docker Quick Start Script"
echo "============================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file"
        echo "⚠️  Please edit .env with your actual values before continuing!"
        echo ""
        read -p "Press Enter after editing .env file..."
    else
        echo "❌ .env.example not found. Please create .env manually."
        exit 1
    fi
fi

echo "📦 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting all services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 5

echo ""
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ Services started!"
echo ""
echo "📊 Quick Health Checks:"
echo "  - Backend: curl http://localhost/health"
echo "  - Queue Stats: curl http://localhost/api/queue/stats"
echo ""
echo "📝 Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Scale workers: docker-compose up -d --scale worker=10"
echo ""
echo "🌐 Access your application at: http://localhost"
