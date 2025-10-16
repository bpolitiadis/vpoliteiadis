/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_oRAxjIhj.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CQJIJsth.mjs';
import '../../chunks/index_MaT6fT73.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_CaKx1WID.mjs';
export { renderers } from '../../renderers.mjs';

const arteImaginariWide = new Proxy({"src":"/_astro/arte-imaginari-wide.DZsDrpp8.webp","width":4000,"height":2248,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/arte-imaginari-wide.webp";
							}
							
							return target[name];
						}
					});

const $$ArteImaginari = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Arte Imaginari \u2013 Experimental AI Lab", "description": "Personal experimental AI art lab: testing and pushing boundaries with new AI tools and workflows.", "currentPath": "/creative/arte-imaginari" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative py-16 px-4 sm:px-6 lg:px-8"> <div class="max-w-6xl mx-auto"> <a href="/creative" class="text-primary hover:underline inline-flex items-center gap-2 mb-6">
← Back to Creative Lab
</a> <header class="mb-8 text-center"> <h1 class="font-orbitron text-3xl md:text-5xl text-primary mb-4">Arte Imaginari</h1> <p class="text-muted-foreground max-w-3xl mx-auto">
A personal lab where I test and push boundaries with new AI tools, techniques, and aesthetics.
</p> </header> <div class="rounded-2xl overflow-hidden border border-border/40 bg-[rgba(10,10,10,0.6)] shadow-inner mb-10"> ${renderComponent($$result2, "Image", $$Image, { "src": arteImaginariWide, "alt": "Arte Imaginari collage", "class": "w-full h-auto object-cover", "loading": "lazy", "decoding": "async" })} </div> <div class="pt-8"> <a href="https://instagram.com/arte.imaginari" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-background transition-colors duration-300">
Follow on Instagram
</a> </div> </div> </section> ` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/arte-imaginari.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/arte-imaginari.astro";
const $$url = "/creative/arte-imaginari";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ArteImaginari,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
