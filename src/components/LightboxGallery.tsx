import { useCallback, useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

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
    // Opening lightbox at index (development only)
    if (import.meta.env.MODE === 'development') {
      console.log('Opening lightbox at index:', index);
    }
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-matrix-white/60">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${className || ''}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_1px_0_rgba(57,255,20,0.2),0_12px_40px_rgba(57,255,20,0.15)] transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1"
          >
            <img
              src={item.thumbSrc}
              alt={item.alt}
              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="text-center">
                  <h4 className="text-matrix-white font-medium text-sm sm:text-base mb-2">
                    {item.alt}
                  </h4>
                  <p className="text-matrix-white/70 text-xs sm:text-sm">
                    Click to view full size
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => openAt(index)}
              className="absolute inset-0 w-full h-full focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 cursor-pointer"
              aria-label={`Open ${item.alt} in lightbox`}
            >
              <span className="sr-only">Open {item.alt} in lightbox</span>
            </button>

            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={currentIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{
          finite: true,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        animation={{
          fade: 400,
          swipe: 500,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        render={{
          buttonPrev: items.length <= 1 ? () => null : undefined,
          buttonNext: items.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}


