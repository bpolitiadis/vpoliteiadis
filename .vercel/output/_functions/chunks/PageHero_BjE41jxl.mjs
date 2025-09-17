import { b as createAstro, c as createComponent, m as maybeRenderHead, h as renderSlot, a as renderTemplate } from './astro/server_oRAxjIhj.mjs';
import 'clsx';

const $$Astro = createAstro("https://vpoliteiadis.com");
const $$PageHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHero;
  const { title, description, bgSlug, metaText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative py-8 md:py-12 overflow-hidden"> ${bgSlug && renderTemplate`<div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">   <div class="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/40"></div> </div>`} <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h1 class="text-xl sm:text-2xl md:text-4xl font-orbitron font-bold text-neon-lime mb-3 md:mb-4 tracking-tight leading-[1.15] md:leading-tight text-balance break-words hyphens-auto text-shadow-none sm:text-glow animate-fade-in"> ${title} </h1> ${description && renderTemplate`<p class="text-xs md:text-sm max-w-3xl mx-auto text-foreground/80 mb-3 md:mb-4"> ${description} </p>`} ${metaText && renderTemplate`<div class="text-foreground/60 text-sm">${metaText}</div>`} ${renderSlot($$result, $$slots["default"])} </div> </div> </section>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/PageHero.astro", void 0);

export { $$PageHero as $ };
