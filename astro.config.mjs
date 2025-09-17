// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';

// Initialize server-side logging and error handling
// This must be imported at the top level to ensure global error handlers are set up
// Sentry initialization is handled in app runtime; skip importing here to avoid config-time resolution issues.

// https://astro.build/config
export default defineConfig({
  site: 'https://vpoliteiadis.com',
  output: 'hybrid',
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  // Vite optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-progress', '@radix-ui/react-select', '@radix-ui/react-slot'],
            'animation-vendor': ['gsap', 'motion'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom sitemap entries for better SEO
      customPages: [
        'https://vpoliteiadis.com/',
        'https://vpoliteiadis.com/about',
        'https://vpoliteiadis.com/projects',
        'https://vpoliteiadis.com/blog',
        'https://vpoliteiadis.com/creative',
        'https://vpoliteiadis.com/contact',
      ],
      // Enhanced sitemap configuration
      filter: (page) => {
        // Include all main pages
        if (page.includes('/about') || page.includes('/projects') || page.includes('/blog') || page.includes('/creative') || page.includes('/contact')) {
          return true;
        }
        // Include blog posts with higher priority
        if (page.includes('/blog/')) {
          return true;
        }
        // Include project pages with higher priority
        if (page.includes('/projects/')) {
          return true;
        }
        // Include creative project pages
        if (page.includes('/creative/')) {
          return true;
        }
        // Exclude admin, private, and system pages
        if (page.includes('/admin/') || page.includes('/private/') || page.includes('/api/') || page.includes('/_astro/')) {
          return false;
        }
        return true;
      },
    }),
    mdx({
      // Sanitize any raw HTML in Markdown/MDX and force external links to be safe
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer', 'nofollow'] },
        ],
        [
          rehypeSanitize,
          {
            tagNames: [
              'a','b','blockquote','br','code','em','h1','h2','h3','h4','h5','h6','hr','i','img','li','ol','p','pre','strong','ul','table','thead','tbody','tr','th','td'
            ],
            attributes: {
              a: ['href','title','rel','target'],
              img: ['src','alt','title','width','height','loading','decoding'],
              code: ['className'],
              '*': ['className']
            },
            clobberPrefix: 'mdx-',
            allowComments: false,
            allowDoctypes: false,
          }
        ],
      ],
    }),
    react({
      // React optimization settings
      include: ['**/*.{tsx,jsx}'],
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
  // Rely on Astro 5+ defaults for build and Vite configuration.
  // Defaults already include: hashed assets in `/_astro`,
  // directory-style URLs, CSS/JS minification and optimal code-splitting.
});
