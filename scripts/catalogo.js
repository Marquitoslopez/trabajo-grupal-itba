(() => {
	const productCards = [...document.querySelectorAll('.product-card')];
	const categoryButtons = [...document.querySelectorAll(".filter-bar__pill")];
	const emptyState = document.querySelector('#catalog-empty');

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
})();