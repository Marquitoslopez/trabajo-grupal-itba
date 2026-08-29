(() => {
	const productCards = [...document.querySelectorAll('.product-card')];

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
})();