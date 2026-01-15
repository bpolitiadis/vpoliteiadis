# 🔐 Security Hardening Setup Guide

This guide explains how to set up the security enhancements implemented in the contact form API.

## 📋 Overview

The contact form API has been hardened with:
- ✅ **Distributed Rate Limiting** (Upstash Redis)
- ✅ **Comprehensive Security Headers** (vercel.json)
- ✅ **Input Sanitization** (length limits, HTML sanitization)
- ✅ **Obfuscated Error Handling** (no information leakage)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

This will install:
- `@upstash/ratelimit` - Distributed rate limiting
- `@upstash/redis` - Redis client for rate limiting

### 2. Set Up Upstash Redis (Required for Rate Limiting)

#### Option A: Upstash (Recommended)

1. **Create an Upstash account:**
   - Go to [https://upstash.com](https://upstash.com)
   - Sign up for a free account

2. **Create a Redis database:**
   - Click "Create Database"
   - Choose a name (e.g., `vpoliteiadis-rate-limit`)
   - Select a region close to your Vercel deployment
   - Click "Create"

3. **Get your credentials:**
   - After creation, click on your database
   - Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

4. **Add to Vercel Environment Variables:**
   ```bash
   # Via Vercel CLI
   vercel env add UPSTASH_REDIS_REST_URL production
   vercel env add UPSTASH_REDIS_REST_TOKEN production
   
   # Or via Vercel Dashboard:
   # Project Settings → Environment Variables
   ```

#### Option B: Vercel KV (Alternative)

If you prefer using Vercel KV instead of Upstash:

1. **Create a Vercel KV database:**
   ```bash
   vercel kv create
   ```

2. **Update the code:**
   - Replace `@upstash/redis` with `@vercel/kv`
   - Update the rate limiter initialization in `src/pages/api/contact.ts`

**Note:** The current implementation uses Upstash for better compatibility and features.

### 3. Environment Variables

Add these to your Vercel project (Production, Preview, and Development):

| Variable | Required | Description |
|----------|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Yes* | Upstash Redis REST API URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes* | Upstash Redis REST API token |
| `RESEND_API_KEY` | Yes | Resend API key (existing) |
| `FROM_EMAIL` | Yes | Sender email address (existing) |
| `CONTACT_EMAIL` | Yes | Contact form recipient (existing) |

\* Required for production. Rate limiting will be disabled if not set (with a warning).

---

## 🔧 Configuration

### Rate Limiting

**Current Settings:**
- **Limit:** 5 requests per hour per IP
- **Algorithm:** Sliding window
- **Storage:** Upstash Redis (distributed)

**To modify the rate limit**, edit `src/pages/api/contact.ts`:

```typescript
return new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'), // Change these values
  analytics: true,
  prefix: '@contact-form',
});
```

### Input Limits

**Current Limits:**
- `firstName`: 50 characters
- `lastName`: 50 characters
- `email`: 254 characters (RFC 5321)
- `message`: 5000 characters
- **Request body:** 10KB maximum

**To modify limits**, edit `INPUT_LIMITS` in `src/pages/api/contact.ts`.

---

## 🧪 Testing

### Test Rate Limiting Locally

1. **Set up local environment variables:**
   ```bash
   # .env.local
   UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token
   ```

2. **Test the API:**
   ```bash
   # Send 6 requests rapidly (5 allowed + 1 rate limited)
   for i in {1..6}; do
     curl -X POST http://localhost:4321/api/contact \
       -H "Content-Type: application/json" \
       -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
     echo ""
   done
   ```

3. **Expected behavior:**
   - First 5 requests: `200 OK`
   - 6th request: `429 Too Many Requests` with `Retry-After` header

### Test Security Headers

```bash
# Check security headers
curl -I https://vpoliteiadis.dev/

# Should include:
# - Strict-Transport-Security
# - X-Frame-Options: DENY
# - X-Content-Type-Options: nosniff
# - Content-Security-Policy
# - Permissions-Policy
```

---

## 🚨 Troubleshooting

### Rate Limiting Not Working

**Symptoms:**
- No rate limiting applied
- Warning in logs: "Rate limiting disabled"

**Solutions:**
1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
2. Check environment variable names (case-sensitive)
3. Ensure Upstash database is active and accessible
4. Check Vercel deployment logs for errors

### Rate Limiting Errors (Non-Blocking)

**Behavior:**
- Rate limiting errors are logged but don't block requests
- This ensures availability even if Redis is temporarily unavailable

**To make rate limiting strict:**
- Modify error handling in `src/pages/api/contact.ts` to throw errors instead of logging

### Security Headers Not Applied

**Symptoms:**
- Headers missing in response

**Solutions:**
1. Verify `vercel.json` is in project root
2. Check Vercel deployment configuration
3. Ensure headers are not being overridden by middleware
4. Redeploy after changes to `vercel.json`

---

## 📊 Monitoring

### Rate Limit Headers

The API returns rate limit information in response headers:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1704067200
Retry-After: 3600  # (when rate limited)
```

### Logging

Rate limit events are logged server-side:
- **Rate limit exceeded:** Warning log with IP and limit details
- **Rate limit errors:** Error log (non-blocking)

---

## 🔒 Security Best Practices

1. **Never expose:**
   - Stack traces
   - Internal error messages
   - Field validation details
   - Database/API structure

2. **Always:**
   - Use generic error messages for clients
   - Log detailed errors server-side only
   - Validate and sanitize all inputs
   - Enforce rate limits

3. **Regular audits:**
   - Review rate limit settings quarterly
   - Monitor for abuse patterns
   - Update dependencies regularly
   - Review security headers annually

---

## 📚 References

- [Upstash Rate Limiting Docs](https://upstash.com/docs/redis/features/ratelimit)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## ✅ Checklist

- [ ] Install dependencies (`pnpm install`)
- [ ] Create Upstash Redis database
- [ ] Add `UPSTASH_REDIS_REST_URL` to Vercel
- [ ] Add `UPSTASH_REDIS_REST_TOKEN` to Vercel
- [ ] Test rate limiting locally
- [ ] Deploy to Vercel
- [ ] Verify security headers with `curl -I`
- [ ] Test rate limiting in production
- [ ] Monitor logs for rate limit events

---

**Status:** ✅ **READY FOR PRODUCTION**
