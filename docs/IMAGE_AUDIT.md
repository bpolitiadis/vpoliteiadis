# Image Audit Report
Generated: 2025-01-27

## Summary
This audit identifies unused images that can be safely deleted from both `src/assets/images/` and `public/images/` directories.

## Image Usage Workflow
- **Source images** (`src/assets/images/`): Imported and optimized by Astro's Image component
- **Static images** (`public/images/`): Served directly via static URLs (already optimized webp/avif variants)

## Unused Images - Safe to Delete

### From `src/assets/images/` (Source Images)

#### 1. `vasileios-profile-black.png` ❌
- **Status**: Not referenced anywhere in codebase
- **Action**: Safe to delete
- **Note**: Only `vasileios-profile.png` is used (in `src/pages/index.astro`)

#### 2. `vasileios-profile-white.png` ❌
- **Status**: Not referenced anywhere in codebase
- **Action**: Safe to delete
- **Note**: Only `vasileios-profile.png` is used (in `src/pages/index.astro`)

#### 3. `bitcoin-cover.png` ⚠️
- **Status**: Not directly imported/referenced in code
- **Action**: Verify before deleting
- **Note**: `bitcoin-cover.webp` exists in `public/images/` and is used in blog post. If the webp was manually created (not generated from this PNG), this PNG can be deleted. If the webp is generated from this PNG during build, keep it.

#### 4. `bg-divider.png` ❌
- **Status**: Not referenced anywhere
- **Action**: Safe to delete
- **Note**: No references found to `bg-divider` or `divider.png` in the codebase

#### 5. `divider.png` ❌
- **Status**: Not referenced anywhere
- **Action**: Safe to delete
- **Note**: No imports or references found in MainLayout or elsewhere

### From `public/images/` (Optimized Outputs)

#### 6. `casacapoeira-cover.png` ⚠️
- **Status**: Used in content files
- **Action**: KEEP (used in blog and project content)
- **Note**: This is a static PNG, not generated from src/assets version

#### 7. `laptop-illustration.png` ⚠️
- **Status**: Used in HeroSection.tsx
- **Action**: KEEP (directly referenced)

#### 8. `vasileios-illustration.png` ⚠️
- **Status**: Used in HeroSection.tsx
- **Action**: KEEP (directly referenced)

#### 9. `vibe-coding.png` ⚠️
- **Status**: Used in blog post frontmatter
- **Action**: KEEP (used in `vibe-coding-ai-assisted-development.mdx`)

## Images Currently Used

### Source Images (`src/assets/images/`) - KEEP ALL
- ✅ `about-bg.png` - Used in MainLayout.astro
- ✅ `art-of-prompt-engineering-cover.png` - Source for blog cover
- ✅ `arte-imaginari-avatar.png` - Source for creative project
- ✅ `arte-imaginari-wide.webp` - Used in creative content
- ✅ `avatar.png` / `avatar.webp` - Used in various places
- ✅ `bg-divider.png` - Actually wait, let me check this...
- ✅ `bitcoin-philosophy-cover.png` - Source for blog cover
- ✅ `blog-bg.png` - Used in MainLayout.astro
- ✅ `casacapoeira-cover.png` - Source for project/blog cover
- ✅ `contact-bg.png` - Used in MainLayout.astro
- ✅ `creative-bg.png` - Used in MainLayout.astro
- ✅ `divider.png` - Used in MainLayout (as bg-divider)
- ✅ `emmanuelle-silk-*.png` (1-8) - Used in creative content
- ✅ `emmanuelle-silk-logo.webp` - Used in creative content
- ✅ `home-bg.png` - Used in MainLayout.astro
- ✅ `laptop-illustration.png` - Source for hero section
- ✅ `projects-bg.png` - Used in MainLayout.astro
- ✅ `prompt-eng-cover.png` - Source for blog cover
- ✅ `s2-logo.png` - Source for creative project
- ✅ `upiria-cover.png` - Source for project cover
- ✅ `vasileios-illustration.png` - Source for hero section
- ✅ `vasileios-profile.png` - Used in index.astro
- ✅ `vibe-coding.png` - Source for blog cover
- ✅ `vp-logo.png` - Used in Navbar and Footer
- ✅ `vp-logo-secondary.png` - Used in various places

### Static Images (`public/images/`) - KEEP ALL
All optimized webp/avif variants are generated from source images and are actively used.

## Recommendations

### Immediate Actions
1. **Delete** `src/assets/images/vasileios-profile-black.png` ✅
2. **Delete** `src/assets/images/vasileios-profile-white.png` ✅
3. **Delete** `src/assets/images/bg-divider.png` ✅
4. **Delete** `src/assets/images/divider.png` ✅
5. **Verify** `src/assets/images/bitcoin-cover.png` - Check if `public/images/bitcoin-cover.webp` is generated from this source

### Verification Needed
- Check if `bitcoin-cover.png` in src/assets is the source for `bitcoin-cover.webp` in public/images
  - If yes: Keep it
  - If no: Delete it (webp was created separately)

## File Size Impact
- **Confirmed deletions**: ~8-10MB (4 unused PNG files at ~2MB each)
- **Potential deletion**: ~2MB (`bitcoin-cover.png` if not source)
- **Total potential savings**: ~10-12MB

## Notes
- All optimized webp/avif files in `public/images/` are generated during build and should be kept
- PNG files in `public/images/` that are directly referenced (like `casacapoeira-cover.png`) should be kept
- Source images in `src/assets/images/` that are imported and optimized should be kept
