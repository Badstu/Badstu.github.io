document.addEventListener('DOMContentLoaded', () => {
  const browser = document.querySelector('[data-blog-browser]');
  if (!browser) return;

  const grid = browser.querySelector('[data-blog-grid]');
  const cards = Array.from(browser.querySelectorAll('[data-blog-card]'));
  const countLabel = browser.querySelector('[data-blog-count]');
  const emptyState = browser.querySelector('[data-blog-empty]');
  const resetButton = browser.querySelector('[data-blog-reset]');
  const sortButtons = Array.from(browser.querySelectorAll('[data-blog-sort]'));
  const filterGroups = Array.from(browser.querySelectorAll('[data-blog-filter-group]'));
  const state = { year: '', month: '', category: '', sort: 'newest' };

  const updatePressedState = (buttons, activeValue, attribute) => {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.getAttribute(attribute) === activeValue));
    });
  };

  const updateUrl = () => {
    const parameters = new URLSearchParams();
    if (state.year) parameters.set('year', state.year);
    if (state.month) parameters.set('month', state.month);
    if (state.category) parameters.set('category', state.category);
    if (state.sort !== 'newest') parameters.set('sort', state.sort);
    const query = parameters.toString();
    history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}`);
  };

  const applyFilters = () => {
    const sortedCards = [...cards].sort((firstCard, secondCard) => {
      const difference = Number(firstCard.dataset.date) - Number(secondCard.dataset.date);
      return state.sort === 'oldest' ? difference : -difference;
    });

    let visibleCount = 0;
    sortedCards.forEach((card) => {
      const categories = card.dataset.categories.split('|').filter(Boolean);
      const visible = (!state.year || card.dataset.year === state.year)
        && (!state.month || card.dataset.month === state.month)
        && (!state.category || categories.includes(state.category));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
      grid.appendChild(card);
    });

    countLabel.textContent = String(visibleCount);
    emptyState.hidden = visibleCount !== 0;
    updatePressedState(sortButtons, state.sort, 'data-blog-sort');
    filterGroups.forEach((group) => {
      updatePressedState(Array.from(group.querySelectorAll('[data-filter-value]')), state[group.dataset.blogFilterGroup], 'data-filter-value');
    });
    updateUrl();
  };

  const parameters = new URLSearchParams(location.search);
  state.year = parameters.get('year') || '';
  state.month = parameters.get('month') || '';
  state.category = parameters.get('category') || '';
  state.sort = parameters.get('sort') === 'oldest' ? 'oldest' : 'newest';

  filterGroups.forEach((group) => {
    group.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter-value]');
      if (!button) return;
      const filterName = group.dataset.blogFilterGroup;
      state[filterName] = button.dataset.filterValue;
      if (filterName === 'year' && state.month) state.month = '';
      if (filterName === 'month' && state.year) state.year = '';
      applyFilters();
    });
  });

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.sort = button.dataset.blogSort;
      applyFilters();
    });
  });

  resetButton.addEventListener('click', () => {
    state.year = '';
    state.month = '';
    state.category = '';
    state.sort = 'newest';
    applyFilters();
  });

  const dialog = browser.querySelector('[data-blog-search-dialog]');
  const openSearchButton = browser.querySelector('[data-blog-search-open]');
  const closeSearchButton = browser.querySelector('[data-blog-search-close]');
  const searchInput = browser.querySelector('[data-blog-search]');
  const searchResults = Array.from(browser.querySelectorAll('[data-blog-search-result]'));
  const searchEmpty = browser.querySelector('[data-blog-search-empty]');
  const normalize = (value) => value.trim().toLocaleLowerCase(document.documentElement.lang);

  const applySearch = () => {
    const query = normalize(searchInput.value);
    let matches = 0;
    searchResults.forEach((result) => {
      const visible = !query || normalize(result.dataset.search).includes(query);
      result.hidden = !visible;
      if (visible) matches += 1;
    });
    searchEmpty.hidden = matches !== 0;
  };

  const openSearch = () => {
    if (dialog.open) return;
    dialog.showModal();
    requestAnimationFrame(() => searchInput.focus());
  };

  openSearchButton.addEventListener('click', openSearch);
  closeSearchButton.addEventListener('click', () => dialog.close());
  searchInput.addEventListener('input', applySearch);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });

  applyFilters();
  applySearch();
});
