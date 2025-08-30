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
    'btn-link',
    // Filter button states
    'filter-btn-compact',
    // Search and filter layout classes
    'max-w-4xl','pl-12','focus:ring-2','focus:ring-primary/20','backdrop-blur-sm',
    // Responsive aspect ratios for project cards
    'aspect-[16/10]','aspect-[16/9]','aspect-[16/8]',
    // Responsive grid layouts
    'grid-cols-1','lg:grid-cols-2','gap-6','sm:gap-8','lg:gap-10','xl:gap-12'
  ],
  darkMode: ['class', 'class'],
  
  theme: {
  	extend: {
  		colors: {
  			'matrix-black': '#0A0A0A',
  			'neon-lime': '#39FF14',
  			'digital-emerald': '#00B86B',
  			'cyber-gray': '#222222',
  			'matrix-white': '#E4FFE4',
  			'matrix-white-light': '#F8FFF8',
  			'cyber-gray-light': '#F0F0F0',
  			'neon-lime-dark': '#2ECC71',
  			'digital-emerald-dark': '#00994D',
  			'neon-cyan': '#00FFFF',
  			'neon-purple': '#8A2BE2',
  			'neon-pink': '#FF1493',
  			'cyber-blue': '#2EA3FF',
  			'cyan-blue': '#00BFFF',
  			'matrix-gold': '#FFD700',
  			'dark-slate': '#1A1A1A',
  			'light-slate': '#2A2A2A',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': '#B5B5B5',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': '#E8FFE8',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': '#E8FFE8',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': '#FFFFFF',
  			success: '#00B86B',
  			'success-foreground': '#FFFFFF',
  			warning: '#FFAA00',
  			'warning-foreground': '#000000',
  			info: '#39FF14',
  			'info-foreground': '#000000',
  			'brand-green-dark': '#1A4D1A',
  			'brand-green-darker': '#0F2E0F',
  			'brand-emerald-dark': '#005C3A',
  			'brand-emerald-darker': '#003D26',
  			'text-muted': '#9CA3AF',
  			'text-muted-dark': '#6B7280',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		ringColor: ({ theme }) => ({
        DEFAULT: theme('colors.primary'),
      }),
  		fontFamily: {
  			orbitron: [
  				'Orbitron',
  				'sans-serif'
  			],
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'Consolas',
  				'monospace'
  			]
  		},
  		spacing: {
  			'15': '3.75rem',
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		aspectRatio: {
  			'16/10': '16 / 10',
  			'16/9': '16 / 9',
  			'16/8': '16 / 8',
  			'4/3': '4 / 3',
  			'3/2': '3 / 2',
  			'2/1': '2 / 1'
  		},
  		animation: {
  			glow: 'glow 2s ease-in-out infinite alternate',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'slide-up-delayed': 'slideUpDelayed 0.6s ease-out 1.5s both',
  			'fade-in-delayed': 'fadeInDelayed 0.8s ease-out 2s both',
  			'spin-slow': 'spin 8s linear infinite',
  			'bounce-slow': 'bounce 2s infinite',
  			float: 'float 6s ease-in-out infinite',
  			'matrix-rain': 'matrixRain 20s linear infinite',
  			'scale-smooth': 'scaleSmooth 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
  		},
  		keyframes: {
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px rgba(57, 255, 20, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideUpDelayed: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			fadeInDelayed: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			matrixRain: {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(100vh)'
  				}
  			},
  			scaleSmooth: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(1.05)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			neon: '0 0 0 3px rgba(57, 255, 20, 0.5)',
  			'neon-lg': '0 0 0 4px rgba(57, 255, 20, 0.6)',
  			emerald: '0 0 20px rgba(0, 184, 107, 0.3)',
  			'emerald-lg': '0 0 40px rgba(0, 184, 107, 0.4)',
  			cyan: '0 0 20px rgba(0, 255, 255, 0.3)',
  			'cyan-lg': '0 0 40px rgba(0, 255, 255, 0.4)',
  			purple: '0 0 20px rgba(138, 43, 226, 0.3)',
  			'purple-lg': '0 0 40px rgba(138, 43, 226, 0.4)',
  			pink: '0 0 20px rgba(255, 20, 147, 0.3)',
  			'pink-lg': '0 0 40px rgba(255, 20, 147, 0.4)',
  			gold: '0 0 20px rgba(255, 215, 0, 0.3)',
  			'gold-lg': '0 0 40px rgba(255, 215, 0, 0.4)',
  			'cyber-blue': '0 0 20px rgba(0, 174, 239, 0.3)',
  			'cyber-blue-lg': '0 0 40px rgba(0, 174, 239, 0.4)'
  		},
  		textShadow: {
  			neon: '0 0 10px rgba(57, 255, 20, 0.5)',
  			emerald: '0 0 10px rgba(0, 184, 107, 0.5)',
  			cyan: '0 0 10px rgba(0, 255, 255, 0.5)',
  			purple: '0 0 10px rgba(138, 43, 226, 0.5)',
  			pink: '0 0 10px rgba(255, 20, 147, 0.5)',
  			gold: '0 0 10px rgba(255, 215, 0, 0.5)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		},
  		screens: {
  			xs: '475px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
        '.text-shadow-cyan': {
          textShadow: '0 0 10px rgba(0, 191, 255, 0.5)',
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
    // Custom plugin for responsive image utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.image-cover': {
          objectFit: 'cover',
          objectPosition: 'center',
        },
        '.image-contain': {
          objectFit: 'contain',
          objectPosition: 'center',
        },
        '.image-fill': {
          objectFit: 'fill',
        },
        '.image-scale': {
          willChange: 'transform',
          transform: 'translateZ(0)',
        },
      }
      addUtilities(newUtilities)
    },
      require("tailwindcss-animate")
],
};
