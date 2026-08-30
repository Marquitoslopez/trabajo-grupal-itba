(() => {
	const CART_STORAGE_KEY = 'hermanosJotaCart';
	const FILE_CART_PREFIX = 'hermanosJotaCart:';
	const buttonTimers = new WeakMap();
	const currentScriptUrl = document.currentScript?.src || new URL('js/carrito.js', document.baseURI).href;
	const assetsBaseUrl = new URL('../assets/', currentScriptUrl);
	const productPageUrl = new URL('../pages/producto.html', currentScriptUrl);

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

	let cartChannel = null;
	let lastCartTrigger = null;
	let toastTimer = null;

	function sanitizeCart(value) {
		return Array.isArray(value)
			? value.filter((productId) => typeof productId === 'string' && Object.hasOwn(products, productId))
			: [];
	}

	function readFileCart() {
		try {
			if (!window.name.startsWith(FILE_CART_PREFIX)) return [];
			return sanitizeCart(JSON.parse(window.name.slice(FILE_CART_PREFIX.length)));
		} catch {
			return [];
		}
	}

	function readCart() {
		if (window.location.protocol === 'file:') return readFileCart();

		try {
			return sanitizeCart(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)));
		} catch {
			return [];
		}
	}

	function writeCart(cart) {
		const validCart = sanitizeCart(cart);

		try {
			if (window.location.protocol === 'file:') {
				window.name = `${FILE_CART_PREFIX}${JSON.stringify(validCart)}`;
			} else {
				localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
			}

			cartChannel?.postMessage({ type: 'cart-updated' });
			return true;
		} catch {
			return false;
		}
	}

	function getGroupedCart() {
		const quantities = new Map();

		readCart().forEach((productId) => {
			quantities.set(productId, (quantities.get(productId) || 0) + 1);
		});

		return [...quantities].map(([productId, quantity]) => ({
			productId,
			quantity,
			product: products[productId]
		}));
	}

	function getCartTriggers() {
		return [...document.querySelectorAll('.header__action-btn[aria-label^="Ver carrito"]')];
	}

	function updateCartCounters() {
		const totalItems = readCart().length;

		document.querySelectorAll('.header__cart-count').forEach((counter) => {
			counter.textContent = String(totalItems);
		});

		getCartTriggers().forEach((button) => {
			button.setAttribute('aria-label', `Ver carrito de compras, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`);
			button.setAttribute('aria-controls', 'cart-drawer');
			button.setAttribute('aria-expanded', String(document.body.classList.contains('cart-drawer-open')));
		});

		return totalItems;
	}

	function productDetailUrl(productId) {
		const url = new URL(productPageUrl.href);
		url.searchParams.set('id', productId);
		return url.href;
	}

	function createCartInterface() {
		if (document.querySelector('#cart-drawer')) return;

		document.body.insertAdjacentHTML('beforeend', `
			<div class="cart-drawer-backdrop" id="cart-drawer-backdrop" aria-hidden="true"></div>

			<aside class="cart-drawer" id="cart-drawer" aria-labelledby="cart-drawer-title" aria-hidden="true">
				<header class="cart-drawer__header">
					<div>
						<span class="cart-drawer__eyebrow">TU SELECCIÓN</span>
						<h2 id="cart-drawer-title">Carrito</h2>
					</div>

					<button type="button" class="cart-drawer__close" data-cart-action="close" aria-label="Cerrar carrito">
						<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
				</header>

				<div class="cart-drawer__body">
					<div class="cart-drawer__empty" id="cart-drawer-empty">
						<span class="cart-drawer__empty-icon" aria-hidden="true">
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
								<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<path d="M16 10a4 4 0 0 1-8 0" />
							</svg>
						</span>
						<h3>Tu carrito está vacío</h3>
						<p>Agregá una pieza y aparecerá acá.</p>
					</div>

					<div class="cart-drawer__items" id="cart-drawer-items" hidden></div>
				</div>

				<footer class="cart-drawer__footer">
					<div class="cart-drawer__total">
						<span>Total estimado</span>
						<strong id="cart-drawer-total">$ 0</strong>
					</div>
					<button type="button" class="cart-drawer__checkout" data-cart-action="checkout" disabled>
						Finalizar compra <span>(simulado)</span>
					</button>
				</footer>
			</aside>

			<div class="cart-toast" id="cart-toast" role="status" aria-live="polite"></div>
		`);
	}

	function createCartItem({ productId, quantity, product }) {
		const subtotal = product.price * quantity;
		const imageUrl = new URL(product.image, assetsBaseUrl).href;

		return `
			<article class="cart-item" data-cart-product="${productId}">
				<a class="cart-item__image-link" href="${productDetailUrl(productId)}" aria-label="Ver ${product.name}">
					<img src="${imageUrl}" alt="${product.name}" class="cart-item__image" />
				</a>

				<div class="cart-item__content">
					<div class="cart-item__heading">
						<div>
							<a href="${productDetailUrl(productId)}" class="cart-item__name">${product.name}</a>
							<span class="cart-item__unit-price">${formatMoney.format(product.price)} c/u</span>
						</div>

						<button type="button" class="cart-item__remove" data-cart-action="remove" data-id="${productId}" aria-label="Eliminar ${product.name}">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
								<path d="M3 6h18" />
								<path d="M8 6V4h8v2" />
								<path d="M19 6l-1 14H6L5 6" />
								<path d="M10 11v5M14 11v5" />
							</svg>
						</button>
					</div>

					<div class="cart-item__bottom">
						<div class="cart-item__quantity" aria-label="Cantidad de ${product.name}">
							<button type="button" data-cart-action="decrease" data-id="${productId}" aria-label="Restar una unidad" ${quantity === 1 ? 'disabled' : ''}>−</button>
							<span aria-live="polite">${quantity}</span>
							<button type="button" data-cart-action="increase" data-id="${productId}" aria-label="Agregar una unidad">+</button>
						</div>
						<strong class="cart-item__subtotal">${formatMoney.format(subtotal)}</strong>
					</div>
				</div>
			</article>
		`;
	}

	function renderCart() {
		const groupedCart = getGroupedCart();
		const emptyState = document.querySelector('#cart-drawer-empty');
		const itemsContainer = document.querySelector('#cart-drawer-items');
		const totalElement = document.querySelector('#cart-drawer-total');
		const checkoutButton = document.querySelector('[data-cart-action="checkout"]');
		const total = groupedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

		emptyState.hidden = groupedCart.length > 0;
		itemsContainer.hidden = groupedCart.length === 0;
		itemsContainer.innerHTML = groupedCart.map(createCartItem).join('');
		totalElement.textContent = formatMoney.format(total);
		checkoutButton.disabled = groupedCart.length === 0;
		updateCartCounters();
	}

	function openCart(trigger) {
		lastCartTrigger = trigger || lastCartTrigger || getCartTriggers()[0];
		document.body.classList.add('cart-drawer-open');
		document.querySelector('#cart-drawer').setAttribute('aria-hidden', 'false');
		document.querySelector('#cart-drawer-backdrop').setAttribute('aria-hidden', 'false');
		getCartTriggers().forEach((button) => button.setAttribute('aria-expanded', 'true'));
		renderCart();
		document.querySelector('.cart-drawer__close').focus();
	}

	function closeCart(returnFocus = false) {
		document.body.classList.remove('cart-drawer-open');
		document.querySelector('#cart-drawer').setAttribute('aria-hidden', 'true');
		document.querySelector('#cart-drawer-backdrop').setAttribute('aria-hidden', 'true');
		getCartTriggers().forEach((button) => button.setAttribute('aria-expanded', 'false'));

		if (returnFocus) lastCartTrigger?.focus();
	}

	function showToast(message) {
		const toast = document.querySelector('#cart-toast');
		window.clearTimeout(toastTimer);
		toast.textContent = message;
		toast.classList.add('cart-toast--visible');
		toastTimer = window.setTimeout(() => toast.classList.remove('cart-toast--visible'), 2200);
	}

	function showAddedFeedback(button) {
		if (!button) return;

		button.animate?.(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(0.92)' },
				{ transform: 'scale(1)' }
			],
			{ duration: 240, easing: 'ease-out' }
		);

		if (!button.classList.contains('btn--add-to-cart')) return;

		const originalText = button.dataset.cartOriginalText || button.textContent.trim();
		const previousTimer = buttonTimers.get(button);

		if (previousTimer) window.clearTimeout(previousTimer);

		button.dataset.cartOriginalText = originalText;
		button.textContent = 'Añadido al carro';
		buttonTimers.set(button, window.setTimeout(() => {
			button.textContent = originalText;
			buttonTimers.delete(button);
		}, 1200));
	}

	function announceCartUpdate(productId, sourceButton) {
		const product = products[productId];
		showAddedFeedback(sourceButton);
		showToast(`${product.name} se agregó al carrito.`);
		renderCart();

		document.dispatchEvent(new CustomEvent('cart:updated', {
			detail: {
				items: [...readCart()],
				productId,
				totalItems: readCart().length
			}
		}));
	}

	function addProduct(productId, sourceButton) {
		if (!Object.hasOwn(products, productId)) return;
		const cart = readCart();
		cart.push(productId);

		if (writeCart(cart)) announceCartUpdate(productId, sourceButton);
	}

	function changeQuantity(productId, action) {
		const cart = readCart();

		if (action === 'increase') cart.push(productId);

		if (action === 'decrease') {
			const productIndex = cart.lastIndexOf(productId);
			if (productIndex !== -1) cart.splice(productIndex, 1);
		}

		if (action === 'remove') {
			const remainingProducts = cart.filter((id) => id !== productId);
			if (writeCart(remainingProducts)) renderCart();
			return;
		}

		if (writeCart(cart)) renderCart();
	}

	function refreshCartInterface() {
		if (!document.querySelector('#cart-drawer')) return;
		renderCart();
	}

	function initializeCartChannel() {
		try {
			if (!('BroadcastChannel' in window)) return;
			cartChannel = new BroadcastChannel('hermanos-jota-cart');
			cartChannel.addEventListener('message', refreshCartInterface);
		} catch {
			cartChannel = null;
		}
	}

	createCartInterface();
	initializeCartChannel();
	renderCart();

	document.addEventListener('click', (event) => {
		const addButton = event.target.closest('[data-action="add-cart"]');
		if (addButton) {
			event.preventDefault();
			addProduct(addButton.dataset.id, addButton);
			return;
		}

		const cartTrigger = event.target.closest('.header__action-btn[aria-label^="Ver carrito"]');
		if (cartTrigger) {
			openCart(cartTrigger);
			return;
		}

		const cartAction = event.target.closest('[data-cart-action]');
		if (!cartAction) return;

		const action = cartAction.dataset.cartAction;
		const productId = cartAction.dataset.id;

		if (action === 'close') closeCart(true);
		if (['increase', 'decrease', 'remove'].includes(action)) changeQuantity(productId, action);
		if (action === 'checkout') showToast('Demostración: no se realizará ningún cobro.');
	});

	document.querySelector('#cart-drawer-backdrop').addEventListener('click', () => closeCart());

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && document.body.classList.contains('cart-drawer-open')) {
			closeCart(true);
		}
	});

	window.addEventListener('storage', (event) => {
		if (event.key === CART_STORAGE_KEY) refreshCartInterface();
	});

	window.addEventListener('pageshow', refreshCartInterface);
	window.addEventListener('focus', refreshCartInterface);
	document.addEventListener('visibilitychange', () => {
		if (!document.hidden) refreshCartInterface();
	});

	window.HermanosJotaCart = Object.freeze({
		add: addProduct,
		getItems: () => [...readCart()],
		getTotal: () => readCart().length,
		open: () => openCart(),
		refresh: refreshCartInterface
	});
})();
