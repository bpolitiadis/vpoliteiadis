# Blog i18n Migration Checklist

This document outlines the steps required to migrate your existing blog collection to support multilingual content with directory-based routing.

## Overview

The implementation supports:
- **English (default)**: `/blog/[slug]` - No language prefix
- **Greek**: `/el/blog/[slug]` - Language prefix required

## Migration Steps

### 1. Update Existing Blog Posts

For each existing blog post in `src/content/blog/*.mdx`, you need to:

1. **Add `lang` field** (defaults to 'en' if omitted):
   ```yaml
   ---
   title: "Your Post Title"
   lang: "en"  # Add this line
   # ... rest of frontmatter
   ---
   ```

2. **Add `translationId`** if you have a corresponding translation:
   ```yaml
   ---
   title: "Your Post Title"
   lang: "en"
   translationId: "prompt-engineering-001"  # Shared ID linking translations
   # ... rest of frontmatter
   ---
   ```

   The same `translationId` should be used in both the English and Greek versions of the same post.

### 2. Directory Structure Migration

**Current structure:**
```
src/content/blog/
  ├── post-1.mdx
  ├── post-2.mdx
  └── ...
```

**New structure (optional but recommended):**
```
src/content/blog/
  ├── en/
  │   ├── post-1.mdx
  │   └── post-2.mdx
  └── el/
      ├── post-1.mdx
      └── post-2.mdx
```

**Note:** Astro Content Collections support both flat and nested structures. The `lang` field in frontmatter determines the language, not the directory structure. However, organizing by language subdirectories improves maintainability.

### 3. Migration Script (Optional)

You can use this script to help migrate your posts:

```bash
# Create language subdirectories
mkdir -p src/content/blog/en
mkdir -p src/content/blog/el

# Move existing posts (assuming they're all English)
# Review and move manually, or use a script to:
# 1. Add lang: "en" to frontmatter
# 2. Move to en/ subdirectory
```

### 4. Example: Creating a Translated Post

**English version** (`src/content/blog/en/prompt-engineering.mdx`):
```yaml
---
title: "The Art of Prompt Engineering"
lang: "en"
translationId: "prompt-engineering-001"
description: "Learn how to craft effective prompts for AI"
publishedAt: "2024-01-15"
tags: ["ai", "tutorial"]
category: "technology"
---

Your English content here...
```

**Greek version** (`src/content/blog/el/prompt-engineering.mdx`):
```yaml
---
title: "Η Τέχνη του Prompt Engineering"
lang: "el"
translationId: "prompt-engineering-001"  # Same ID links them
description: "Μάθετε πώς να δημιουργείτε αποτελεσματικά prompts για AI"
publishedAt: "2024-01-15"
tags: ["ai", "tutorial"]
category: "technology"
---

Το ελληνικό περιεχόμενο εδώ...
```

### 5. Verify Routes

After migration, verify that routes are generated correctly:

- English posts: `/blog/[slug]`
- Greek posts: `/el/blog/[slug]`
- Blog index (English): `/blog`
- Blog index (Greek): `/el/blog`

### 6. Update Existing Links

Search your codebase for hardcoded blog links and update them:

```typescript
// Old
href={`/blog/${post.slug}`}

// New (use helper or conditional)
href={post.data.lang === 'en' 
  ? `/blog/${post.slug}` 
  : `/${post.data.lang}/blog/${post.slug}`}
```

### 7. Test Language Switcher

1. Visit an English post with a translation
2. Verify the language switcher appears
3. Click to switch to Greek version
4. Verify URL changes correctly
5. Verify content is in the correct language

### 8. SEO Verification

Verify that:
- `<html lang="...">` attribute is set correctly
- `hreflang` tags are present in `<head>`
- Canonical URLs are correct
- Structured data includes `inLanguage` field

## Files Modified

- ✅ `astro.config.mjs` - Added i18n configuration
- ✅ `src/content/config.ts` - Added `lang` and `translationId` fields
- ✅ `src/pages/blog/[slug].astro` - Updated for English posts with language switching
- ✅ `src/pages/[lang]/blog/[slug].astro` - New route for non-default languages
- ✅ `src/pages/blog/index.astro` - Updated to filter by language
- ✅ `src/pages/[lang]/blog/index.astro` - New localized blog index
- ✅ `src/components/LanguageSwitcher.astro` - New component
- ✅ `src/components/BlogPostCard.astro` - Updated to support custom URLs
- ✅ `src/layouts/MainLayout.astro` - Added lang and hreflang support

## Important Notes

1. **Backward Compatibility**: Existing English posts will continue to work at `/blog/[slug]` without modification, but you should add `lang: "en"` to their frontmatter.

2. **Translation IDs**: Posts without `translationId` won't show a language switcher. This is expected behavior.

3. **Fallback Behavior**: If a translation doesn't exist, the language switcher falls back to the blog index of that language.

4. **Static Generation**: All routes are statically generated at build time. No runtime JavaScript is required.

5. **Content Collections**: The directory structure (`en/` vs `el/`) is optional. The `lang` field in frontmatter is what matters.

## Troubleshooting

### Posts not appearing in correct language
- Verify `lang` field is set correctly in frontmatter
- Check that posts are not marked as `draft: true`

### Language switcher not appearing
- Verify `translationId` is set in both versions
- Ensure both posts are published (`draft: false`)
- Check that both posts have matching `translationId` values

### Routes not generating
- Run `astro build` to see if there are any errors
- Check that `lang` field is one of: `'en'` or `'el'`
- Verify file extensions are `.mdx` or `.md`

## Next Steps

1. Migrate existing posts (add `lang` field)
2. Create Greek translations for posts you want to translate
3. Test all routes in development
4. Build and verify static generation works
5. Deploy and verify SEO tags
