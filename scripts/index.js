(() => {
  const productCards = [
    ...document.querySelectorAll(".products-grid .product-card"),
  ];

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
