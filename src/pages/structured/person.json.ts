import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vasileios Politeiadis',
    url: 'https://vpoliteiadis.com',
    // VP logo for brand identity in structured data
    image: 'https://vpoliteiadis.com/images/vp-logo-800w.webp',
    sameAs: [
      'https://www.linkedin.com/in/vasileios-politeiadis/',
      'https://github.com/bpolitiadis',
    ],
    jobTitle: 'Freelance QA Automation Specialist & Full-Stack Developer',
    description:
      'Freelance Full-Stack Developer & QA Automation Specialist specializing in modern web technologies, test automation frameworks, and creative AI applications. Available for projects and consulting.',
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


