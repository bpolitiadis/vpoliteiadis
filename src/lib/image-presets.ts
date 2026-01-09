// Centralized responsive image presets for consistent usage across the app

export type ImagePreset = {
  widths: number[];
  sizes: string;
};

export const imagePresets: Record<string, ImagePreset> = {
  hero: {
    // Match actual optimized image widths: most have 480w, 800w, 1200w
    // Some (like about-bg) only have 480w, 800w - browser will gracefully skip missing widths
    widths: [480, 800, 1200],
    sizes: '100vw',
  },
  card: {
    widths: [320, 480, 768, 1024],
    sizes: '(min-width: 1024px) 33vw, 50vw',
  },
  thumb: {
    widths: [160, 320],
    sizes: '(max-width: 768px) 33vw, 160px',
  },
};

export const defaultPreset: ImagePreset = imagePresets.card;


