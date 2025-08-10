var currentCreativeItems = [];
var currentIndex = 0;
var previousActiveElement = null;
var touchStartX = 0;
var touchEndX = 0;

function initModal() {
  var modal = document.getElementById('creative-modal');
  if (!modal) return;

  modal.querySelector('#modal-backdrop') && modal.querySelector('#modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('#modal-close') && modal.querySelector('#modal-close').addEventListener('click', closeModal);
  modal.querySelector('#modal-prev') && modal.querySelector('#modal-prev').addEventListener('click', previousItem);
  modal.querySelector('#modal-next') && modal.querySelector('#modal-next').addEventListener('click', nextItem);

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') previousItem();
      if (e.key === 'ArrowRight') nextItem();
    }
  });

  // Basic swipe navigation for touch devices
  var media = modal.querySelector('#modal-media');
  if (media) {
    media.addEventListener('touchstart', function (e) {
      var t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      touchStartX = t.clientX;
    }, { passive: true });
    media.addEventListener('touchend', function (e) {
      var t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      touchEndX = t.clientX;
      var delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) previousItem(); else nextItem();
      }
    }, { passive: true });
  }
}

function openModal(creativeItems, startIndex) {
  if (startIndex === void 0) { startIndex = 0; }
  currentCreativeItems = Array.isArray(creativeItems) ? creativeItems : [];
  currentIndex = startIndex;
  var modal = document.getElementById('creative-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    previousActiveElement = document.activeElement;
    // Move focus into the dialog
    modal.setAttribute('tabindex', '-1');
    modal.focus();
    // Trap focus within the modal
    trapFocus(modal);
    updateModalContent();
  }
}

function closeModal() {
  var modal = document.getElementById('creative-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    // Restore focus to previously focused element
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }
}

function previousItem() {
  if (currentIndex > 0) {
    currentIndex--;
    updateModalContent();
  }
}

function nextItem() {
  if (currentIndex < currentCreativeItems.length - 1) {
    currentIndex++;
    updateModalContent();
  }
}

function updateModalContent() {
  var item = currentCreativeItems[currentIndex];
  if (!item) return;
  var modal = document.getElementById('creative-modal');
  if (!modal) return;

  var titleEl = modal.querySelector('#modal-title');
  var descEl = modal.querySelector('#modal-description');
  // Support items with "data" or simple { src, alt }
  if (titleEl) {
    if (item && typeof item === 'object' && 'data' in item && item.data) {
      var itemData = item.data;
      titleEl.textContent = (itemData.title) || '';
      if (descEl) descEl.textContent = (itemData.description) || '';
    } else {
      titleEl.textContent = (item && item.alt) || '';
      if (descEl) descEl.textContent = '';
    }
  }

  // Render media
  var mediaContainer = modal.querySelector('#modal-media');
  if (mediaContainer) {
    var src = (item && item.src) || (item && item.url) || '';
    var alt = (item && item.alt) || '';
    // Use object-contain so large images fit within viewport; provide max height
    mediaContainer.innerHTML = '';
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'eager';
    img.decoding = 'async';
    img.className = 'w-full max-h-[70vh] object-contain bg-background';
    mediaContainer.appendChild(img);

    // Preload neighbors to make navigation snappier
    var prev = currentCreativeItems[currentIndex - 1];
    var next = currentCreativeItems[currentIndex + 1];
    [prev, next].forEach(function (neighbor) {
      var neighborSrc = neighbor && (neighbor.src || neighbor.url);
      if (neighborSrc) {
        var preload = new Image();
        preload.src = neighborSrc;
      }
    });
  }

  var prevBtn = modal.querySelector('#modal-prev');
  var nextBtn = modal.querySelector('#modal-next');
  var counter = modal.querySelector('#modal-counter');
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === currentCreativeItems.length - 1;
  if (counter) counter.textContent = (currentIndex + 1) + ' of ' + currentCreativeItems.length;
}

function trapFocus(container) {
  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;
    var focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    var focusable = container.querySelectorAll(focusableSelectors.join(','));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  container.addEventListener('keydown', handleKeyDown);
}

document.addEventListener('DOMContentLoaded', function () {
  initModal();
  window.creativeModal = { open: openModal };
});


