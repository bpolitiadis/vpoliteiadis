"use client";

import { useRef, useState, useCallback, memo } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/icons/Icon";
import TextType from "@/components/TextType";

// Moved outside component to prevent recreation on each render
const HERO_QUOTES = [
  "Certified bug hunter.",
  "Debugging reality.",
  "I break code professionally.",
  "Automating workflows, amplifying humans.",
  "The best way to predict the future is to invent it.",
  "Human creativity, artificial brains.",
  "Writing tests that test the limits.",
  "I write code that watches your code.",
];

// Status color map outside component
const STATUS_COLORS = {
  Online: "#39FF14",
  Away: "#FFAA00",
  Offline: "#222222",
} as const;

const STATUS_GLOW = {
  Online: "shadow-[0_0_8px_rgba(57,255,20,0.2)]",
  Offline: "",
  Away: "shadow-[0_0_8px_rgba(255,170,0,0.2)]",
} as const;

interface ProfileCardProps {
  name: string;
  title: string;
  status?: "Online" | "Offline" | "Away";
  contactText?: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  className?: string;
}

const ProfileCardComponent = ({
  name,
  title,
  status = "Online",
  contactText = "Contact Me",
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  className,
}: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || (!enableMobileTilt && window.innerWidth < 768)) {
        return;
      }

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      setTilt({ x: rotateX, y: rotateY });
    },
    [enableTilt, enableMobileTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <Card
      ref={cardRef}
      className={cn(
        "relative overflow-hidden border-2 border-digital-emerald/60 transition-all duration-300",
        "hover:border-digital-emerald hover:shadow-[0_0_16px_rgba(0,184,107,0.6)]",
        "shadow-[0_0_8px_rgba(0,184,107,0.6)]",
        "w-full aspect-[4/5]",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        {/* Background Image - Covering entire card with vertical offset to center face */}
        <div 
          className="absolute inset-0 bg-cover bg-[center_bottom_100%]"
          style={{ backgroundImage: `url(${avatarUrl})` }}
          aria-hidden="true"
        />
        
        {/* Dark overlay for text readability - stronger gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matrix-black/30 to-matrix-black/95" />
        
        {/* Neon Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-digital-emerald to-transparent opacity-50 z-10" />
        
        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          {/* Status Badge - Top Right */}
          <div
            className={cn(
              "absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full z-20",
              "bg-matrix-black/80 backdrop-blur-sm border border-primary/30",
              STATUS_GLOW[status]
            )}
            aria-label={`Status: ${status}`}
          >
            <span className="text-sm font-medium text-primary font-inter">
              {status}
            </span>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[status] }}
              aria-hidden="true"
            />
          </div>

          {/* User Info - Bottom Section */}
          {showUserInfo && (
            <div className="flex flex-col items-start space-y-1 w-full mb-2">
              <h3 className="text-xl font-orbitron font-bold text-neon-lime leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {name}
              </h3>
              <p className="text-sm text-secondary font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {title.includes('&') ? (
                  <>
                    {title.split('&')[0].trim()}
                    <br />
                    {title.split('&')[1].trim()}
                  </>
                ) : (
                  title
                )}
              </p>
              {/* Rotating Quotes */}
              <div className="min-h-[1.5rem] mt-1 mb-2">
                <TextType
                  text={HERO_QUOTES}
                  className="text-xs text-white font-inter italic leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  typingSpeed={45}
                  deletingSpeed={25}
                  pauseDuration={1500}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-white"
                  hideCursorWhileTyping={false}
                />
              </div>
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://github.com/bpolitiadis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-white/80 hover:text-primary transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon size="sm" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vasileios-politeiadis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-white/80 hover:text-primary transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon size="sm" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/arte.imaginari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-white/80 hover:text-primary transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  aria-label="Instagram profile"
                >
                  <InstagramIcon size="sm" className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Contact Button */}
          {onContactClick && (
            <Button
              onClick={onContactClick}
              className="w-full bg-transparent border border-digital-emerald/50 text-digital-emerald hover:bg-digital-emerald/10 hover:border-digital-emerald hover:text-digital-emerald transition-all duration-200 backdrop-blur-sm"
              variant="outline"
            >
              {contactText}
            </Button>
          )}
        </div>
      </Card>
  );
};

// Memoize to prevent unnecessary re-renders when parent updates
const ProfileCard = memo(ProfileCardComponent);
ProfileCard.displayName = "ProfileCard";

export { ProfileCard };
