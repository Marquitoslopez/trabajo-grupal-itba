(() => {
				const searchForm = document.querySelector('#catalog-search');
				const searchInput = document.querySelector('#catalog-search-input');
				const clearButton = document.querySelector('#catalog-search-clear');
				const searchPanel = document.querySelector('#catalog-search-panel');
				const closeSearchButton = document.querySelector('#catalog-search-close');
				const categoryButtons = [...document.querySelectorAll('.filter-bar__pill')];
				const productCards = [...document.querySelectorAll('.product-card')];
				const emptyState = document.querySelector('#catalog-empty');
				const resultStatus = document.querySelector('#catalog-result-status');
				const searchTriggers = [...document.querySelectorAll('[data-search-trigger]')];
				const mobileMenuToggle = document.querySelector('#header-menu-toggle');
				let activeCategory = 'all';
				let lastSearchTrigger = searchTriggers[0];

				const normalizeText = (text) => text
					.toLocaleLowerCase('es')
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.trim();

				function filterProducts() {
					const query = normalizeText(searchInput.value);
					let visibleProducts = 0;

					productCards.forEach((card) => {
						const title = card.querySelector('.product-card__title')?.textContent ?? '';
						const categories = card.dataset.category?.split(' ') ?? [];
						const matchesSearch = normalizeText(title).includes(query);
						const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
						const isVisible = matchesSearch && matchesCategory;

						card.hidden = !isVisible;

						if (isVisible) visibleProducts += 1;
					});

					clearButton.hidden = searchInput.value.length === 0;
					emptyState.hidden = visibleProducts !== 0;
					resultStatus.textContent = query
						? `${visibleProducts} ${visibleProducts === 1 ? 'producto encontrado' : 'productos encontrados'} para “${searchInput.value.trim()}”.`
						: 'Escribí el nombre del producto que estás buscando.';
				}

				function updateSearchTriggers(isOpen) {
					searchTriggers.forEach((trigger) => {
						trigger.setAttribute('aria-expanded', String(isOpen));
					});
				}

				function openSearch(trigger) {
					lastSearchTrigger = trigger;
					mobileMenuToggle.checked = false;
					searchPanel.classList.add('catalog-search-panel--open');
					searchPanel.setAttribute('aria-hidden', 'false');
					updateSearchTriggers(true);

					requestAnimationFrame(() => searchInput.focus());
				}

				function closeSearch(returnFocus = false) {
					searchPanel.classList.remove('catalog-search-panel--open');
					searchPanel.setAttribute('aria-hidden', 'true');
					updateSearchTriggers(false);

					if (returnFocus) lastSearchTrigger.focus();
				}

				searchForm.addEventListener('submit', (event) => {
					event.preventDefault();
					closeSearch();
					document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
				});

				searchInput.addEventListener('input', filterProducts);

				searchInput.addEventListener('keydown', (event) => {
					if (event.key === 'Escape') {
						closeSearch(true);
					}
				});

				clearButton.addEventListener('click', () => {
					searchInput.value = '';
					filterProducts();
					searchInput.focus();
				});

				categoryButtons.forEach((button) => {
					button.addEventListener('click', () => {
						activeCategory = button.dataset.filter;

						categoryButtons.forEach((categoryButton) => {
							const isActive = categoryButton === button;
							categoryButton.classList.toggle('filter-bar__pill--active', isActive);
							categoryButton.setAttribute('aria-selected', String(isActive));
						});

						filterProducts();
					});
				});

				searchTriggers.forEach((trigger) => {
					trigger.addEventListener('click', () => {
						const isOpen = searchPanel.classList.contains('catalog-search-panel--open');
						isOpen ? closeSearch() : openSearch(trigger);
					});
				});

				closeSearchButton.addEventListener('click', () => closeSearch(true));

				document.addEventListener('click', (event) => {
					if (
						searchPanel.classList.contains('catalog-search-panel--open') &&
						!event.target.closest('.header')
					) {
						closeSearch();
					}
				});
			})();