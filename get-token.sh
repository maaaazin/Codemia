#!/bin/bash

# Script to get a JWT token for load testing
# Usage: ./get-token.sh [email] [password]

API_URL=${API_URL:-http://localhost}
EMAIL=${1:-"loadtest$(date +%s)@example.com"}
PASSWORD=${2:-"testpassword123"}

echo "🔐 Getting JWT token..."
echo "   Email: $EMAIL"
echo ""

# Try login first
RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$RESPONSE" | jq -r '.token // empty')

if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "⚠️  Login failed, trying signup..."
  
  # Try signup
  RESPONSE=$(curl -s -X POST "$API_URL/api/auth/signup" \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"$EMAIL\",
      \"password\": \"$PASSWORD\",
      \"name\": \"Load Test User\",
      \"role\": \"student\",
      \"roll_no\": \"LT$(date +%s)\"
    }")
  
  TOKEN=$(echo "$RESPONSE" | jq -r '.token // empty')
fi

if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "❌ Failed to get token"
  echo "Response: $RESPONSE"
  exit 1
fi

echo "✅ Token obtained!"
echo ""
echo "📋 JWT Token:"
echo "$TOKEN"
echo ""
echo "🚀 Use it in your K6 test:"
echo "   TEST_TOKEN=$TOKEN k6 run digitalta_loadtest.js"
echo ""
echo "💡 Or export it:"
echo "   export TEST_TOKEN=$TOKEN"
echo "   k6 run digitalta_loadtest.js"

