(() => {
  const productsGrid = document.querySelector(".products-grid");
  const products = Array.isArray(window.catalogProducts)
    ? window.catalogProducts.slice(0, 6)
    : [];

  function createFeaturedProductCard(product) {
    const productUrl = `./pages/producto.html?id=${encodeURIComponent(product.id)}`;
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.dataset.category = product.categories;
    card.innerHTML = `
      <header class="product-card__header">
        <div class="product-card__info">
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__price">${new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
          }).format(product.price)}</p>
        </div>
        <div class="product-card__swatches" aria-label="Variantes de color disponibles">
          <span class="product-card__swatch product-card__swatch--dark" title="Nogal Oscuro"></span>
          <span class="product-card__swatch product-card__swatch--gold" title="Cera Roble"></span>
          <span class="product-card__swatch product-card__swatch--wood" title="Madera Natural"></span>
        </div>
      </header>
      <div class="product-card__image-wrapper">
        <a href="${productUrl}" aria-label="Ver detalle de ${product.name}">
          <img src="./assets/${product.image}" alt="${product.alt}" class="product-card__image"
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

  if (productsGrid) {
    productsGrid.replaceChildren(...products.map(createFeaturedProductCard));
  }

  const productCards = [...document.querySelectorAll(".products-grid .product-card")];

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

  productCards.forEach((card) => {
    const productId = card.dataset.id;
    const productName = card
      .querySelector(".product-card__title")
      .textContent.trim();
    const productUrl = `./pages/producto.html?id=${encodeURIComponent(productId)}`;
    const buyButton = card.querySelector('[data-action="buy-now"]');

    card
      .querySelectorAll(
        ".product-card__image-wrapper a, .product-card__link-detail",
      )
      .forEach((link) => {
        link.href = productUrl;
      });

    buyButton?.addEventListener("click", () => {
      window.location.href = productUrl;
    });
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".accordion__trigger");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
});
