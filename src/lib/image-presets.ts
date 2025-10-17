// Centralized responsive image presets for consistent usage across the app

export type ImagePreset = {
  widths: number[];
  sizes: string;
};

export const imagePresets: Record<string, ImagePreset> = {
  hero: {
    widths: [640, 960, 1280, 1920, 2560],
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


