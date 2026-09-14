(() => {
  "use strict";

  document.body.classList.add("app-v53", "app-v532", "app-v534");

  const productUrl = id => `produto.html?id=${encodeURIComponent(id)}`;
  const productGrid = document.getElementById("productGrid");
  const catalog = document.getElementById("catalogo");
  const emptyState = document.getElementById("emptyState");

  let priceMin = null;
  let priceMax = null;

  // Página própria do produto.
  document.addEventListener(
    "click",
    event => {
      const details = event.target.closest("[data-open-product]");
      const card = event.target.closest(".product-card");

      if (details) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = productUrl(details.dataset.openProduct);
        return;
      }

      if (card && !event.target.closest("button")) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = productUrl(card.dataset.id);
      }
    },
    true
  );

  // Navegação inferior estilo app.
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

  const appNavCart = document.getElementById("appNavCart");
  const appNavContact = document.getElementById("appNavContact");
  const appNavCount = document.getElementById("appNavCount");
  const originalCartButton = document.getElementById("cartButton");
  const originalCount = document.getElementById("cartCount");

  appNavCart?.addEventListener("click", () => originalCartButton?.click());
  appNavContact?.addEventListener("click", () => document.getElementById("whatsappFloat")?.click());

  const syncCount = () => {
    if (!appNavCount || !originalCount) return;
    const value = Number(originalCount.textContent || 0);
    appNavCount.textContent = String(value);
    appNavCount.hidden = !value;
  };

  syncCount();
  if (originalCount) {
    const observer = new MutationObserver(syncCount);
    observer.observe(originalCount, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"]
    });
  }

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

  function firstImageForCategory(value) {
    try {
      const match = products.find(item => item.category === value && item.image);
      return match?.image || "";
    } catch (_) {
      return "";
    }
  }

  function clickCategory(main, sub) {
    const mainButton = document.querySelector(`[data-main-category="${main}"]`);
    mainButton?.click();

    window.requestAnimationFrame(() => {
      const subButton = document.querySelector(`[data-sub-category="${sub}"]`);
      subButton?.click();
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function buildDiscovery() {
    if (!catalog || document.getElementById("appDiscovery")) return;

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
      ...preferred
        .map(key => configured.find(item => item.value === key))
        .filter(Boolean),
      ...configured.filter(item => !preferred.includes(item.value))
    ].slice(0, 6);

    let featured = [];
    try {
      featured = products.filter(item => item.destaque).slice(0, 6);
      if (!featured.length) featured = products.slice(0, 6);
    } catch (_) {}

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
          <div>
            <span>EXPLORE</span>
            <h2>Categorias</h2>
          </div>
          <a href="#catalogo">Ver tudo →</a>
        </div>
        <div class="app-category-strip">${categoryHtml}</div>
      </div>
      ${featuredHtml ? `
        <div class="app-discovery-block app-featured-block">
          <div class="app-section-title">
            <div>
              <span>SELEÇÃO</span>
              <h2>Destaques</h2>
            </div>
            <a href="#catalogo">Ver catálogo →</a>
          </div>
          <div class="app-feature-strip">${featuredHtml}</div>
        </div>
      ` : ""}
    `;

    catalog.parentNode.insertBefore(section, catalog);

    section.querySelectorAll("[data-app-main][data-app-sub]").forEach(button => {
      button.addEventListener("click", () => {
        clickCategory(button.dataset.appMain, button.dataset.appSub);
      });
    });
  }

  function formatMoneyShort(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
    });
  }

  function currentPriceSummary() {
    if (priceMin == null && priceMax == null) return "Todos os preços";
    if (priceMin == null) return `Até ${formatMoneyShort(priceMax)}`;
    if (priceMax == null) return `Acima de ${formatMoneyShort(priceMin)}`;
    return `${formatMoneyShort(priceMin)} – ${formatMoneyShort(priceMax)}`;
  }

  function applyPriceFilter() {
    if (!productGrid) return;

    const cards = [...productGrid.querySelectorAll(".product-card")];
    let visible = 0;

    cards.forEach(card => {
      const id = Number(card.dataset.id);
      let product = null;
      try {
        product = products.find(item => Number(item.id) === id);
      } catch (_) {}

      const price = Number(product?.price);
      const passMin = priceMin == null || price >= priceMin;
      const passMax = priceMax == null || price <= priceMax;
      const show = Number.isFinite(price) && passMin && passMax;

      card.hidden = !show;
      if (show) visible += 1;
    });

    const summary = document.getElementById("appPriceSummary");
    if (summary) summary.textContent = currentPriceSummary();

    const clear = document.getElementById("appPriceClear");
    if (clear) clear.hidden = priceMin == null && priceMax == null;

    document.querySelectorAll(".app-price-preset").forEach(button => {
      const min = button.dataset.min === "" ? null : Number(button.dataset.min);
      const max = button.dataset.max === "" ? null : Number(button.dataset.max);
      button.classList.toggle("active", min === priceMin && max === priceMax);
    });

    if (emptyState && cards.length) {
      if (visible) {
        emptyState.style.display = "none";
      } else {
        emptyState.textContent = "Nenhum produto encontrado nessa faixa de preço.";
        emptyState.style.display = "block";
      }
    }
  }

  function setPriceRange(min, max) {
    priceMin = Number.isFinite(min) ? Math.max(0, min) : null;
    priceMax = Number.isFinite(max) ? Math.max(0, max) : null;

    if (priceMin != null && priceMax != null && priceMin > priceMax) {
      [priceMin, priceMax] = [priceMax, priceMin];
    }

    const minInput = document.getElementById("appPriceMin");
    const maxInput = document.getElementById("appPriceMax");
    if (minInput) minInput.value = priceMin ?? "";
    if (maxInput) maxInput.value = priceMax ?? "";

    applyPriceFilter();
  }

  function parsePriceInput(value) {
    const normalized = String(value || "")
      .replace(/[^0-9,.-]/g, "")
      .replace(",", ".");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
  }

  function buildPriceFilter() {
    if (!catalog || document.getElementById("appPriceFilter")) return;

    const mainFilters = document.getElementById("mainFilters");
    const subFilters = document.getElementById("subFilters");
    const anchor = subFilters || mainFilters;
    if (!anchor) return;

    const wrap = document.createElement("div");
    wrap.id = "appPriceFilter";
    wrap.className = "app-price-filter";
    wrap.innerHTML = `
      <div class="app-price-toolbar">
        <button class="app-price-toggle" id="appPriceToggle" type="button" aria-expanded="false" aria-controls="appPricePanel">
          <span class="price-filter-icon" aria-hidden="true">↕</span>
          <span>Preço</span>
          <span class="price-filter-summary" id="appPriceSummary">Todos os preços</span>
        </button>
        <button class="app-price-clear" id="appPriceClear" type="button" hidden>Limpar</button>
      </div>

      <div class="app-price-panel" id="appPricePanel" hidden>
        <p class="app-price-panel-title">Filtrar por faixa de preço</p>
        <div class="app-price-presets" aria-label="Faixas rápidas de preço">
          <button class="app-price-preset" type="button" data-min="" data-max="150">Até R$ 150</button>
          <button class="app-price-preset" type="button" data-min="150" data-max="300">R$ 150–300</button>
          <button class="app-price-preset" type="button" data-min="300" data-max="500">R$ 300–500</button>
          <button class="app-price-preset" type="button" data-min="500" data-max="">R$ 500+</button>
        </div>

        <div class="app-price-custom">
          <label class="app-price-field">
            <span>Mínimo</span>
            <input id="appPriceMin" type="number" inputmode="decimal" min="0" step="10" placeholder="R$ 0">
          </label>
          <label class="app-price-field">
            <span>Máximo</span>
            <input id="appPriceMax" type="number" inputmode="decimal" min="0" step="10" placeholder="Sem limite">
          </label>
          <button class="app-price-apply" id="appPriceApply" type="button">APLICAR FAIXA</button>
        </div>
      </div>
    `;

    anchor.insertAdjacentElement("afterend", wrap);

    const toggle = document.getElementById("appPriceToggle");
    const panel = document.getElementById("appPricePanel");
    const clear = document.getElementById("appPriceClear");
    const apply = document.getElementById("appPriceApply");

    toggle?.addEventListener("click", () => {
      const open = panel?.hidden ?? true;
      if (panel) panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });

    clear?.addEventListener("click", () => {
      setPriceRange(null, null);
    });

    wrap.querySelectorAll(".app-price-preset").forEach(button => {
      button.addEventListener("click", () => {
        const min = button.dataset.min === "" ? null : Number(button.dataset.min);
        const max = button.dataset.max === "" ? null : Number(button.dataset.max);
        setPriceRange(min, max);
      });
    });

    apply?.addEventListener("click", () => {
      const min = parsePriceInput(document.getElementById("appPriceMin")?.value);
      const max = parsePriceInput(document.getElementById("appPriceMax")?.value);
      setPriceRange(min, max);
      if (panel) panel.hidden = true;
      toggle?.setAttribute("aria-expanded", "false");
    });
  }

  function refreshEnhancements() {
    normalizeCardLabels();
    buildDiscovery();
    buildPriceFilter();
    applyPriceFilter();
  }

  if (productGrid) {
    const observer = new MutationObserver(() => {
      refreshEnhancements();
    });
    observer.observe(productGrid, { childList: true });
  }

  window.setTimeout(refreshEnhancements, 350);
  window.setTimeout(refreshEnhancements, 1000);
})();
