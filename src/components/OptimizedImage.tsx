import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
};

/**
 * 2025 Best Practice: Uses pre-optimized images from build process
 * Provides consistent image loading across all environments
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, ...rest } = props;

  // For production, use Vercel's Image Optimization API for static assets
  let optimizedSrc = src;
  
  if (typeof window !== 'undefined' && import.meta.env.MODE === 'production' && src.startsWith('/images/')) {
    const params = new URLSearchParams({
      url: `${window.location.origin}${src}`,
      w: width.toString(),
      q: quality.toString(),
      f: 'webp',
    });
    optimizedSrc = `/_vercel/image?${params.toString()}`;
  }

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


