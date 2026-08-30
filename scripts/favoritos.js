(() => {
	const FAV_STORAGE_KEY = 'hermanosJotaFavorites';
	const currentScriptUrl = document.currentScript?.src || new URL('scripts/favoritos.js', document.baseURI).href;
	const assetsBaseUrl = new URL('../assets/', currentScriptUrl);
	const productPageUrl = new URL('../pages/producto.html', currentScriptUrl);

	// Mismo catálogo que carrito.js, así este archivo funciona de forma independiente.
	const products = {
		p1: { name: 'Sofá Patagonia', price: 155000, image: 'sofa-patagonia.png' },
		p2: { name: 'Sillón Copacabana', price: 190000, image: 'sillon-copacabana.png' },
		p3: { name: 'Butaca Mendoza', price: 110000, image: 'butaca-mendoza.png' },
		p4: { name: 'Mesa de Centro Araucaria', price: 159000, image: 'mesa-de-centro-araucaria.png' },
		p5: { name: 'Mesa de Noche Aconcagua', price: 146000, image: 'mesa-de-noche-aconcagua.png' },
		p6: { name: 'Biblioteca Recoleta', price: 125000, image: 'biblioteca-recoleta.png' },
		p7: { name: 'Mesa Comedor Pampa', price: 174000, image: 'mesa-comedor-pampa.png' },
		p8: { name: 'Sillas Córdoba', price: 163000, image: 'sillas-cordoba.png' },
		p9: { name: 'Aparador Uspallata', price: 137000, image: 'aparador-uspallata.png' },
		p10: { name: 'Escritorio Costa', price: 170000, image: 'escritorio-costa.png' },
		p11: { name: 'Silla de Trabajo Belgrano', price: 140000, image: 'silla-de-trabajo-belgrano.png' }
	};

	const formatMoney = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		maximumFractionDigits: 0
	});

	let favChannel = null;
	let lastFavTrigger = null;

	function sanitizeFavorites(value) {
		if (!Array.isArray(value)) return [];
		const unique = [];
		value.forEach((id) => {
			if (typeof id === 'string' && Object.hasOwn(products, id) && !unique.includes(id)) {
				unique.push(id);
			}
		});
		return unique;
	}

	function readFavorites() {
		try {
			return sanitizeFavorites(JSON.parse(localStorage.getItem(FAV_STORAGE_KEY)));
		} catch {
			return [];
		}
	}

	function writeFavorites(list) {
		const validList = sanitizeFavorites(list);
		try {
			localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(validList));
			favChannel?.postMessage({ type: 'favorites-updated' });
			return true;
		} catch {
			return false;
		}
	}

	function productDetailUrl(productId) {
		const url = new URL(productPageUrl.href);
		url.searchParams.set('id', productId);
		return url.href;
	}

	function getFavTriggers() {
		return [...document.querySelectorAll('.header__action-btn[aria-label^="Ver favoritos"]')];
	}

	function ensureFavBadge(button) {
		let badge = button.querySelector('.header__fav-count');
		if (!badge) {
			badge = document.createElement('span');
			badge.className = 'header__fav-count';
			badge.setAttribute('aria-hidden', 'true');
			button.append(badge);
		}
		return badge;
	}

	function updateFavCounters() {
		const total = readFavorites().length;

		getFavTriggers().forEach((button) => {
			ensureFavBadge(button).textContent = String(total);
			button.setAttribute('aria-label', `Ver favoritos, ${total} ${total === 1 ? 'guardado' : 'guardados'}`);
			button.setAttribute('aria-controls', 'favorites-drawer');
			button.setAttribute('aria-expanded', String(document.body.classList.contains('favorites-drawer-open')));
		});

		return total;
	}

	function syncToggleButtons() {
		const favorites = readFavorites();

		document.querySelectorAll('[data-action="toggle-fav"]').forEach((button) => {
			const productId = button.dataset.id;
			const product = products[productId];
			const active = favorites.includes(productId);

			button.setAttribute('aria-pressed', String(active));
			if (product) {
				button.setAttribute('aria-label', `${active ? 'Quitar' : 'Añadir'} ${product.name} ${active ? 'de' : 'a'} favoritos`);
			}
		});
	}

	function createFavoritesInterface() {
		if (document.querySelector('#favorites-drawer')) return;

		document.body.insertAdjacentHTML('beforeend', `
			<div class="fav-drawer-backdrop" id="favorites-drawer-backdrop" aria-hidden="true"></div>

			<aside class="fav-drawer" id="favorites-drawer" aria-labelledby="favorites-drawer-title" aria-hidden="true">
				<header class="fav-drawer__header">
					<div>
						<span class="fav-drawer__eyebrow">TUS PIEZAS GUARDADAS</span>
						<h2 id="favorites-drawer-title">Favoritos</h2>
					</div>

					<button type="button" class="fav-drawer__close" data-fav-action="close" aria-label="Cerrar favoritos">
						<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
				</header>

				<div class="fav-drawer__body">
					<div class="fav-drawer__empty" id="favorites-drawer-empty">
						<span class="fav-drawer__empty-icon" aria-hidden="true">
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
								<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
							</svg>
						</span>
						<h3>Todavía no guardaste piezas</h3>
						<p>Tocá el corazón en un producto para guardarlo acá.</p>
					</div>

					<div class="fav-drawer__items" id="favorites-drawer-items" hidden></div>
				</div>
			</aside>
		`);
	}

	function createFavItem(productId) {
		const product = products[productId];
		const imageUrl = new URL(product.image, assetsBaseUrl).href;

		return `
			<article class="fav-item" data-fav-product="${productId}">
				<a class="fav-item__image-link" href="${productDetailUrl(productId)}" aria-label="Ver ${product.name}">
					<img src="${imageUrl}" alt="${product.name}" class="fav-item__image" />
				</a>

				<div class="fav-item__content">
					<div class="fav-item__heading">
						<div>
							<a href="${productDetailUrl(productId)}" class="fav-item__name">${product.name}</a>
							<span class="fav-item__price">${formatMoney.format(product.price)}</span>
						</div>

						<button type="button" class="fav-item__remove" data-fav-action="remove" data-id="${productId}" aria-label="Quitar ${product.name} de favoritos">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
					</div>

					<button type="button" class="fav-item__move btn btn--gold" data-fav-action="move-to-cart" data-id="${productId}">
						Llevar al carrito
					</button>
				</div>
			</article>
		`;
	}

	function renderFavorites() {
		if (!document.querySelector('#favorites-drawer')) return;

		const favorites = readFavorites();
		const emptyState = document.querySelector('#favorites-drawer-empty');
		const itemsContainer = document.querySelector('#favorites-drawer-items');

		emptyState.hidden = favorites.length > 0;
		itemsContainer.hidden = favorites.length === 0;
		itemsContainer.innerHTML = favorites.map(createFavItem).join('');
	}

	function openFavorites(trigger) {
		lastFavTrigger = trigger || lastFavTrigger || getFavTriggers()[0];
		document.body.classList.add('favorites-drawer-open');
		document.querySelector('#favorites-drawer').setAttribute('aria-hidden', 'false');
		document.querySelector('#favorites-drawer-backdrop').setAttribute('aria-hidden', 'false');
		getFavTriggers().forEach((button) => button.setAttribute('aria-expanded', 'true'));
		renderFavorites();
		document.querySelector('.fav-drawer__close').focus();
	}

	function closeFavorites(returnFocus = false) {
		document.body.classList.remove('favorites-drawer-open');
		document.querySelector('#favorites-drawer').setAttribute('aria-hidden', 'true');
		document.querySelector('#favorites-drawer-backdrop').setAttribute('aria-hidden', 'true');
		getFavTriggers().forEach((button) => button.setAttribute('aria-expanded', 'false'));

		if (returnFocus) lastFavTrigger?.focus();
	}

	function toggleFavorite(productId, sourceButton) {
		if (!Object.hasOwn(products, productId)) return;

		const favorites = readFavorites();
		const index = favorites.indexOf(productId);

		if (index === -1) {
			favorites.push(productId);
		} else {
			favorites.splice(index, 1);
		}

		if (writeFavorites(favorites)) {
			syncToggleButtons();
			updateFavCounters();
			renderFavorites();

			sourceButton?.animate?.(
				[
					{ transform: 'scale(1)' },
					{ transform: 'scale(1.15)' },
					{ transform: 'scale(1)' }
				],
				{ duration: 220, easing: 'ease-out' }
			);
		}
	}

	function removeFavorite(productId) {
		const favorites = readFavorites().filter((id) => id !== productId);
		if (writeFavorites(favorites)) {
			syncToggleButtons();
			updateFavCounters();
			renderFavorites();
		}
	}

	function moveToCart(productId, sourceButton) {
		// Se apoya en la API pública que expone carrito.js (window.HermanosJotaCart).
		// Si por algún motivo carrito.js no cargó todavía, simplemente no se agrega al carrito
		// pero sí se saca de favoritos para no dejar la interfaz en un estado raro.
		if (typeof window.HermanosJotaCart?.add === 'function') {
			window.HermanosJotaCart.add(productId, sourceButton);
		}
		removeFavorite(productId);
	}

	function refreshFavoritesInterface() {
		syncToggleButtons();
		updateFavCounters();
		renderFavorites();
	}

	function initializeFavChannel() {
		try {
			if (!('BroadcastChannel' in window)) return;
			favChannel = new BroadcastChannel('hermanos-jota-favorites');
			favChannel.addEventListener('message', refreshFavoritesInterface);
		} catch {
			favChannel = null;
		}
	}

	createFavoritesInterface();
	initializeFavChannel();
	refreshFavoritesInterface();

	document.addEventListener('click', (event) => {
		const toggleButton = event.target.closest('[data-action="toggle-fav"]');
		if (toggleButton) {
			event.preventDefault();
			toggleFavorite(toggleButton.dataset.id, toggleButton);
			return;
		}

		const favTrigger = event.target.closest('.header__action-btn[aria-label^="Ver favoritos"]');
		if (favTrigger) {
			openFavorites(favTrigger);
			return;
		}

		const favAction = event.target.closest('[data-fav-action]');
		if (!favAction) return;

		const action = favAction.dataset.favAction;
		const productId = favAction.dataset.id;

		if (action === 'close') closeFavorites(true);
		if (action === 'remove') removeFavorite(productId);
		if (action === 'move-to-cart') moveToCart(productId, favAction);
	});

	document.querySelector('#favorites-drawer-backdrop').addEventListener('click', () => closeFavorites());

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && document.body.classList.contains('favorites-drawer-open')) {
			closeFavorites(true);
		}
	});

	window.addEventListener('storage', (event) => {
		if (event.key === FAV_STORAGE_KEY) refreshFavoritesInterface();
	});

	window.addEventListener('pageshow', refreshFavoritesInterface);
	window.addEventListener('focus', refreshFavoritesInterface);
	document.addEventListener('visibilitychange', () => {
		if (!document.hidden) refreshFavoritesInterface();
	});

	window.HermanosJotaFavorites = Object.freeze({
		toggle: toggleFavorite,
		remove: removeFavorite,
		getItems: () => [...readFavorites()],
		open: () => openFavorites()
	});
})();