(() => {
  const products = {
    p1: {
      name: "Sofá Patagonia",
      price: "$155.000",
      category: "Living Room",
      categoryKey: "living casa",
      image: "../assets/sofa-patagonia.png",
      description:
        "Sofá de tres cuerpos inspirado en los paisajes patagónicos. Su estructura de madera maciza y tapizado de textura suave combinan comodidad cotidiana con una presencia cálida y atemporal.",
      specs: [
        ["Medidas", "220 × 90 × 82 cm"],
        ["Materiales", "Madera maciza y tapizado de alta resistencia"],
        ["Acabado", "Cera natural de bajo impacto"],
        ["Capacidad", "3 personas"],
        ["Garantía", "10 años en estructura"],
      ],
      rating: "4.9",
      ratingCount: 418,
    },

    p2: {
      name: "Sillón Copacabana",
      price: "$190.000",
      category: "Living Room",
      categoryKey: "living",
      image: "../assets/sillon-copacabana.png",
      description:
        "Sillón lounge en cuero cognac con base giratoria en acero. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño que trasciende tendencias y épocas.",
      specs: [
        ["Medidas", "90 × 85 × 95 cm"],
        ["Materiales", "Cuero curtido vegetal y acero pintado"],
        ["Acabado", "Cuero anilina premium"],
        ["Rotación", "360° silenciosa y suave"],
        ["Garantía", "10 años en estructura"],
      ],
      rating: "4.8",
      ratingCount: 529,
    },

    p3: {
      name: "Butaca Mendoza",
      price: "$110.000",
      category: "Living Room",
      categoryKey: "living",
      image: "../assets/butaca-mendoza.png",
      description:
        "Butaca de líneas envolventes y proporciones equilibradas. La madera natural dialoga con un tapizado confortable para crear una pieza versátil, ideal para rincones de lectura y livings contemporáneos.",
      specs: [
        ["Medidas", "78 × 82 × 85 cm"],
        ["Materiales", "Madera de lenga y espuma de alta densidad"],
        ["Tapizado", "Tela antimanchas de trama natural"],
        ["Carga máxima", "130 kg"],
        ["Garantía", "5 años en estructura"],
      ],
      rating: "4.7",
      ratingCount: 286,
    },

    p4: {
      name: "Mesa de Centro Araucaria",
      price: "$159.000",
      category: "Living Room",
      categoryKey: "living casa",
      image: "../assets/mesa-de-centro-araucaria.png",
      description:
        "Mesa de centro de madera maciza con bordes suavemente redondeados. Su diseño liviano realza la veta natural y aporta una superficie funcional sin sobrecargar el ambiente.",
      specs: [
        ["Medidas", "110 × 60 × 42 cm"],
        ["Materiales", "Madera maciza de araucaria"],
        ["Acabado", "Aceite vegetal satinado"],
        ["Peso", "24 kg"],
        ["Garantía", "5 años"],
      ],
      rating: "4.8",
      ratingCount: 193,
    },

    p5: {
      name: "Mesa de Noche Aconcagua",
      price: "$146.000",
      category: "Habitación",
      categoryKey: "habitacion casa",
      image: "../assets/mesa-de-noche-aconcagua.png",
      description:
        "Mesa de noche compacta con cajón de apertura suave y espacio inferior de guardado. Una pieza serena que combina detalles artesanales con funcionalidad para el uso diario.",
      specs: [
        ["Medidas", "50 × 42 × 58 cm"],
        ["Materiales", "Madera de petiribí seleccionada"],
        ["Acabado", "Laca al agua mate"],
        ["Guardado", "1 cajón y estante inferior"],
        ["Garantía", "5 años"],
      ],
      rating: "4.9",
      ratingCount: 174,
    },

    p6: {
      name: "Biblioteca Recoleta",
      price: "$125.000",
      category: "Habitación",
      categoryKey: "habitacion casa",
      image: "../assets/biblioteca-recoleta.png",
      description:
        "Biblioteca vertical de inspiración mid-century, pensada para organizar libros y objetos sin perder ligereza visual. Sus estantes amplios acompañan distintos espacios del hogar.",
      specs: [
        ["Medidas", "100 × 35 × 190 cm"],
        ["Materiales", "Madera maciza y enchapado natural"],
        ["Acabado", "Cera de origen vegetal"],
        ["Estantes", "5 niveles reforzados"],
        ["Garantía", "7 años"],
      ],
      rating: "4.7",
      ratingCount: 231,
    },

    p7: {
      name: "Mesa Comedor Pampa",
      price: "$174.000",
      category: "Cocina",
      categoryKey: "cocina casa",
      image: "../assets/mesa-comedor-pampa.png",
      description:
        "Mesa de comedor amplia y robusta, creada para reuniones cotidianas. La tapa de madera maciza conserva la expresión de la veta y se apoya sobre una base estable de líneas puras.",
      specs: [
        ["Medidas", "180 × 90 × 76 cm"],
        ["Materiales", "Madera maciza de algarrobo"],
        ["Acabado", "Aceite natural resistente al uso"],
        ["Capacidad", "6 personas"],
        ["Garantía", "10 años"],
      ],
      rating: "4.9",
      ratingCount: 347,
    },

    p8: {
      name: "Sillas Córdoba",
      price: "$163.000",
      category: "Cocina",
      categoryKey: "cocina",
      image: "../assets/sillas-cordoba.png",
      description:
        "Juego de sillas de comedor con respaldo ergonómico y estructura firme. Su silueta simple recupera el carácter del mobiliario clásico argentino con una lectura contemporánea.",
      specs: [
        ["Medidas", "48 × 54 × 82 cm cada una"],
        ["Materiales", "Madera maciza y asiento tapizado"],
        ["Acabado", "Protección mate al agua"],
        ["Incluye", "Juego de 4 sillas"],
        ["Garantía", "5 años"],
      ],
      rating: "4.8",
      ratingCount: 312,
    },

    p9: {
      name: "Aparador Uspallata",
      price: "$137.000",
      category: "Cocina",
      categoryKey: "cocina casa",
      image: "../assets/aparador-uspallata.png",
      description:
        "Aparador de gran capacidad con puertas de apertura suave y estantes interiores. Su frente limpio permite guardar vajilla y objetos manteniendo una estética ordenada.",
      specs: [
        ["Medidas", "160 × 42 × 78 cm"],
        ["Materiales", "Madera noble de algarrobo"],
        ["Acabado", "Cera natural color miel"],
        ["Guardado", "3 puertas y estantes regulables"],
        ["Garantía", "7 años"],
      ],
      rating: "4.7",
      ratingCount: 208,
    },

    p10: {
      name: "Escritorio Costa",
      price: "$170.000",
      category: "Oficina",
      categoryKey: "oficina",
      image: "../assets/escritorio-costa.png",
      description:
        "Escritorio minimalista con superficie amplia y cajón integrado. Fue diseñado para crear un espacio de trabajo ordenado, cálido y cómodo durante toda la jornada.",
      specs: [
        ["Medidas", "140 × 65 × 76 cm"],
        ["Materiales", "Madera maciza y correderas metálicas"],
        ["Acabado", "Aceite vegetal mate"],
        ["Guardado", "1 cajón de apertura invisible"],
        ["Garantía", "7 años"],
      ],
      rating: "4.9",
      ratingCount: 264,
    },

    p11: {
      name: "Silla de Trabajo Belgrano",
      price: "$140.000",
      category: "Oficina",
      categoryKey: "oficina",
      image: "../assets/silla-de-trabajo-belgrano.png",
      description:
        "Silla de trabajo ergonómica con estructura de madera y apoyo confortable. Su diseño acompaña largas jornadas sin perder la identidad cálida del mobiliario artesanal.",
      specs: [
        ["Medidas", "58 × 60 × 86 cm"],
        ["Materiales", "Madera maciza y tapizado respirable"],
        ["Ergonomía", "Respaldo curvo y asiento acolchado"],
        ["Carga máxima", "120 kg"],
        ["Garantía", "5 años"],
      ],
      rating: "4.8",
      ratingCount: 301,
    },
  };

  const requestedId = new URLSearchParams(window.location.search).get("id");
  const currentId = Object.hasOwn(products, requestedId) ? requestedId : "p2";
  const product = products[currentId];
  const mainImage = document.querySelector("#main-product-image");
  const thumbnails = [...document.querySelectorAll(".product-gallery__thumb")];
  const specsList = document.querySelector("#product-specs");
  const relatedGrid = document.querySelector("#related-products-grid");
  const addToCartButton = document.querySelector("#add-current-product");
  const favoriteButton = document.querySelector("#favorite-current-product");


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

    }
  }

  function isFavorite(productId) {
    return readStoredList("hermanosJotaFavorites").includes(productId);
  }

  function updateFavoriteButton(button, productId) {
    const active = isFavorite(productId);

    const productName = products[productId].name;

    button.classList.toggle("is-active", active);

    button.setAttribute("aria-pressed", String(active));

    button.setAttribute(
      "aria-label",
      `${active ? "Quitar" : "Añadir"} ${productName} ${
        active ? "de" : "a"
      } favoritos`,
    );
  }

  function toggleFavorite(productId, button) {
    const favorites = readStoredList("hermanosJotaFavorites");

    const nextFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    writeStoredList("hermanosJotaFavorites", nextFavorites);

    updateFavoriteButton(button, productId);
  }

  function createSpecRow([term, detail]) {
    const row = document.createElement("div");

    const termElement = document.createElement("dt");

    const detailElement = document.createElement("dd");

    row.className = "product-specs__row";

    termElement.className = "product-specs__term";

    detailElement.className = "product-specs__detail";

    termElement.textContent = term;
    detailElement.textContent = detail;

    row.append(termElement, detailElement);

    return row;
  }

  function renderProduct() {
    document.title = `${product.name} — Hermanos Jota Muebles`;

    document.querySelector("#product-meta-description").content =
      `${product.name}. Conocé sus medidas, materiales y garantía en Hermanos Jota Muebles.`;

    document.querySelector("#product-category").textContent = product.category;

    document.querySelector("#product-title").textContent = product.name;

    document.querySelector("#product-price").textContent = product.price;

    document.querySelector("#product-description").textContent =
      product.description;

    document.querySelector("#product-rating").textContent = product.rating;

    document.querySelector("#product-rating-count").textContent =
      `${product.ratingCount} calificaciones`;

    mainImage.src = product.image;

    mainImage.alt = `${product.name}, vista completa`;

    specsList.replaceChildren(...product.specs.map(createSpecRow));

    // Miniaturas
    thumbnails.forEach((thumbnail, index) => {
      const image = thumbnail.querySelector("img");

      const views = ["vista completa", "detalle superior", "detalle inferior"];

      image.src = product.image;

      image.alt = `${product.name}, ${views[index]}`;

      thumbnail.setAttribute("aria-label", `${product.name}, ${views[index]}`);

      thumbnail.classList.toggle("product-gallery__thumb--active", index === 0);
    });

    // Guardamos el ID real del producto
    addToCartButton.dataset.id = currentId;

    favoriteButton.dataset.id = currentId;

    updateFavoriteButton(favoriteButton, currentId);
  }

  function renderReviews() {
    const reviews = [
      [
        "L",
        "Lucía Ferrer",
        5,
        `La calidad de ${product.name} se nota desde el primer momento. Llegó perfectamente embalado y la terminación es realmente muy cuidada.`,
      ],
      [
        "M",
        "Mateo Ruiz",
        5,
        `El diseño queda incluso mejor de lo que se aprecia en las fotos. ${product.name} se siente firme, cómodo y pensado para durar.`,
      ],
      [
        "C",
        "Carolina Vega",
        4,
        "Muy buena experiencia de compra y excelente atención. La pieza mantiene el equilibrio entre lo artesanal y lo moderno que estaba buscando.",
      ],
    ];

    document.querySelector("#product-reviews-grid").innerHTML = reviews
      .map(
        ([initial, name, rating, text]) => `
          <article class="review-card">

            <header class="review-card__header">

              <div class="review-card__user">

                <div
                  class="review-card__avatar"
                  aria-hidden="true"
                >
                  ${initial}
                </div>

                <div>

                  <h4 class="review-card__name">
                    ${name}
                  </h4>

                  <span class="review-card__source">
                    Comprador verificado
                  </span>

                </div>

              </div>

              <div
                class="review-card__rating"
                aria-label="Calificación ${rating} de 5 estrellas"
              >
                <span aria-hidden="true">
                  ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
                </span>
              </div>

            </header>

            <p class="review-card__text">
              “${text}”
            </p>

          </article>
        `,
      )
      .join("");
  }


  function createRelatedCard([productId, relatedProduct]) {
    const favorite = isFavorite(productId);

    return `
      <article
        class="product-card"
        data-id="${productId}"
        data-category="${relatedProduct.categoryKey}"
      >

        <header class="product-card__header">

          <div class="product-card__info">

            <h3 class="product-card__title">
              ${relatedProduct.name}
            </h3>

            <p class="product-card__price">
              ${relatedProduct.price}
            </p>

          </div>

          <div
            class="product-card__swatches"
            aria-label="Variantes de color disponibles"
          >
            <span
              class="product-card__swatch product-card__swatch--dark"
              title="Nogal Oscuro"
            ></span>

            <span
              class="product-card__swatch product-card__swatch--gold"
              title="Cera Roble"
            ></span>

            <span
              class="product-card__swatch product-card__swatch--wood"
              title="Madera Natural"
            ></span>
          </div>

        </header>


        <div class="product-card__image-wrapper">

          <a
            href="./producto.html?id=${productId}"
            aria-label="Ver detalle de ${relatedProduct.name}"
          >
            <img
              src="${relatedProduct.image}"
              alt="${relatedProduct.name}"
              class="product-card__image"
              loading="lazy"
              width="300"
              height="220"
            />
          </a>

        </div>


        <div class="product-card__actions">

          <div class="product-card__primary-actions">

            <button
              type="button"
              class="btn btn--primary"
              data-action="buy-now"
              data-id="${productId}"
            >
              Comprar
            </button>

            <button
              type="button"
              class="btn btn--gold"
              data-action="add-cart"
              data-id="${productId}"
              aria-label="Agregar ${relatedProduct.name} al carrito"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

            </button>

          </div>


          <div class="product-card__secondary-actions">

            <a
              href="./producto.html?id=${productId}"
              class="product-card__link-detail"
            >
              Ver detalle
            </a>

            <button
              type="button"
              class="btn--icon${favorite ? " is-active" : ""}"
              data-action="toggle-fav"
              data-id="${productId}"
              aria-label="${favorite ? "Quitar" : "Añadir"} ${relatedProduct.name} ${favorite ? "de" : "a"} favoritos"
              aria-pressed="${favorite}"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>

            </button>

          </div>

        </div>

      </article>
    `;
  }


  function renderRelatedProducts() {
    const entries = Object.entries(products).filter(
      ([productId]) => productId !== currentId,
    );

    const sameCategory = entries.filter(
      ([, item]) => item.category === product.category,
    );

    const otherCategories = entries.filter(
      ([, item]) => item.category !== product.category,
    );

    const recommendations = [...sameCategory, ...otherCategories].slice(0, 3);

    relatedGrid.innerHTML = recommendations.map(createRelatedCard).join("");
  }


  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      thumbnails.forEach((item) =>
        item.classList.remove("product-gallery__thumb--active"),
      );

      thumbnail.classList.add("product-gallery__thumb--active");

      mainImage.classList.remove(
        "product-gallery__main-img--detail-top",
        "product-gallery__main-img--detail-bottom",
      );

      if (index === 1) {
        mainImage.classList.add("product-gallery__main-img--detail-top");
      }

      if (index === 2) {
        mainImage.classList.add("product-gallery__main-img--detail-bottom");
      }
    });
  });

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(currentId, favoriteButton);
  });

  relatedGrid.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    const productId = actionButton.dataset.id;

    const action = actionButton.dataset.action;

    if (action === "buy-now") {
      window.location.href = `./producto.html?id=${productId}`;

      return;
    }

    if (action === "toggle-fav") {
      toggleFavorite(productId, actionButton);

      return;
    }

    if (action === "add-cart") {
      return;
    }
  });


  renderProduct();
  renderReviews();
  renderRelatedProducts();
})();
