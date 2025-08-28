import React, { useCallback, useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/zoom.css';

export type LightboxItem = {
  thumbSrc: string;
  fullSrc: string;
  alt: string;
};

type LightboxGalleryProps = {
  items: LightboxItem[];
  className?: string;
};

export default function LightboxGallery({ items, className }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(
    () => items.map((it) => ({ src: it.fullSrc, alt: it.alt })),
    [items]
  );

  const openAt = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <button
            key={item.fullSrc + index}
            type="button"
            onClick={() => openAt(index)}
            className="group block w-full overflow-hidden rounded-2xl ring-1 ring-cyber-gray/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 bg-dark-slate/40"
            aria-label={`Open image ${index + 1}: ${item.alt}`}
          >
            <img
              src={item.thumbSrc}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain aspect-auto transition-transform duration-300 group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-primary rounded-2xl"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 250, swipe: 400 }}
        plugins={[Zoom]}
      />
    </div>
  );
}


