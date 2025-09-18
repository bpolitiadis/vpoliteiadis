

type AvatarBubbleProps = {
  alt?: string;
  size?: number; // pixels
};

export default function AvatarBubble({ alt = 'Vasileios Politeiadis portrait', size = 60 }: AvatarBubbleProps) {
  // 2025 Best Practice: Use direct path for static assets in production
  // This ensures the image loads properly in Vercel production
  const getOptimizedAvatarSrc = () => {
    // For production, use the static asset path that Vercel serves
    if (typeof window !== 'undefined' && import.meta.env.MODE === 'production') {
      // Use the direct static asset path
      return '/images/avatar.webp';
    }
    // For development, use the same path
    return '/images/avatar.webp';
  };

  return (
    <div
      data-testid="avatar-bubble"
      className="relative"
      style={{ width: size + 20, height: size + 20 }}
    >
      {/* Main avatar container with minimal border */}
      <div className="relative rounded-full bg-black/50 backdrop-blur-md border border-[#00B86B]">
        {/* Scanline overlay for cyberpunk effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"></div>
        </div>
        
        <div className="relative rounded-full overflow-hidden w-full h-full">
          <img
            src={getOptimizedAvatarSrc()}
            width={size}
            height={size}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}


