function initMatrixRain() {
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

  function draw() {
    var context = ctx;
    context.fillStyle = 'rgba(10, 10, 10, 0.04)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#39FF14';
    context.font = fontSize + 'px monospace';

    for (var i = 0; i < drops.length; i++) {
      var text = matrix[Math.floor(Math.random() * matrix.length)];
      context.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 35);
}

// Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
  initMatrixRain();
} else {
  document.addEventListener('DOMContentLoaded', initMatrixRain);
}


