// Blog index filter and search logic (CSP-safe external script)
(function () {
  const searchInput = document.getElementById('search');
  const tagContainer = document.getElementById('tag-chips');
  const cards = Array.from(document.querySelectorAll('#posts-grid article'));
  const noResults = document.getElementById('no-results');
  const clearFiltersBtn = document.getElementById('clear-filters');

  let activeTag = 'all';
  let searchQuery = '';

  // Lookup maps curated chips to multiple synonyms for robust filtering
  function getActiveSynonyms(tag) {
    if (!tag || tag === 'all') return [];
    const btn = tagContainer && tagContainer.querySelector(`button[data-tag="${tag}"]`);
    const matches = btn && btn.getAttribute('data-match');
    return (matches || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  }

  function normalize(text) {
    return String(text || '')
      .replace(/[<>]/g, '')
      .toLowerCase();
  }

  function clearAllFilters() {
    // Reset search
    if (searchInput) {
      searchInput.value = '';
      searchQuery = '';
    }
    
    // Reset tag filter
    activeTag = 'all';
    
    // Update tag button states
    if (tagContainer) {
      tagContainer.querySelectorAll('button').forEach((btn) => {
        const isAll = btn.getAttribute('data-tag') === 'all';
        btn.classList.toggle('active', isAll);
        btn.setAttribute('aria-pressed', String(isAll));
      });
    }
    
    // Apply filters to show all posts
    applyFilters();
  }

  function applyFilters() {
    const q = normalize(searchInput && searchInput.value);
    searchQuery = q;
    const synonyms = getActiveSynonyms(activeTag);

    let visibleCount = 0;
    cards.forEach((card) => {
      const title = normalize(card.dataset.title);
      const excerpt = normalize(card.dataset.excerpt);
      const tags = normalize(card.dataset.tags);

      const matchesSearch = !q || title.includes(q) || excerpt.includes(q) || tags.includes(q);
      const matchesTag =
        activeTag === 'all' ||
        (tags && (
          tags.split(',').includes(normalize(activeTag)) ||
          synonyms.some((syn) => tags.includes(syn))
        ));

      const isVisible = matchesSearch && matchesTag;
      card.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (noResults) noResults.classList.toggle('hidden', visibleCount !== 0);
    
    // Update clear filters button state
    if (clearFiltersBtn) {
      const hasActiveFilters = q || activeTag !== 'all';
      clearFiltersBtn.style.opacity = hasActiveFilters ? '1' : '0.5';
      clearFiltersBtn.style.pointerEvents = hasActiveFilters ? 'auto' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(applyFilters);
      } else {
        applyFilters();
      }
    });
  }

  if (tagContainer) {
    tagContainer.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const tag = target.getAttribute('data-tag');
      if (!tag) return;

      activeTag = tag;
      // update pressed states
      tagContainer.querySelectorAll('button').forEach((btn) => {
        const pressed = btn.getAttribute('data-tag') === tag;
        btn.classList.toggle('active', pressed);
        btn.setAttribute('aria-pressed', String(pressed));
      });

      applyFilters();
    });
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }

  // Initial state
  applyFilters();
})();
