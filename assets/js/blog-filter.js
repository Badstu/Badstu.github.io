document.addEventListener('DOMContentLoaded', () => {
  const browser = document.querySelector('[data-blog-browser]');
  if (!browser) return;

  const searchInput = browser.querySelector('[data-blog-search]');
  const yearSelect = browser.querySelector('[data-blog-year]');
  const monthSelect = browser.querySelector('[data-blog-month]');
  const categorySelect = browser.querySelector('[data-blog-category]');
  const sortSelect = browser.querySelector('[data-blog-sort]');
  const resetButton = browser.querySelector('[data-blog-reset]');
  const countLabel = browser.querySelector('[data-blog-count]');
  const emptyState = browser.querySelector('[data-blog-empty]');
  const grid = browser.querySelector('[data-blog-grid]');
  const cards = Array.from(browser.querySelectorAll('[data-blog-card]'));
  const collator = new Intl.Collator(document.documentElement.lang, { sensitivity: 'base' });

  const normalize = (value) => value.trim().toLocaleLowerCase(document.documentElement.lang);

  const updateUrl = () => {
    const parameters = new URLSearchParams();
    if (searchInput.value) parameters.set('q', searchInput.value);
    if (yearSelect.value) parameters.set('year', yearSelect.value);
    if (monthSelect.value) parameters.set('month', monthSelect.value);
    if (categorySelect.value) parameters.set('category', categorySelect.value);
    if (sortSelect.value !== 'newest') parameters.set('sort', sortSelect.value);
    const query = parameters.toString();
    history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}`);
  };

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const year = yearSelect.value;
    const month = monthSelect.value;
    const category = categorySelect.value;
    const order = sortSelect.value;

    const sortedCards = [...cards].sort((firstCard, secondCard) => {
      if (order === 'title') return collator.compare(firstCard.dataset.title, secondCard.dataset.title);
      const difference = Number(firstCard.dataset.date) - Number(secondCard.dataset.date);
      return order === 'oldest' ? difference : -difference;
    });

    let visibleCount = 0;
    sortedCards.forEach((card) => {
      const categories = card.dataset.categories.split('|').filter(Boolean);
      const visible = (!query || normalize(card.dataset.search).includes(query))
        && (!year || card.dataset.year === year)
        && (!month || card.dataset.month === month)
        && (!category || categories.includes(category));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
      grid.appendChild(card);
    });

    countLabel.textContent = String(visibleCount);
    emptyState.hidden = visibleCount !== 0;
    updateUrl();
  };

  const parameters = new URLSearchParams(location.search);
  searchInput.value = parameters.get('q') || '';
  yearSelect.value = parameters.get('year') || '';
  monthSelect.value = parameters.get('month') || '';
  categorySelect.value = parameters.get('category') || '';
  sortSelect.value = parameters.get('sort') || 'newest';

  [searchInput, yearSelect, monthSelect, categorySelect, sortSelect].forEach((control) => {
    control.addEventListener(control === searchInput ? 'input' : 'change', applyFilters);
  });

  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    yearSelect.value = '';
    monthSelect.value = '';
    categorySelect.value = '';
    sortSelect.value = 'newest';
    applyFilters();
  });

  applyFilters();
});
