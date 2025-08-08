// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';

// https://astro.build/config
export default defineConfig({
  site: 'https://vpoliteiadis.com',
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
        rehypeSanitize,
      ],
    }),
    tailwind(),
  ],
  build: {
    // Optimize asset handling
    assets: '_astro',
    // Inline critical stylesheets automatically
    inlineStylesheets: 'auto',
    format: 'file'
  },
  vite: {
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
