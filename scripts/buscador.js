(() => {
  const currentScriptUrl =
    document.currentScript?.src ||
    new URL("scripts/buscador.js", document.baseURI).href;
  const assetsBaseUrl = new URL("../assets/", currentScriptUrl);
  const catalogPageUrl = new URL("../pages/catalogo.html", currentScriptUrl);
  const productPageUrl = new URL("../pages/producto.html", currentScriptUrl);

  const CATEGORY_LABELS = {
    living: "Living",
    habitacion: "Habitación",
    cocina: "Cocina",
    oficina: "Oficina",
    casa: "Casa",
  };

  const PRODUCTS = [
    {
      id: "p1",
      name: "Sofá Patagonia",
      price: 155000,
      categories: ["living", "casa"],
      image: "sofa-patagonia.png",
    },
    {
      id: "p2",
      name: "Sillón Copacabana",
      price: 190000,
      categories: ["living"],
      image: "sillon-copacabana.png",
    },
    {
      id: "p3",
      name: "Butaca Mendoza",
      price: 110000,
      categories: ["living"],
      image: "butaca-mendoza.png",
    },
    {
      id: "p4",
      name: "Mesa de Centro Araucaria",
      price: 159000,
      categories: ["living", "casa"],
      image: "mesa-de-centro-araucaria.png",
    },
    {
      id: "p5",
      name: "Mesa de Noche Aconcagua",
      price: 146000,
      categories: ["habitacion", "casa"],
      image: "mesa-de-noche-aconcagua.png",
    },
    {
      id: "p6",
      name: "Biblioteca Recoleta",
      price: 125000,
      categories: ["habitacion", "casa"],
      image: "biblioteca-recoleta.png",
    },
    {
      id: "p7",
      name: "Mesa Comedor Pampa",
      price: 174000,
      categories: ["cocina", "casa"],
      image: "mesa-comedor-pampa.png",
    },
    {
      id: "p8",
      name: "Sillas Córdoba",
      price: 163000,
      categories: ["cocina"],
      image: "sillas-cordoba.png",
    },
    {
      id: "p9",
      name: "Aparador Uspallata",
      price: 137000,
      categories: ["cocina", "casa"],
      image: "aparador-uspallata.png",
    },
    {
      id: "p10",
      name: "Escritorio Costa",
      price: 170000,
      categories: ["oficina"],
      image: "escritorio-costa.png",
    },
    {
      id: "p11",
      name: "Silla de Trabajo Belgrano",
      price: 140000,
      categories: ["oficina"],
      image: "silla-de-trabajo-belgrano.png",
    },
  ];

  const formatMoney = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const normalizeText = (text) =>
    String(text)
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  function productDetailUrl(productId) {
    const url = new URL(productPageUrl.href);
    url.searchParams.set("id", productId);
    return url.href;
  }

  function productImageUrl(image) {
    return new URL(image, assetsBaseUrl).href;
  }

  const searchIndex = PRODUCTS.map((product) => ({
    ...product,
    searchText: normalizeText([product.name, ...product.categories].join(" ")),
  }));

  /* ---------- Crear el panel si la página no lo tiene ---------- */
  function ensureSearchPanel() {
    let panel = document.querySelector("#catalog-search-panel");
    if (panel) return panel;

    const header = document.querySelector(".header");
    if (!header) return null;

    header.insertAdjacentHTML(
      "beforeend",
      `
			<div class="catalog-search-panel" id="catalog-search-panel" aria-hidden="true">
				<div class="container">
					<div class="catalog-search-panel__content" role="dialog" aria-label="Buscador de productos">
						<div class="catalog-search-panel__heading">
							<div>
								<span class="catalog-search-panel__eyebrow">BÚSQUEDA INTELIGENTE</span>
								<p>Encontrá tu próxima pieza</p>
								<small>Buscá por nombre o tipo de mueble.</small>
							</div>

							<button type="button" class="catalog-search-panel__close" id="catalog-search-close" aria-label="Cerrar búsqueda">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						</div>

						<form class="catalog-search" id="catalog-search" role="search">
							<label class="sr-only" for="catalog-search-input">Buscar productos en el catálogo</label>
							<div class="catalog-search__field">
								<svg class="catalog-search__icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
									<circle cx="11" cy="11" r="8" />
									<path d="m21 21-4.3-4.3" />
								</svg>
								<input
									type="search"
									class="catalog-search__input"
									id="catalog-search-input"
									placeholder="Probá con “mesa”, “living” o “madera”..."
									autocomplete="off"
									role="combobox"
									aria-autocomplete="list"
									aria-controls="catalog-search-results"
									aria-expanded="false"
								/>
								<kbd class="catalog-search__shortcut" aria-hidden="true">Ctrl K</kbd>
								<button type="button" class="catalog-search__clear" id="catalog-search-clear" aria-label="Limpiar búsqueda" hidden>×</button>
							</div>
						</form>

						<div class="catalog-search-discover" id="catalog-search-discover">
							<span>Descubrí rápido</span>
							<div class="catalog-search-discover__list">
								<button type="button" data-search-suggestion="sofá">Sofás</button>
								<button type="button" data-search-suggestion="mesa">Mesas</button>
								<button type="button" data-search-suggestion="living">Living</button>
								<button type="button" data-search-suggestion="oficina">Oficina</button>
							</div>
						</div>

						<div class="catalog-search-results" id="catalog-search-results" role="listbox" aria-label="Productos encontrados" hidden></div>

						<div class="catalog-search-panel__footer">
							<p class="catalog-search-panel__feedback" id="catalog-result-status" role="status" aria-live="polite">
								Escribí para ver resultados al instante.
							</p>
							<button type="button" class="catalog-search-panel__show-all" id="catalog-search-show-all" hidden>
								Ver todos <span aria-hidden="true">→</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		`,
    );

    return document.querySelector("#catalog-search-panel");
  }

  function ensureSearchTriggers() {
    const existingTriggers = [
      ...document.querySelectorAll("[data-search-trigger]"),
    ];
    if (existingTriggers.length > 0) return existingTriggers;

    const plainButton = [
      ...document.querySelectorAll(".header__action-btn"),
    ].find(
      (button) => button.getAttribute("aria-label") === "Buscar productos",
    );

    if (!plainButton) return [];

    plainButton.setAttribute("data-search-trigger", "");
    plainButton.setAttribute("aria-controls", "catalog-search-panel");
    plainButton.setAttribute("aria-expanded", "false");

    return [plainButton];
  }

  const searchPanel = ensureSearchPanel();
  if (!searchPanel) return;

  const searchInput = document.querySelector("#catalog-search-input");
  const clearButton = document.querySelector("#catalog-search-clear");
  const discoverPanel = document.querySelector("#catalog-search-discover");
  const resultsContainer = document.querySelector("#catalog-search-results");
  const showAllButton = document.querySelector("#catalog-search-show-all");
  const resultStatus = document.querySelector("#catalog-result-status");
  const closeSearchButton = document.querySelector("#catalog-search-close");
  const mobileMenuToggle = document.querySelector("#header-menu-toggle");
  const searchTriggers = ensureSearchTriggers();
  const searchForm = document.querySelector("#catalog-search");

  const categoryButtons = [...document.querySelectorAll(".filter-bar__pill")];
  let activeCategory =
    document.querySelector(".filter-bar__pill--active")?.dataset.filter ??
    "all";
  let activeResultIndex = -1;

  function appendHighlightedText(container, text, query) {
    const matchIndex = normalizeText(text).indexOf(query);

    if (!query || matchIndex < 0) {
      container.textContent = text;
      return;
    }

    container.append(document.createTextNode(text.slice(0, matchIndex)));
    const mark = document.createElement("mark");
    mark.textContent = text.slice(matchIndex, matchIndex + query.length);
    container.append(
      mark,
      document.createTextNode(text.slice(matchIndex + query.length)),
    );
  }

  function createResult(product, query, index) {
    const link = document.createElement("a");
    link.className = "catalog-search-result";
    link.href = productDetailUrl(product.id);
    link.id = `catalog-search-option-${index}`;
    link.dataset.searchResult = "";
    link.setAttribute("role", "option");
    link.setAttribute("aria-selected", "false");

    const imageWrap = document.createElement("span");
    imageWrap.className = "catalog-search-result__image";
    const image = document.createElement("img");
    image.src = productImageUrl(product.image);
    image.alt = "";
    image.loading = "lazy";
    imageWrap.append(image);

    const copy = document.createElement("span");
    copy.className = "catalog-search-result__copy";
    const name = document.createElement("strong");
    appendHighlightedText(name, product.name, query);
    const detail = document.createElement("span");
    const category =
      CATEGORY_LABELS[product.categories[0]] ?? "Mueble de autor";
    detail.textContent = `${category} · ${formatMoney.format(product.price)}`;
    copy.append(name, detail);

    const arrow = document.createElement("span");
    arrow.className = "catalog-search-result__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(imageWrap, copy, arrow);
    return link;
  }

  function getMatches(query) {
    return searchIndex
      .filter((product) => {
        const matchesSearch = !query || product.searchText.includes(query);
        const matchesCategory =
          activeCategory === "all" ||
          product.categories.includes(activeCategory);
        return matchesSearch && matchesCategory;
      })
      .sort((first, second) => {
        const firstStarts = normalizeText(first.name).startsWith(query) ? 0 : 1;
        const secondStarts = normalizeText(second.name).startsWith(query)
          ? 0
          : 1;
        return firstStarts - secondStarts;
      });
  }

  function renderResults(matches, query) {
    resultsContainer.replaceChildren();
    activeResultIndex = -1;
    searchInput.removeAttribute("aria-activedescendant");

    if (!query || matches.length === 0) {
      resultsContainer.hidden = true;
      searchInput.setAttribute("aria-expanded", "false");
      return;
    }

    const fragment = document.createDocumentFragment();
    matches.slice(0, 6).forEach((product, index) => {
      fragment.append(createResult(product, query, index));
    });

    resultsContainer.append(fragment);
    resultsContainer.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  }

  function runSearch() {
    const query = normalizeText(searchInput.value);
    const matches = getMatches(query);

    clearButton.hidden = searchInput.value.length === 0;
    if (discoverPanel) discoverPanel.hidden = Boolean(query);
    if (showAllButton) {
      showAllButton.hidden = !query || matches.length === 0;
      if (showAllButton.childNodes[0]) {
        showAllButton.childNodes[0].nodeValue =
          matches.length === 1
            ? "Ver producto "
            : `Ver los ${matches.length} productos `;
      }
    }

    renderResults(matches, query);

    resultStatus.textContent = query
      ? matches.length
        ? `${matches.length} ${matches.length === 1 ? "coincidencia encontrada" : "coincidencias encontradas"}.`
        : `No encontramos resultados para “${searchInput.value.trim()}”.`
      : "Escribí para ver resultados al instante.";
  }

  function setActiveResult(index) {
    const options = [
      ...resultsContainer.querySelectorAll("[data-search-result]"),
    ];
    if (options.length === 0) return;

    activeResultIndex = (index + options.length) % options.length;
    options.forEach((option, optionIndex) => {
      const active = optionIndex === activeResultIndex;
      option.classList.toggle("catalog-search-result--active", active);
      option.setAttribute("aria-selected", String(active));
    });

    const activeOption = options[activeResultIndex];
    searchInput.setAttribute("aria-activedescendant", activeOption.id);
    activeOption.scrollIntoView({ block: "nearest" });
  }

  function updateSearchTriggers(isOpen) {
    searchTriggers.forEach((trigger) =>
      trigger.setAttribute("aria-expanded", String(isOpen)),
    );
  }

  function openSearch() {
    if (mobileMenuToggle) mobileMenuToggle.checked = false;
    searchPanel.classList.add("catalog-search-panel--open");
    searchPanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("catalog-search-open");
    updateSearchTriggers(true);
    runSearch();
    requestAnimationFrame(() => searchInput.focus());
  }

  function closeSearch(returnFocus = false) {
    searchPanel.classList.remove("catalog-search-panel--open");
    searchPanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("catalog-search-open");
    updateSearchTriggers(false);

    if (returnFocus) searchTriggers[0]?.focus();
  }

  function goToFullCatalog() {
    const catalogSection = document.querySelector("#catalogo");
    closeSearch();

    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = catalogPageUrl.href;
    }
  }

  searchInput?.addEventListener("input", runSearch);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch(true);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResult(activeResultIndex + (event.key === "ArrowDown" ? 1 : -1));
    }

    if (event.key === "Enter") {
      const activeOption = resultsContainer.querySelector(
        ".catalog-search-result--active",
      );
      if (activeOption) {
        event.preventDefault();
        activeOption.click();
      }
    }
  });

  clearButton?.addEventListener("click", () => {
    searchInput.value = "";
    runSearch();
    searchInput.focus();
  });

  document.querySelectorAll("[data-search-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.searchSuggestion;
      runSearch();
      searchInput.focus();
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter;
      runSearch();
    });
  });

  searchTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen = searchPanel.classList.contains(
        "catalog-search-panel--open",
      );
      isOpen ? closeSearch() : openSearch();
    });
  });

  closeSearchButton?.addEventListener("click", () => closeSearch(true));
  showAllButton?.addEventListener("click", goToFullCatalog);

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    goToFullCatalog();
  });

  document.addEventListener("keydown", (event) => {
    const shortcutPressed =
      (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
    const slashPressed =
      event.key === "/" &&
      !event.target.closest("input, textarea, select, [contenteditable]");

    if (shortcutPressed || slashPressed) {
      event.preventDefault();
      openSearch();
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = searchPanel.classList.contains("catalog-search-panel--open");
    if (isOpen && !event.target.closest(".header")) {
      closeSearch();
    }
  });
})();
