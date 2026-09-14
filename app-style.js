(() => {
  "use strict";

  document.body.classList.add("app-v53");

  const productUrl = id => `produto.html?id=${encodeURIComponent(id)}`;

  // Abre a página própria do produto antes dos listeners antigos do modal.
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

  // Navegação inferior estilo app (somente mobile pelo CSS).
  const nav = document.createElement("nav");
  nav.className = "app-bottom-nav";
  nav.setAttribute("aria-label", "Navegação rápida");
  nav.innerHTML = `
    <a href="#inicio" aria-label="Ir para o início">
      <span class="nav-icon" aria-hidden="true">⌂</span>
      <span>Início</span>
    </a>
    <a href="#catalogo" aria-label="Ir para o catálogo">
      <span class="nav-icon" aria-hidden="true">⌕</span>
      <span>Catálogo</span>
    </a>
    <button class="app-nav-cart" id="appNavCart" type="button" aria-label="Abrir sacola">
      <span class="nav-icon" aria-hidden="true">◇</span>
      <span>Sacola</span>
      <span class="app-nav-count" id="appNavCount" hidden>0</span>
    </button>
  `;

  document.body.appendChild(nav);

  const appNavCart = document.getElementById("appNavCart");
  const appNavCount = document.getElementById("appNavCount");
  const originalCartButton = document.getElementById("cartButton");
  const originalCount = document.getElementById("cartCount");

  appNavCart?.addEventListener("click", () => {
    originalCartButton?.click();
  });

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
})();
