
import { Image } from 'astro:assets';
import avatarImage from '../../assets/images/avatar.webp';

type AvatarBubbleProps = {
  alt?: string;
  size?: number; // pixels
};

export default function AvatarBubble({ alt = 'Vasileios Politeiadis portrait', size = 80 }: AvatarBubbleProps) {
  return (
    <div
      data-testid="avatar-bubble"
      className="relative animate-reveal-up"
      style={{ width: size + 20, height: size + 20 }}
    >
      {/* Main avatar container with minimal border */}
      <div className="relative rounded-full bg-black/50 backdrop-blur-md border border-[#00B86B]">
        {/* Scanline overlay for cyberpunk effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"></div>
        </div>
        
        <div className="relative rounded-full overflow-hidden w-full h-full">
          <Image
            src={avatarImage}
            width={size}
            height={size}
            alt={alt}
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
            format="webp"
            quality={90}
          />
        </div>
        

      </div>
    </div>
  );
}


