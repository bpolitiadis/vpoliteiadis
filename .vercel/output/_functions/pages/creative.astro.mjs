/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DSPR3m_Y.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_BB2MR9BH.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_-Sgjb316.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
export { renderers } from '../renderers.mjs';

function OptimizedImage(props) {
  const { src, width = 1200, quality = 75, ...rest } = props;
  let optimizedSrc = src;
  if (typeof window !== "undefined" && true && src.startsWith("/images/")) {
    const params = new URLSearchParams({
      url: `${window.location.origin}${src}`,
      w: width.toString(),
      q: quality.toString(),
      f: "webp"
    });
    optimizedSrc = `/_vercel/image?${params.toString()}`;
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: optimizedSrc,
      loading: rest.loading ?? "lazy",
      decoding: rest.decoding ?? "async",
      ...rest
    }
  );
}

function FeaturedProjectCard({
  title,
  role,
  description,
  hero,
  heroFit = "cover",
  detailUrl,
  cta,
  spotifyEmbed,
  logoSrc
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      "aria-label": `Open ${title} details`,
      className: "relative h-full flex flex-col rounded-2xl border border-border/40 bg-[rgba(10,10,10,0.6)] shadow-inner\n                 backdrop-blur-md transition-transform duration-300 hover:border-primary hover:shadow-neon hover:scale-[1.02]\n                 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
      "data-testid": `featured-project-card-${title.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxs("a", { href: detailUrl, className: "relative overflow-hidden rounded-t-2xl aspect-video bg-dark-slate/60 block", "aria-label": `Open ${title} details`, "data-testid": `featured-project-hero-${title.toLowerCase().replace(/\s+/g, "-")}`, children: [
          /* @__PURE__ */ jsx(
            OptimizedImage,
            {
              src: hero,
              alt: title,
              className: `w-full h-full ${heroFit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 group-hover:scale-105 will-change-transform`,
              width: 1280
            }
          ),
          logoSrc && heroFit === "cover" && /* @__PURE__ */ jsx(
            "img",
            {
              src: logoSrc,
              alt: `${title} logo`,
              className: "absolute left-4 top-4 h-12 w-12 rounded-md border border-border/40 bg-background/70 p-1 shadow-neon backdrop-blur-xs",
              loading: "lazy",
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-7 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-orbitron text-primary text-xl md:text-2xl mb-2", children: /* @__PURE__ */ jsx("a", { href: detailUrl, className: "hover:underline", children: title }) }),
          /* @__PURE__ */ jsx("p", { className: "text-matrix-white text-sm md:text-base opacity-90 mb-3", children: role }),
          /* @__PURE__ */ jsx("p", { className: "text-matrix-white/90 text-sm leading-relaxed line-clamp-3 mb-5", children: description }),
          spotifyEmbed && /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg overflow-hidden border border-border/30", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              style: { borderRadius: 12 },
              src: spotifyEmbed,
              width: "100%",
              height: 152,
              allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
              loading: "lazy",
              title: "Spotify Player"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 flex items-center justify-center gap-3", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: cta.href,
              target: cta.external ? "_blank" : void 0,
              rel: cta.external ? "noopener noreferrer" : void 0,
              className: "inline-flex items-center px-6 py-3 bg-primary text-background hover:bg-secondary\n                       transition-all duration-300 rounded-lg font-orbitron font-bold focus-visible:outline\n                       focus-visible:outline-2 focus-visible:outline-primary gap-2",
              onClick: (e) => e.stopPropagation(),
              "aria-label": cta.label,
              "data-testid": `featured-project-cta-${title.toLowerCase().replace(/\s+/g, "-")}`,
              children: [
                cta.label,
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    className: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
                      /* @__PURE__ */ jsx("path", { d: "M15 3h6v6" }),
                      /* @__PURE__ */ jsx("path", { d: "M10 14 21 3" })
                    ]
                  }
                )
              ]
            }
          ) })
        ] })
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      slug: "emmanuelle-silk",
      title: "Emmanuelle Silk",
      role: "AI Fashion Collection Design",
      description: "Designed an 8-piece silk scarf collection, imagined and generated by AI. Among the first AI-driven fashion collections in Greece.",
      hero: "/images/creative/emmanuelle-silk-logo.webp",
      // Fill the hero container for a full-bleed card look
      heroFit: "cover",
      detailUrl: "/creative/emmanuelle-silk",
      cta: {
        label: "View Collection",
        href: "https://www.emmanuellesilk.com/product-category/artificial-intelligence/",
        external: true
      }
    },
    {
      slug: "smoking-two",
      title: "Smoking Two",
      role: "Art Direction \xB7 Visual Identity",
      description: "Visual Artwork Director for album covers, social media promos, and AI-driven music videos.",
      hero: "/images/creative/s2-logo.png",
      // Full-bleed hero to avoid letterboxing
      heroFit: "cover",
      detailUrl: "/creative/smoking-two",
      cta: {
        label: "Listen on Spotify",
        href: "https://open.spotify.com/artist/3iyLSllxJjbHUi1PZOzJAm",
        external: true
      }
    },
    {
      slug: "arte-imaginari",
      title: "Arte Imaginari",
      role: "Personal Experimental AI Art Lab",
      description: "A personal lab where I test and push boundaries with new AI tools, techniques, and aesthetics.",
      hero: "/images/creative/arte-imaginari-wide.webp",
      detailUrl: "/creative/arte-imaginari",
      cta: { label: "Follow on Instagram", href: "https://instagram.com/arte.imaginari", external: true }
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Creative Lab - Vasileios Politeiadis", "description": "Explore AI-generated art, digital experiments, and creative technology projects in my Creative Lab.", "currentPath": "/creative", "bgSlug": "creative-bg", "bgEager": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen text-matrix-white" data-testid="page-creative"> ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Creative Lab", "description": "Exploring the intersection of AI, art, and technology through experimental digital creations, AI-generated imagery, and creative coding projects.", "eager": true })} <section class="px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <!-- Featured Works (3-card responsive layout) --> <div class="mb-12"> <h2 class="text-primary drop-shadow-neon text-xl md:text-2xl mb-6 uppercase tracking-widest text-center">
Featured Works
</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" data-testid="creative-projects-grid"> ${projects.map((p) => renderTemplate`${renderComponent($$result2, "FeaturedProjectCard", FeaturedProjectCard, { "client:visible": true, "title": p.title, "role": p.role, "description": p.description, "hero": p.hero, "heroFit": p.heroFit, "detailUrl": p.detailUrl, "cta": p.cta, "client:component-hydration": "visible", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/FeaturedProjectCard.tsx", "client:component-export": "default" })}`)} </div> </div> </div> </section> </section> ` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/index.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/index.astro";
const $$url = "/creative";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
