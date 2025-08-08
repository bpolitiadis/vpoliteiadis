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

  const optimizedSrc =
    typeof window === 'undefined'
      ? // SSR: respect environment variable set by Vercel during build
        (process.env.NODE_ENV === 'production'
          ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
          : src)
      : // Client: check runtime mode
        (import.meta.env.MODE === 'production'
          ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
          : src);

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


