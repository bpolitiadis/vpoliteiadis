/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_oRAxjIhj.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CQJIJsth.mjs';
import { $ as $$GlassCard, a as $$ScreenshotFrame, b as $$NeonCTA } from '../../chunks/ScreenshotFrame_CMREWrCC.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BemCumoN.mjs';
/* empty css                                            */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CasaCapoeira = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  const project = projects.find((p) => p.slug === "casa-capoeira");
  if (!project) {
    throw new Error('Project "casa-capoeira" not found in content collection.');
  }
  const data = project.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${data.title} - Case Study`, "description": data.description, "currentPath": "/projects/casa-capoeira", "type": "article", "publishedAt": new Date(data.publishedAt).toISOString(), "updatedAt": data.updatedAt ? new Date(data.updatedAt).toISOString() : void 0, "author": "Vasileios Politeiadis", "image": data.coverImage || "/src/assets/images/vp-logo.png", "data-astro-cid-hzhpwzpg": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['  <script type="application/ld+json" src="/structured/project/casa-capoeira.json"><\/script> ', '<section class="bg-matrix-black text-matrix-white" data-astro-cid-hzhpwzpg> <section class="relative py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8" data-astro-cid-hzhpwzpg> <div class="max-w-5xl mx-auto" data-astro-cid-hzhpwzpg> <!-- Back Button --> <div class="mb-6" data-astro-cid-hzhpwzpg> <a href="/projects" class="inline-flex items-center text-neon-lime hover:text-matrix-white transition-colors" aria-label="Back to Projects" data-astro-cid-hzhpwzpg> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-astro-cid-hzhpwzpg> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-hzhpwzpg></path> </svg>\nBack to Projects\n</a> </div> <!-- Hero: text left, screenshot right --> <div class="grid lg:grid-cols-2 gap-8 items-start mb-8" data-astro-cid-hzhpwzpg> <div data-astro-cid-hzhpwzpg> <h1 class="text-3xl md:text-4xl lg:text-5xl font-orbitron neon-heading mb-3" data-astro-cid-hzhpwzpg>', '</h1> <p class="text-base md:text-lg text-text-muted mb-4 max-w-2xl" data-astro-cid-hzhpwzpg>\nA tailored CMS for capoeira schools, designed with instructors to streamline scheduling, enrollment, payments, and community.\n</p> ', ' </div> <div class="lg:justify-self-end" data-astro-cid-hzhpwzpg> ', " </div> </div> <!-- About the Project --> ", " <!-- My Contribution: two-column bullets --> ", " <!-- No duplicate CTA to keep page minimal --> </div> </section> </section> "])), maybeRenderHead(), data.title, data.liveUrl && renderTemplate`${renderComponent($$result2, "NeonCTA", $$NeonCTA, { "href": data.liveUrl, "ariaLabel": `View ${data.title} live`, "data-astro-cid-hzhpwzpg": true }, { "default": async ($$result3) => renderTemplate`
View Live Project
` })}`, renderComponent($$result2, "ScreenshotFrame", $$ScreenshotFrame, { "src": data.coverImage ?? data.featuredImage ?? "/favicon.png", "alt": data.title, "data-astro-cid-hzhpwzpg": true }), renderComponent($$result2, "GlassCard", $$GlassCard, { "class": "mb-6", "data-astro-cid-hzhpwzpg": true }, { "default": async ($$result3) => renderTemplate` <p class="text-sm text-text-muted leading-relaxed" data-astro-cid-hzhpwzpg> ${data.about} </p> ` }), renderComponent($$result2, "GlassCard", $$GlassCard, { "class": "mb-6", "data-astro-cid-hzhpwzpg": true }, { "default": async ($$result3) => renderTemplate` <div class="grid md:grid-cols-2 gap-4" data-astro-cid-hzhpwzpg> <div data-astro-cid-hzhpwzpg> <h2 class="text-sm font-semibold neon-heading mb-1" data-astro-cid-hzhpwzpg>Product & UI</h2> <ul class="list-disc pl-5 text-sm text-text-muted space-y-1" data-astro-cid-hzhpwzpg> <li data-astro-cid-hzhpwzpg>Designed the domain model and UI kit, built modular React components for a cohesive experience.</li> </ul> </div> <div data-astro-cid-hzhpwzpg> <h2 class="text-sm font-semibold neon-heading mb-1" data-astro-cid-hzhpwzpg>Platform & Testing</h2> <ul class="list-disc pl-5 text-sm text-text-muted space-y-1" data-astro-cid-hzhpwzpg> <li data-astro-cid-hzhpwzpg>Implemented secure auth and RBAC; added API/E2E tests and CI gates for confident releases.</li> </ul> </div> </div> ` })) })} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/casa-capoeira.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/casa-capoeira.astro";
const $$url = "/projects/casa-capoeira";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CasaCapoeira,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
