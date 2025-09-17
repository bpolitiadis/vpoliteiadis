document.addEventListener('DOMContentLoaded', function () {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var posts = document.querySelectorAll('[data-category]');
  var searchInput = document.getElementById('search');
  var noResults = document.getElementById('no-results');
  var postsGrid = document.getElementById('posts-grid');

  var activeFilters = { category: 'all', tag: 'all', search: '' };

  function filterPosts() {
    var visibleCount = 0;
    posts.forEach(function (post) {
      var category = post.getAttribute('data-category');
      var tags = (post.getAttribute('data-tags') || '').split(',');
      var title = (post.querySelector('h3') && post.querySelector('h3').textContent || '').toLowerCase();
      var description = (post.querySelector('p') && post.querySelector('p').textContent || '').toLowerCase();

      var categoryMatch = activeFilters.category === 'all' || category === activeFilters.category;
      var tagMatch = activeFilters.tag === 'all' || tags.includes(activeFilters.tag);
      var searchMatch = !activeFilters.search || title.includes(activeFilters.search.toLowerCase()) || description.includes(activeFilters.search.toLowerCase());

      if (categoryMatch && tagMatch && searchMatch) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults && noResults.classList.remove('hidden');
      postsGrid && postsGrid.classList.add('hidden');
    } else {
      noResults && noResults.classList.add('hidden');
      postsGrid && postsGrid.classList.remove('hidden');
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filterType = this.getAttribute('data-filter');
      var filterValue = this.getAttribute('data-value');
      if (filterType && filterValue) {
        document.querySelectorAll('[data-filter="' + filterType + '"]').forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        if (filterType === 'category' || filterType === 'tag') {
          activeFilters[filterType] = filterValue;
        }
        filterPosts();
      }
    });
  });

  searchInput && searchInput.addEventListener('input', function () {
    activeFilters.search = this.value;
    filterPosts();
  });
});


