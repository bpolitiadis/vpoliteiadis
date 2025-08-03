import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Custom colors based on branding
      colors: {
        'matrix-black': '#0A0A0A',
        'neon-lime': '#39FF14',
        'digital-emerald': '#00B86B',
        'cyber-gray': '#222222',
        'matrix-white': '#E8FFE8',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
