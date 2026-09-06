(() => {
	const catalogGrid = document.querySelector('#catalog-grid');
	const categoryButtons = [...document.querySelectorAll(".filter-bar__pill")];
	const emptyState = document.querySelector('#catalog-empty');
	const formatMoney = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		maximumFractionDigits: 0
	});

	function loadCatalogProducts() {
		return new Promise((resolve, reject) => {
			window.setTimeout(() => {
				if (!Array.isArray(window.catalogProducts)) {
					reject(new Error('No se pudo cargar el catálogo de productos.'));
					return;
				}

				resolve(window.catalogProducts);
			}, 300);
		});
	}

	function createProductCard(product) {
		const productUrl = `./producto.html?id=${encodeURIComponent(product.id)}`;
		const card = document.createElement('article');
		card.className = 'product-card';
		card.dataset.id = product.id;
		card.dataset.category = product.categories;
		card.innerHTML = `
			<header class="product-card__header">
				<div class="product-card__info">
					<h3 class="product-card__title">${product.name}</h3>
					<p class="product-card__price">${formatMoney.format(product.price)}</p>
				</div>
				<div class="product-card__swatches" aria-label="Variantes de color disponibles">
					<span class="product-card__swatch product-card__swatch--dark" title="Nogal Oscuro"></span>
					<span class="product-card__swatch product-card__swatch--gold" title="Cera Roble"></span>
					<span class="product-card__swatch product-card__swatch--wood" title="Madera Natural"></span>
				</div>
			</header>
			<div class="product-card__image-wrapper">
				<a href="${productUrl}" aria-label="Ver detalle de ${product.name}">
					<img src="../assets/${product.image}" alt="${product.alt}" class="product-card__image"
						loading="lazy" width="300" height="220" />
				</a>
			</div>
			<div class="product-card__actions">
				<div class="product-card__primary-actions">
					<button type="button" class="btn btn--primary" data-action="buy-now"
						data-id="${product.id}">Comprar</button>
					<button type="button" class="btn btn--gold" data-action="add-cart" data-id="${product.id}"
						aria-label="Agregar ${product.name} al carrito">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" aria-hidden="true" focusable="false">
							<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
							<line x1="3" y1="6" x2="21" y2="6" />
							<path d="M16 10a4 4 0 0 1-8 0" />
						</svg>
					</button>
				</div>
				<div class="product-card__secondary-actions">
					<a href="${productUrl}" class="product-card__link-detail">Ver detalle</a>
					<button type="button" class="btn--icon" data-action="toggle-fav" data-id="${product.id}"
						aria-label="Añadir ${product.name} a favoritos" aria-pressed="false">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" aria-hidden="true" focusable="false">
							<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
						</svg>
					</button>
				</div>
			</div>
		`;
		return card;
	}

	async function initializeCatalog() {
		if (!catalogGrid) {
			throw new Error('No se encontró la grilla del catálogo.');
		}

		catalogGrid.setAttribute('aria-busy', 'true');
		catalogGrid.textContent = 'Cargando productos...';
		const products = await loadCatalogProducts();
		catalogGrid.replaceChildren(...products.map(createProductCard));
		catalogGrid.removeAttribute('aria-busy');

		const productCards = [...catalogGrid.querySelectorAll('.product-card')];

		productCards.forEach((card) => {
			const productId = card.dataset.id;
			const productUrl = new URL(
				`./producto.html?id=${encodeURIComponent(productId)}`,
				window.location.href
			).href;

			card.querySelectorAll('.product-card__image-wrapper a, .product-card__link-detail').forEach((link) => {
				link.href = productUrl;
			});

			card.querySelector('[data-action="buy-now"]')?.addEventListener('click', () => {
				window.location.href = productUrl;
			});
		});

		function applyFilter(filter) {
			let visibleCount = 0;

			productCards.forEach((card) => {
				// data-category puede tener varias palabras separadas por espacio, ej: "living casa"
				const categories = (card.dataset.category || '').split(/\s+/);
				const matches = filter === 'all' || categories.includes(filter);

				card.hidden = !matches;
				if (matches) visibleCount += 1;
			});

			if (emptyState) {
				emptyState.hidden = visibleCount !== 0;
			}
		}

		function setActivePill(filter) {
			let matchedButton = null;

			categoryButtons.forEach((btn) => {
				const isActive = btn.dataset.filter === filter;
				btn.classList.toggle('filter-bar__pill--active', isActive);
				btn.setAttribute('aria-selected', String(isActive));
				if (isActive) matchedButton = btn;
			});

			return matchedButton;
		}

		categoryButtons.forEach((button) => {
			button.addEventListener('click', () => {
				setActivePill(button.dataset.filter);
				applyFilter(button.dataset.filter);
			});
		});

		// Si llegamos con ?categoria=cocina (por ejemplo, desde "Explorar Colección" en el inicio),
		// usamos ese valor. Si no, respetamos el pill marcado como activo en el HTML, o "all".
		const urlParams = new URLSearchParams(window.location.search);
		const categoryFromUrl = urlParams.get('categoria');
		const validFilters = categoryButtons.map((btn) => btn.dataset.filter);

		const initialFilter =
			categoryFromUrl && validFilters.includes(categoryFromUrl)
				? categoryFromUrl
				: (document.querySelector('.filter-bar__pill--active')?.dataset.filter ?? 'all');

		setActivePill(initialFilter);
		applyFilter(initialFilter);

		// Si el filtro vino por URL, hacemos scroll directo a la grilla de productos
		if (categoryFromUrl && validFilters.includes(categoryFromUrl)) {
			document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	initializeCatalog();
})();
