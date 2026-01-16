# 🚀 Upstash Redis Setup Guide (Step-by-Step)

**Time Required:** ~5 minutes  
**Difficulty:** Easy (no coding required!)

---

## 📋 Prerequisites

- ✅ A web browser (Chrome, Firefox, Safari, etc.)
- ✅ An email address (for account signup)
- ✅ Access to your Vercel project

---

## 🎯 Step-by-Step Setup

### Step 1: Create Upstash Account

1. **Open your browser** and go to:
   ```
   https://upstash.com
   ```

2. **Click "Sign Up"** (top right corner)

3. **Choose signup method:**
   - Option A: Sign up with GitHub (fastest)
   - Option B: Sign up with email

4. **Complete signup:**
   - If using email: Verify your email address
   - If using GitHub: Authorize Upstash

**✅ Done when:** You see the Upstash dashboard

---

### Step 2: Create Redis Database

1. **In the Upstash dashboard**, click:
   ```
   "Create Database" button (big green button)
   ```

2. **Fill in the form:**
   - **Name:** `vpoliteiadis-rate-limit` (or any name you like)
   - **Type:** Select **"Regional"** (not Global)
   - **Region:** Choose the region closest to your Vercel deployment
     - If unsure: Choose `us-east-1` (N. Virginia) or `eu-west-1` (Ireland)
   - **Primary Region:** Same as Region above
   - **TLS:** ✅ Enabled (default, keep it enabled)

3. **Click "Create"**

4. **Wait ~10 seconds** for database creation

**✅ Done when:** You see "Database created successfully"

---

### Step 3: Get Your Credentials

1. **Click on your database** (the one you just created)

2. **You'll see two important values:**

   **a) REST URL:**
   ```
   UPSTASH_REDIS_REST_URL
   ```
   - Looks like: `https://xxxxx.upstash.io`
   - Click the copy button (📋) next to it

   **b) REST Token:**
   ```
   UPSTASH_REDIS_REST_TOKEN
   ```
   - Looks like: `AXxxxxx...` (long string)
   - Click the copy button (📋) next to it

3. **Save these somewhere safe** (temporarily):
   - Copy to a text file
   - Or keep browser tab open
   - You'll need them in the next step

**✅ Done when:** You have both values copied

---

### Step 4: Add Credentials to Vercel

**Option A: Using the Interactive Script (Easiest)**

1. **Open your terminal** in the project directory:
   ```bash
   cd /Users/vpoliteiadis/workspace/vpoliteiadis
   ```

2. **Run the interactive script:**
   ```bash
   ./scripts/add-upstash-env-interactive.sh
   ```

3. **When prompted, paste your credentials:**
   ```
   UPSTASH_REDIS_REST_URL: [paste your URL here]
   UPSTASH_REDIS_REST_TOKEN: [paste your token here]
   ```

4. **Press Enter** after each value

**✅ Done when:** Script says "Environment variables added successfully!"

---

**Option B: Using Vercel Dashboard (Browser)**

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Click on your project:** `vpoliteiadis`

3. **Go to:** Settings → Environment Variables

4. **Add first variable:**
   - **Key:** `UPSTASH_REDIS_REST_URL`
   - **Value:** Paste your REST URL
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

5. **Add second variable:**
   - **Key:** `UPSTASH_REDIS_REST_TOKEN`
   - **Value:** Paste your REST Token
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

**✅ Done when:** Both variables appear in the list

---

### Step 5: Verify Setup

**In your terminal:**

```bash
vercel env ls | grep UPSTASH
```

**Expected output:**
```
UPSTASH_REDIS_REST_URL     Encrypted    Development, Preview, Production
UPSTASH_REDIS_REST_TOKEN   Encrypted    Development, Preview, Production
```

**✅ Done when:** Both variables are listed

---

### Step 6: Deploy (Optional but Recommended)

```bash
vercel --prod
```

This redeploys your site with the new environment variables.

**✅ Done when:** Deployment completes successfully

---

## 🎉 You're Done!

Your contact form now has:
- ✅ Rate limiting (5 submissions/hour per IP)
- ✅ Spam protection
- ✅ Cost protection (prevents API abuse)

---

## 🧪 Test It Out

1. **Submit the contact form** 5 times (should work)
2. **Try a 6th submission** (should get "Too many requests" error)
3. **Wait 1 hour** (or test with a different IP)
4. **Submit again** (should work)

---

## 🆘 Troubleshooting

### "Rate limiting disabled" warning in logs

**Problem:** Environment variables not set correctly

**Solution:**
1. Verify variables exist: `vercel env ls | grep UPSTASH`
2. Check spelling (must be exact):
   - `UPSTASH_REDIS_REST_URL` (not `UPSTASH_REDIS_URL`)
   - `UPSTASH_REDIS_REST_TOKEN` (not `UPSTASH_REDIS_TOKEN`)
3. Redeploy: `vercel --prod`

### "Connection refused" error

**Problem:** Wrong URL or token

**Solution:**
1. Go back to Upstash dashboard
2. Copy credentials again (make sure no extra spaces)
3. Re-add to Vercel
4. Redeploy

### Can't find "Create Database" button

**Problem:** Might be on different page

**Solution:**
1. Look for "Redis" in the left sidebar
2. Or go directly to: `https://console.upstash.com/redis`
3. Click "Create Database"

---

## 📚 Additional Resources

- **Upstash Docs:** https://docs.upstash.com/redis
- **Upstash Console:** https://console.upstash.com/
- **Vercel Env Vars:** https://vercel.com/docs/concepts/projects/environment-variables

---

## ✅ Checklist

- [ ] Created Upstash account
- [ ] Created Redis database
- [ ] Copied REST URL
- [ ] Copied REST Token
- [ ] Added variables to Vercel (all 3 environments)
- [ ] Verified with `vercel env ls`
- [ ] Deployed to production
- [ ] Tested rate limiting

**All checked?** You're all set! 🎉
