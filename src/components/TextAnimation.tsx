import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Animation constants - matching HeroSection exactly
const ANIMATION_CONFIG = {
  text: {
    initialY: 100,
    delay: 1,
    stagger: 0.2,
    duration: 0.3,
  },
  easing: "power1.easeInOut" as const,
};

interface TextAnimationProps {
  children: React.ReactNode;
  className?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  className = ""
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    // Check for reduced motion preference (accessibility)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const q = gsap.utils.selector(sectionRef);

    // Text slide-up animation - exact same as HeroSection
    const textTimeline = gsap.timeline({
      defaults: {
        stagger: ANIMATION_CONFIG.text.stagger,
        duration: ANIMATION_CONFIG.text.duration,
      },
    });

    if (!prefersReducedMotion) {
      textTimeline.fromTo(
        q(".text-animation"),
        { y: ANIMATION_CONFIG.text.initialY, opacity: 0 },
        { y: 0, opacity: 1, delay: ANIMATION_CONFIG.text.delay }
      );
    } else {
      // For reduced motion, just fade in without sliding
      textTimeline.fromTo(
        q(".text-animation"),
        { opacity: 0 },
        { opacity: 1, delay: ANIMATION_CONFIG.text.delay }
      );
    }

    // Cleanup function - kills all animations when component unmounts
    return () => {
      textTimeline.kill();
    };
  }, [isMounted]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default TextAnimation;