(() => {
  "use strict";

  const APP_CONFIG = window.APP_CONFIG || {};
  const SUPABASE_URL = APP_CONFIG.supabaseUrl || "";
  const SUPABASE_KEY = APP_CONFIG.supabaseKey || "";
  const CART_STORAGE_KEY = "ag_cart_v1";

  const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const themes = {
    noir_gold: { bg:"#080808", surface:"#111111", surface2:"#161616", accent:"#d6ae55", accentHover:"#f1d78d", text:"#f4f0e8", muted:"#a6a19a", line:"#292722", buttonText:"#080808", headerBg:"rgba(8,8,8,.92)", shadow:"rgba(0,0,0,.45)" },
    oud_bronze: { bg:"#100c09", surface:"#1b1510", surface2:"#241b14", accent:"#b98245", accentHover:"#d5a468", text:"#f4ede4", muted:"#ad9b8a", line:"#3b2c21", buttonText:"#130c07", headerBg:"rgba(16,12,9,.93)", shadow:"rgba(0,0,0,.45)" },
    royal_burgundy: { bg:"#12070a", surface:"#1d0d12", surface2:"#291118", accent:"#d2aa58", accentHover:"#ecd181", text:"#f7eeee", muted:"#b29ba0", line:"#44202a", buttonText:"#16070a", headerBg:"rgba(18,7,10,.93)", shadow:"rgba(0,0,0,.48)" },
    emerald_luxury: { bg:"#06100d", surface:"#0d1a16", surface2:"#12231d", accent:"#cba956", accentHover:"#e5cb82", text:"#edf4f0", muted:"#94a59d", line:"#233b32", buttonText:"#07110d", headerBg:"rgba(6,16,13,.93)", shadow:"rgba(0,0,0,.46)" },
    ivory_gold: { bg:"#f6f1e8", surface:"#fffaf2", surface2:"#ece4d6", accent:"#8a6527", accentHover:"#966f2e", text:"#1c1915", muted:"#746d63", line:"#d8cebd", buttonText:"#fffaf2", headerBg:"rgba(246,241,232,.93)", shadow:"rgba(68,51,30,.18)" },
    pearl_nude: { bg:"#f7efea", surface:"#fff9f6", surface2:"#ebddd6", accent:"#8f6251", accentHover:"#9d7160", text:"#342820", muted:"#75635a", line:"#ddcbc3", buttonText:"#fffafa", headerBg:"rgba(247,239,234,.93)", shadow:"rgba(82,57,47,.17)" },
    minimal_white: { bg:"#fafafa", surface:"#ffffff", surface2:"#eeeeee", accent:"#222222", accentHover:"#555555", text:"#191919", muted:"#707070", line:"#dedede", buttonText:"#ffffff", headerBg:"rgba(250,250,250,.94)", shadow:"rgba(0,0,0,.14)" },
    sand_luxury: { bg:"#eee2ce", surface:"#f8efdf", surface2:"#ded0ba", accent:"#765732", accentHover:"#765732", text:"#28231d", muted:"#6c5d4c", line:"#d1c0a6", buttonText:"#fffaf2", headerBg:"rgba(238,226,206,.93)", shadow:"rgba(70,52,31,.18)" },
    rose_beige: { bg:"#f3e7e2", surface:"#fcf4f0", surface2:"#e5d3cd", accent:"#87574c", accentHover:"#87574c", text:"#3c2b27", muted:"#765f59", line:"#dbc6bf", buttonText:"#fffafa", headerBg:"rgba(243,231,226,.94)", shadow:"rgba(75,46,40,.16)" },
    ice_silver: { bg:"#f3f6f7", surface:"#ffffff", surface2:"#e4e9eb", accent:"#53636c", accentHover:"#53636c", text:"#20272b", muted:"#5d696f", line:"#d1d9dc", buttonText:"#ffffff", headerBg:"rgba(243,246,247,.94)", shadow:"rgba(40,52,58,.16)" }
  };

  let STORE_NAME = APP_CONFIG.defaultStoreName || "Minha Loja";
  let WHATSAPP_NUMBER = "";
  let currentProduct = null;

  const $ = id => document.getElementById(id);

  function money(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function label(value) {
    const map = {
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
    return map[value] || value || "Produto";
  }

  function applyTheme(name) {
    const theme = themes[name] || themes.noir_gold;
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--surface2", theme.surface2);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-hover", theme.accentHover);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--line", theme.line);
    root.style.setProperty("--button-text", theme.buttonText);
    root.style.setProperty("--header-bg", theme.headerBg);
    root.style.setProperty("--shadow", theme.shadow);
    $("themeColorMeta")?.setAttribute("content", theme.bg);
    try { localStorage.setItem("ag_theme_cache", name); } catch (_) {}
  }

  function availabilityLabel(value) {
    return value === "sob_encomenda" ? "SOB ENCOMENDA" : "PRONTA ENTREGA";
  }

  function showError() {
    $("productLoading").hidden = true;
    $("productContent").hidden = true;
    $("productError").hidden = false;
  }

  function showToast(text) {
    const toast = $("productToast");
    if (!toast) return;
    toast.textContent = text;
    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function addToCart() {
    if (!currentProduct) return;
    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      const cart = Array.isArray(saved) ? saved : [];
      const id = Number(currentProduct.id);
      const existing = cart.find(item => Number(item.id) === id);
      if (existing) {
        existing.quantity = Math.min(99, Math.max(1, Number(existing.quantity) || 1) + 1);
      } else {
        cart.push({ id, quantity: 1 });
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      showToast(`${currentProduct.nome || "Produto"} adicionado ao pedido.`);
    } catch (_) {
      showToast("Não foi possível atualizar a sacola.");
    }
  }

  function openWhatsapp() {
    if (!currentProduct) return;
    if (!WHATSAPP_NUMBER) {
      alert("O WhatsApp da loja ainda não foi configurado.");
      return;
    }
    const text = `Olá! Gostaria de consultar a disponibilidade de ${currentProduct.nome}.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function renderStore(config) {
    STORE_NAME = config?.nome_loja || APP_CONFIG.defaultStoreName || "Minha Loja";
    WHATSAPP_NUMBER = String(config?.whatsapp || "").replace(/\D/g, "");
    applyTheme(config?.tema || "noir_gold");

    $("productStoreName").textContent = STORE_NAME;
    $("productBrand")?.setAttribute("aria-label", `Ir para o início da ${STORE_NAME}`);

    if (config?.logo_url) {
      const logo = $("productLogo");
      logo.hidden = false;
      logo.src = config.logo_url;
      logo.onerror = () => { logo.hidden = true; };
      $("dynamicFavicon").href = config.logo_url;
    }
  }

  function renderProduct(product) {
    currentProduct = product;

    const name = product.nome || "Produto";
    const description = product.descricao || "Entre em contato com a loja para saber mais sobre este produto.";
    const availability = product.tipo_disponibilidade || "pronta_entrega";

    document.title = `${name} | ${STORE_NAME}`;
    $("metaDescription")?.setAttribute("content", description.slice(0, 155));
    $("productCategory").textContent = label(product.subcategoria);
    $("productName").textContent = name;
    $("productPrice").textContent = money(product.preço);
    $("productDescription").textContent = description;

    const availabilityEl = $("productAvailability");
    availabilityEl.textContent = availabilityLabel(availability);
    availabilityEl.className = `availability-tag ${availability === "sob_encomenda" ? "is-order" : "is-ready"}`;

    const wrap = $("productImageWrap");
    const image = $("productImage");
    wrap.classList.remove("image-missing");

    if (product.image_url) {
      image.hidden = false;
      image.src = product.image_url;
      image.alt = name;
      image.onerror = () => {
        image.hidden = true;
        wrap.classList.add("image-missing");
      };
    } else {
      image.hidden = true;
      wrap.classList.add("image-missing");
    }

    $("productLoading").hidden = true;
    $("productError").hidden = true;
    $("productContent").hidden = false;
  }

  async function init() {
    const id = Number(new URLSearchParams(location.search).get("id"));
    if (!Number.isFinite(id)) {
      showError();
      return;
    }

    try {
      const [{ data: config, error: configError }, { data: product, error: productError }] = await Promise.all([
        supabaseClient
          .from("configuracoes")
          .select("*")
          .order("id", { ascending: true })
          .limit(1)
          .maybeSingle(),
        supabaseClient
          .from("produtos")
          .select("*")
          .eq("id", id)
          .eq("disponivel", true)
          .maybeSingle()
      ]);

      if (!configError && config) renderStore(config);
      if (productError || !product) {
        showError();
        return;
      }

      renderProduct(product);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      showError();
    }
  }

  $("productBack")?.addEventListener("click", () => {
    if (history.length > 1 && document.referrer) {
      history.back();
    } else {
      location.href = "index.html#catalogo";
    }
  });

  $("productAddCart")?.addEventListener("click", addToCart);
  $("productWhatsapp")?.addEventListener("click", openWhatsapp);

  init();
})();
