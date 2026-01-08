# 🛠️ Fixes Directory

Common bugs, build failures, and troubleshooting guides for this Astro portfolio project.

## Available Guides

| Issue Type | Document | Description |
|------------|----------|-------------|
| **Build Failures** | [BUILD_FAILURES.md](./BUILD_FAILURES.md) | Most common build issues and their solutions |
| **Image Issues** | [IMAGE_OPTIMIZATION.md](../IMAGE_OPTIMIZATION.md) | Image loading and optimization problems |
| **Deployment** | [VERCEL_DEPLOYMENT_FIX.md](../VERCEL_DEPLOYMENT_FIX.md) | Vercel-specific deployment issues |

## Quick Reference

### Most Common Issues

1. **"Missing static asset references"** → Check `BUILD_FAILURES.md`
2. **Images not loading on Vercel** → Check `IMAGE_OPTIMIZATION.md`
3. **Build timeouts** → Check `BUILD_FAILURES.md`
4. **Contact form not working** → Check environment variables and API endpoints

### Emergency Fixes

**If build fails immediately:**
```bash
# Clear all caches
rm -rf node_modules/.cache dist .astro

# Reinstall dependencies
pnpm install

# Test build
pnpm run build
```

**If Vercel deployment fails:**
1. Check Vercel dashboard for specific error logs
2. Compare with local build: `pnpm run build`
3. Verify environment variables are set in Vercel
4. Check that all image files exist in `public/images/`

## Contributing

When you encounter and fix a new issue:

1. **Document the problem** in the appropriate guide
2. **Include symptoms, causes, and solutions**
3. **Add debug commands** where helpful
4. **Update this index** if creating a new guide

## Support

- **Local issues:** Check the specific guide for your problem
- **Vercel-specific:** Review Vercel deployment logs
- **Framework issues:** Check Astro documentation
- **New issues:** Create an issue with build logs and error details

---

*Keep this directory updated as new issues are discovered and fixed.*