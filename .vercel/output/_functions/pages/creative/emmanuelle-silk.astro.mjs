/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DSPR3m_Y.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BB2MR9BH.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
/* empty css                                              */
export { renderers } from '../../renderers.mjs';

function LightboxGallery({ items, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useMemo(
    () => items.map((it) => ({ src: it.fullSrc, alt: it.alt })),
    [items]
  );
  const openAt = useCallback((index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);
  if (!items || items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-matrix-white/60", children: "No images available" }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${className || ""}`, children: items.map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_1px_0_rgba(57,255,20,0.2),0_12px_40px_rgba(57,255,20,0.15)] transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.thumbSrc,
              alt: item.alt,
              className: "w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110",
              loading: "lazy",
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-matrix-white font-medium text-sm sm:text-base mb-2", children: item.alt }),
            /* @__PURE__ */ jsx("p", { className: "text-matrix-white/70 text-xs sm:text-sm", children: "Click to view full size" })
          ] }) }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openAt(index),
              className: "absolute inset-0 w-full h-full focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 cursor-pointer",
              "aria-label": `Open ${item.alt} in lightbox`,
              children: /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                "Open ",
                item.alt,
                " in lightbox"
              ] })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" }) }) })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        open: isOpen,
        close: () => setIsOpen(false),
        index: currentIndex,
        slides,
        plugins: [Zoom],
        zoom: {
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true
        },
        carousel: {
          finite: true,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain"
        },
        animation: {
          fade: 400,
          swipe: 500
        },
        controller: {
          closeOnBackdropClick: true,
          closeOnPullDown: true
        },
        render: {
          buttonPrev: items.length <= 1 ? () => null : void 0,
          buttonNext: items.length <= 1 ? () => null : void 0
        }
      }
    )
  ] });
}

const $$EmmanuelleSilk = createComponent(($$result, $$props, $$slots) => {
  const sources = [
    "/images/creative/emmanuelle-silk-1.png",
    "/images/creative/emmanuelle-silk-2.png",
    "/images/creative/emmanuelle-silk-3.png",
    "/images/creative/emmanuelle-silk-4.png",
    "/images/creative/emmanuelle-silk-5.png",
    "/images/creative/emmanuelle-silk-6.png",
    "/images/creative/emmanuelle-silk-7.png",
    "/images/creative/emmanuelle-silk-8.png"
  ];
  const galleryItems = sources.map((src, i) => ({
    thumbSrc: src,
    // Vercel will optimize these on-demand
    fullSrc: src,
    // Vercel will optimize these on-demand
    alt: `Emmanuelle Silk design ${i + 1}`
  }));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Emmanuelle Silk Collection", "description": "One of the first AI-driven fashion collections in Greece: an 8-piece silk scarf series.", "currentPath": "/creative/emmanuelle-silk", "data-astro-cid-wi3k7u2j": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative py-12 md:py-16 px-6 bg-gradient-to-b from-primary/5 to-transparent" data-astro-cid-wi3k7u2j> <div class="max-w-6xl mx-auto" data-astro-cid-wi3k7u2j> <a href="/creative" class="text-primary hover:underline inline-flex items-center gap-2 mb-6" data-astro-cid-wi3k7u2j>
← Back to Creative Lab
</a> <header class="mb-8 text-center" data-astro-cid-wi3k7u2j> <h1 class="font-orbitron text-4xl md:text-5xl text-primary mb-3" data-astro-cid-wi3k7u2j>Emmanuelle Silk</h1> <p class="text-muted-foreground max-w-3xl mx-auto text-center" data-astro-cid-wi3k7u2j>
Born in 2015 in northeastern Greece, Emmanuelle Silk crafts unique silk accessories for women who seek elegant distinction. <span class="text-primary" data-astro-cid-wi3k7u2j>Inspired by art's flowing lines and nature's gentle touch</span>, they maintain uncompromising quality standards while embracing innovation.
</p> </header> <div class="rounded-xl bg-card/40 border border-border/30 p-6 md:p-8 max-w-4xl mx-auto text-center mb-10" data-astro-cid-wi3k7u2j> <h2 class="font-orbitron text-primary text-xl md:text-2xl mb-3" data-astro-cid-wi3k7u2j>About The Collection</h2> <p class="text-matrix-white/85" data-astro-cid-wi3k7u2j>
In the early days of generative AI, back in 2023, Emmanuelle Silk trusted me to co-create one of Greece's first AI‑driven fashion collections. We designed a limited series of eight silk scarf artworks—entirely imagined and generated by AI. From the themes to the campaign and promotional materials, the whole journey was powered by hands‑on generative experimentation.
</p> </div> <div class="mt-8" data-astro-cid-wi3k7u2j> ${renderComponent($$result2, "LightboxGallery", LightboxGallery, { "items": galleryItems, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LightboxGallery.tsx", "client:component-export": "default", "data-astro-cid-wi3k7u2j": true })} </div> </div> </section> ` })} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/emmanuelle-silk.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/emmanuelle-silk.astro";
const $$url = "/creative/emmanuelle-silk";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$EmmanuelleSilk,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
