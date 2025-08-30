import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
};

/**
 * 2025 Best Practice: Uses Vercel's Image Optimization API for instant optimization
 * Eliminates build-time processing and provides automatic format/size optimization
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, ...rest } = props;

  // Build absolute URL for Vercel's optimizer
  const toAbsolute = (maybeRelative: string) => {
    if (/^https?:\/\//.test(maybeRelative)) return maybeRelative;
    const site = (globalThis as any).Astro?.site || (typeof document !== 'undefined' ? `${location.protocol}//${location.host}` : '');
    return `${String(site).replace(/\/$/, '')}${maybeRelative}`;
  };

  // Use Vercel's Image Optimization API in production
  const isProduction = typeof window === 'undefined' 
    ? process.env.NODE_ENV === 'production'
    : import.meta.env.MODE === 'production';

  const optimizedSrc = isProduction
    ? `/_vercel/image?url=${encodeURIComponent(toAbsolute(src))}&w=${width}&q=${quality}`
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


