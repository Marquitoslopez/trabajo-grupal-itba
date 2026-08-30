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

	categoryButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const filter = button.dataset.filter;

			// Actualiza el estado visual de los pills (activo/inactivo)
			categoryButtons.forEach((btn) => {
				const isActive = btn === button;
				btn.classList.toggle('filter-bar__pill--active', isActive);
				btn.setAttribute('aria-selected', String(isActive));
			});

			applyFilter(filter);
		});
	});

	// Aplica el filtro inicial (el que esté marcado como activo al cargar la página)
	const initialFilter = document.querySelector('.filter-bar__pill--active')?.dataset.filter ?? 'all';
	applyFilter(initialFilter);
})();