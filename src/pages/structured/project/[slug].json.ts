import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Prerender these structured data endpoints
export const prerender = true;

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((p) => ({ params: { slug: p.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as string;
  const projects = await getCollection('projects');
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new Response('Not found', { status: 404 });
    }

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.data.title,
    description: project.data.description,
    author: { '@type': 'Person', name: 'Vasileios Politeiadis' },
    datePublished: new Date(project.data.publishedAt).toISOString(),
    dateModified: (project.data.updatedAt
      ? new Date(project.data.updatedAt)
      : new Date(project.data.publishedAt)
    ).toISOString(),
    keywords: project.data.tags.join(', '),
    image: project.data.coverImage
      ? `https://vpoliteiadis.com${project.data.coverImage}`
      : undefined,
    url: `https://vpoliteiadis.com/projects/${project.slug}`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: project.data.title,
      description: project.data.description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web Browser',
      url: `https://vpoliteiadis.com/projects/${project.slug}`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  } as const;

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};


