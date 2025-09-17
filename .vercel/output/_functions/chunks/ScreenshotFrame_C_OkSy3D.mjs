import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, f as renderSlot, a as renderTemplate } from './astro/server_DSPR3m_Y.mjs';
import 'clsx';
/* empty css                                 */

const $$Astro$2 = createAstro("https://vpoliteiadis.com");
const $$GlassCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$GlassCard;
  const { class: className = "", accent = true, ariaLabel } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`glass-card ${accent ? "glass-card-accent" : ""} ${className}`, "class")}${addAttribute(ariaLabel, "aria-label")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/GlassCard.astro", void 0);

const $$Astro$1 = createAstro("https://vpoliteiadis.com");
const $$NeonCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NeonCTA;
  const {
    href,
    text,
    class: className = "",
    ariaLabel,
    target = "_self",
    rel = "noopener noreferrer"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`neon-cta ripple ${className}`, "class")}${addAttribute(ariaLabel || text, "aria-label")}${addAttribute(target, "target")}${addAttribute(rel, "rel")} data-astro-cid-xrl4ayi2> ${renderSlot($$result, $$slots["default"], renderTemplate`${text}`)} <!-- External icon --> <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-astro-cid-xrl4ayi2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-xrl4ayi2></path> </svg> </a> `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/NeonCTA.astro", void 0);

const $$Astro = createAstro("https://vpoliteiadis.com");
const $$ScreenshotFrame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ScreenshotFrame;
  const {
    src,
    alt,
    class: className = "",
    eager = true,
    width,
    height
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`holo-frame ${className}`, "class")}> <img${addAttribute(src, "src")}${addAttribute(alt, "alt")} class="w-full max-w-[640px]"${addAttribute(eager ? "eager" : "lazy", "loading")}${addAttribute(eager ? "high" : void 0, "fetchpriority")} decoding="async"${addAttribute(width, "width")}${addAttribute(height, "height")}> <!-- Decorative scanline overlay and neon edge are provided via global.css .holo-frame::before/::after --> </div>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/ScreenshotFrame.astro", void 0);

export { $$GlassCard as $, $$ScreenshotFrame as a, $$NeonCTA as b };
