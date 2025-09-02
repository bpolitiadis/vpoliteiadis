# 🔧 Environment Variables Guide

**Complete reference for all environment variables used in the vpoliteiadis portfolio project.**

## 📋 Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure required variables** (see sections below)

3. **Restart the development server:**
   ```bash
   pnpm dev
   ```

## 🔑 Environment Variables Reference

### 🚀 **Development & Build**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Runtime environment |
| `LOG_LEVEL` | No | `info` (prod), `debug` (dev) | Logging verbosity level |

### 📊 **Logging & Observability**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LOG_LEVEL` | No | `info` (prod), `debug` (dev) | Log level: `trace`, `debug`, `info`, `warn`, `error`, `fatal` |
| `REDACTION_EXTRA_KEYS` | No | - | Additional comma-separated keys to redact in logs |
| `SENTRY_DSN` | No | - | Server-side Sentry DSN for error tracking |
| `SENTRY_ENV` | No | `NODE_ENV` | Environment name in Sentry |
| `SENTRY_TRACES_SAMPLE_RATE` | No | `0.1` | Performance monitoring sample rate (0.0-1.0) |
| `PUBLIC_SENTRY_DSN` | No | - | Client-side Sentry DSN (must start with `PUBLIC_`) |

**Example:**
```bash
# Server-side error tracking
SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/1234567
SENTRY_ENV=production
SENTRY_TRACES_SAMPLE_RATE=0.1

# Client-side error tracking (optional)
PUBLIC_SENTRY_DSN=https://your-client-key@o123456.ingest.sentry.io/1234568

# Enhanced logging
LOG_LEVEL=info
REDACTION_EXTRA_KEYS=custom_token,api_secret
```

### 🌐 **Vercel Deployment** (Auto-populated)

| Variable | Required | Auto-Set | Description |
|----------|----------|----------|-------------|
| `VERCEL_ENV` | No | ✅ | `development`, `preview`, or `production` |
| `VERCEL_GIT_COMMIT_SHA` | No | ✅ | Git commit SHA for release tracking |
| `VERCEL_DEPLOYMENT_URL` | No | ✅ | Current deployment URL |
| `VERCEL_URL` | No | ✅ | Public URL of the deployment |

### 🏗️ **Custom Build & Deployment**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `COMMIT_SHA` | No | - | Git commit SHA (if not using Vercel) |
| `DEPLOYED_AT` | No | - | Deployment timestamp (ISO 8601) |

**Example for non-Vercel deployments:**
```bash
COMMIT_SHA=abc123def456
DEPLOYED_AT=2025-01-15T10:30:00.000Z
```

## 🛡️ **Security & Privacy**

### Automatic PII Redaction

The logging system automatically redacts sensitive fields:

```typescript
// These patterns are automatically redacted in logs
const AUTO_REDACTED = [
  'authorization', 'cookie', 'password', 'email', 'phone',
  'token', 'secret', 'key',
  // Nested paths
  'req.headers.authorization',
  'req.headers.cookie',
  'body.password',
  'query.token'
];
```

### Custom Redaction

Add custom sensitive keys via `REDACTION_EXTRA_KEYS`:

```bash
# Will redact these additional fields from logs
REDACTION_EXTRA_KEYS=custom_api_key,user_session,internal_id
```

## 🌍 **Environment-Specific Configurations**

### **Development (.env.local)**
```bash
# Development environment
NODE_ENV=development
LOG_LEVEL=debug

# Optional: Enable Sentry for development testing
# SENTRY_DSN=https://your-dev-dsn@sentry.io/project
# PUBLIC_SENTRY_DSN=https://your-dev-client-dsn@sentry.io/project
```

### **Production (Vercel Environment Variables)**
```bash
# Production logging
LOG_LEVEL=info
SENTRY_DSN=https://your-prod-dsn@sentry.io/project
SENTRY_ENV=production
SENTRY_TRACES_SAMPLE_RATE=0.1

# Client-side error tracking
PUBLIC_SENTRY_DSN=https://your-prod-client-dsn@sentry.io/project

# Custom redaction (if needed)
REDACTION_EXTRA_KEYS=internal_token,session_key
```

### **Preview/Staging**
```bash
# Staging environment
LOG_LEVEL=info
SENTRY_DSN=https://your-staging-dsn@sentry.io/project
SENTRY_ENV=preview
SENTRY_TRACES_SAMPLE_RATE=0.5

# Higher sampling for staging
PUBLIC_SENTRY_DSN=https://your-staging-client-dsn@sentry.io/project
```

## 📖 **Variable Usage in Code**

### **Server-side Usage**

```typescript
// In server-side code (middleware, API routes, etc.)
const logger = Astro.locals.logger;
const { requestId, traceId } = Astro.locals.requestContext;

logger.info('Processing request');
```

### **Client-side Usage**

```typescript
// Client-side Sentry is automatically initialized if PUBLIC_SENTRY_DSN is set
// No manual configuration needed
```

### **Environment Detection**

```typescript
// Check environment
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE; // 'development' | 'production'

// Vercel-specific
const vercelEnv = import.meta.env.VERCEL_ENV; // 'development' | 'preview' | 'production'
```

## 🔄 **Setting Environment Variables**

### **Local Development**

1. **Create `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit variables:**
   ```bash
   # .env.local
   LOG_LEVEL=debug
   SENTRY_DSN=https://your-dsn@sentry.io/project
   ```

3. **Restart dev server:**
   ```bash
   pnpm dev
   ```

### **Vercel Deployment**

1. **Via Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add variables for each environment (Development, Preview, Production)

2. **Via Vercel CLI:**
   ```bash
   # Production
   vercel env add SENTRY_DSN production
   vercel env add LOG_LEVEL production

   # Preview
   vercel env add SENTRY_DSN preview
   vercel env add LOG_LEVEL preview
   ```

3. **Via `vercel.json`:**
   ```json
   {
     "env": {
       "LOG_LEVEL": "info",
       "SENTRY_ENV": "production"
     }
   }
   ```

### **Other Platforms**

For other hosting platforms (Netlify, GitHub Pages, etc.):

1. **Build-time variables:**
   ```bash
   # Set during build
   COMMIT_SHA=$(git rev-parse HEAD) pnpm build
   DEPLOYED_AT=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ) pnpm build
   ```

2. **CI/CD Integration:**
   ```yaml
   # GitHub Actions example
   - name: Build site
     env:
       LOG_LEVEL: info
       COMMIT_SHA: ${{ github.sha }}
       DEPLOYED_AT: ${{ steps.timestamp.outputs.time }}
     run: pnpm build
   ```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Logs not appearing in production:**
   ```bash
   # Check LOG_LEVEL is set correctly
   LOG_LEVEL=info  # not 'silent' or 'error'
   ```

2. **Sentry not capturing errors:**
   ```bash
   # Verify DSN format
   SENTRY_DSN=https://key@organization.ingest.sentry.io/project-id
   
   # Check environment
   SENTRY_ENV=production  # matches your Sentry project
   ```

3. **Client-side Sentry not working:**
   ```bash
   # Must use PUBLIC_ prefix for client-side
   PUBLIC_SENTRY_DSN=https://client-key@sentry.io/project
   ```

4. **Build failing with environment errors:**
   ```bash
   # Check for typos in variable names
   # Ensure no spaces around = in .env files
   LOG_LEVEL=info  # ✅ Good
   LOG_LEVEL = info  # ❌ Bad
   ```

### **Validation Commands**

```bash
# Check environment variables are loaded
pnpm dev  # Look for startup logs

# Test logging system
curl http://localhost:4321/api/health

# Verify Sentry integration
# Trigger an error and check Sentry dashboard
```

## 📚 **Related Documentation**

- **[LOGGING.md](./LOGGING.md)** - Comprehensive logging system guide
- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Project setup instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview

---

**Need help?** Check the [troubleshooting section](#-troubleshooting) or refer to the [logging documentation](./LOGGING.md) for detailed debugging guides.
