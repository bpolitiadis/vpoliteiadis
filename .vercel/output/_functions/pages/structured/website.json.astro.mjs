export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vasileios Politeiadis",
    url: "https://vpoliteiadis.com",
    description: "Full-Stack Developer & AI Visionary portfolio",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Vasileios Politeiadis"
    },
    publisher: {
      "@type": "Person",
      name: "Vasileios Politeiadis"
    }
  };
  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
