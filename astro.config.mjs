// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
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
      // Enable minification
      minify: 'terser',
      cssMinify: true,
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['framer-motion'],
            astro: ['astro:assets']
          }
        }
      },
      // Optimize terser settings
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        mangle: {
          safari10: true
        }
      }
    },
    css: {
      // Optimize CSS processing
      postcss: {
        plugins: [
          // Autoprefixer for browser compatibility
          autoprefixer,
          // CSS minification and optimization
          cssnano({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              colormin: true,
              minifyFontValues: true,
              minifySelectors: true
            }]
          })
        ]
      }
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['framer-motion']
    },
    // Performance optimizations
    ssr: {
      noExternal: ['framer-motion']
    }
  }
});
