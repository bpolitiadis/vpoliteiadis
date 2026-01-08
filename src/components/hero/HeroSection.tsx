import { useEffect, useRef } from "react";
import gsap from "gsap";

// Use public folder paths for React components in Astro
const vasileiosIllustration = "/images/vasileios-illustration.png";
const laptop = "/images/laptop-illustration.png";

// Animation constants - centralized for easy maintenance
const ANIMATION_CONFIG = {
  text: {
    initialY: 100,
    delay: 1,
    stagger: 0.2,
    duration: 0.3,
  },
  image: {
    durations: [3, 2, 3, 3], // Duration for each step in the floating sequence
    movements: [
      { y: "-=30", x: "+=20", rotation: "-=2" },
      { y: "+=30", x: "-=20", rotation: "-=2" },
      { y: "-=20", rotation: "+=2" },
      { y: "+=20", rotation: "+=2" },
    ],
    // Reduced movements for mobile
    movementsMobile: [
      { y: "-=15", x: "+=10", rotation: "-=1" },
      { y: "+=15", x: "-=10", rotation: "-=1" },
      { y: "-=10", rotation: "+=1" },
      { y: "+=10", rotation: "+=1" },
    ],
  },
  laptop: {
    durations: [3, 2, 3, 3],
    movements: [
      { y: "-=10", x: "+=10", rotation: "-=1" },
      { y: "+=10", x: "-=10", rotation: "-=1" },
      { y: "-=10", rotation: "+=1" },
      { y: "+=10", rotation: "+=1" },
    ],
    // Reduced movements for mobile
    movementsMobile: [
      { y: "-=5", x: "+=5", rotation: "-=0.5" },
      { y: "+=5", x: "-=5", rotation: "-=0.5" },
      { y: "-=5", rotation: "+=0.5" },
      { y: "+=5", rotation: "+=0.5" },
    ],
  },
  easing: "power1.easeInOut" as const,
} as const;

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Check for reduced motion preference (accessibility)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check if mobile viewport (width < 640px)
    const isMobile = window.innerWidth < 640;

    const q = gsap.utils.selector(sectionRef);

    // Text slide-up animation (title, subtitle, and paragraph)
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

    // Illustration floating effect (infinite loop)
    const imageTimeline = gsap.timeline({ repeat: -1 });
    if (!prefersReducedMotion) {
      const movements = isMobile 
        ? ANIMATION_CONFIG.image.movementsMobile 
        : ANIMATION_CONFIG.image.movements;
      movements.forEach((movement, index) => {
        imageTimeline.to(q(".image-animation"), ANIMATION_CONFIG.image.durations[index], {
          ...movement,
          ease: ANIMATION_CONFIG.easing,
        });
      });
    }

    // Laptop floating effect (infinite loop, more subtle than image)
    const laptopTimeline = gsap.timeline({ repeat: -1 });
    if (!prefersReducedMotion) {
      const movements = isMobile 
        ? ANIMATION_CONFIG.laptop.movementsMobile 
        : ANIMATION_CONFIG.laptop.movements;
      movements.forEach((movement, index) => {
        laptopTimeline.to(q(".laptop"), ANIMATION_CONFIG.laptop.durations[index], {
          ...movement,
          ease: ANIMATION_CONFIG.easing,
        });
      });
    }

    // Cleanup function - kills all animations when component unmounts
    return () => {
      textTimeline.kill();
      imageTimeline.kill();
      laptopTimeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-8 sm:mt-6 pt-2 sm:pt-4 lg:pt-0 px-4 sm:px-8 md:px-20 max-w-5xl pb-8 sm:pb-24 sm:min-h-[600px] lg:min-h-[769px] mx-auto sm:flex sm:flex-col sm:justify-center sm:items-center lg:flex-row-reverse"
    >
      {/* Background text effect - commented out for future use */}
      {/* <span
        aria-hidden="true"
        className="bg-text absolute -top-36 rotate-12 text-gray-100 dark:text-[#1f2e3a] text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0"
      >
        QA AUTOMATION ENGINEER FULL-STACK DEVELOPER AI CREATIVE
      </span> */}

      <div className="image-animation z-10 select-none mt-0 xs:mt-4 sm:mt-14 lg:mt-0 px-0 mx-auto mb-6 sm:mb-8 lg:mb-0 lg:p-0 lg:basis-1/3">
        <div className="relative w-56 xs:w-64 sm:w-72 md:w-80 h-56 xs:h-64 sm:h-80 flex items-center mx-auto">
          <div className="absolute pointer-events-none scale-75 xs:scale-85 sm:scale-90 mx-auto">
            <img
              src={vasileiosIllustration}
              width={1177}
              height={1374}
              id="character-illustration"
              aria-label="Vasileios Politeiadis character illustration levitating with a Macbook"
              alt="Vasileios Politeiadis character illustration"
              loading="eager"
              // @ts-expect-error - fetchpriority is valid HTML but not yet in React types
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div className="laptop absolute top-10 xs:top-12 sm:top-16 left-0 scale-[.32] xs:scale-[.38] sm:scale-[.41] pointer-events-none">
            <img
              src={laptop}
              width={559}
              height={386}
              aria-hidden="true"
              alt="Laptop illustration"
              loading="eager"
              // @ts-expect-error - fetchpriority is valid HTML but not yet in React types
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="lg:basis-2/3 z-10 relative px-2 sm:px-4 md:px-6 lg:px-0">
        <span className="text-primary lg:text-lg font-orbitron font-medium">
          Hi my name is
        </span>
        <div className="overflow-hidden">
          <h1 className="text-animation text-4xl md:text-5xl lg:text-7xl md:my-2 font-orbitron font-bold my-1">
            Vasileios Politeiadis
          </h1>
        </div>
        <div className="overflow-hidden">
          <div className="text-animation text-xl md:text-2xl lg:text-4xl md:my-3 text-primary font-orbitron font-medium leading-tight">
            <div className="block">
              <span className="inline">QA Automation Engineer </span><span className="text-lg md:text-xl lg:text-3xl inline">&</span>
            </div>
            <div className="block">Full-Stack Developer</div>
          </div>
        </div>
        <div className="mt-2 my-3 sm:my-4 md:mb-8 overflow-hidden">
          <p className="text-animation mb-1 text-sm sm:text-base [&_strong]:[text-shadow:0_0_6px_rgba(57,255,20,0.3)]">
            I break your code professionally using <strong>Playwright</strong> and <strong>Selenium</strong>. When I'm not hunting down bugs, I build full-stack applications with <strong>Next.js</strong> and <strong>Supabase</strong>, craft lightning-fast websites with <strong>Astro</strong> and <strong>TailwindCSS</strong>, and automate boring workflows with <strong>n8n</strong> and custom AI agents that actually work.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2 sm:mt-4"
        >
          Contact me!
        </a>
      </div>
      <a
        href="#whoami"
        className="group absolute link-outline animate-bounce hidden md:bottom-14 lg:bottom-16 left-1/2 transform -translate-x-1/2 md:flex items-center flex-col"
      >
        <span className="group-hover:text-primary transition-colors duration-200">
          Scroll
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="fill-foreground group-hover:fill-primary transition-colors duration-200"
        >
          <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></path>
          <path d="M11 6h2v6h-2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="fill-foreground group-hover:fill-primary transition-colors duration-200"
        >
          <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
