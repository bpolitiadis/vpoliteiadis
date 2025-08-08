import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

type FeaturedProjectCardProps = {
  title: string;
  role: string;
  description: string;
  hero: string;
  detailUrl: string;
  cta: { label: string; href: string; external?: boolean };
  galleryThumbs?: string[];
  spotifyEmbed?: string;
  instagramGrid?: string[];
};

export default function FeaturedProjectCard(props: FeaturedProjectCardProps) {
  const {
    title,
    role,
    description,
    hero,
    detailUrl,
    cta,
    galleryThumbs,
    spotifyEmbed,
    instagramGrid,
  } = props;

  const openDetail = () => {
    window.location.assign(detailUrl);
  };

  return (
    <motion.article
      onClick={openDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail();
        }
      }}
      aria-label={`Open ${title} details`}
      className="relative rounded-2xl border border-border/40 bg-[rgba(10,10,10,0.6)] shadow-inner
                 backdrop-blur-md transition-all duration-300 hover:border-primary hover:shadow-neon
                 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      // Avoid SSR rendering cards at opacity:0 if hydration is delayed
      initial={false}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-t-2xl aspect-video">
        <img
          src={hero}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-6 md:p-7">
        <h3 className="font-orbitron text-primary text-xl md:text-2xl mb-2">{title}</h3>
        <p className="text-matrix-white text-sm md:text-base opacity-90 mb-3">{role}</p>
        <p className="text-matrix-white/90 text-sm leading-relaxed line-clamp-3 mb-5">{description}</p>

        {Array.isArray(galleryThumbs) && galleryThumbs.length > 0 && (
          <div className="mt-4 grid grid-cols-8 gap-1.5">
            {galleryThumbs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                className="h-10 w-full object-cover rounded-sm"
                loading="lazy"
                decoding="async"
              />)
            )}
          </div>
        )}

        {spotifyEmbed && (
          <div className="mt-4 rounded-lg overflow-hidden border border-border/30">
            <iframe
              style={{ borderRadius: 12 }}
              src={spotifyEmbed}
              width="100%"
              height={152}
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            />
          </div>
        )}

        {Array.isArray(instagramGrid) && instagramGrid.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {instagramGrid.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Instagram preview ${idx + 1}`}
                className="aspect-square w-full object-cover rounded"
                loading="lazy"
                decoding="async"
              />)
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <a
            href={detailUrl}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
            aria-label={`Open ${title} details`}
            onClick={(e) => e.stopPropagation()}
          >
            View details
          </a>

          <a
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg
                       hover:bg-primary hover:text-background transition-colors duration-300 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-primary"
            onClick={(e) => e.stopPropagation()}
            aria-label={cta.label}
          >
            {cta.label}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}


