/// <reference types="astro/client" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly SPOTIFY_CLIENT_ID?: string;
  readonly SPOTIFY_CLIENT_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declare module for .astro files to fix TypeScript errors
declare module '*.astro' {
  const Component: any;
  export default Component;
}


