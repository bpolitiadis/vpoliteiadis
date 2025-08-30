# 🏷️ Structured Data (JSON-LD) Endpoints

**Status:** ✅ **FULLY FUNCTIONAL**  
**Last Updated:** August 30, 2025  
**Implementation:** Static JSON-LD generation with Astro content collections

## 🚀 Overview

This project provides comprehensive structured data endpoints that generate valid JSON-LD markup for all content types. These endpoints are automatically generated during the build process and provide rich metadata for search engines, social media platforms, and AI crawlers.

## 🛠️ Technical Implementation

### Architecture

- **Static Generation:** All endpoints are pre-rendered at build time
- **Content Collections:** Data sourced from Astro content collections
- **Schema.org Compliance:** Full adherence to schema.org standards
- **Type Safety:** TypeScript interfaces ensure data consistency

### Endpoint Structure

```
/structured/
├── person.json                    # Personal profile data
├── website.json                   # Website metadata
├── blog/[slug].json              # Blog post structured data
└── project/[slug].json           # Project case study data
```

## 📊 Endpoint Details

### 1. Person Profile (`/structured/person.json`)

**Schema Type:** `Person`  
**Purpose:** Personal professional information for search engines and social platforms

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vasileios Politeiadis",
  "url": "https://vpoliteiadis.com",
  "image": "https://vpoliteiadis.com/images/vp-logo-800.webp",
  "sameAs": [
    "https://linkedin.com/in/vpoliteiadis",
    "https://github.com/bpolitiadis"
  ],
  "jobTitle": "Full-Stack Developer & AI Visionary",
  "worksFor": {
    "@type": "Organization",
    "name": "European Commission"
  },
  "description": "Full-Stack Developer & AI Visionary specializing in modern web technologies, automation, and creative AI applications.",
  "knowsAbout": [
    "Full-Stack Development",
    "QA Automation",
    "AI & Creative Technology",
    "React",
    "Next.js",
    "Node.js",
    "Java",
    "Selenium",
    "Playwright"
  ]
}
```

### 2. Website Metadata (`/structured/website.json`)

**Schema Type:** `WebSite`  
**Purpose:** Site-wide metadata and publisher information

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vasileios Politeiadis",
  "url": "https://vpoliteiadis.com",
  "description": "Full-Stack Developer & AI Visionary portfolio",
  "inLanguage": "en",
  "author": {
    "@type": "Person",
    "name": "Vasileios Politeiadis"
  },
  "publisher": {
    "@type": "Person",
    "name": "Vasileios Politeiadis"
  }
}
```

### 3. Blog Posts (`/structured/blog/[slug].json`)

**Schema Type:** `BlogPosting`  
**Purpose:** Individual blog post metadata for SEO and social sharing

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Bitcoin & The Decentralized Revolution: A Journey Through Money, Freedom, and the Future",
  "description": "Explore the history, philosophy, and future of Bitcoin - from its origins as digital gold to its role in the decentralized revolution reshaping money and freedom.",
  "author": {
    "@type": "Person",
    "name": "Vasileios Politeiadis"
  },
  "datePublished": "2025-08-09T00:00:00.000Z",
  "dateModified": "2025-08-09T00:00:00.000Z",
  "publisher": {
    "@type": "Person",
    "name": "Vasileios Politeiadis"
  },
  "keywords": "Bitcoin, cryptocurrency, decentralization, finance, economics, digital currency",
  "image": "https://vpoliteiadis.com/images/blog/bitcoin-revolution-cover.jpg",
  "url": "https://vpoliteiadis.com/blog/bitcoin-decentralized-revolution"
}
```

### 4. Project Case Studies (`/structured/project/[slug].json`)

**Schema Type:** `CreativeWork` with `SoftwareApplication` main entity  
**Purpose:** Project portfolio metadata for professional showcase

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Casa Capoeira",
  "description": "Focused CMS for capoeira academies with scheduling, enrollment, payments, and community.",
  "author": {
    "@type": "Person",
    "name": "Vasileios Politeiadis"
  },
  "datePublished": "2025-08-01T00:00:00.000Z",
  "dateModified": "2025-08-02T00:00:00.000Z",
  "keywords": "CMS, Education, Community, Full-Stack, SaaS",
  "image": "https://vpoliteiadis.com/images/casa-capoeira-cover.png",
  "url": "https://vpoliteiadis.com/projects/casa-capoeira",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Casa Capoeira",
    "description": "Focused CMS for capoeira academies with scheduling, enrollment, payments, and community.",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web Browser",
    "url": "https://vpoliteiadis.com/projects/casa-capoeira",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
}
```

## 🔧 Implementation Details

### File Structure

```
src/pages/structured/
├── person.json.ts                 # Static person data
├── website.json.ts                # Static website data
├── blog/[slug].json.ts            # Dynamic blog data
└── project/[slug].json.ts         # Dynamic project data
```

### Key Features

1. **Static Generation:** All endpoints pre-rendered at build time
2. **Content Integration:** Automatic data extraction from MDX frontmatter
3. **Type Safety:** Full TypeScript support with Zod schema validation
4. **SEO Optimization:** Rich metadata for search engines
5. **Social Media Ready:** Open Graph compatible structured data

### Build Process

The structured data endpoints are automatically generated during the build process:

```bash
pnpm build  # Generates all structured data endpoints
```

Build output shows successful generation:
```
λ src/pages/structured/blog/[slug].json.ts
  ├─ /structured/blog/bitcoin-decentralized-revolution.json (+1ms)
  ├─ /structured/blog/casa-capoeira-journey.json (+1ms)
  └─ /structured/blog/prompt-engineering-mastery.json (+0ms)
λ src/pages/structured/person.json.ts
  └─ /structured/person.json (+0ms)
λ src/pages/structured/project/[slug].json.ts
  ├─ /structured/project/casa-capoeira.json (+1ms)
  └─ /structured/project/upiria.json (+1ms)
λ src/pages/structured/website.json.ts
  └─ /structured/website.json (+1ms)
```

## 📱 Usage Examples

### SEO Integration

Add structured data to your HTML pages:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vasileios Politeiadis"
    // ... rest of person data
  }
</script>
```

### API Consumption

Consume structured data programmatically:

```javascript
// Fetch person data
const personData = await fetch('/structured/person.json')
  .then(res => res.json());

// Fetch specific blog post data
const blogData = await fetch('/structured/blog/bitcoin-decentralized-revolution.json')
  .then(res => res.json());

// Fetch specific project data
const projectData = await fetch('/structured/project/casa-capoeira.json')
  .then(res => res.json());
```

### Social Media Integration

The structured data is compatible with:
- **Open Graph** (Facebook, LinkedIn)
- **Twitter Cards**
- **Google Rich Snippets**
- **AI Crawlers** (GPTBot, ClaudeBot, etc.)

## 🔍 Validation & Testing

### JSON Validation

All endpoints generate valid JSON-LD:

```bash
# Validate person data
node -e "try { JSON.parse(require('fs').readFileSync('dist/structured/person.json', 'utf8')); console.log('✅ Person JSON-LD is valid'); } catch(e) { console.log('❌ Person JSON-LD error:', e.message); }"

# Validate blog data
node -e "try { JSON.parse(require('fs').readFileSync('dist/structured/blog/bitcoin-decentralized-revolution.json', 'utf8')); console.log('✅ Blog JSON-LD is valid'); } catch(e) { console.log('❌ Blog JSON-LD error:', e.message); }"

# Validate project data
node -e "try { JSON.parse(require('fs').readFileSync('dist/structured/project/casa-capoeira.json', 'utf8')); console.log('✅ Project JSON-LD is valid'); } catch(e) { console.log('❌ Project JSON-LD error:', e.message); }"
```

### Schema.org Compliance

All endpoints follow schema.org standards:
- ✅ Valid `@context` and `@type` declarations
- ✅ Proper nesting of schema types
- ✅ Required fields for each schema type
- ✅ Valid URL formats and data types

## 🚀 Performance Benefits

### SEO Impact

- **Rich Snippets:** Enhanced search result displays
- **Knowledge Graph:** Better Google understanding of content
- **Local SEO:** Improved local search visibility
- **Voice Search:** Better voice assistant compatibility

### Social Media

- **Open Graph:** Enhanced social media sharing
- **Twitter Cards:** Rich Twitter previews
- **LinkedIn:** Professional profile enhancement
- **Facebook:** Better content discovery

### AI & Crawlers

- **GPTBot:** Enhanced AI training data
- **ClaudeBot:** Better content understanding
- **Search Engines:** Improved indexing
- **Analytics:** Better content tracking

## 🔧 Configuration

### Content Collections

Structured data automatically extracts from:

- **Blog Posts:** `src/content/blog/`
- **Projects:** `src/content/projects/`
- **Creative:** `src/content/creative/`

### Schema Customization

Modify schemas in `src/content/config.ts`:

```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  // Add new fields here
  customField: z.string().optional(),
});
```

### Endpoint Customization

Modify endpoint logic in `src/pages/structured/`:

```typescript
export const GET: APIRoute = async ({ params }) => {
  // Custom logic here
  const payload = {
    // Custom structured data
  };
  
  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors:**
   ```bash
   pnpm build  # Check for compilation errors
   ```

2. **Missing Data:**
   - Verify content collection schemas
   - Check frontmatter in MDX files
   - Validate required fields

3. **Invalid JSON:**
   ```bash
   # Validate generated files
   node -e "JSON.parse(require('fs').readFileSync('dist/structured/person.json', 'utf8'));"
   ```

### Debug Mode

Add logging to endpoints:

```typescript
console.log('Processing:', params);
console.log('Generated payload:', payload);
```

## 🔮 Future Enhancements

### Potential Improvements

1. **Additional Schema Types:**
   - `Organization` for company details
   - `Event` for speaking engagements
   - `Course` for educational content

2. **Enhanced Metadata:**
   - Breadcrumb navigation
   - FAQ structured data
   - Review and rating data

3. **Dynamic Generation:**
   - Real-time data updates
   - User-generated content
   - API-driven metadata

## 📚 Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
- [CONTENT_MODEL.md](./CONTENT_MODEL.md) - Content structure
- [PAGES_ROUTES.md](./PAGES_ROUTES.md) - Route mapping

## ✅ Verification Status

- [x] **Endpoint Generation:** ✅ All endpoints build successfully
- [x] **JSON Validation:** ✅ All files are valid JSON
- [x] **Schema Compliance:** ✅ Full schema.org adherence
- [x] **Content Integration:** ✅ Automatic data extraction
- [x] **Build Integration:** ✅ Seamless build process
- [x] **Type Safety:** ✅ Full TypeScript support
- [x] **Performance:** ✅ Static generation for optimal speed

---

**Last verified:** August 30, 2025  
**Status:** Production ready and fully functional
