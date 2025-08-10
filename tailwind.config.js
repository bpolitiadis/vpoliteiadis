import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/scripts/**/*.js'
  ],
  // Ensure dynamic classes passed via props are never purged
  safelist: [
    // Opacity levels we use for page backgrounds
    'opacity-40','opacity-50','opacity-60','opacity-70','opacity-80',
    // Gradient overlay strengths used for backgrounds
    'from-black/20','from-black/30','via-black/10','via-black/15','to-black/25','to-black/35',
    // Attachment helper if enabled later
    'bg-fixed','bg-local','bg-scroll',
    // CTA link class used in cards
    'btn-link'
  ],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // Matrix-inspired color palette
        'matrix-black': '#0A0A0A',
        // Brand primary
        'neon-lime': '#39FF14',
        'digital-emerald': '#00B86B',
        'cyber-gray': '#222222',
        'matrix-white': '#E4FFE4',
        'matrix-white-light': '#F8FFF8',
        'cyber-gray-light': '#F0F0F0',
        'neon-lime-dark': '#2ECC71',
        'digital-emerald-dark': '#00994D',
        
        // Complementary cyberpunk colors
        'neon-cyan': '#00FFFF',
        'neon-purple': '#8A2BE2',
        'neon-pink': '#FF1493',
        // Refined blue to better harmonize with neon greens
        // Adjusted to improve contrast on dark backgrounds
        'cyber-blue': '#2EA3FF',
        'matrix-gold': '#FFD700',
        'dark-slate': '#1A1A1A',
        'light-slate': '#2A2A2A',
        
        // Semantic colors (mapped to brand)
        'primary': '#39FF14',
        'secondary': '#00B86B',
        'accent': '#39FF14',
        'background': '#0A0A0A',
        'foreground': '#E8FFE8',
        'muted': '#222222',
        'muted-foreground': '#B5B5B5',
        'border': 'rgba(57, 255, 20, 0.2)',
        'input': '#222222',
        'ring': '#39FF14',
        'card': '#222222',
        'card-foreground': '#E8FFE8',
        'popover': '#222222',
        'popover-foreground': '#E8FFE8',
        'destructive': '#FF4444',
        'destructive-foreground': '#FFFFFF',
        'success': '#00B86B',
        'success-foreground': '#FFFFFF',
        'warning': '#FFAA00',
        'warning-foreground': '#000000',
        'info': '#39FF14',
        'info-foreground': '#000000',
      },
      ringColor: ({ theme }) => ({
        DEFAULT: theme('colors.primary'),
      }),
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(57, 255, 20, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 0 3px rgba(57, 255, 20, 0.5)',
        'neon-lg': '0 0 0 4px rgba(57, 255, 20, 0.6)',
        'emerald': '0 0 20px rgba(0, 184, 107, 0.3)',
        'emerald-lg': '0 0 40px rgba(0, 184, 107, 0.4)',
        'cyan': '0 0 20px rgba(0, 255, 255, 0.3)',
        'cyan-lg': '0 0 40px rgba(0, 255, 255, 0.4)',
        'purple': '0 0 20px rgba(138, 43, 226, 0.3)',
        'purple-lg': '0 0 40px rgba(138, 43, 226, 0.4)',
        'pink': '0 0 20px rgba(255, 20, 147, 0.3)',
        'pink-lg': '0 0 40px rgba(255, 20, 147, 0.4)',
        'gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'gold-lg': '0 0 40px rgba(255, 215, 0, 0.4)',
        'cyber-blue': '0 0 20px rgba(0, 174, 239, 0.3)',
        'cyber-blue-lg': '0 0 40px rgba(0, 174, 239, 0.4)',
      },
      textShadow: {
        'neon': '0 0 10px rgba(57, 255, 20, 0.5)',
        'emerald': '0 0 10px rgba(0, 184, 107, 0.5)',
        'cyan': '0 0 10px rgba(0, 255, 255, 0.5)',
        'purple': '0 0 10px rgba(138, 43, 226, 0.5)',
        'pink': '0 0 10px rgba(255, 20, 147, 0.5)',
        'gold': '0 0 10px rgba(255, 215, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'matrix-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2339ff14' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    typography,
    // Custom plugin for text shadows
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 10px rgba(57, 255, 20, 0.5)',
        },
        '.text-shadow-emerald': {
          textShadow: '0 0 10px rgba(0, 184, 107, 0.5)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    },
    // Custom plugin for scrollbar styling
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(57, 255, 20, 0.3) #222222',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          backgroundColor: '#222222',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(57, 255, 20, 0.3)',
          borderRadius: '9999px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(57, 255, 20, 0.5)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
};
