#!/bin/bash
# Interactive script to add Upstash Redis env vars

echo "🔐 Upstash Redis Environment Variables Setup"
echo "=========================================="
echo ""
echo "Please provide your Upstash Redis credentials."
echo "Get them from: https://console.upstash.com/"
echo ""

read -p "UPSTASH_REDIS_REST_URL: " UPSTASH_URL
read -sp "UPSTASH_REDIS_REST_TOKEN: " UPSTASH_TOKEN
echo ""

if [ -z "$UPSTASH_URL" ] || [ -z "$UPSTASH_TOKEN" ]; then
  echo "❌ Error: Both values are required"
  exit 1
fi

echo ""
echo "📦 Adding to Production..."
echo "$UPSTASH_URL" | vercel env add UPSTASH_REDIS_REST_URL production
echo "$UPSTASH_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN production

echo ""
echo "📦 Adding to Preview..."
echo "$UPSTASH_URL" | vercel env add UPSTASH_REDIS_REST_URL preview
echo "$UPSTASH_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN preview

echo ""
echo "📦 Adding to Development..."
echo "$UPSTASH_URL" | vercel env add UPSTASH_REDIS_REST_URL development
echo "$UPSTASH_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN development

echo ""
echo "✅ Done! Environment variables added."
echo ""
echo "Verify with: vercel env ls | grep UPSTASH"
