// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';

// https://astro.build/config
export default defineConfig({
  site: 'https://vpoliteiadis.com',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
    react(),
    tailwind(),
  ],
  build: {
    // Optimize asset handling
    assets: '_astro',
    // Inline critical stylesheets automatically
    inlineStylesheets: 'always',
    // Use directory-style URLs so static hosts (like Vercel) can resolve routes
    // e.g. /about -> /about/index.html instead of /about.html
    format: 'directory'
  },
  vite: {
    server: {
      fs: { strict: true }
    },
    css: {
      // Ensure CSS is minimized and deduped
      devSourcemap: false,
    },
    build: {
      // Enable minification (use Vite defaults)
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            astro: ['astro:assets']
          }
        }
      }
    },
    // Use project-level PostCSS config (postcss.config.js)
  }
});
