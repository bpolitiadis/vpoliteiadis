import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style
      }}
    >
      {/* Border sparkle effects */}
      <div 
        className="absolute inset-0 rounded-[20px] opacity-60"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${color}40 50%, transparent 70%)`,
          animation: `sparkle-border ${speed} linear infinite`,
          backgroundSize: '200% 200%'
        }}
      />
      <div 
        className="absolute inset-0 rounded-[20px] opacity-40"
        style={{
          background: `linear-gradient(-45deg, transparent 30%, ${color}60 50%, transparent 70%)`,
          animation: `sparkle-border-reverse ${speed} linear infinite`,
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Main button content */}
      <div 
        className="relative z-10 bg-black/40 backdrop-blur-sm text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] transition-all duration-300 hover:bg-black/60 hover:backdrop-blur-md group"
        style={{
          border: `1px solid ${color}40`,
          boxShadow: `0 0 15px ${color}20, inset 0 0 15px ${color}10`
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;