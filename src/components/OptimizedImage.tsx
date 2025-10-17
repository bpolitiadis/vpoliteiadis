import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
  /** Whether this image should be treated as decorative */
  decorative?: boolean;
};

/**
 * 2025 Best Practice: Uses pre-optimized images with responsive srcset
 * Provides consistent image loading across all environments
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, decorative = false, ...rest } = props;

  // Extract base name and extension from src
  const pathParts = src.split('/');
  const filename = pathParts[pathParts.length - 1];
  const baseName = filename.split('.')[0];

  // Generate responsive srcset for WebP and AVIF formats
  const breakpoints = [480, 800, 1200, 1600, 2400];
  const webpSources: string[] = [];
  const avifSources: string[] = [];

  breakpoints.forEach((bp) => {
    const webpPath = src.replace(filename, `${baseName}-${bp}w.webp`);
    const avifPath = src.replace(filename, `${baseName}-${bp}w.avif`);
    
    webpSources.push(`${webpPath} ${bp}w`);
    avifSources.push(`${avifPath} ${bp}w`);
  });

  const srcset = webpSources.join(', ');
  const srcsetAvif = avifSources.join(', ');
  
  // Use the base optimized image as fallback
  const optimizedSrc = src.replace(filename, `${baseName}.webp`);

  const isDecorative = decorative || (rest.alt || '').trim() === '';

  return (
    <picture>
      {/* AVIF sources for modern browsers */}
      <source srcSet={srcsetAvif} sizes={rest.sizes || '100vw'} type="image/avif" />
      
      {/* WebP sources for broader support */}
      <source srcSet={srcset} sizes={rest.sizes || '100vw'} type="image/webp" />
      
      {/* Fallback image */}
      <img
        src={optimizedSrc}
        loading={rest.loading ?? 'lazy'}
        decoding={rest.decoding ?? 'async'}
        aria-hidden={isDecorative ? 'true' : undefined}
        role={isDecorative ? 'presentation' : undefined}
        {...rest}
      />
    </picture>
  );
}

export default OptimizedImage;


