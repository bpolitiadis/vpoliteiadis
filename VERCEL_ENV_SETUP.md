# 🔐 Vercel Environment Variables Setup

**Status:** ✅ **Code committed and pushed**  
**Next Step:** Add Upstash Redis credentials to Vercel

---

## ✅ What's Been Done

1. ✅ **Code committed** - All security changes pushed to `main`
2. ✅ **Vercel project linked** - Project: `bpolitiadis-projects/vpoliteiadis`
3. ✅ **Scripts created** - Ready to add environment variables

---

## 🚀 Quick Setup (Choose One Method)

### Method 1: Interactive Script (Recommended)

```bash
./scripts/add-upstash-env-interactive.sh
```

This will prompt you for:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Method 2: With Environment Variables

```bash
export UPSTASH_REDIS_REST_URL='https://your-redis.upstash.io'
export UPSTASH_REDIS_REST_TOKEN='your-token-here'
./scripts/add-vercel-env.sh
```

### Method 3: Manual (One-by-One)

```bash
# Production
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL production
echo 'your-token' | vercel env add UPSTASH_REDIS_REST_TOKEN production

# Preview
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL preview
echo 'your-token' | vercel env add UPSTASH_REDIS_REST_TOKEN preview

# Development
echo 'https://your-redis.upstash.io' | vercel env add UPSTASH_REDIS_REST_URL development
echo 'your-token' | vercel env add UPSTASH_REDIS_REST_TOKEN development
```

---

## 📋 Getting Upstash Credentials

1. **Go to:** [https://console.upstash.com/](https://console.upstash.com/)
2. **Sign up/Login** (free tier available)
3. **Create Redis Database:**
   - Click "Create Database"
   - Name: `vpoliteiadis-rate-limit`
   - Region: Choose closest to your Vercel deployment
   - Click "Create"
4. **Copy Credentials:**
   - `UPSTASH_REDIS_REST_URL` - Found in database details
   - `UPSTASH_REDIS_REST_TOKEN` - Found in database details

---

## ✅ Verify Setup

After adding the variables:

```bash
# List all environment variables
vercel env ls | grep UPSTASH

# Should show:
# UPSTASH_REDIS_REST_URL     Encrypted    Development, Preview, Production
# UPSTASH_REDIS_REST_TOKEN   Encrypted    Development, Preview, Production
```

---

## 🚀 Deploy

Once environment variables are added:

```bash
# Deploy to production
vercel --prod

# Or trigger via git push (if auto-deploy is enabled)
git push origin main
```

---

## 🔍 Current Environment Variables

Your project already has these variables configured:
- ✅ `RESEND_API_KEY`
- ✅ `FROM_EMAIL`
- ✅ `CONTACT_EMAIL`
- ✅ `REPLY_TO_EMAIL`
- ✅ `SEND_CONFIRMATION_EMAIL`
- ✅ `RESEND_DEBUG`
- ✅ `EMAIL_SUBJECT_PREFIX`
- ✅ `RATE_LIMIT_WINDOW` (legacy)
- ✅ `RATE_LIMIT_REQUESTS` (legacy)

**Need to add:**
- ⏳ `UPSTASH_REDIS_REST_URL` ← **Add this**
- ⏳ `UPSTASH_REDIS_REST_TOKEN` ← **Add this**

---

## 📚 Documentation

- **[SECURITY_SETUP.md](./docs/SECURITY_SETUP.md)** - Detailed setup guide
- **[SECURITY_DEPLOYMENT_CHECKLIST.md](./SECURITY_DEPLOYMENT_CHECKLIST.md)** - Complete checklist
- **[scripts/setup-upstash-env.md](./scripts/setup-upstash-env.md)** - Script documentation

---

## ⚠️ Important Notes

1. **Rate limiting will be disabled** until these variables are added (with a warning in logs)
2. **Add to all environments** (Production, Preview, Development) for consistency
3. **Variables are encrypted** by Vercel automatically
4. **Redeploy required** after adding variables for them to take effect

---

**Ready to add?** Run: `./scripts/add-upstash-env-interactive.sh`
