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

    for (var i = 0; i < drops.length; i++) {
      var text = matrix[Math.floor(Math.random() * matrix.length)];
      context.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] = drops[i] + 1;
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


