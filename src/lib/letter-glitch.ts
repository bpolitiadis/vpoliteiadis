export const DEFAULT_GLITCH_COLORS = ['#2b4539', '#61dca3', '#61b3dc'] as const;

/** First color is the dark field; remaining colors are sparse accents. */
const FIELD_COLOR_WEIGHT = 0.85;

const LETTERS_AND_SYMBOLS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789';

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;

interface GlitchLetter {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function parseColor(color: string): Rgb | null {
  if (color.startsWith('rgb')) {
    const match = color.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return match
      ? { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) }
      : null;
  }

  let hex = color.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r: string, g: string, b: string) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null;
}

function interpolateColor(start: Rgb, end: Rgb, factor: number): string {
  return `rgb(${Math.round(start.r + (end.r - start.r) * factor)}, ${Math.round(start.g + (end.g - start.g) * factor)}, ${Math.round(start.b + (end.b - start.b) * factor)})`;
}

export function initLetterGlitch(canvas: HTMLCanvasElement): void {
  if (canvas.dataset.letterGlitchReady === '1') return;
  canvas.dataset.letterGlitchReady = '1';

  const parent = canvas.parentElement;
  if (!parent) return;

  let colors: string[] = [...DEFAULT_GLITCH_COLORS];
  try {
    const parsed = JSON.parse(canvas.dataset.glitchColors || '');
    if (Array.isArray(parsed) && parsed.length > 0) colors = parsed;
  } catch {
    // keep defaults
  }

  const glitchSpeed = Number(canvas.dataset.glitchSpeed) || 50;
  const smooth = canvas.dataset.smooth !== 'false';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animationId = 0;
  let lastGlitchTime = Date.now();
  let grid = { columns: 0, rows: 0 };
  let letters: GlitchLetter[] = [];

  const randomChar = () =>
    LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)];

  const randomColor = () => {
    if (colors.length === 1) return colors[0];
    if (Math.random() < FIELD_COLOR_WEIGHT) return colors[0];
    return colors[1 + Math.floor(Math.random() * (colors.length - 1))];
  };

  const initLetters = (columns: number, rows: number) => {
    grid = { columns, rows };
    letters = Array.from({ length: columns * rows }, () => ({
      char: randomChar(),
      color: randomColor(),
      targetColor: randomColor(),
      colorProgress: 1,
    }));
  };

  const drawLetters = () => {
    if (letters.length === 0) return;
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${FONT_SIZE}px monospace`;
    ctx.textBaseline = 'top';

    for (let index = 0; index < letters.length; index++) {
      const letter = letters[index];
      ctx.fillStyle = letter.color;
      ctx.fillText(
        letter.char,
        (index % grid.columns) * CHAR_WIDTH,
        Math.floor(index / grid.columns) * CHAR_HEIGHT
      );
    }
  };

  const resize = () => {
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initLetters(
      Math.ceil(rect.width / CHAR_WIDTH),
      Math.ceil(rect.height / CHAR_HEIGHT)
    );
    drawLetters();
  };

  const updateLetters = () => {
    const updateCount = Math.max(1, Math.floor(letters.length * 0.01));
    for (let i = 0; i < updateCount; i++) {
      const letter = letters[Math.floor(Math.random() * letters.length)];
      if (!letter) continue;
      letter.char = randomChar();
      letter.targetColor = randomColor();
      if (smooth) {
        letter.colorProgress = 0;
      } else {
        letter.color = letter.targetColor;
        letter.colorProgress = 1;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    for (const letter of letters) {
      if (letter.colorProgress >= 1) continue;
      letter.colorProgress = Math.min(1, letter.colorProgress + 0.05);
      const startRgb = parseColor(letter.color);
      const endRgb = parseColor(letter.targetColor);
      if (startRgb && endRgb) {
        letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
        needsRedraw = true;
      }
    }
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime = now;
    }
    if (smooth) handleSmoothTransitions();
    animationId = requestAnimationFrame(animate);
  };

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const startLoop = () => {
    if (reduceMotion) return;
    animate();
  };

  resize();
  startLoop();

  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(animationId);
    resize();
    startLoop();
  });
  observer.observe(parent);
}
