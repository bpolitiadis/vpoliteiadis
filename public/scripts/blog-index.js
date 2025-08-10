// Blog index filter and search logic (CSP-safe external script)
(function () {
  const searchInput = document.getElementById('search');
  const tagContainer = document.getElementById('tag-chips');
  const cards = Array.from(document.querySelectorAll('#posts-grid article'));
  const noResults = document.getElementById('no-results');

  let activeTag = 'all';
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

  function applyFilters() {
    const q = normalize(searchInput && searchInput.value);
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

  // Initial state
  applyFilters();
})();
