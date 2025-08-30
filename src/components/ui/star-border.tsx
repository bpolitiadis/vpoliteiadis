import React from "react";
import { cn } from "../../lib/utils";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
    variant?: 'default' | 'neon' | 'emerald' | 'cyan';
  }

const StarBorder = <T extends React.ElementType = "div">({
  as,
  className = "",
  color,
  speed = "6s",
  thickness = 1,
  variant = 'default',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "div";

  // Default colors based on variant
  const getDefaultColor = () => {
    switch (variant) {
      case 'neon':
        return '#39FF14'; // Neon Lime
      case 'emerald':
        return '#00B86B'; // Digital Emerald
      case 'cyan':
        return '#00FFFF'; // Neon Cyan
      default:
        return color || '#39FF14'; // Default to Neon Lime
    }
  };

  const starColor = getDefaultColor();

  return (
    <Component 
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px]",
        className
      )} 
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      {/* Bottom star movement */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${starColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      
      {/* Top star movement */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${starColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      
      {/* Content container with brand styling */}
      <div className={cn(
        "relative z-10 bg-gradient-to-b from-matrix-black to-cyber-gray",
        "border border-cyber-gray text-matrix-white text-center text-[16px]",
        "py-[16px] px-[26px] rounded-[20px]",
        "transition-all duration-300 hover:border-neon-lime/30",
        "hover:shadow-neon/20"
      )}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
