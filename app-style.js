(() => {
  "use strict";

  document.body.classList.add("app-v53", "app-v532");

  const productUrl = id => `produto.html?id=${encodeURIComponent(id)}`;
  const productGrid = document.getElementById("productGrid");
  const catalog = document.getElementById("catalogo");

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

  function refreshEnhancements() {
    normalizeCardLabels();
    buildDiscovery();
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
