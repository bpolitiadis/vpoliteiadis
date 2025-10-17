import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  /** Whether this image should be treated as decorative */
  decorative?: boolean;
};

/**
 * Simple, optimized image component for React
 * Uses standard img tag with performance optimizations
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, decorative = false, ...rest } = props;

  const isDecorative = decorative || (rest.alt || '').trim() === '';

  return (
    <img
      src={src}
      width={width}
      loading={rest.loading ?? 'lazy'}
      decoding={rest.decoding ?? 'async'}
      aria-hidden={isDecorative ? 'true' : undefined}
      role={isDecorative ? 'presentation' : undefined}
      {...rest}
    />
  );
}

export default OptimizedImage;