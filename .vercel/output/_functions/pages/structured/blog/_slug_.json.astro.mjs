import { g as getCollection } from '../../../chunks/_astro_content_DGsqosVy.mjs';
export { renderers } from '../../../renderers.mjs';

async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.filter((p) => !p.data.draft).map((p) => ({ params: { slug: p.slug } }));
}
const GET = async ({ params }) => {
  const slug = params.slug;
  const posts = await getCollection("blog");
  const post = posts.find((p) => p.slug === slug && !p.data.draft);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const publishedDate = new Date(post.data.publishedAt).toISOString();
  const modifiedDate = post.data.updatedAt ? new Date(post.data.updatedAt).toISOString() : publishedDate;
  const payload = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    author: { "@type": "Person", name: post.data.author },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    publisher: { "@type": "Person", name: "Vasileios Politeiadis" },
    keywords: (post.data.seo?.keywords || post.data.tags).join(", "),
    image: post.data.coverImage ? `https://vpoliteiadis.com${post.data.coverImage}` : void 0,
    url: `https://vpoliteiadis.com/blog/${post.slug}`
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
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
