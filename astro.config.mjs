// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://vpoliteiadis.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx(),
    tailwind(),
  ],
  build: {
    // Optimize asset handling
    assets: '_astro',
    // Inline critical stylesheets automatically
    inlineStylesheets: 'auto'
  },
  vite: {
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
