(() => {
  const featuredProducts = [
    {
      id: "p1",
      name: "Sofá Patagonia",
      price: "$155.000",
      category: "living casa",
      image: "./assets/sofa-patagonia.png",
      alt: "Sofá Patagonia de diseño moderno y acabado artesanal",
    },
    {
      id: "p2",
      name: "Sillón Copacabana",
      price: "$190.000",
      category: "living",
      image: "./assets/sillon-copacabana.png",
      alt: "Sillón Copacabana en madera nativa",
    },
    {
      id: "p3",
      name: "Butaca Mendoza",
      price: "$110.000",
      category: "living",
      image: "./assets/butaca-mendoza.png",
      alt: "Butaca Mendoza tapizada con estructura de madera",
    },
    {
      id: "p4",
      name: "Mesa de Centro Araucaria",
      price: "$159.000",
      category: "living casa",
      image: "./assets/mesa-de-centro-araucaria.png",
      alt: "Mesa de centro Araucaria en madera maciza",
    },
  ];

  const cartIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" aria-hidden="true" focusable="false">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  `;

  const heartIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" aria-hidden="true" focusable="false">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  `;

  function productUrl(productId) {
    return `./pages/producto.html?id=${encodeURIComponent(productId)}`;
  }

  function createSwatches() {
    const swatches = document.createElement("div");
    swatches.className = "product-card__swatches";
    swatches.setAttribute("aria-label", "Variantes de color disponibles");

    [
      ["product-card__swatch--dark", "Nogal Oscuro"],
      ["product-card__swatch--gold", "Cera Roble"],
      ["product-card__swatch--wood", "Madera Natural"],
    ].forEach(([modifier, title]) => {
      const swatch = document.createElement("span");
      swatch.className = `product-card__swatch ${modifier}`;
      swatch.title = title;
      swatches.append(swatch);
    });

    return swatches;
  }

  function createProductCard(product) {
    const url = productUrl(product.id);
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.dataset.category = product.category;

    const header = document.createElement("header");
    header.className = "product-card__header";

    const info = document.createElement("div");
    info.className = "product-card__info";

    const title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = product.price;

    info.append(title, price);
    header.append(info, createSwatches());

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "product-card__image-wrapper";

    const imageLink = document.createElement("a");
    imageLink.href = url;
    imageLink.setAttribute("aria-label", `Ver detalle de ${product.name}`);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.className = "product-card__image";
    image.loading = "lazy";
    image.width = 300;
    image.height = 220;

    imageLink.append(image);
    imageWrapper.append(imageLink);

    const actions = document.createElement("div");
    actions.className = "product-card__actions";

    const primaryActions = document.createElement("div");
    primaryActions.className = "product-card__primary-actions";

    const buyButton = document.createElement("button");
    buyButton.type = "button";
    buyButton.className = "btn btn--primary";
    buyButton.dataset.action = "buy-now";
    buyButton.dataset.id = product.id;
    buyButton.textContent = "Comprar";
    buyButton.addEventListener("click", () => {
      window.location.href = url;
    });

    const cartButton = document.createElement("button");
    cartButton.type = "button";
    cartButton.className = "btn btn--gold";
    cartButton.dataset.action = "add-cart";
    cartButton.dataset.id = product.id;
    cartButton.setAttribute("aria-label", `Agregar ${product.name} al carrito`);
    cartButton.innerHTML = cartIcon;

    primaryActions.append(buyButton, cartButton);

    const secondaryActions = document.createElement("div");
    secondaryActions.className = "product-card__secondary-actions";

    const detailLink = document.createElement("a");
    detailLink.href = url;
    detailLink.className = "product-card__link-detail";
    detailLink.textContent = "Ver detalle";

    const favButton = document.createElement("button");
    favButton.type = "button";
    favButton.className = "btn--icon";
    favButton.dataset.action = "toggle-fav";
    favButton.dataset.id = product.id;
    favButton.setAttribute("aria-label", `Añadir ${product.name} a favoritos`);
    favButton.setAttribute("aria-pressed", "false");
    favButton.innerHTML = heartIcon;

    secondaryActions.append(detailLink, favButton);
    actions.append(primaryActions, secondaryActions);
    card.append(header, imageWrapper, actions);

    return card;
  }

  const featuredGrid = document.querySelector("#featured-products-grid");

  if (featuredGrid) {
    const fragment = document.createDocumentFragment();
    featuredProducts.forEach((product) => {
      fragment.append(createProductCard(product));
    });
    featuredGrid.append(fragment);
  }
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
