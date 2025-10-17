import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Prerender these structured data endpoints
export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts
    .filter((p) => !p.data.draft)
    .map((p) => ({ params: { slug: p.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as string;
  const posts = await getCollection('blog');
  const post = posts.find((p) => p.slug === slug && !p.data.draft);
  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const publishedDate = new Date(post.data.publishedAt).toISOString();
  const modifiedDate = post.data.updatedAt
    ? new Date(post.data.updatedAt).toISOString()
    : publishedDate;

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    author: { '@type': 'Person', name: post.data.author },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    publisher: { '@type': 'Person', name: 'Vasileios Politeiadis' },
    keywords: (post.data.seo?.keywords || post.data.tags).join(', '),
    image: post.data.coverImage
      ? `https://vpoliteiadis.com${post.data.coverImage}`
      : undefined,
    url: `https://vpoliteiadis.com/blog/${post.slug}`,
  } as const;

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    },
  });
};


