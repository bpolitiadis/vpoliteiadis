// Standardized: use plain <img> for static public assets

type FeaturedProjectCardProps = {
  title: string;
  role: string;
  description: string;
  hero: string;
  /** How the hero should fit within the aspect box */
  heroFit?: 'cover' | 'contain';
  detailUrl: string;
  cta: { label: string; href: string; external?: boolean };
  galleryThumbs?: string[];
  spotifyEmbed?: string;
  /** Optional small logo to overlay on the hero image (e.g., brand mark) */
  logoSrc?: string;
};

export default function FeaturedProjectCard({
  title,
  role,
  description,
  hero,
  heroFit = 'cover',
  detailUrl,
  cta,
  spotifyEmbed,
  logoSrc,
}: FeaturedProjectCardProps) {
  return (
    <article
      aria-label={`Open ${title} details`}
      className="relative h-full flex flex-col rounded-2xl border border-border/40 bg-[rgba(10,10,10,0.6)] shadow-inner
                 backdrop-blur-md transition-transform duration-300 hover:border-primary hover:shadow-neon hover:scale-[1.02]
                 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      data-testid={`featured-project-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Hero */}
      <a href={detailUrl} className="relative overflow-hidden rounded-t-2xl aspect-video bg-dark-slate/60 block" aria-label={`Open ${title} details`} data-testid={`featured-project-hero-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <img
          src={hero}
          alt={title}
          className={
            `w-full h-full ${heroFit === 'contain' ? 'object-contain p-6' : 'object-cover'} ` +
            'transition-transform duration-500 group-hover:scale-105 will-change-transform'
          }
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        {logoSrc && heroFit === 'cover' && (
          <img
            src={logoSrc}
            alt={`${title} logo`}
            className="absolute left-4 top-4 h-12 w-12 rounded-md border border-border/40 bg-background/70 p-1 shadow-neon backdrop-blur-xs"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      </a>

      {/* Body */}
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <h3 className="font-orbitron text-primary text-xl md:text-2xl mb-2">
          <a href={detailUrl} className="hover:underline">
            {title}
          </a>
        </h3>
        <p className="text-matrix-white text-sm md:text-base opacity-90 mb-3">{role}</p>
        <p className="text-matrix-white/90 text-sm leading-relaxed line-clamp-3 mb-5">{description}</p>

        {/* Thumbnails section removed for cleaner, consistent cards */}

        {spotifyEmbed && (
          <div className="mt-4 rounded-lg overflow-hidden border border-border/30">
            <iframe
              style={{ borderRadius: 12 }}
              src={spotifyEmbed}
              width="100%"
              height={152}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            />
          </div>
        )}



        {/* Footer - pushed to bottom */}
        <div className="mt-auto pt-6 flex items-center justify-center gap-3">
          {/* View details button temporarily hidden - pages are incomplete
          <a
            href={detailUrl}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
            aria-label={`Open ${title} details`}
            onClick={(e) => e.stopPropagation()}
          >
            View details
          </a>
          */}

          <a
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center px-6 py-3 bg-primary text-background hover:bg-secondary
                       transition-all duration-300 rounded-lg font-orbitron font-bold focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-primary gap-2"
            onClick={(e) => e.stopPropagation()}
            aria-label={cta.label}
            data-testid={`featured-project-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cta.label}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}


