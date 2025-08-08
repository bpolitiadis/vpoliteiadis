import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vasileios Politeiadis',
    url: 'https://vpoliteiadis.com',
    description: 'Full-Stack Developer & AI Visionary portfolio',
    author: {
      '@type': 'Person',
      name: 'Vasileios Politeiadis',
    },
    publisher: {
      '@type': 'Person',
      name: 'Vasileios Politeiadis',
    },
  } as const;

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};


