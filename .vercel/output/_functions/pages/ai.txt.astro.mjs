export { renderers } from '../renderers.mjs';

const GET = ({ site }) => {
  const origin = site?.toString().replace(/\/?$/, "") ?? "https://vpoliteiadis.com";
  const body = [
    "# ai.txt — AI crawling and usage policy",
    `# Site: ${origin}`,
    "",
    "# Indexing",
    "Allow: *",
    "",
    "# Attribution",
    "Require-Attribution: true",
    "",
    "# Rate limits",
    "Crawl-Delay: 1",
    "",
    "# Contact",
    "Contact: mailto:b.politiadis@gmail.com",
    "",
    "# Notes",
    "Purpose: Permit AI crawlers to index public pages and snippets with attribution. No PII is published."
  ].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
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
