import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
  /** Whether this image should be treated as decorative */
  decorative?: boolean;
};

/**
 * 2025 Best Practice: Uses Astro's built-in Image component via Astro wrapper
 * This component is now deprecated - use Astro's Image component directly in .astro files
 * @deprecated Use Astro's Image component directly in .astro files instead
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, decorative = false, ...rest } = props;

  const isDecorative = decorative || (rest.alt || '').trim() === '';

  // For React components, we'll use a regular img tag with optimized attributes
  // The actual optimization happens at the Astro level
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