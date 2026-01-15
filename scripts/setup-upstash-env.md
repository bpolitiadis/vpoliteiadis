# 🔐 Setting Up Upstash Redis Environment Variables

## Quick Setup

Once you have your Upstash Redis credentials, run:

```bash
# Set your credentials
export UPSTASH_REDIS_REST_URL='https://your-redis.upstash.io'
export UPSTASH_REDIS_REST_TOKEN='your-token-here'

# Run the script
./scripts/add-vercel-env.sh
```

## Manual Setup (Alternative)

If you prefer to add them manually:

```bash
# Add to Production
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL production
echo 'your-token-here' | vercel env add UPSTASH_REDIS_REST_TOKEN production

# Add to Preview
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL preview
echo 'your-token-here' | vercel env add UPSTASH_REDIS_REST_TOKEN preview

# Add to Development
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL development
echo 'your-token-here' | vercel env add UPSTASH_REDIS_REST_TOKEN development
```

## Getting Upstash Credentials

1. Go to [https://upstash.com](https://upstash.com)
2. Sign up or log in
3. Create a new Redis database
4. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

## Verify

```bash
vercel env ls | grep UPSTASH
```

You should see both variables listed for all environments.
