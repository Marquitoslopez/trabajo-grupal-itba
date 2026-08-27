(() => {
			const productCards = [...document.querySelectorAll('.products-grid .product-card')];

			function readStoredList(key) {
				try {
					const value = JSON.parse(localStorage.getItem(key));
					return Array.isArray(value) ? value : [];
				} catch {
					return [];
				}
			}

			function writeStoredList(key, value) {
				try {
					localStorage.setItem(key, JSON.stringify(value));
				} catch {
					/* La navegación sigue funcionando si el almacenamiento está bloqueado. */
				}
			}

			function updateFavoriteButton(button, productId, productName) {
				const active = readStoredList('hermanosJotaFavorites').includes(productId);

				button.classList.toggle('is-active', active);
				button.setAttribute('aria-pressed', String(active));
				button.setAttribute(
					'aria-label',
					`${active ? 'Quitar' : 'Añadir'} ${productName} ${active ? 'de' : 'a'} favoritos`
				);
			}

			productCards.forEach((card) => {
				const productId = card.dataset.id;
				const productName = card.querySelector('.product-card__title').textContent.trim();
				const productUrl = `./pages/producto.html?id=${encodeURIComponent(productId)}`;
				const buyButton = card.querySelector('[data-action="buy-now"]');
				const favoriteButton = card.querySelector('[data-action="toggle-fav"]');

				card.querySelectorAll('.product-card__image-wrapper a, .product-card__link-detail').forEach((link) => {
					link.href = productUrl;
				});

				buyButton?.addEventListener('click', () => {
					window.location.href = productUrl;
				});

				if (favoriteButton) {
					updateFavoriteButton(favoriteButton, productId, productName);

					favoriteButton.addEventListener('click', () => {
						const favorites = readStoredList('hermanosJotaFavorites');
						const nextFavorites = favorites.includes(productId)
							? favorites.filter((id) => id !== productId)
							: [...favorites, productId];

						writeStoredList('hermanosJotaFavorites', nextFavorites);
						updateFavoriteButton(favoriteButton, productId, productName);
					});
				}
			});

		})();
