# 🔒 Security Deployment Checklist

**Quick reference for deploying the security-hardened contact form API**

---

## ✅ Pre-Deployment Checklist

### 1. Install Dependencies
```bash
pnpm install
```
**Verifies:** `@upstash/ratelimit` and `@upstash/redis` are installed

### 2. Run Tests
```bash
pnpm test:unit      # Unit tests (should pass)
pnpm test:contact  # Contact form E2E tests (should pass)
```
**Expected:** All tests passing ✅

### 3. Verify Security Headers
```bash
# Check vercel.json contains security headers
cat vercel.json | grep -A 5 "Strict-Transport-Security"
```
**Expected:** Security headers present ✅

---

## 🚀 Deployment Steps

### Step 1: Set Up Upstash Redis

1. **Create account:** [https://upstash.com](https://upstash.com)
2. **Create database:**
   - Name: `vpoliteiadis-rate-limit`
   - Region: Choose closest to Vercel deployment
3. **Copy credentials:**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Add Environment Variables to Vercel

**Via Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add for **Production**, **Preview**, and **Development**:
   - `UPSTASH_REDIS_REST_URL` = `https://your-redis.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` = `your-token-here`

**Via CLI:**
```bash
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
```

### Step 3: Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Or deploy preview
vercel
```

### Step 4: Verify Deployment

**Check Security Headers:**
```bash
curl -I https://vpoliteiadis.dev/
```

**Expected Headers:**
- ✅ `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Content-Security-Policy: ...`
- ✅ `Permissions-Policy: ...`

**Test Rate Limiting:**
```bash
# Send 6 requests rapidly (5 allowed + 1 rate limited)
for i in {1..6}; do
  curl -X POST https://vpoliteiadis.dev/api/contact \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test"}'
  echo ""
done
```

**Expected:**
- First 5 requests: `200 OK`
- 6th request: `429 Too Many Requests` with `Retry-After` header

---

## 🔍 Post-Deployment Verification

### 1. Check Vercel Logs
```bash
vercel logs --follow
```

**Look for:**
- ✅ Rate limiting active (no warnings about missing Redis)
- ✅ Successful form submissions
- ✅ Rate limit events (429 responses)

### 2. Test Contact Form
- ✅ Submit valid form → Should succeed
- ✅ Submit 6 times rapidly → 6th should be rate limited
- ✅ Submit invalid data → Should return generic error

### 3. Monitor Security Headers
```bash
# Check headers on all pages
curl -I https://vpoliteiadis.dev/
curl -I https://vpoliteiadis.dev/about
curl -I https://vpoliteiadis.dev/contact
```

---

## 📊 Monitoring

### Key Metrics to Watch

1. **Rate Limit Events:**
   - Monitor `429` responses in Vercel logs
   - Check for abuse patterns

2. **Error Rates:**
   - Monitor `500` errors (should be rare)
   - Verify error messages are generic

3. **Security Headers:**
   - Verify headers present on all routes
   - Check CSP violations (if any)

### Alerts to Set Up

- ⚠️ High rate of 429 responses (potential abuse)
- ⚠️ Missing security headers
- ⚠️ Upstash Redis connection failures

---

## 🆘 Troubleshooting

### Rate Limiting Not Working

**Symptoms:**
- No 429 responses after 5 requests
- Warning in logs: "Rate limiting disabled"

**Solutions:**
1. Verify `UPSTASH_REDIS_REST_URL` is set
2. Verify `UPSTASH_REDIS_REST_TOKEN` is set
3. Check Upstash dashboard for database status
4. Redeploy after adding environment variables

### Security Headers Missing

**Symptoms:**
- Headers not present in `curl -I` output

**Solutions:**
1. Verify `vercel.json` is in project root
2. Check Vercel deployment logs
3. Ensure headers not overridden by middleware
4. Redeploy after changes

### Tests Failing

**Symptoms:**
- Tests fail locally or in CI

**Solutions:**
1. Run `pnpm install` to ensure dependencies installed
2. Check test helpers match new API format
3. Verify environment variables set for tests
4. See `docs/SECURITY_TEST_RESULTS.md` for details

---

## 📚 Documentation References

- **[SECURITY_SETUP.md](./docs/SECURITY_SETUP.md)** - Detailed setup guide
- **[SECURITY_AUDIT.md](./docs/SECURITY_AUDIT.md)** - Security audit findings
- **[SECURITY_TEST_RESULTS.md](./docs/SECURITY_TEST_RESULTS.md)** - Test verification
- **[SECURITY_IMPLEMENTATION_SUMMARY.md](./docs/SECURITY_IMPLEMENTATION_SUMMARY.md)** - Complete summary

---

## ✅ Final Checklist

- [ ] Upstash Redis database created
- [ ] Environment variables added to Vercel
- [ ] Deployed to Vercel
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] Contact form tested
- [ ] Monitoring set up
- [ ] Documentation reviewed

---

**Status:** Ready for production deployment ✅
