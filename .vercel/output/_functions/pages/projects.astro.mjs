/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, f as addAttribute, i as spreadAttributes, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_oRAxjIhj.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CQJIJsth.mjs';
import 'clsx';
import { C as Card, c as CardContent, b as CardTitle, e as CardDescription } from '../chunks/card_D2wKyJ59.mjs';
import { B as Badge } from '../chunks/badge_BCuiEq3Z.mjs';
/* empty css                                 */
import { $ as $$PageHero } from '../chunks/PageHero_BjE41jxl.mjs';
import { g as getCollection } from '../chunks/_astro_content_C41yBsGA.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://vpoliteiadis.com");
const $$VercelImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VercelImage;
  const props = Astro2.props;
  const {
    src,
    alt = "",
    width = 1200,
    height = 800,
    quality = 80,
    class: className = "",
    sizes = "100vw",
    loading = "lazy",
    decoding = "async",
    fetchpriority = "auto",
    format = "auto",
    placeholder = "none",
    blurDataURL = ""
  } = props;
  let optimizedURL = src;
  if (src.startsWith("/images/")) {
    const site = typeof Astro2 !== "undefined" && Astro2.site ? String(Astro2.site) : "https://vpoliteiadis.com";
    const absoluteSrc = `${site.replace(/\/$/, "")}${src}`;
    const params = new URLSearchParams({
      url: absoluteSrc,
      w: width.toString(),
      q: quality.toString(),
      f: format === "auto" ? "webp" : format
    });
    optimizedURL = `/_vercel/image?${params.toString()}`;
  }
  const isDecorative = (alt || "").trim() === "";
  const responsiveAttributes = {
    // Modern responsive image attributes
    "data-loading": loading,
    "data-decoding": decoding,
    "data-fetchpriority": fetchpriority,
    // Performance optimizations
    "data-format": format,
    "data-placeholder": placeholder
  };
  if (blurDataURL) {
    responsiveAttributes["data-blur"] = blurDataURL;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(optimizedURL, "src")}${addAttribute(alt, "alt")}${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(className, "class")}${addAttribute(sizes, "sizes")}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${addAttribute(fetchpriority, "fetchpriority")}${addAttribute(isDecorative ? "true" : void 0, "aria-hidden")}${addAttribute(isDecorative ? "presentation" : void 0, "role")}${spreadAttributes(responsiveAttributes)}>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/VercelImage.astro", void 0);

const $$Astro = createAstro("https://vpoliteiadis.com");
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { project, index = 0 } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "group relative glass-card glass-card-accent rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-neon-lg hover:border-primary/60 reveal border-primary/20 flex flex-col h-full project-card", "style": { transitionDelay: `${index * 80}ms` }, "data-testid": `project-card-${project.slug}`, "data-astro-cid-mspuyifq": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-cyber-gray to-dark-slate" data-astro-cid-mspuyifq> <!-- Responsive background pattern for loading state --> <div class="absolute inset-0 bg-matrix-pattern opacity-5" data-astro-cid-mspuyifq></div> <!-- Cover Image/Video with proper aspect ratio --> ${project.data.coverVideo ? renderTemplate`<video class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" autoplay muted loop playsinline preload="metadata"${addAttribute(project.data.coverImage, "poster")}${addAttribute(`${project.data.title} preview video`, "aria-label")} data-astro-cid-mspuyifq> <source${addAttribute(project.data.coverVideo, "src")} type="video/mp4" data-astro-cid-mspuyifq> <!-- Fallback image if video fails --> ${renderComponent($$result2, "VercelImage", $$VercelImage, { "src": project.data.coverImage, "alt": `${project.data.title} cover image`, "class": "w-full h-full object-cover", "loading": "lazy", "decoding": "async", "fetchpriority": "low", "sizes": "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw", "data-astro-cid-mspuyifq": true })} </video>` : renderTemplate`${renderComponent($$result2, "VercelImage", $$VercelImage, { "src": project.data.coverImage, "alt": `${project.data.title} project cover image`, "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 project-cover-image", "loading": "lazy", "decoding": "async", "fetchpriority": "low", "sizes": "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw", "data-astro-cid-mspuyifq": true })}`} <!-- Gradient overlay for better text readability --> <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" data-astro-cid-mspuyifq></div> <!-- Subtle border glow effect --> <div class="absolute inset-0 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300 pointer-events-none" data-astro-cid-mspuyifq></div> </div>  <div class="flex-1 flex flex-col p-6" data-astro-cid-mspuyifq> <!-- Header --> <div class="mb-4" data-astro-cid-mspuyifq> <h3${addAttribute(`proj-${project.slug}-title`, "id")} class="text-xl font-orbitron neon-heading text-primary mb-3" data-astro-cid-mspuyifq> ${project.data.title} </h3> <p class="text-sm text-text-muted leading-relaxed line-clamp-3" data-astro-cid-mspuyifq> ${project.slug === "upiria" ? "Built a scalable frontend and testing foundation at an early stage of a fast-growing travel startup." : project.slug === "casa-capoeira" ? "Created a fast, reliable CMS to help capoeira schools manage classes, payments, and community with ease." : project.data.excerpt || project.data.description} </p> </div> <!-- Enhanced Metadata --> <div class="rounded-lg border border-primary/30 bg-card/40 p-4 mb-6 backdrop-blur-sm flex-1" data-astro-cid-mspuyifq> <div class="text-xs font-mono text-matrix-white/80 tracking-tight" data-astro-cid-mspuyifq> <div class="flex items-center gap-2 mb-3" data-astro-cid-mspuyifq> <span class="text-neon-lime/90 font-semibold" data-astro-cid-mspuyifq>Focus:</span> ${renderComponent($$result2, "Badge", Badge, { "variant": "outline", "className": "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 text-xs", "data-astro-cid-mspuyifq": true }, { "default": ($$result3) => renderTemplate`${project.data.role ?? (project.slug === "upiria" ? "Frontend + QA" : "Full\u2011Stack + Product")}` })} </div> <div class="h-px bg-primary/20 mb-3" data-astro-cid-mspuyifq></div> <div class="flex items-center gap-2" data-astro-cid-mspuyifq> <span class="text-neon-lime/90 font-semibold" data-astro-cid-mspuyifq>Tech:</span> <div class="flex flex-wrap gap-1.5" data-astro-cid-mspuyifq> ${project.data.techStack.slice(0, 3).map((tech) => renderTemplate`${renderComponent($$result2, "Badge", Badge, { "variant": "secondary", "className": "bg-secondary/20 border-secondary/30 text-secondary hover:bg-secondary/30 hover:border-secondary/50 text-xs", "data-astro-cid-mspuyifq": true }, { "default": ($$result3) => renderTemplate`${tech}` })}`)} </div> </div> </div> </div> <!-- Enhanced Action Buttons --> <div class="flex gap-3 mt-auto" data-astro-cid-mspuyifq> <!-- Learn More Button --> <a${addAttribute(`/projects/${project.slug}`, "href")}${addAttribute(`Read case study: ${project.data.title}`, "aria-label")} class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border-2 border-primary/60 text-primary hover:bg-primary/20 hover:border-primary/80 transition-all duration-300 group min-h-[44px]"${addAttribute(`project-card-learn-more-${project.slug}`, "data-testid")} data-astro-cid-mspuyifq> <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-mspuyifq> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-astro-cid-mspuyifq></path> </svg>
Learn More
</a> <!-- View Live Button --> ${project.data.liveUrl && renderTemplate`<a${addAttribute(project.data.liveUrl, "href")}${addAttribute(`Visit live project: ${project.data.title}`, "aria-label")} class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-neon transition-all duration-300 group min-h-[44px]"${addAttribute(`project-card-view-live-${project.slug}`, "data-testid")} data-astro-cid-mspuyifq> <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-mspuyifq> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-mspuyifq></path> </svg>
View Live
</a>`} </div> </div> ` })} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/ProjectCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  const sortedProjects = projects.sort(
    (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
  );
  const featuredProjects = sortedProjects.filter((project) => project.data.featured);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Projects - Vasileios Politeiadis", "description": "Explore my latest projects and case studies in full-stack development, automation, and creative technology.", "currentPath": "/projects", "bgSlug": "projects-bg", "bgEager": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen text-matrix-white pb-16 sm:pb-20 md:pb-24" data-testid="page-projects"> ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Projects", "description": "Exploring the intersection of technology and creativity through full-stack development, automation engineering, and AI-driven solutions.", "eager": true })} <section class="px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <!-- Featured Projects Section - Responsive Grid --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8" data-testid="projects-grid"> ${featuredProjects.map((project, idx) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "project": project, "index": idx })}`)} </div> <!-- No Projects State --> ${featuredProjects.length === 0 && renderTemplate`${renderComponent($$result2, "Card", Card, { "className": "glass-card glass-card-accent border-primary/20 backdrop-blur-md" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardContent", CardContent, { "className": "text-center py-16" }, { "default": async ($$result4) => renderTemplate` <div class="space-y-4"> <div class="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center"> <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path> </svg> </div> ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-xl text-matrix-white/80" }, { "default": async ($$result5) => renderTemplate`No featured projects available` })} ${renderComponent($$result4, "CardDescription", CardDescription, { "className": "text-matrix-white/60" }, { "default": async ($$result5) => renderTemplate`
Check back soon for new case studies and project showcases!
` })} </div> ` })} ` })}`} </div> </section> </section>` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/index.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
