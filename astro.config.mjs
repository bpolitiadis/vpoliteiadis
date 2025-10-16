// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Try with explicit Vercel configuration
export default defineConfig({
  site: 'https://vpoliteiadis.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
    isr: false,
  }),
});
