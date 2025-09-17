import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DZoNk_Oe.mjs';
import { manifest } from './manifest_CTwiTVP8.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/ai.txt.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/api/health.astro.mjs');
const _page6 = () => import('./pages/api/test-contact.astro.mjs');
const _page7 = () => import('./pages/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/blog.astro.mjs');
const _page9 = () => import('./pages/contact.astro.mjs');
const _page10 = () => import('./pages/creative/arte-imaginari.astro.mjs');
const _page11 = () => import('./pages/creative/emmanuelle-silk.astro.mjs');
const _page12 = () => import('./pages/creative/smoking-two.astro.mjs');
const _page13 = () => import('./pages/creative.astro.mjs');
const _page14 = () => import('./pages/letter-glitch-demo.astro.mjs');
const _page15 = () => import('./pages/projects/casa-capoeira.astro.mjs');
const _page16 = () => import('./pages/projects/upiria.astro.mjs');
const _page17 = () => import('./pages/projects.astro.mjs');
const _page18 = () => import('./pages/robots.txt.astro.mjs');
const _page19 = () => import('./pages/structured/blog/_slug_.json.astro.mjs');
const _page20 = () => import('./pages/structured/person.json.astro.mjs');
const _page21 = () => import('./pages/structured/project/_slug_.json.astro.mjs');
const _page22 = () => import('./pages/structured/website.json.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.12.8_@types+node@24.1.0_jiti@1.21.7_rollup@4.46.2_terser@5.43.1_typescript@5.9.2_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/ai.txt.ts", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/api/health.ts", _page5],
    ["src/pages/api/test-contact.ts", _page6],
    ["src/pages/blog/[slug].astro", _page7],
    ["src/pages/blog/index.astro", _page8],
    ["src/pages/contact.astro", _page9],
    ["src/pages/creative/arte-imaginari.astro", _page10],
    ["src/pages/creative/emmanuelle-silk.astro", _page11],
    ["src/pages/creative/smoking-two.astro", _page12],
    ["src/pages/creative/index.astro", _page13],
    ["src/pages/letter-glitch-demo.astro", _page14],
    ["src/pages/projects/casa-capoeira.astro", _page15],
    ["src/pages/projects/upiria.astro", _page16],
    ["src/pages/projects/index.astro", _page17],
    ["src/pages/robots.txt.ts", _page18],
    ["src/pages/structured/blog/[slug].json.ts", _page19],
    ["src/pages/structured/person.json.ts", _page20],
    ["src/pages/structured/project/[slug].json.ts", _page21],
    ["src/pages/structured/website.json.ts", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "71c53e9a-9a66-4bf0-9557-e7192379c6b7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
