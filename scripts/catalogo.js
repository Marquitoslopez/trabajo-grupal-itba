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

				productCards.forEach((card) => {
					const productId = card.dataset.id;
					const productUrl = `./producto.html?id=${encodeURIComponent(productId)}`;

					card.querySelectorAll('.product-card__image-wrapper a, .product-card__link-detail').forEach((link) => {
						link.href = productUrl;
					});

					card.querySelector('[data-action="buy-now"]')?.addEventListener('click', () => {
						window.location.href = productUrl;
					});
				});

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

			(() => {
				const searchPanel = document.querySelector('#catalog-search-panel');
				const searchInput = document.querySelector('#catalog-search-input');
				const clearButton = document.querySelector('#catalog-search-clear');
				const discoverPanel = document.querySelector('#catalog-search-discover');
				const resultsContainer = document.querySelector('#catalog-search-results');
				const showAllButton = document.querySelector('#catalog-search-show-all');
				const resultStatus = document.querySelector('#catalog-result-status');
				const emptyState = document.querySelector('#catalog-empty');
				const mobileMenuToggle = document.querySelector('#header-menu-toggle');
				const searchTriggers = [...document.querySelectorAll('[data-search-trigger]')];
				const categoryButtons = [...document.querySelectorAll('.filter-bar__pill')];
				const suggestionButtons = [...document.querySelectorAll('[data-search-suggestion]')];
				const categoryLabels = {
					living: 'Living',
					habitacion: 'Habitación',
					cocina: 'Comedor',
					oficina: 'Oficina',
					casa: 'Casa'
				};
				let activeCategory = document.querySelector('.filter-bar__pill--active')?.dataset.filter ?? 'all';
				let activeResultIndex = -1;

				const normalizeText = (text) => String(text)
					.toLocaleLowerCase('es')
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.trim();

				const products = [...document.querySelectorAll('.product-card')].map((card) => {
					const productId = card.dataset.id;
					const title = card.querySelector('.product-card__title')?.textContent.trim() ?? '';
					const price = card.querySelector('.product-card__price')?.textContent.trim() ?? '';
					const image = card.querySelector('.product-card__image');
					const categories = card.dataset.category?.split(' ').filter(Boolean) ?? [];

					return {
						card,
						productId,
						title,
						price,
						imageSrc: image?.getAttribute('src') ?? '',
						categories,
						productUrl: `./producto.html?id=${encodeURIComponent(productId)}`,
						searchText: normalizeText([title, image?.alt, ...categories].join(' '))
					};
				});

				function appendHighlightedText(container, text, query) {
					const matchIndex = normalizeText(text).indexOf(query);

					if (!query || matchIndex < 0) {
						container.textContent = text;
						return;
					}

					container.append(document.createTextNode(text.slice(0, matchIndex)));
					const mark = document.createElement('mark');
					mark.textContent = text.slice(matchIndex, matchIndex + query.length);
					container.append(mark, document.createTextNode(text.slice(matchIndex + query.length)));
				}

				function createResult(product, query, index) {
					const link = document.createElement('a');
					link.className = 'catalog-search-result';
					link.href = product.productUrl;
					link.id = `catalog-search-option-${index}`;
					link.dataset.searchResult = '';
					link.setAttribute('role', 'option');
					link.setAttribute('aria-selected', 'false');

					const imageWrap = document.createElement('span');
					imageWrap.className = 'catalog-search-result__image';
					const image = document.createElement('img');
					image.src = product.imageSrc;
					image.alt = '';
					image.loading = 'lazy';
					imageWrap.append(image);

					const copy = document.createElement('span');
					copy.className = 'catalog-search-result__copy';
					const name = document.createElement('strong');
					appendHighlightedText(name, product.title, query);
					const detail = document.createElement('span');
					const category = categoryLabels[product.categories[0]] ?? 'Mueble de autor';
					detail.textContent = `${category} · ${product.price}`;
					copy.append(name, detail);

					const arrow = document.createElement('span');
					arrow.className = 'catalog-search-result__arrow';
					arrow.setAttribute('aria-hidden', 'true');
					arrow.textContent = '↗';
					link.append(imageWrap, copy, arrow);
					return link;
				}

				function getMatches(query) {
					return products
						.filter((product) => {
							const matchesSearch = !query || product.searchText.includes(query);
							const matchesCategory = activeCategory === 'all' || product.categories.includes(activeCategory);
							return matchesSearch && matchesCategory;
						})
						.sort((first, second) => {
							const firstStarts = normalizeText(first.title).startsWith(query) ? 0 : 1;
							const secondStarts = normalizeText(second.title).startsWith(query) ? 0 : 1;
							return firstStarts - secondStarts;
						});
				}

				function renderResults(matches, query) {
					resultsContainer.replaceChildren();
					activeResultIndex = -1;
					searchInput.removeAttribute('aria-activedescendant');

					if (!query || matches.length === 0) {
						resultsContainer.hidden = true;
						searchInput.setAttribute('aria-expanded', 'false');
						return;
					}

					const fragment = document.createDocumentFragment();
					matches.slice(0, 6).forEach((product, index) => {
						fragment.append(createResult(product, query, index));
					});

					resultsContainer.append(fragment);
					resultsContainer.hidden = false;
					searchInput.setAttribute('aria-expanded', 'true');
				}

				function enhancedFilter() {
					const query = normalizeText(searchInput.value);
					const matches = getMatches(query);
					const matchingIds = new Set(matches.map((product) => product.productId));

					products.forEach((product) => {
						product.card.hidden = !matchingIds.has(product.productId);
					});

					clearButton.hidden = searchInput.value.length === 0;
					discoverPanel.hidden = Boolean(query);
					emptyState.hidden = matches.length !== 0;
					showAllButton.hidden = !query || matches.length === 0;
					showAllButton.childNodes[0].nodeValue = matches.length === 1 ? 'Ver producto ' : `Ver los ${matches.length} productos `;
					renderResults(matches, query);

					resultStatus.textContent = query
						? matches.length
							? `${matches.length} ${matches.length === 1 ? 'coincidencia encontrada' : 'coincidencias encontradas'}.`
							: `No encontramos resultados para “${searchInput.value.trim()}”.`
						: 'Escribí para ver resultados al instante.';
				}

				function setActiveResult(index) {
					const options = [...resultsContainer.querySelectorAll('[data-search-result]')];
					if (options.length === 0) return;

					activeResultIndex = (index + options.length) % options.length;
					options.forEach((option, optionIndex) => {
						const active = optionIndex === activeResultIndex;
						option.classList.toggle('catalog-search-result--active', active);
						option.setAttribute('aria-selected', String(active));
					});

					const activeOption = options[activeResultIndex];
					searchInput.setAttribute('aria-activedescendant', activeOption.id);
					activeOption.scrollIntoView({ block: 'nearest' });
				}

				function openSearch() {
					if (mobileMenuToggle) mobileMenuToggle.checked = false;
					searchPanel.classList.add('catalog-search-panel--open');
					searchPanel.setAttribute('aria-hidden', 'false');
					document.body.classList.add('catalog-search-open');
					searchTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'true'));
					enhancedFilter();
					requestAnimationFrame(() => searchInput.focus());
				}

				function showCatalogResults() {
					searchPanel.classList.remove('catalog-search-panel--open');
					searchPanel.setAttribute('aria-hidden', 'true');
					document.body.classList.remove('catalog-search-open');
					searchTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
					document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
				}

				searchInput.addEventListener('input', enhancedFilter);
				searchInput.addEventListener('keydown', (event) => {
					if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
						event.preventDefault();
						setActiveResult(activeResultIndex + (event.key === 'ArrowDown' ? 1 : -1));
					}

					if (event.key === 'Enter') {
						const activeOption = resultsContainer.querySelector('.catalog-search-result--active');
						if (activeOption) {
							event.preventDefault();
							activeOption.click();
						}
					}
				});

				clearButton.addEventListener('click', enhancedFilter);
				suggestionButtons.forEach((button) => {
					button.addEventListener('click', () => {
						searchInput.value = button.dataset.searchSuggestion;
						enhancedFilter();
						searchInput.focus();
					});
				});

				categoryButtons.forEach((button) => {
					button.addEventListener('click', () => {
						activeCategory = button.dataset.filter;
						enhancedFilter();
					});
				});

				searchTriggers.forEach((trigger) => {
					trigger.addEventListener('click', () => {
						requestAnimationFrame(() => {
							const isOpen = searchPanel.classList.contains('catalog-search-panel--open');
							document.body.classList.toggle('catalog-search-open', isOpen);
							if (isOpen) enhancedFilter();
						});
					});
				});

				showAllButton.addEventListener('click', showCatalogResults);

				document.addEventListener('keydown', (event) => {
					const shortcutPressed = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
					const slashPressed = event.key === '/' && !event.target.closest('input, textarea, select, [contenteditable]');

					if (shortcutPressed || slashPressed) {
						event.preventDefault();
						openSearch();
					}

					if (event.key === 'Escape') {
						document.body.classList.remove('catalog-search-open');
						searchTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
					}
				});

				document.addEventListener('click', () => {
					requestAnimationFrame(() => {
						document.body.classList.toggle(
							'catalog-search-open',
							searchPanel.classList.contains('catalog-search-panel--open')
						);
					});
				});
			})();
