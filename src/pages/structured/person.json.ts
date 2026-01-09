import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? 'https://vpoliteiadis.dev';
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vasileios Politeiadis',
    url: siteUrl,
    // VP logo for brand identity in structured data
    image: `${siteUrl}/images/vp-logo-800w.webp`,
    sameAs: [
      'https://www.linkedin.com/in/vasileios-politeiadis/',
      'https://github.com/bpolitiadis',
    ],
    jobTitle: 'QA Automation Specialist & Full-Stack Developer',
    description:
      'QA Automation Specialist & Full-Stack Developer specializing in Java automation frameworks, React/Next.js development, and AI-powered solutions for quality assurance and modern web applications.',
    knowsAbout: [
      'Full-Stack Development',
      'Website Development',
      'QA Automation',
      'AI & Creative Technology',
      'React',
      'Next.js',
      'Astro',
      'TailwindCSS',
      'Node.js',
      'Java',
      'Selenium',
      'Playwright',
      'European Commission Projects',
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


