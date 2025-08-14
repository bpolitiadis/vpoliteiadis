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
  // Rely on Astro 5+ defaults for build and Vite configuration.
  // Defaults already include: hashed assets in `/_astro`,
  // directory-style URLs, CSS/JS minification and optimal code-splitting.
});
