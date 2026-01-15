#!/bin/bash
# Script to add Upstash Redis environment variables to Vercel
# Usage: ./scripts/add-vercel-env.sh

set -e

echo "🔐 Adding Upstash Redis environment variables to Vercel..."
echo ""

# Check if credentials are provided
if [ -z "$UPSTASH_REDIS_REST_URL" ] || [ -z "$UPSTASH_REDIS_REST_TOKEN" ]; then
  echo "❌ Error: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set"
  echo ""
  echo "Usage:"
  echo "  export UPSTASH_REDIS_REST_URL='https://your-redis.upstash.io'"
  echo "  export UPSTASH_REDIS_REST_TOKEN='your-token-here'"
  echo "  ./scripts/add-vercel-env.sh"
  echo ""
  echo "Or run interactively:"
  echo "  ./scripts/add-vercel-env.sh interactive"
  exit 1
fi

# Add to production
echo "📦 Adding UPSTASH_REDIS_REST_URL to production..."
echo "$UPSTASH_REDIS_REST_URL" | vercel env add UPSTASH_REDIS_REST_URL production

echo "📦 Adding UPSTASH_REDIS_REST_TOKEN to production..."
echo "$UPSTASH_REDIS_REST_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN production

# Add to preview
echo "📦 Adding UPSTASH_REDIS_REST_URL to preview..."
echo "$UPSTASH_REDIS_REST_URL" | vercel env add UPSTASH_REDIS_REST_URL preview

echo "📦 Adding UPSTASH_REDIS_REST_TOKEN to preview..."
echo "$UPSTASH_REDIS_REST_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN preview

# Add to development
echo "📦 Adding UPSTASH_REDIS_REST_URL to development..."
echo "$UPSTASH_REDIS_REST_URL" | vercel env add UPSTASH_REDIS_REST_URL development

echo "📦 Adding UPSTASH_REDIS_REST_TOKEN to development..."
echo "$UPSTASH_REDIS_REST_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN development

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "To verify:"
echo "  vercel env ls"
echo ""
echo "To deploy with new variables:"
echo "  vercel --prod"
