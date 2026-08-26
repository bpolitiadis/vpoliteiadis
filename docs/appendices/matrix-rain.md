# Archived: Matrix Rain (canvas)

Removed from the live site on 2026-08-26. Homepage uses **LetterGlitch** (in-place character field) and headings use **DecryptedText**. This file is the restore recipe if we want falling columns again.

**Do not re-enable on the homepage** without a product decision. The old script had an infinite 100ms retry when `#matrixCanvas` was missing, and it dispatched `matrixRainFilled` for a hero sequence that no longer exists.

## Last live usage

- Canvas: `#matrixCanvas` on `src/pages/404.astro`
- Script: `/public/scripts/matrix-rain.js` loaded with `<script is:inline src="/scripts/matrix-rain.js">`

Markup:

```html
<div class="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
  <canvas id="matrixCanvas" class="w-full h-full opacity-20" style="filter: blur(0.5px);"></canvas>
</div>
<script is:inline src="/scripts/matrix-rain.js"></script>
```

Unused Tailwind leftovers (also removed):

```js
animation: {
  'matrix-rain': 'matrixRain 20s linear infinite',
},
keyframes: {
  matrixRain: {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(100vh)' },
  },
},
```

## Script (`public/scripts/matrix-rain.js`)

```js
function initMatrixRain() {
  try {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
  } catch (_) {}
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrixRain);
    return;
  }

  var el = document.getElementById('matrixCanvas');
  if (!(el instanceof HTMLCanvasElement)) {
    console.warn('Matrix canvas not found, retrying in 100ms...');
    setTimeout(initMatrixRain, 100);
    return;
  }

  var canvas = el;
  var ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2D context for matrix canvas');
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  var matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'.split('');
  var fontSize = 14;
  var columns = Math.floor(window.innerWidth / fontSize);
  var drops = new Array(columns).fill(1);

  // Time-based stepping to control vertical speed without extra per-frame work
  var rafId;
  var lastUpdateTimestamp;
  var rowsPerSecond = 14; // tuned for a classic Matrix-like pace
  var stepMs = 1000 / rowsPerSecond;

  // Track if matrix has filled the screen to trigger hero sequence
  var hasFilledScreen = false;
  var screenFillThreshold = 0.7; // 70% of screen filled

  function draw(now) {
    if (lastUpdateTimestamp === undefined) {
      lastUpdateTimestamp = now;
    }

    var elapsedMs = now - lastUpdateTimestamp;
    if (elapsedMs < stepMs) {
      rafId = window.requestAnimationFrame(draw);
      return;
    }
    // Keep cadence stable if frames are irregular
    lastUpdateTimestamp = now - (elapsedMs % stepMs);

    var context = ctx;
    // Slightly stronger fade since updates are less frequent than 60fps
    context.fillStyle = 'rgba(10, 10, 10, 0.08)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#39FF14';
    context.font = fontSize + 'px monospace';

    // Count how many drops are active to determine screen fill
    var activeDrops = 0;
    for (var i = 0; i < drops.length; i++) {
      var text = matrix[Math.floor(Math.random() * matrix.length)];
      context.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] = drops[i] + 1;

      // Count drops that are visible on screen
      if (drops[i] * fontSize > 0 && drops[i] * fontSize < canvas.height) {
        activeDrops++;
      }
    }

    // Check if matrix has filled enough of the screen to trigger hero sequence
    var screenFillRatio = activeDrops / columns;
    if (!hasFilledScreen && screenFillRatio >= screenFillThreshold) {
      hasFilledScreen = true;
      console.log('🌊 Matrix rain has filled the screen, starting hero sequence');

      // Trigger hero sequence by dispatching a custom event
      window.dispatchEvent(new CustomEvent('matrixRainFilled', {
        detail: { screenFillRatio, activeDrops, totalColumns: columns }
      }));
    }

    rafId = window.requestAnimationFrame(draw);
  }

  // Kick off when browser is idle or after a short delay
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(function () { rafId = window.requestAnimationFrame(draw); }, { timeout: 300 });
  } else {
    setTimeout(function () { rafId = window.requestAnimationFrame(draw); }, 200);
  }

  // Cleanup on page hide to save CPU
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !rafId) {
      rafId = window.requestAnimationFrame(draw);
    }
  });
}

// Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
  initMatrixRain();
} else {
  document.addEventListener('DOMContentLoaded', initMatrixRain);
}
```

## If restoring

1. Put the script back at `public/scripts/matrix-rain.js`.
2. Add `#matrixCanvas` only on the page that should rain.
3. Cap the missing-canvas retry (max attempts or stop). Do not retry forever.
4. Drop `matrixRainFilled` unless a consumer listens for it.
5. Keep `prefers-reduced-motion`.
