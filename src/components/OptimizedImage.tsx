import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
};

/**
 * Optimizes images via Vercel's on-the-fly transformer in production.
 * In development, falls back to the raw src to avoid proxying.
 * Works in React components where astro:assets is not available.
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, ...rest } = props;

  // Always use absolute URL for the optimizer in production so it can fetch assets reliably
  const toAbsolute = (maybeRelative: string) => {
    if (/^https?:\/\//.test(maybeRelative)) return maybeRelative;
    const site = (globalThis as any).Astro?.site || (typeof document !== 'undefined' ? `${location.protocol}//${location.host}` : '');
    return `${String(site).replace(/\/$/, '')}${maybeRelative}`;
  };

  // If the source is a local static asset (/_astro/* or /images/*), skip optimizer to avoid 404s
  const isAbsolute = /^https?:\/\//.test(src);
  const isLocalStatic = src.startsWith('/_astro') || src.startsWith('/images/');

  const buildOptimized = (s: string) => `/_vercel/image?url=${encodeURIComponent(toAbsolute(s))}&w=${width}&q=${quality}`;

  const optimizedSrc =
    typeof window === 'undefined'
      ? process.env.NODE_ENV === 'production'
        ? (isAbsolute && !isLocalStatic ? buildOptimized(src) : src)
        : src
      : import.meta.env.MODE === 'production'
        ? (isAbsolute && !isLocalStatic ? buildOptimized(src) : src)
        : src;

  return (
    <img
      src={optimizedSrc}
      loading={rest.loading ?? 'lazy'}
      decoding={rest.decoding ?? 'async'}
      {...rest}
    />
  );
}

export default OptimizedImage;


