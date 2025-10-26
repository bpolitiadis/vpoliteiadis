import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vasileios Politeiadis',
    url: 'https://vpoliteiadis.com',
    // Use an existing small, optimized asset to avoid 404s
    image: 'https://vpoliteiadis.com/images/vp-logo-800.webp',
    sameAs: [
      'https://www.linkedin.com/in/vasileios-politeiadis/',
      'https://github.com/bpolitiadis',
    ],
    jobTitle: 'Full-Stack Developer & AI Visionary',
    worksFor: {
      '@type': 'Organization',
      name: 'European Commission',
    },
    description:
      'Full-Stack Developer & AI Visionary specializing in modern web technologies, automation, and creative AI applications.',
    knowsAbout: [
      'Full-Stack Development',
      'QA Automation',
      'AI & Creative Technology',
      'React',
      'Next.js',
      'Node.js',
      'Java',
      'Selenium',
      'Playwright',
    ],
  } as const;

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    },
  });
};


