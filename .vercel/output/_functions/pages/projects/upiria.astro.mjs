/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_oRAxjIhj.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CQJIJsth.mjs';
import { $ as $$GlassCard, a as $$ScreenshotFrame, b as $$NeonCTA } from '../../chunks/ScreenshotFrame_CMREWrCC.mjs';
import { g as getCollection } from '../../chunks/_astro_content_C41yBsGA.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Upiria = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  const project = projects.find((p) => p.slug === "upiria");
  if (!project) {
    throw new Error('Project "upiria" not found in content collection.');
  }
  const data = project.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${data.title} - Case Study`, "description": data.description, "currentPath": "/projects/upiria", "type": "article", "publishedAt": new Date(data.publishedAt).toISOString(), "updatedAt": data.updatedAt ? new Date(data.updatedAt).toISOString() : void 0, "author": "Vasileios Politeiadis", "image": data.coverImage || "/src/assets/images/vp-logo.png", "data-astro-cid-k7jltkiy": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['  <script type="application/ld+json" src="/structured/project/upiria.json"><\/script> ', '<section class="bg-matrix-black text-matrix-white" data-astro-cid-k7jltkiy> <section class="relative py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8" data-astro-cid-k7jltkiy> <div class="max-w-5xl mx-auto" data-astro-cid-k7jltkiy> <!-- Back Button --> <div class="mb-6" data-astro-cid-k7jltkiy> <a href="/projects" class="inline-flex items-center text-neon-lime hover:text-matrix-white transition-colors" aria-label="Back to Projects" data-astro-cid-k7jltkiy> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-astro-cid-k7jltkiy> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-k7jltkiy></path> </svg>\nBack to Projects\n</a> </div> <!-- Hero: text left, screenshot right --> <div class="grid lg:grid-cols-2 gap-8 items-start mb-8" data-astro-cid-k7jltkiy> <div data-astro-cid-k7jltkiy> <h1 class="text-3xl md:text-4xl lg:text-5xl font-orbitron neon-heading mb-3" data-astro-cid-k7jltkiy>', '</h1> <p class="text-base md:text-lg text-text-muted mb-4 max-w-2xl" data-astro-cid-k7jltkiy>\nI joined <strong data-astro-cid-k7jltkiy>Upiria</strong> at a critical early stage and bridged <strong data-astro-cid-k7jltkiy>frontend development</strong> with a <strong data-astro-cid-k7jltkiy>scalable testing framework</strong>, enabling rapid product evolution with confidence.\n</p> ', ' </div> <div class="lg:justify-self-end" data-astro-cid-k7jltkiy> ', " </div> </div> <!-- About the Project --> ", " <!-- My Contribution: two-column bullets --> ", " <!-- Intentionally no second primary CTA to avoid duplication and reduce noise --> </div> </section> </section> "])), maybeRenderHead(), data.title, data.liveUrl && renderTemplate`${renderComponent($$result2, "NeonCTA", $$NeonCTA, { "href": data.liveUrl, "ariaLabel": `View ${data.title} live`, "data-astro-cid-k7jltkiy": true }, { "default": async ($$result3) => renderTemplate`
View Live Project
` })}`, renderComponent($$result2, "ScreenshotFrame", $$ScreenshotFrame, { "src": data.coverImage ?? data.featuredImage ?? "/favicon.png", "alt": data.title, "data-astro-cid-k7jltkiy": true }), renderComponent($$result2, "GlassCard", $$GlassCard, { "class": "mb-6", "data-astro-cid-k7jltkiy": true }, { "default": async ($$result3) => renderTemplate` <p class="text-sm text-text-muted leading-relaxed" data-astro-cid-k7jltkiy>
Upiria is a digital platform that helps travel professionals and tour operators connect with global audiences. By offering booking, data insights, and loyalty tools, it enables brands to adapt to changing travel trends while keeping customers engaged.
</p> ` }), renderComponent($$result2, "GlassCard", $$GlassCard, { "class": "mb-6", "data-astro-cid-k7jltkiy": true }, { "default": async ($$result3) => renderTemplate` <div class="grid md:grid-cols-2 gap-4" data-astro-cid-k7jltkiy> <div data-astro-cid-k7jltkiy> <h2 class="text-sm font-semibold neon-heading mb-1" data-astro-cid-k7jltkiy>Frontend</h2> <ul class="list-disc pl-5 text-sm text-text-muted space-y-1" data-astro-cid-k7jltkiy> <li data-astro-cid-k7jltkiy>Built accessible, modular React components for a consistent user experience.</li> </ul> </div> <div data-astro-cid-k7jltkiy> <h2 class="text-sm font-semibold neon-heading mb-1" data-astro-cid-k7jltkiy>Testing & QA</h2> <ul class="list-disc pl-5 text-sm text-text-muted space-y-1" data-astro-cid-k7jltkiy> <li data-astro-cid-k7jltkiy>Led QA as test architect — API and end-to-end test suites with Playwright + TypeScript, integrated into CI/CD.</li> </ul> </div> </div> ` })) })} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/upiria.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/upiria.astro";
const $$url = "/projects/upiria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Upiria,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
