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

  // Use the src directly since we have pre-optimized images
  // The images are already optimized during build time
  return (
    <img
      src={src}
      loading={rest.loading ?? 'lazy'}
      decoding={rest.decoding ?? 'async'}
      {...rest}
    />
  );
}

export default OptimizedImage;


