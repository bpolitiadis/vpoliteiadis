/* empty css                                 */
import { c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead, f as addAttribute, F as Fragment } from '../chunks/astro/server_oRAxjIhj.mjs';
import { g as getCollection } from '../chunks/_astro_content_BemCumoN.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CQJIJsth.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_BjE41jxl.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const posts = allPosts.filter((post) => !post.data.draft).sort(
    (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
  );
  const title = "Blog - Vasileios Politeiadis";
  const description = "Insights on technology, creativity, and the intersection of human and artificial intelligence.";
  return renderTemplate(_a || (_a = __template(["", ' <script src="/scripts/blog-index.js" defer><\/script>'])), renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "currentPath": "/blog", "bgSlug": "blog-bg", "bgEager": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative content-visibility-auto" data-testid="page-blog"> ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Blog", "description": "Insights on technology, creativity, and the intersection of human and artificial intelligence.", "eager": true })} <!-- Blog Content --> <section class="py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Minimalist List --> <!-- All Posts --> <div class="mb-16"> <h2 class="text-2xl font-orbitron font-bold text-secondary mb-8">
📝 All Posts
</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="posts-grid" data-testid="blog-posts-grid"> ${posts.map((post) => renderTemplate`<article class="card group hover:scale-[1.02] transition-transform duration-300 bg-card/80 backdrop-blur-md"${addAttribute(post.data.title, "data-title")}${addAttribute(post.data.excerpt || post.data.description, "data-excerpt")}${addAttribute(post.data.tags.join(","), "data-tags")}${addAttribute(`blog-post-${post.slug}`, "data-testid")}> ${post.data.coverImage && renderTemplate`<div class="mb-4"> <img${addAttribute(post.data.coverImage, "src")}${addAttribute(`Cover image for ${post.data.title}`, "alt")} class="w-full h-40 object-cover rounded-lg" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 400px"> </div>`} <div class="space-y-3"> <div class="flex items-center space-x-4 text-sm text-matrix-white/80"> <span>${new Date(post.data.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span> ${post.data.readingTime && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span>•</span> <span>${post.data.readingTime}</span> ` })}`} </div> <h3 class="text-lg sm:text-xl font-orbitron font-bold text-neon-lime tracking-tight text-balance break-words hyphens-auto"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="hover:text-glow transition-all duration-300"> ${post.data.title} </a> </h3> <p class="text-matrix-white/80 mb-4"> ${post.data.excerpt || post.data.description} </p> <div class="flex flex-wrap gap-2 mb-4"> ${post.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">${tag}</span>`)} </div> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-primary hover:text-glow transition-all duration-300"${addAttribute(`blog-post-link-${post.slug}`, "data-testid")}>
Read More →
</a> </div> </article>`)} </div> <!-- No Results Message --> <div id="no-results" class="hidden text-center py-12" aria-live="polite"> <div class="text-6xl mb-4">🔍</div> <h3 class="text-xl font-orbitron font-bold text-matrix-white/60 mb-2">
No articles found
</h3> <p class="text-matrix-white/60">
Try a different search or clear the tag filter
</p> </div> </div> <!-- Newsletter Signup --> <div class="card" data-testid="newsletter-signup"> <div class="text-center"> <h2 class="text-2xl font-orbitron font-bold text-neon-lime mb-4">
📧 Stay Updated
</h2> <p class="text-matrix-white/90 mb-6 max-w-2xl mx-auto">
Get notified when I publish new articles about technology, creativity, and AI. 
            No spam, just valuable insights delivered to your inbox.
</p> <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"> <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 bg-cyber-gray border border-neon-lime/20 rounded-lg text-matrix-white placeholder-matrix-white/50 focus:border-neon-lime/50 focus:outline-none" aria-label="Email address for newsletter subscription" data-testid="newsletter-email-input"> <button class="btn-primary whitespace-nowrap" data-testid="newsletter-subscribe-button">
Subscribe
</button> </div> </div> </div> </div> </section> </div> ` }));
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/blog/index.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
