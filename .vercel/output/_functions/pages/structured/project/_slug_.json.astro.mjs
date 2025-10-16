import { g as getCollection } from '../../../chunks/_astro_content_DDGfzFtE.mjs';
export { renderers } from '../../../renderers.mjs';

async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((p) => ({ params: { slug: p.slug } }));
}
const GET = async ({ params }) => {
  const slug = params.slug;
  const projects = await getCollection("projects");
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new Response("Not found", { status: 404 });
  }
  const payload = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.data.title,
    description: project.data.description,
    author: { "@type": "Person", name: "Vasileios Politeiadis" },
    datePublished: new Date(project.data.publishedAt).toISOString(),
    dateModified: (project.data.updatedAt ? new Date(project.data.updatedAt) : new Date(project.data.publishedAt)).toISOString(),
    keywords: project.data.tags.join(", "),
    image: project.data.coverImage ? `https://vpoliteiadis.com${project.data.coverImage}` : void 0,
    url: `https://vpoliteiadis.com/projects/${project.slug}`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: project.data.title,
      description: project.data.description,
      applicationCategory: "WebApplication",
      operatingSystem: "Web Browser",
      url: `https://vpoliteiadis.com/projects/${project.slug}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    }
  };
  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
