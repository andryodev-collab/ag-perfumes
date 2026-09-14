(() => {
  "use strict";

  document.body.classList.add("app-v53", "app-v536-safe", "app-v538-filter-fix");

  const productUrl = id => `produto.html?id=${encodeURIComponent(id)}`;
  const productGrid = document.getElementById("productGrid");
  const catalog = document.getElementById("catalogo");
  const emptyState = document.getElementById("emptyState");

  let priceMin = null;
  let priceMax = null;
  let availabilityFilter = "todos";
  let featuredOnly = false;
  let sortMode = "featured";

  let draftPriceMin = null;
  let draftPriceMax = null;
  let draftAvailability = "todos";
  let draftFeaturedOnly = false;
  let draftSortMode = "featured";

  const labelMap = {
    masculino: "Masculino",
    feminino: "Feminino",
    unissex: "Unissex",
    bodysplash: "Body Splash",
    cremes: "Cremes",
    hidratantes: "Hidratantes",
    oleos: "Óleos",
    corpo: "Corpo",
    cabelo: "Cabelo",
    outros: "Outros"
  };

  function normalizeCardLabels() {
    document.querySelectorAll(".product-category").forEach(el => {
      const key = el.textContent.trim().toLowerCase();
      if (labelMap[key]) el.textContent = labelMap[key];
    });
  }

  document.addEventListener("click", event => {
    const details = event.target.closest("[data-open-product]");
    const card = event.target.closest(".product-card");

    if (details) {
      event.preventDefault();
      event.stopPropagation();
      location.href = productUrl(details.dataset.openProduct);
      return;
    }

    if (card && !event.target.closest("button")) {
      event.preventDefault();
      event.stopPropagation();
      location.href = productUrl(card.dataset.id);
    }
  }, true);

  function buildBottomNav() {
    if (document.querySelector(".app-bottom-nav")) return;

    const nav = document.createElement("nav");
    nav.className = "app-bottom-nav";
    nav.setAttribute("aria-label", "Navegação rápida");
    nav.innerHTML = `
      <a href="#inicio" aria-label="Ir para o início">
        <span class="nav-icon" aria-hidden="true">⌂</span>
        <span>Início</span>
      </a>
      <a href="#appCategories" aria-label="Ver categorias">
        <span class="nav-icon" aria-hidden="true">▦</span>
        <span>Categorias</span>
      </a>
      <button class="app-nav-cart" id="appNavCart" type="button" aria-label="Abrir sacola">
        <span class="nav-icon" aria-hidden="true">◇</span>
        <span>Sacola</span>
        <span class="app-nav-count" id="appNavCount" hidden>0</span>
      </button>
      <button class="app-nav-contact" id="appNavContact" type="button" aria-label="Falar com a loja">
        <span class="nav-icon" aria-hidden="true">◉</span>
        <span>Contato</span>
      </button>
    `;
    document.body.appendChild(nav);

    const originalCartButton = document.getElementById("cartButton");
    const originalCount = document.getElementById("cartCount");
    const appCount = document.getElementById("appNavCount");

    document.getElementById("appNavCart")?.addEventListener("click", () => originalCartButton?.click());
    document.getElementById("appNavContact")?.addEventListener("click", () => document.getElementById("whatsappFloat")?.click());

    const syncCount = () => {
      if (!originalCount || !appCount) return;
      const value = Number(originalCount.textContent || 0);
      appCount.textContent = String(value);
      appCount.hidden = value === 0;
    };

    syncCount();
    if (originalCount) {
      const countObserver = new MutationObserver(syncCount);
      countObserver.observe(originalCount, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["hidden"]
      });
    }
  }

  function firstImageForCategory(value) {
    try {
      return products.find(item => item.category === value && item.image)?.image || "";
    } catch (_) {
      return "";
    }
  }

  function clickCategory(main, sub) {
    document.querySelector(`[data-main-category="${main}"]`)?.click();
    requestAnimationFrame(() => {
      document.querySelector(`[data-sub-category="${sub}"]`)?.click();
      catalog?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function buildDiscovery() {
    if (!catalog || document.getElementById("appDiscovery")) return;

    let allProducts = [];
    try { allProducts = Array.isArray(products) ? products : []; } catch (_) {}
    if (!allProducts.length) return;

    let configured = [];
    try {
      configured = (CATEGORY_CONFIG || []).flatMap(main =>
        (main.subcategories || []).map(sub => ({
          main: main.value,
          value: sub.value,
          label: sub.label || labelMap[sub.value] || sub.value
        }))
      );
    } catch (_) {}

    const preferred = ["masculino", "feminino", "unissex", "bodysplash"];
    const categories = [
      ...preferred.map(key => configured.find(item => item.value === key)).filter(Boolean),
      ...configured.filter(item => !preferred.includes(item.value))
    ].slice(0, 6);

    let featured = allProducts.filter(item => item.destaque).slice(0, 6);
    if (!featured.length) featured = allProducts.slice(0, 6);

    const section = document.createElement("section");
    section.id = "appDiscovery";
    section.className = "app-discovery";

    const categoryHtml = categories.map(item => {
      const image = firstImageForCategory(item.value);
      return `
        <button class="app-category-card" type="button" data-app-main="${item.main}" data-app-sub="${item.value}">
          <span class="app-category-media ${image ? "has-image" : ""}">
            ${image ? `<img src="${image}" alt="" loading="lazy">` : `<span aria-hidden="true">${String(item.label).charAt(0)}</span>`}
          </span>
          <strong>${item.label}</strong>
        </button>
      `;
    }).join("");

    const featuredHtml = featured.map(item => `
      <a class="app-feature-card" href="${productUrl(item.id)}" aria-label="Ver ${item.name}">
        <span class="app-feature-media ${item.image ? "has-image" : ""}">
          ${item.image ? `<img src="${item.image}" alt="" loading="lazy">` : `<span>FOTO EM BREVE</span>`}
        </span>
        <span class="app-feature-copy">
          <small>${labelMap[item.category] || item.category || "Produto"}</small>
          <strong>${item.name || "Produto"}</strong>
          <b>${Number(item.price || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b>
        </span>
      </a>
    `).join("");

    section.innerHTML = `
      <div class="app-discovery-block" id="appCategories">
        <div class="app-section-title">
          <div><span>EXPLORE</span><h2>Categorias</h2></div>
          <a href="#catalogo">Ver tudo →</a>
        </div>
        <div class="app-category-strip">${categoryHtml}</div>
      </div>
      <div class="app-discovery-block app-featured-block">
        <div class="app-section-title">
          <div><span>SELEÇÃO</span><h2>Destaques</h2></div>
          <a href="#catalogo">Ver catálogo →</a>
        </div>
        <div class="app-feature-strip">${featuredHtml}</div>
      </div>
    `;

    catalog.parentNode.insertBefore(section, catalog);

    section.querySelectorAll("[data-app-main][data-app-sub]").forEach(button => {
      button.addEventListener("click", () => clickCategory(button.dataset.appMain, button.dataset.appSub));
    });
  }

  function parsePrice(value) {
    const raw = String(value ?? "").trim();
    if (!raw) return null;

    const normalized = raw
      .replace(/[^0-9,.-]/g, "")
      .replace(",", ".");

    if (!normalized || normalized === "." || normalized === "-" || normalized === "-.") {
      return null;
    }

    const number = Number(normalized);
    return Number.isFinite(number) ? Math.max(0, number) : null;
  }

  function activeFilterCount() {
    let count = 0;
    if (priceMin != null || priceMax != null) count++;
    if (availabilityFilter !== "todos") count++;
    if (featuredOnly) count++;
    if (sortMode !== "featured") count++;
    return count;
  }

  function filterSummary() {
    const parts = [];
    if (availabilityFilter === "pronta_entrega") parts.push("Pronta entrega");
    if (availabilityFilter === "sob_encomenda") parts.push("Sob encomenda");
    if (priceMin != null || priceMax != null) parts.push("Preço");
    if (featuredOnly) parts.push("Destaques");
    if (sortMode === "price_asc") parts.push("Menor preço");
    if (sortMode === "price_desc") parts.push("Maior preço");
    if (sortMode === "name_asc") parts.push("A–Z");
    return parts.length ? parts.join(" • ") : "Todos os produtos";
  }

  function updateFilterTrigger() {
    const count = activeFilterCount();
    const countEl = document.getElementById("appFilterCount");
    const summary = document.getElementById("appFilterSummary");
    const trigger = document.getElementById("appFilterTrigger");

    if (countEl) {
      countEl.textContent = String(count);
      countEl.hidden = count === 0;
    }
    if (summary) summary.textContent = filterSummary();
    trigger?.classList.toggle("is-active", count > 0);
  }

  function getProductByCard(card) {
    try {
      return products.find(item => Number(item.id) === Number(card.dataset.id));
    } catch (_) {
      return null;
    }
  }

  function applyUnifiedFilters() {
    if (!productGrid) return;

    const cards = [...productGrid.querySelectorAll(".product-card")];
    const visible = [];

    cards.forEach(card => {
      const product = getProductByCard(card);
      const price = Number(product?.price);
      const availability = product?.availability || "pronta_entrega";

      const passPrice = Number.isFinite(price)
        && (priceMin == null || price >= priceMin)
        && (priceMax == null || price <= priceMax);
      const passAvailability = availabilityFilter === "todos" || availability === availabilityFilter;
      const passFeatured = !featuredOnly || Boolean(product?.destaque);
      const show = passPrice && passAvailability && passFeatured;

      card.hidden = !show;
      card.style.display = show ? "" : "none";
      card.style.order = "";
      if (show) visible.push({ card, product });
    });

    const comparator = {
      featured: (a, b) => Number(Boolean(b.product?.destaque)) - Number(Boolean(a.product?.destaque)),
      price_asc: (a, b) => Number(a.product?.price || 0) - Number(b.product?.price || 0),
      price_desc: (a, b) => Number(b.product?.price || 0) - Number(a.product?.price || 0),
      name_asc: (a, b) => String(a.product?.name || "").localeCompare(String(b.product?.name || ""), "pt-BR")
    }[sortMode] || (() => 0);

    visible.sort(comparator).forEach(({ card }, index) => {
      card.style.order = String(index);
    });

    if (emptyState && cards.length) {
      if (visible.length) {
        emptyState.style.display = "none";
      } else {
        emptyState.textContent = "Nenhum produto encontrado com os filtros selecionados.";
        emptyState.style.display = "block";
      }
    }

    updateFilterTrigger();
  }

  function syncDraftUI() {
    document.querySelectorAll("[data-filter-availability]").forEach(button => {
      button.classList.toggle("active", button.dataset.filterAvailability === draftAvailability);
    });
    document.querySelectorAll("[data-filter-sort]").forEach(button => {
      button.classList.toggle("active", button.dataset.filterSort === draftSortMode);
    });
    document.querySelectorAll(".app-price-preset-unified").forEach(button => {
      const min = button.dataset.min === "" ? null : Number(button.dataset.min);
      const max = button.dataset.max === "" ? null : Number(button.dataset.max);
      button.classList.toggle("active", min === draftPriceMin && max === draftPriceMax);
    });

    const min = document.getElementById("appUnifiedPriceMin");
    const max = document.getElementById("appUnifiedPriceMax");
    const featured = document.getElementById("appFeaturedOnly");
    if (min) min.value = draftPriceMin ?? "";
    if (max) max.value = draftPriceMax ?? "";
    if (featured) featured.checked = draftFeaturedOnly;
  }

  function openFilterSheet() {
    draftPriceMin = priceMin;
    draftPriceMax = priceMax;
    draftAvailability = availabilityFilter;
    draftFeaturedOnly = featuredOnly;
    draftSortMode = sortMode;
    syncDraftUI();

    const overlay = document.getElementById("appFilterOverlay");
    if (!overlay) return;
    overlay.hidden = false;
    document.body.classList.add("filter-open");
    document.getElementById("appFilterTrigger")?.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => document.getElementById("appFilterClose")?.focus());
  }

  function closeFilterSheet() {
    const overlay = document.getElementById("appFilterOverlay");
    if (overlay) overlay.hidden = true;
    document.body.classList.remove("filter-open");
    document.getElementById("appFilterTrigger")?.setAttribute("aria-expanded", "false");
  }

  function applyDraftFilters() {
    draftPriceMin = parsePrice(document.getElementById("appUnifiedPriceMin")?.value);
    draftPriceMax = parsePrice(document.getElementById("appUnifiedPriceMax")?.value);

    if (draftPriceMin != null && draftPriceMax != null && draftPriceMin > draftPriceMax) {
      [draftPriceMin, draftPriceMax] = [draftPriceMax, draftPriceMin];
    }

    priceMin = draftPriceMin;
    priceMax = draftPriceMax;
    availabilityFilter = draftAvailability;
    featuredOnly = draftFeaturedOnly;
    sortMode = draftSortMode;

    applyUnifiedFilters();
    closeFilterSheet();
  }

  function clearDraftFilters() {
    draftPriceMin = null;
    draftPriceMax = null;
    draftAvailability = "todos";
    draftFeaturedOnly = false;
    draftSortMode = "featured";
    syncDraftUI();
  }

  function buildUnifiedFilter() {
    if (!catalog || document.getElementById("appUnifiedFilter")) return;

    const anchor = document.getElementById("subFilters") || document.getElementById("mainFilters");
    if (!anchor) return;

    const bar = document.createElement("div");
    bar.id = "appUnifiedFilter";
    bar.className = "app-filter-bar";
    bar.innerHTML = `
      <button class="app-filter-trigger" id="appFilterTrigger" type="button" aria-expanded="false" aria-controls="appFilterOverlay">
        <span class="app-filter-icon" aria-hidden="true">☷</span>
        <span>Filtrar e ordenar</span>
        <span class="app-filter-count" id="appFilterCount" hidden>0</span>
      </button>
      <span class="app-filter-summary" id="appFilterSummary">Todos os produtos</span>
    `;
    anchor.insertAdjacentElement("afterend", bar);

    const overlay = document.createElement("div");
    overlay.id = "appFilterOverlay";
    overlay.className = "app-filter-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <section class="app-filter-sheet" role="dialog" aria-modal="true" aria-labelledby="appFilterTitle">
        <header class="app-filter-sheet-head">
          <div><small>CATÁLOGO</small><h3 id="appFilterTitle">Filtrar e ordenar</h3></div>
          <button class="app-filter-close" id="appFilterClose" type="button" aria-label="Fechar filtros">×</button>
        </header>

        <div class="app-filter-body">
          <section class="app-filter-section">
            <h4 class="app-filter-section-title">Disponibilidade</h4>
            <div class="app-filter-options">
              <button class="app-filter-option" type="button" data-filter-availability="todos">Todos</button>
              <button class="app-filter-option" type="button" data-filter-availability="pronta_entrega">Pronta entrega</button>
              <button class="app-filter-option" type="button" data-filter-availability="sob_encomenda">Sob encomenda</button>
            </div>
          </section>

          <section class="app-filter-section">
            <h4 class="app-filter-section-title">Preço</h4>
            <div class="app-filter-options">
              <button class="app-price-preset-unified" type="button" data-min="" data-max="150">Até R$ 150</button>
              <button class="app-price-preset-unified" type="button" data-min="150" data-max="300">R$ 150–300</button>
              <button class="app-price-preset-unified" type="button" data-min="300" data-max="500">R$ 300–500</button>
              <button class="app-price-preset-unified" type="button" data-min="500" data-max="">R$ 500+</button>
            </div>
            <div class="app-filter-price-grid">
              <label class="app-filter-field"><span>Mínimo</span><input id="appUnifiedPriceMin" type="number" inputmode="decimal" min="0" step="10" placeholder="R$ 0"></label>
              <label class="app-filter-field"><span>Máximo</span><input id="appUnifiedPriceMax" type="number" inputmode="decimal" min="0" step="10" placeholder="Sem limite"></label>
            </div>
          </section>

          <section class="app-filter-section">
            <h4 class="app-filter-section-title">Ordenar por</h4>
            <div class="app-filter-options">
              <button class="app-filter-option" type="button" data-filter-sort="featured">Destaques primeiro</button>
              <button class="app-filter-option" type="button" data-filter-sort="price_asc">Menor preço</button>
              <button class="app-filter-option" type="button" data-filter-sort="price_desc">Maior preço</button>
              <button class="app-filter-option" type="button" data-filter-sort="name_asc">Nome A–Z</button>
            </div>
          </section>

          <section class="app-filter-section">
            <div class="app-filter-toggle-row">
              <div class="app-filter-toggle-copy"><strong>Somente destaques</strong><span>Mostrar apenas produtos destacados.</span></div>
              <label class="app-filter-switch"><input id="appFeaturedOnly" type="checkbox"><span aria-hidden="true"></span></label>
            </div>
          </section>
        </div>

        <footer class="app-filter-footer">
          <button class="app-filter-reset" id="appFilterReset" type="button">LIMPAR TUDO</button>
          <button class="app-filter-apply" id="appFilterApply" type="button">APLICAR FILTROS</button>
        </footer>
      </section>
    `;
    document.body.appendChild(overlay);

    document.getElementById("appFilterTrigger")?.addEventListener("click", openFilterSheet);
    document.getElementById("appFilterClose")?.addEventListener("click", closeFilterSheet);
    document.getElementById("appFilterApply")?.addEventListener("click", applyDraftFilters);
    document.getElementById("appFilterReset")?.addEventListener("click", clearDraftFilters);

    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeFilterSheet();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !overlay.hidden) closeFilterSheet();
    });

    overlay.querySelectorAll("[data-filter-availability]").forEach(button => {
      button.addEventListener("click", () => {
        draftAvailability = button.dataset.filterAvailability || "todos";
        syncDraftUI();
      });
    });

    overlay.querySelectorAll("[data-filter-sort]").forEach(button => {
      button.addEventListener("click", () => {
        draftSortMode = button.dataset.filterSort || "featured";
        syncDraftUI();
      });
    });

    overlay.querySelectorAll(".app-price-preset-unified").forEach(button => {
      button.addEventListener("click", () => {
        draftPriceMin = button.dataset.min === "" ? null : Number(button.dataset.min);
        draftPriceMax = button.dataset.max === "" ? null : Number(button.dataset.max);
        syncDraftUI();
      });
    });

    document.getElementById("appFeaturedOnly")?.addEventListener("change", event => {
      draftFeaturedOnly = Boolean(event.target.checked);
    });

    syncDraftUI();
    updateFilterTrigger();
  }

  function refreshEnhancements() {
    normalizeCardLabels();
    buildDiscovery();
    buildUnifiedFilter();
    applyUnifiedFilters();
  }

  buildBottomNav();
  buildUnifiedFilter();

  let refreshPending = false;
  function scheduleRefresh() {
    if (refreshPending) return;
    refreshPending = true;
    requestAnimationFrame(() => {
      refreshPending = false;
      refreshEnhancements();
    });
  }

  if (productGrid) {
    const gridObserver = new MutationObserver(scheduleRefresh);
    gridObserver.observe(productGrid, { childList: true });
  }

  setTimeout(scheduleRefresh, 300);
  setTimeout(scheduleRefresh, 900);
})();
