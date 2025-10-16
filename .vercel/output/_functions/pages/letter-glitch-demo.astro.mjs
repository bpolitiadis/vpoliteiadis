import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CVZbsiOP.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_BQqTk3O_.mjs';
import { L as LetterGlitch } from '../chunks/LetterGlitch_McnhYqDE.mjs';
export { renderers } from '../renderers.mjs';

const $$LetterGlitchDemo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Letter Glitch Demo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-black"> <div class="container mx-auto px-4 py-8"> <h1 class="text-white text-4xl font-bold text-center mb-8">
Letter Glitch Animation Demo
</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <!-- Default Settings --> <div class="space-y-4"> <h2 class="text-white text-xl font-semibold">Default Settings</h2> <div class="h-64 border border-gray-600 rounded-lg overflow-hidden"> ${renderComponent($$result2, "LetterGlitch", LetterGlitch, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> <!-- Custom Colors --> <div class="space-y-4"> <h2 class="text-white text-xl font-semibold">Custom Colors</h2> <div class="h-64 border border-gray-600 rounded-lg overflow-hidden"> ${renderComponent($$result2, "LetterGlitch", LetterGlitch, { "client:load": true, "glitchColors": ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"], "glitchSpeed": 100, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> <!-- Fast Glitch --> <div class="space-y-4"> <h2 class="text-white text-xl font-semibold">Fast Glitch</h2> <div class="h-64 border border-gray-600 rounded-lg overflow-hidden"> ${renderComponent($$result2, "LetterGlitch", LetterGlitch, { "client:load": true, "glitchSpeed": 20, "smooth": false, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> <!-- Center Vignette --> <div class="space-y-4"> <h2 class="text-white text-xl font-semibold">Center Vignette</h2> <div class="h-64 border border-gray-600 rounded-lg overflow-hidden"> ${renderComponent($$result2, "LetterGlitch", LetterGlitch, { "client:load": true, "centerVignette": true, "outerVignette": false, "glitchColors": ["#00ffff", "#ff00ff", "#ffff00"], "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> </div> <div class="mt-8 text-center"> <p class="text-gray-400">
The LetterGlitch component creates a matrix-style glitch effect with customizable colors and animations.
</p> </div> </div> </main> ` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/letter-glitch-demo.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/letter-glitch-demo.astro";
const $$url = "/letter-glitch-demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LetterGlitchDemo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
