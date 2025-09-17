/* empty css                                    */
import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, r as renderComponent } from '../../chunks/astro/server_DSPR3m_Y.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BB2MR9BH.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://vpoliteiadis.com");
const $$SpotifyEmbed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SpotifyEmbed;
  const {
    src,
    type,
    id,
    height = 152,
    title = "Spotify player",
    theme = "dark"
  } = Astro2.props;
  const themeParam = theme === "light" ? "1" : "0";
  const computedSrc = src ?? (type && id ? `https://open.spotify.com/embed/${type}/${id}?theme=${themeParam}` : void 0);
  if (!computedSrc) {
    throw new Error("SpotifyEmbed requires either `src` or both `type` and `id`.");
  }
  return renderTemplate`${maybeRenderHead()}<div class="rounded-xl overflow-hidden bg-card/60 border border-border/30"> <iframe${addAttribute(computedSrc, "src")} width="100%"${addAttribute(height, "height")} class="block" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"${addAttribute(title, "title")} style="border: 0; border-radius: 12px"></iframe> </div>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/SpotifyEmbed.astro", void 0);

async function getAppAccessToken() {
  {
    throw new Error("Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.");
  }
}
async function getArtistAlbums(artistId) {
  const token = await getAppAccessToken();
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,compilation&market=US&limit=50`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch artist albums: ${res.status} ${text}`);
  }
  const data = await res.json();
  const byId = /* @__PURE__ */ new Map();
  for (const a of data.items ?? []) {
    if (!byId.has(a.id)) byId.set(a.id, a);
  }
  return Array.from(byId.values()).map((a) => ({
    id: a.id,
    name: a.name,
    release_date: a.release_date,
    images: a.images ?? [],
    external_urls: a.external_urls ?? {}
  }));
}

const $$SmokingTwo = createComponent(async ($$result, $$props, $$slots) => {
  const ARTIST_ID = "3iyLSllxJjbHUi1PZOzJAm";
  const albums = await getArtistAlbums(ARTIST_ID).catch(() => []);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Smoking Two \u2013 Visual Direction", "description": "Art direction for Smoking Two visuals: album covers, Spotify canvases, promos, and AI videos.", "currentPath": "/creative/smoking-two" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative py-12 md:py-16 px-6 bg-gradient-to-b from-primary/5 to-transparent"> <div class="max-w-6xl mx-auto"> <a href="/creative" class="text-primary hover:underline inline-flex items-center gap-2 mb-6">
← Back to Creative Lab
</a> <header class="mb-8 text-center"> <h1 class="font-orbitron text-4xl md:text-5xl text-primary mb-3">Smoking Two</h1> <p class="text-muted-foreground max-w-3xl mx-auto">
Screaming from the streets of Thessaloniki, Greece, Smoking Two is the brainchild of <span class="text-foreground font-medium">022</span> on the mic and <span class="text-foreground font-medium">Black Smoke</span> behind the boards. They craft raw, unfiltered hip-hop that hits different. I serve as their visual director, using AI tools to create album covers, social media promos, and experimental music video concepts that capture their gritty, underground aesthetic.
</p> </header> <div class="mt-8"> <div class="flex items-center justify-between mb-4"> <h3 class="font-orbitron text-primary text-lg md:text-xl">Featured Tracks</h3> </div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6"> <div> <h4 class="mb-2 text-muted-foreground">VROMIKO</h4> ${renderComponent($$result2, "SpotifyEmbed", $$SpotifyEmbed, { "src": "https://open.spotify.com/embed/track/6jWC2VIg20GWGwxgVjrHcv?utm_source=generator", "height": 152, "title": "VROMIKO \u2014 Spotify player" })} </div> <div> <h4 class="mb-2 text-muted-foreground">Elixirio</h4> ${renderComponent($$result2, "SpotifyEmbed", $$SpotifyEmbed, { "src": "https://open.spotify.com/embed/track/1uaTqm4URDRbcE7sNghiAd?utm_source=generator", "height": 152, "title": "Elixirio \u2014 Spotify player" })} </div> <div> <h4 class="mb-2 text-muted-foreground">Kommati Miso</h4> ${renderComponent($$result2, "SpotifyEmbed", $$SpotifyEmbed, { "src": "https://open.spotify.com/embed/track/216WbbWsel9hBAaCOsh3my?utm_source=generator", "height": 152, "title": "Kommati Miso \u2014 Spotify player" })} </div> <div> <h4 class="mb-2 text-muted-foreground">To Yfos</h4> ${renderComponent($$result2, "SpotifyEmbed", $$SpotifyEmbed, { "src": "https://open.spotify.com/embed/track/2lU4NStWNfWP28yetFm0S3?utm_source=generator", "height": 152, "title": "To Yfos \u2014 Spotify player" })} </div> </div> </div> ${albums.length > 0 && renderTemplate`<div class="mt-12"> <h3 class="font-orbitron text-primary text-lg md:text-xl mb-4">Discography Highlights</h3> <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"> ${albums.map((a) => {
    const img = a.images && (a.images[1] ?? a.images[0]);
    return renderTemplate`<li class="group"${addAttribute(a.name, "aria-label")}> <a${addAttribute(`https://open.spotify.com/album/${a.id}`, "href")} target="_blank" rel="noopener noreferrer"> ${img ? renderTemplate`<img${addAttribute(img.url, "src")}${addAttribute(`${a.name} album cover`, "alt")}${addAttribute(img.width ?? 300, "width")}${addAttribute(img.height ?? 300, "height")} loading="lazy" decoding="async" class="w-full h-auto rounded-xl border border-border/30 group-hover:shadow-neon transition">` : renderTemplate`<div class="aspect-square w-full rounded-xl border border-border/30 bg-muted"></div>`} <p class="mt-2 text-sm text-muted-foreground">${a.name}</p> </a> </li>`;
  })} </ul> </div>`} </div> </section> ` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/smoking-two.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/creative/smoking-two.astro";
const $$url = "/creative/smoking-two";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SmokingTwo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
