'use client';

import { useState, useEffect } from 'react';
import StarBorder from '../ui/star-border';

type NavigationButtonsProps = {
  onNavigate?: (path: string) => void;
};

const navigationItems = [
  { label: 'About', path: '/about', color: '#39FF14', speed: '4s' },
  { label: 'Projects', path: '/projects', color: '#00FFFF', speed: '5s' },
  { label: 'Creative', path: '/creative', color: '#00FFFF', speed: '6s' },
  { label: 'Blog', path: '/blog', color: '#8A2BE2', speed: '7s' },
  { label: 'Contact', path: '/contact', color: '#FF1493', speed: '8s' }
];

export default function NavigationButtons({ onNavigate }: NavigationButtonsProps) {
  const [visibleButtons, setVisibleButtons] = useState<number[]>([]);

  useEffect(() => {
    // Stagger the appearance of buttons
    navigationItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  const handleClick = (path: string) => {
    onNavigate?.(path);
    // Fallback navigation if no handler provided
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <div 
      className="flex flex-nowrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 animate-reveal-up overflow-x-auto w-full"
      data-testid="navigation-buttons"
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map((item, index) => (
        <StarBorder
          key={item.path}
          as="button"
          onClick={() => handleClick(item.path)}
          color={item.color}
          speed={item.speed}
          className={`
            font-orbitron font-bold text-xs sm:text-sm md:text-base
            transition-all duration-300 transform
            ${visibleButtons.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
            hover:scale-105 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
            group
            min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]
            px-3 sm:px-4 md:px-5 lg:px-6
            py-2 sm:py-3 md:py-4
            whitespace-nowrap
            flex-shrink-0
          `}
          style={{
            transitionDelay: `${index * 100}ms`,
          }}
          aria-label={`Navigate to ${item.label}`}
          data-testid={`nav-button-${item.label.toLowerCase()}`}
        >
          <span className="relative z-10 text-[#E8FFE8] font-orbitron font-bold group-hover:text-white transition-colors duration-300">
            {item.label}
          </span>
        </StarBorder>
      ))}
    </div>
  );
}


