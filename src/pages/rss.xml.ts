import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * RSS Feed for Blog Posts
 * 
 * Generates an RSS 2.0 feed of all published blog posts.
 * Accessible at: https://vpoliteiadis.com/rss.xml
 */
export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  
  // Filter out drafts and sort by date (newest first)
  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.publishedAt).getTime() -
        new Date(a.data.publishedAt).getTime()
    );

  return rss({
    title: 'Vasileios Politeiadis - Blog',
    description:
      'Insights on QA automation, full-stack development, AI, and the intersection of technology and creativity.',
    site: context.site?.toString() ?? 'https://vpoliteiadis.com',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      pubDate: new Date(post.data.publishedAt),
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
      // Use cover image if available
      enclosure: post.data.coverImage
        ? {
            url: new URL(post.data.coverImage, context.site ?? 'https://vpoliteiadis.com').toString(),
            type: 'image/webp',
            length: 0, // Not required for RSS readers
          }
        : undefined,
    })),
    customData: `
      <language>en-us</language>
      <copyright>Copyright ${new Date().getFullYear()} Vasileios Politeiadis</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <url>https://vpoliteiadis.com/images/vp-logo-800w.webp</url>
        <title>Vasileios Politeiadis - Blog</title>
        <link>https://vpoliteiadis.com/blog</link>
      </image>
    `,
    stylesheet: false, // No XSLT stylesheet for cleaner output
  });
}

