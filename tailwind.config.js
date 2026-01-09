import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/scripts/**/*.js'
  ],
  // Optimized safelist - only include classes that are dynamically generated
  safelist: [
    // Essential opacity levels for dynamic backgrounds
    'opacity-40', 'opacity-50', 'opacity-60', 'opacity-70', 'opacity-80',
    // Critical gradient overlays
    'from-black/20', 'from-black/30', 'via-black/10', 'via-black/15', 'to-black/25', 'to-black/35',
    // Essential responsive grid classes
    'grid-cols-1', 'lg:grid-cols-2', 'gap-6', 'sm:gap-8', 'lg:gap-10', 'xl:gap-12',
    // Animation classes for dynamic content
    'animate-star-movement-bottom', 'animate-star-movement-top'
  ],
  darkMode: ['class', 'class'],
  
  theme: {
  	extend: {
  		colors: {
  			// Core Brand Colors (8 total - strict limit)
  			primary: {
  				DEFAULT: '#39FF14', // Neon Lime
  				foreground: '#0A0A0A'
  			},
  			secondary: {
  				DEFAULT: '#00B86B', // Digital Emerald
  				foreground: '#FFFFFF'
  			},
  			accent: {
  				DEFAULT: '#222222', // Cyber Gray
  				foreground: '#E8FFE8'
  			},

  			// Semantic Colors
  			background: '#0A0A0A', // Matrix Black
  			foreground: '#E8FFE8', // Matrix White
  			muted: {
  				DEFAULT: '#222222',
  				foreground: '#B5B5B5'
  			},
  			border: '#222222',
  			input: '#222222',
  			ring: '#39FF14',

			// Status Colors
			destructive: {
				DEFAULT: '#FF4444',
				foreground: '#FFFFFF'
			},
			success: '#00B86B',
			warning: '#FFAA00',
			info: '#39FF14',
			cyan: {
				DEFAULT: '#00FFFF', // Branded Cyan for Creative Lab
				foreground: '#0A0A0A'
			},

			// shadcn/ui Required
  			card: {
  				DEFAULT: '#0A0A0A',
  				foreground: '#E8FFE8'
  			},
  			popover: {
  				DEFAULT: '#0A0A0A',
  				foreground: '#E8FFE8'
  			},

  			// Chart Colors (limited to 5)
  			chart: {
  				'1': '#39FF14',
  				'2': '#00B86B',
  				'3': '#00FFFF',
  				'4': '#8A2BE2',
  				'5': '#FF1493'
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
  			// Clean scale: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
  			'xs': '0.25rem',    // 4px
  			'sm': '0.5rem',     // 8px
  			'md': '0.75rem',    // 12px
  			'lg': '1rem',       // 16px
  			'xl': '1.25rem',    // 20px
  			'2xl': '1.5rem',    // 24px
  			'3xl': '2rem',      // 32px
  			'4xl': '2.5rem',    // 40px
  			'5xl': '3rem',      // 48px
  			'6xl': '4rem',      // 64px
  			'7xl': '5rem',      // 80px
  			'8xl': '6rem',      // 96px
  			'9xl': '8rem',      // 128px
  			'10xl': '10rem',    // 160px
  			'11xl': '12rem',    // 192px
  			'12xl': '16rem'     // 256px
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
			'scale-smooth': 'scaleSmooth 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
			'star-movement-top': 'star-movement-top linear infinite alternate',
			// 2025 Modern UX Animations - Slower and more elegant, synchronized with TextType
			'reveal-up': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
			'reveal-up-delayed-1': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
			'reveal-up-delayed-2': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
			'reveal-up-delayed-3': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
			'reveal-up-delayed-4': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
			'reveal-up-delayed-5': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
			'stagger-fade': 'staggerFade 1.0s cubic-bezier(0.16, 1, 0.3, 1) both',
			'stagger-fade-delayed-1': 'staggerFade 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
			'stagger-fade-delayed-2': 'staggerFade 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
			'stagger-fade-delayed-3': 'staggerFade 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both'
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
			},
			'star-movement-bottom': {
				'0%': { 
					transform: 'translate(0%, 0%)', 
					opacity: '1' 
				},
				'100%': { 
					transform: 'translate(-100%, 0%)', 
					opacity: '0' 
				}
			},
			'star-movement-top': {
				'0%': { 
					transform: 'translate(0%, 0%)', 
					opacity: '1' 
				},
				'100%': { 
					transform: 'translate(100%, 0%)', 
					opacity: '0' 
				}
			},
			// 2025 Modern UX Keyframes
			revealUp: {
				'0%': {
					opacity: '0',
					transform: 'translateY(30px) scale(0.95)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0) scale(1)'
				}
			},
			staggerFade: {
				'0%': {
					opacity: '0',
					transform: 'translateY(20px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			// Neon glows (primary brand)
  			neon: '0 0 24px rgba(57, 255, 20, 0.25)',
  			'neon-strong': '0 0 42px rgba(57, 255, 20, 0.35)',
  			'neon-lg': '0 0 0 4px rgba(57, 255, 20, 0.6)',

  			// Secondary brand colors
  			emerald: '0 0 20px rgba(0, 184, 107, 0.3)',
  			'emerald-lg': '0 0 40px rgba(0, 184, 107, 0.4)',

  			// Accent colors (limited)
  			cyan: '0 0 20px rgba(0, 255, 255, 0.3)',
  			purple: '0 0 20px rgba(138, 43, 226, 0.3)'
  		},
  		textShadow: {
  			neon: '0 0 10px rgba(57, 255, 20, 0.5)',
  			emerald: '0 0 10px rgba(0, 184, 107, 0.5)',
  			cyan: '0 0 10px rgba(0, 255, 255, 0.5)',
  			purple: '0 0 10px rgba(138, 43, 226, 0.5)'
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
  			'bubble': '22px',
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
