// ==================================================
// CONFIGURAÇÃO CENTRAL / SUPABASE
// ==================================================

const APP_CONFIG = window.APP_CONFIG || {};
const SUPABASE_URL = APP_CONFIG.supabaseUrl || "";
const SUPABASE_KEY = APP_CONFIG.supabaseKey || "";
const CATEGORY_CONFIG = Array.isArray(APP_CONFIG.categories)
  ? APP_CONFIG.categories
  : [];



const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


// ==================================================
// ESTADO
// ==================================================

let products = [];

let WHATSAPP_NUMBER =
  "";

let STORE_NAME =
  APP_CONFIG.defaultStoreName || "Minha Loja";

let activeMainCategory =
  "todos";

let activeSubCategory =
  "todos";

const CART_STORAGE_KEY =
  "ag_cart_v1";

const PAYMENT_STORAGE_KEY =
  "ag_payment_method_v1";

let cart =
  carregarCarrinhoLocal();

let produtoModalAtual =
  null;

let paymentMethod =
  localStorage.getItem(PAYMENT_STORAGE_KEY) || "Pix";

let ultimoFocoCarrinho =
  null;


// ==================================================
// TEMAS
// ==================================================

const themes = {


  // ----------------------------------------------
  // NOIR GOLD
  // ----------------------------------------------

  noir_gold: {

    bg:
      "#080808",

    surface:
      "#111111",

    surface2:
      "#161616",

    accent:
      "#d6ae55",

    accentHover:
      "#f1d78d",

    text:
      "#f4f0e8",

    muted:
      "#a6a19a",

    line:
      "#292722",

    buttonText:
      "#080808",

    headerBg:
      "rgba(8, 8, 8, 0.92)",

    menuBg:
      "#090909",

    heroCenter:
      "#211b10",

    heroMiddle:
      "#0b0b0b",

    heroEdge:
      "#080808",

    heroDetail:
      "rgba(214, 174, 85, 0.06)",

    heroGlow:
      "rgba(214, 174, 85, 0.10)",

    aboutStart:
      "#111111",

    aboutEnd:
      "#0b0b0b",

    modalBg:
      "#101010",

    overlay:
      "rgba(0, 0, 0, 0.82)",

    shadow:
      "rgba(0, 0, 0, 0.45)"

  },


  // ----------------------------------------------
  // OUD BRONZE
  // ----------------------------------------------

  oud_bronze: {

    bg:
      "#100c09",

    surface:
      "#1b1510",

    surface2:
      "#241b14",

    accent:
      "#b98245",

    accentHover:
      "#d5a468",

    text:
      "#f4ede4",

    muted:
      "#ad9b8a",

    line:
      "#3b2c21",

    buttonText:
      "#130c07",

    headerBg:
      "rgba(16, 12, 9, 0.93)",

    menuBg:
      "#130e0a",

    heroCenter:
      "#402b1b",

    heroMiddle:
      "#1e1510",

    heroEdge:
      "#100c09",

    heroDetail:
      "rgba(185, 130, 69, 0.08)",

    heroGlow:
      "rgba(185, 130, 69, 0.13)",

    aboutStart:
      "#21170f",

    aboutEnd:
      "#130e0a",

    modalBg:
      "#1a130e",

    overlay:
      "rgba(10, 6, 4, 0.84)",

    shadow:
      "rgba(0, 0, 0, 0.45)"

  },


  // ----------------------------------------------
  // ROYAL BURGUNDY
  // ----------------------------------------------

  royal_burgundy: {

    bg:
      "#12070a",

    surface:
      "#1d0d12",

    surface2:
      "#291118",

    accent:
      "#d2aa58",

    accentHover:
      "#ecd181",

    text:
      "#f7eeee",

    muted:
      "#b29ba0",

    line:
      "#44202a",

    buttonText:
      "#16070a",

    headerBg:
      "rgba(18, 7, 10, 0.93)",

    menuBg:
      "#15080c",

    heroCenter:
      "#4a1625",

    heroMiddle:
      "#250c14",

    heroEdge:
      "#12070a",

    heroDetail:
      "rgba(210, 170, 88, 0.07)",

    heroGlow:
      "rgba(138, 37, 62, 0.22)",

    aboutStart:
      "#251017",

    aboutEnd:
      "#15080c",

    modalBg:
      "#1b0c11",

    overlay:
      "rgba(12, 3, 6, 0.84)",

    shadow:
      "rgba(0, 0, 0, 0.48)"

  },


  // ----------------------------------------------
  // EMERALD LUXURY
  // ----------------------------------------------

  emerald_luxury: {

    bg:
      "#06100d",

    surface:
      "#0d1a16",

    surface2:
      "#12231d",

    accent:
      "#cba956",

    accentHover:
      "#e5cb82",

    text:
      "#edf4f0",

    muted:
      "#94a59d",

    line:
      "#233b32",

    buttonText:
      "#07110d",

    headerBg:
      "rgba(6, 16, 13, 0.93)",

    menuBg:
      "#07130f",

    heroCenter:
      "#173c31",

    heroMiddle:
      "#0d211a",

    heroEdge:
      "#06100d",

    heroDetail:
      "rgba(203, 169, 86, 0.06)",

    heroGlow:
      "rgba(28, 104, 80, 0.18)",

    aboutStart:
      "#10251e",

    aboutEnd:
      "#07130f",

    modalBg:
      "#0b1813",

    overlay:
      "rgba(1, 9, 6, 0.84)",

    shadow:
      "rgba(0, 0, 0, 0.46)"

  },


  // ----------------------------------------------
  // IVORY GOLD
  // ----------------------------------------------

  ivory_gold: {

    bg:
      "#f6f1e8",

    surface:
      "#fffaf2",

    surface2:
      "#ece4d6",

    accent:
      "#8a6527",

    accentHover:
      "#966f2e",

    text:
      "#1c1915",

    muted:
      "#746d63",

    line:
      "#d8cebd",

    buttonText:
      "#fffaf2",

    headerBg:
      "rgba(246, 241, 232, 0.93)",

    menuBg:
      "#f6f1e8",

    heroCenter:
      "#dfcfaa",

    heroMiddle:
      "#efe5d2",

    heroEdge:
      "#f6f1e8",

    heroDetail:
      "rgba(179, 138, 62, 0.09)",

    heroGlow:
      "rgba(179, 138, 62, 0.16)",

    aboutStart:
      "#fffaf2",

    aboutEnd:
      "#eee4d4",

    modalBg:
      "#fffaf2",

    overlay:
      "rgba(33, 27, 20, 0.48)",

    shadow:
      "rgba(68, 51, 30, 0.18)"

  },


  // ----------------------------------------------
  // PEARL NUDE
  // ----------------------------------------------

  pearl_nude: {

    bg:
      "#f7efea",

    surface:
      "#fff9f6",

    surface2:
      "#ebddd6",

    accent:
      "#8f6251",

    accentHover:
      "#9d7160",

    text:
      "#342820",

    muted:
      "#75635a",

    line:
      "#ddcbc3",

    buttonText:
      "#fffafa",

    headerBg:
      "rgba(247, 239, 234, 0.93)",

    menuBg:
      "#f7efea",

    heroCenter:
      "#dbc0b5",

    heroMiddle:
      "#eee0d9",

    heroEdge:
      "#f7efea",

    heroDetail:
      "rgba(185, 143, 125, 0.10)",

    heroGlow:
      "rgba(185, 143, 125, 0.18)",

    aboutStart:
      "#fff9f6",

    aboutEnd:
      "#efe1da",

    modalBg:
      "#fff9f6",

    overlay:
      "rgba(52, 40, 32, 0.44)",

    shadow:
      "rgba(82, 57, 47, 0.17)"

  },


  // ----------------------------------------------
  // MINIMAL WHITE
  // ----------------------------------------------

  minimal_white: {

    bg:
      "#fafafa",

    surface:
      "#ffffff",

    surface2:
      "#eeeeee",

    accent:
      "#222222",

    accentHover:
      "#555555",

    text:
      "#191919",

    muted:
      "#707070",

    line:
      "#dedede",

    buttonText:
      "#ffffff",

    headerBg:
      "rgba(250, 250, 250, 0.94)",

    menuBg:
      "#fafafa",

    heroCenter:
      "#e5e5e5",

    heroMiddle:
      "#f2f2f2",

    heroEdge:
      "#fafafa",

    heroDetail:
      "rgba(0, 0, 0, 0.035)",

    heroGlow:
      "rgba(0, 0, 0, 0.055)",

    aboutStart:
      "#ffffff",

    aboutEnd:
      "#f3f3f3",

    modalBg:
      "#ffffff",

    overlay:
      "rgba(0, 0, 0, 0.42)",

    shadow:
      "rgba(0, 0, 0, 0.14)"

  },


  // ----------------------------------------------
  // SAND LUXURY
  // ----------------------------------------------

  sand_luxury: {

    bg:
      "#eee2ce",

    surface:
      "#f8efdf",

    surface2:
      "#ded0ba",

    accent:
      "#765732",

    accentHover:
      "#765732",

    text:
      "#28231d",

    muted:
      "#6c5d4c",

    line:
      "#d1c0a6",

    buttonText:
      "#fffaf2",

    headerBg:
      "rgba(238, 226, 206, 0.93)",

    menuBg:
      "#eee2ce",

    heroCenter:
      "#cdb38c",

    heroMiddle:
      "#dfcdb1",

    heroEdge:
      "#eee2ce",

    heroDetail:
      "rgba(155, 120, 74, 0.10)",

    heroGlow:
      "rgba(155, 120, 74, 0.15)",

    aboutStart:
      "#f8efdf",

    aboutEnd:
      "#dfcfb7",

    modalBg:
      "#f8efdf",

    overlay:
      "rgba(48, 38, 26, 0.46)",

    shadow:
      "rgba(70, 52, 31, 0.18)"

  },


  // ----------------------------------------------
  // ROSE BEIGE
  // ----------------------------------------------

  rose_beige: {

    bg:
      "#f3e7e2",

    surface:
      "#fcf4f0",

    surface2:
      "#e5d3cd",

    accent:
      "#87574c",

    accentHover:
      "#87574c",

    text:
      "#3c2b27",

    muted:
      "#765f59",

    line:
      "#dbc6bf",

    buttonText:
      "#fffafa",

    headerBg:
      "rgba(243, 231, 226, 0.94)",

    menuBg:
      "#f3e7e2",

    heroCenter:
      "#d6afa4",

    heroMiddle:
      "#e7d1ca",

    heroEdge:
      "#f3e7e2",

    heroDetail:
      "rgba(166, 111, 98, 0.09)",

    heroGlow:
      "rgba(166, 111, 98, 0.17)",

    aboutStart:
      "#fcf4f0",

    aboutEnd:
      "#e8d6d0",

    modalBg:
      "#fcf4f0",

    overlay:
      "rgba(60, 43, 39, 0.44)",

    shadow:
      "rgba(75, 46, 40, 0.16)"

  },


  // ----------------------------------------------
  // ICE SILVER
  // ----------------------------------------------

  ice_silver: {

    bg:
      "#f3f6f7",

    surface:
      "#ffffff",

    surface2:
      "#e4e9eb",

    accent:
      "#53636c",

    accentHover:
      "#53636c",

    text:
      "#20272b",

    muted:
      "#5d696f",

    line:
      "#d1d9dc",

    buttonText:
      "#ffffff",

    headerBg:
      "rgba(243, 246, 247, 0.94)",

    menuBg:
      "#f3f6f7",

    heroCenter:
      "#c7d1d5",

    heroMiddle:
      "#e1e7e9",

    heroEdge:
      "#f3f6f7",

    heroDetail:
      "rgba(113, 129, 138, 0.08)",

    heroGlow:
      "rgba(113, 129, 138, 0.15)",

    aboutStart:
      "#ffffff",

    aboutEnd:
      "#e7ecee",

    modalBg:
      "#ffffff",

    overlay:
      "rgba(32, 39, 43, 0.42)",

    shadow:
      "rgba(40, 52, 58, 0.16)"

  }

};


// ==================================================
// ELEMENTOS
// ==================================================

const grid =
  document.getElementById(
    "productGrid"
  );

const empty =
  document.getElementById(
    "emptyState"
  );

const modal =
  document.getElementById(
    "productModal"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const mainFiltersContainer =
  document.getElementById(
    "mainFilters"
  );

let mainFilters = [];

const subFilters =
  document.getElementById(
    "subFilters"
  );

const cartDrawer =
  document.getElementById(
    "cartDrawer"
  );

const cartItems =
  document.getElementById(
    "cartItems"
  );

const cartCount =
  document.getElementById(
    "cartCount"
  );


// ==================================================
// TEMA
// ==================================================

function aplicarTema(
  nomeTema,
  persistir = true
) {

  const theme =
    themes[nomeTema] ||
    themes.noir_gold;


  const root =
    document.documentElement;


  root.style.setProperty(
    "--bg",
    theme.bg
  );


  root.style.setProperty(
    "--surface",
    theme.surface
  );


  root.style.setProperty(
    "--surface2",
    theme.surface2
  );


  root.style.setProperty(
    "--accent",
    theme.accent
  );


  root.style.setProperty(
    "--accent-hover",
    theme.accentHover
  );


  root.style.setProperty(
    "--text",
    theme.text
  );


  root.style.setProperty(
    "--muted",
    theme.muted
  );


  root.style.setProperty(
    "--line",
    theme.line
  );


  root.style.setProperty(
    "--button-text",
    theme.buttonText
  );


  root.style.setProperty(
    "--header-bg",
    theme.headerBg
  );


  root.style.setProperty(
    "--menu-bg",
    theme.menuBg
  );


  root.style.setProperty(
    "--hero-center",
    theme.heroCenter
  );


  root.style.setProperty(
    "--hero-middle",
    theme.heroMiddle
  );


  root.style.setProperty(
    "--hero-edge",
    theme.heroEdge
  );


  root.style.setProperty(
    "--hero-detail",
    theme.heroDetail
  );


  root.style.setProperty(
    "--hero-glow",
    theme.heroGlow
  );


  root.style.setProperty(
    "--about-start",
    theme.aboutStart
  );


  root.style.setProperty(
    "--about-end",
    theme.aboutEnd
  );


  root.style.setProperty(
    "--modal-bg",
    theme.modalBg
  );


  root.style.setProperty(
    "--overlay",
    theme.overlay
  );


  root.style.setProperty(
    "--shadow",
    theme.shadow
  );


  const meta =
    document.getElementById(
      "themeColorMeta"
    );


  if (meta) {

    meta.setAttribute(
      "content",
      theme.bg
    );

  }

  if (persistir) {
    try {
      localStorage.setItem(
        "ag_theme_cache",
        themes[nomeTema] ? nomeTema : "noir_gold"
      );
    } catch (_) {}
  }

}


// ==================================================
// LOGO
// ==================================================

function aplicarLogo(
  url
) {

  const ids = [
    "loaderLogo",
    "headerLogo",
    "menuLogo",
    "heroLogo",
    "aboutLogo"
  ];

  ids.forEach(id => {
    const imagem = document.getElementById(id);
    if (!imagem) return;

    const container = imagem.closest(".logo-slot");

    const esconder = () => {
      imagem.hidden = true;
      imagem.removeAttribute("src");
      if (container) container.hidden = true;
    };

    if (!url) {
      esconder();
      return;
    }

    if (container) container.hidden = false;
    imagem.hidden = false;
    imagem.onerror = esconder;
    imagem.src = url;
  });
}


// ==================================================
// INSTAGRAM
// ==================================================

function gerarInstagramUrl(
  instagram
) {

  if (!instagram) {

    return "";

  }


  const valor =
    instagram.trim();


  if (
    valor.startsWith(
      "http://"
    ) ||
    valor.startsWith(
      "https://"
    )
  ) {

    return valor;

  }


  const usuario =
    valor.replace(
      /^@/,
      ""
    );


  return (
    `https://www.instagram.com/${usuario}/`
  );

}



// ==================================================
// SEO / METADADOS DINÂMICOS
// ==================================================

function textoMeta(valor, limite = 155) {
  const limpo = String(valor || "").replace(/\s+/g, " ").trim();
  if (limpo.length <= limite) return limpo;
  return `${limpo.slice(0, limite - 1).trimEnd()}…`;
}

function atualizarMetadadosLoja(config) {
  const descricao = textoMeta(
    config.hero_slogan ||
    config.texto_hero ||
    config.texto_sobre ||
    `Conheça o catálogo da ${STORE_NAME} e monte seu pedido direto pelo WhatsApp.`
  );

  const titulo = `${STORE_NAME} | Catálogo`;
  document.title = titulo;

  const definir = (id, atributo, valor) => {
    const el = document.getElementById(id);
    if (el && valor) el.setAttribute(atributo, valor);
  };

  definir("metaDescription", "content", descricao);
  definir("ogTitle", "content", titulo);
  definir("ogDescription", "content", descricao);
  definir("ogSiteName", "content", STORE_NAME);
  definir("twitterTitle", "content", titulo);
  definir("twitterDescription", "content", descricao);

  const favicon = document.getElementById("dynamicFavicon");
  if (favicon && config.logo_url) favicon.href = config.logo_url;

  const canonical = document.getElementById("canonicalLink");
  if (canonical && /^https?:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    canonical.href = `${location.origin}${location.pathname}`;
  } else if (canonical) {
    canonical.removeAttribute("href");
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: STORE_NAME,
    description: descricao
  };

  if (/^https?:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    schema.url = `${location.origin}${location.pathname}`;
  }
  if (config.logo_url) schema.logo = config.logo_url;
  if (config.whatsapp) schema.telephone = String(config.whatsapp).trim();
  if (config.endereco) schema.address = String(config.endereco).trim();
  const instagramUrl = gerarInstagramUrl(config.instagram || "");
  if (instagramUrl) schema.sameAs = [instagramUrl];

  const structured = document.getElementById("storeStructuredData");
  if (structured) structured.textContent = JSON.stringify(schema);
}

// ==================================================
// APLICAR CONFIGURAÇÕES
// ==================================================

function aplicarConfiguracoes(
  config
) {

  if (!config) {

    return;

  }


  // ----------------------------------------------
  // TEMA
  // ----------------------------------------------

  aplicarTema(
    config.tema ||
    "noir_gold"
  );


  // ----------------------------------------------
  // NOME DA LOJA
  // ----------------------------------------------

  STORE_NAME =
    config.nome_loja ||
    APP_CONFIG.defaultStoreName ||
    "Minha Loja";


  document
    .getElementById(
      "loaderName"
    )
    .textContent =
    STORE_NAME.toUpperCase();


  document
    .getElementById(
      "headerStoreName"
    )
    .textContent =
    STORE_NAME;


  document
    .getElementById(
      "menuStoreName"
    )
    .textContent =
    STORE_NAME.toUpperCase();


  document
    .getElementById(
      "catalogStoreName"
    )
    .textContent =
    STORE_NAME.toUpperCase();


  document
    .getElementById(
      "headerBrand"
    )
    .setAttribute(
      "aria-label",
      STORE_NAME
    );


  // ----------------------------------------------
  // LOGO ÚNICA
  // ----------------------------------------------

  aplicarLogo(
    config.logo_url ||
    ""
  );


  // ----------------------------------------------
  // HERO
  // ----------------------------------------------

  document
    .getElementById(
      "heroTitle"
    )
    .textContent =
    config.hero_titulo ||
    "Produtos escolhidos para você.";


  document
    .getElementById(
      "heroSlogan"
    )
    .textContent =
    config.hero_slogan ||
    config.texto_hero ||
    "Descubra uma seleção especial e monte seu pedido de forma simples.";


  document
    .getElementById(
      "heroButtonText"
    )
    .textContent =
    config.hero_botao_texto ||
    "VER CATÁLOGO";


  // ----------------------------------------------
  // SOBRE
  // ----------------------------------------------

  document
    .getElementById(
      "aboutTitle"
    )
    .textContent =
    config.sobre_titulo ||
    `Sobre a ${STORE_NAME}`;


  document
    .getElementById(
      "aboutText"
    )
    .textContent =
    config.texto_sobre ||
    "Conheça nossa seleção de produtos e fale diretamente com a loja.";


  // ----------------------------------------------
  // FOOTER
  // ----------------------------------------------

  document
    .getElementById(
      "footerTitle"
    )
    .textContent =
    (
      config.footer_titulo ||
      STORE_NAME
    ).toUpperCase();


  document
    .getElementById(
      "footerSubtitle"
    )
    .textContent =
    config.footer_subtitulo ||
    "";


  document
    .getElementById(
      "footerCopyright"
    )
    .textContent =
    `© ${new Date().getFullYear()} ${STORE_NAME}`;


  // ----------------------------------------------
  // WHATSAPP
  // ----------------------------------------------

  const numero =
    (
      config.whatsapp ||
      ""
    ).replace(
      /\D/g,
      ""
    );


  if (numero) {

    WHATSAPP_NUMBER =
      numero;

  }


  // ----------------------------------------------
  // INSTAGRAM
  // ----------------------------------------------

  const instagram =
    document.getElementById(
      "footerInstagram"
    );


  if (
    config.instagram
  ) {

    instagram.href =
      gerarInstagramUrl(
        config.instagram
      );


    instagram.hidden =
      false;

  } else {

    instagram.hidden =
      true;

  }


  // ----------------------------------------------
  // BOTÃO WHATSAPP DO FOOTER
  // ----------------------------------------------

  const footerWhatsapp =
    document.getElementById(
      "footerWhatsapp"
    );


  if (footerWhatsapp) {

    footerWhatsapp.hidden =
      !WHATSAPP_NUMBER;

  }


  // ----------------------------------------------
  // ENDEREÇO
  // ----------------------------------------------

  const endereco =
    document.getElementById(
      "footerAddress"
    );


  if (
    config.endereco
  ) {

    endereco.textContent =
      config.endereco;


    endereco.hidden =
      false;

  } else {

    endereco.hidden =
      true;

  }


  // ----------------------------------------------
  // HORÁRIO
  // ----------------------------------------------

  const horario =
    document.getElementById(
      "footerHours"
    );


  if (
    config.horario
  ) {

    horario.textContent =
      config.horario;


    horario.hidden =
      false;

  } else {

    horario.hidden =
      true;

  }

  atualizarMetadadosLoja(config);

}


// ==================================================
// CARREGAR CONFIGURAÇÕES
// ==================================================

async function carregarConfiguracoes() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("configuracoes")
      .select("*")
      .order(
        "id",
        {
          ascending:
            true
        }
      )
      .limit(1)
      .maybeSingle();


  if (error) {

    console.error(
      "Erro ao carregar configurações:",
      error
    );


    return;

  }


  if (!data) {

    return;

  }


  aplicarConfiguracoes(
    data
  );

}


// ==================================================
// CARREGAR PRODUTOS
// ==================================================

async function carregarProdutos() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("produtos")
      .select("*")
      .eq(
        "disponivel",
        true
      )
      .order(
        "id",
        {
          ascending:
            true
        }
      );


  if (error) {

    console.error(
      "Erro ao carregar produtos:",
      error
    );


    grid.innerHTML =
      "";


    empty.textContent =
      "Não foi possível carregar os produtos.";


    empty.style.display =
      "block";


    return;

  }


  products =
    (data || []).map(
      produto => ({

        id:
          produto.id,

        name:
          produto.nome,

        price:
          Number(
            produto.preço
          ),

        category:
          produto.subcategoria,

        mainCategory:
          produto.categoria_principal,

        description:
          produto.descricao,

        image:
          produto.image_url,

        destaque:
          produto.destaque,

        availability:
          produto.tipo_disponibilidade ||
          "pronta_entrega"

      })
    );


  renderProducts();
  renderCarrinho();

}


// ==================================================
// DINHEIRO
// ==================================================

function money(
  value
) {

  return Number(value)
    .toLocaleString(
      "pt-BR",
      {
        style:
          "currency",

        currency:
          "BRL"
      }
    );

}


// ==================================================
// LABEL
// ==================================================

function label(
  category
) {

  const labels = {

    todos:
      "Todos",

    masculino:
      "Masculino",

    feminino:
      "Feminino",

    unissex:
      "Unissex",

    cremes:
      "Cremes",

    hidratantes:
      "Hidratantes",

    oleos:
      "Óleos",

    corpo:
      "Corpo",

    cabelo:
      "Cabelo",

    outros:
      "Outros"

  };


  return (
    labels[category] ||
    category ||
    ""
  );

}


// ==================================================
// DISPONIBILIDADE
// ==================================================

function availabilityLabel(value) {

  return value === "sob_encomenda"
    ? "SOB ENCOMENDA"
    : "PRONTA ENTREGA";

}

function availabilityClass(value) {

  return value === "sob_encomenda"
    ? "is-order"
    : "is-ready";

}


// ==================================================
// PROTEGER TEXTO NO HTML
// ==================================================

function escapeHtml(
  value
) {

  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


// ==================================================
// SACOLA DE PEDIDOS
// ==================================================

function carregarCarrinhoLocal() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(salvo)) return [];
    return salvo
      .map(item => ({
        id: Number(item.id),
        quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1))
      }))
      .filter(item => Number.isFinite(item.id));
  } catch (_) {
    return [];
  }
}

function salvarCarrinhoLocal() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (_) {}
}

function obterProdutoCarrinho(id) {
  return products.find(produto => produto.id === Number(id));
}

function quantidadeCarrinho() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function atualizarContadorCarrinho(animar = false) {
  const total = quantidadeCarrinho();
  if (!cartCount) return;
  cartCount.textContent = String(total);
  cartCount.hidden = total === 0;
  if (animar && total) {
    cartCount.classList.remove("bump");
    void cartCount.offsetWidth;
    cartCount.classList.add("bump");
  }
}

function adicionarAoCarrinho(id, quantidade = 1) {
  const produto = obterProdutoCarrinho(id);
  if (!produto) return;

  const existente = cart.find(item => item.id === produto.id);
  if (existente) {
    existente.quantity = Math.min(99, existente.quantity + quantidade);
  } else {
    cart.push({ id: produto.id, quantity: Math.max(1, quantidade) });
  }

  salvarCarrinhoLocal();
  atualizarContadorCarrinho(true);
  renderCarrinho();
  mostrarToast(`${produto.name} adicionado ao pedido.`);
}

function alterarQuantidadeCarrinho(id, delta) {
  const item = cart.find(item => item.id === Number(id));
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== Number(id));
  } else {
    item.quantity = Math.min(99, item.quantity);
  }
  salvarCarrinhoLocal();
  atualizarContadorCarrinho();
  renderCarrinho();
}

function removerDoCarrinho(id) {
  cart = cart.filter(item => item.id !== Number(id));
  salvarCarrinhoLocal();
  atualizarContadorCarrinho();
  renderCarrinho();
}

function totalCarrinho() {
  return cart.reduce((total, item) => {
    const produto = obterProdutoCarrinho(item.id);
    return produto ? total + (produto.price * item.quantity) : total;
  }, 0);
}

function renderCarrinho() {
  if (!cartItems) return;

  // Remove itens cujos produtos deixaram de existir no catálogo carregado.
  const validos = cart.filter(item => obterProdutoCarrinho(item.id));
  if (validos.length !== cart.length) {
    cart = validos;
    salvarCarrinhoLocal();
  }

  const vazio = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");
  const total = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  cart.forEach(item => {
    const produto = obterProdutoCarrinho(item.id);
    if (!produto) return;

    const article = document.createElement("article");
    article.className = "cart-item";

    const media = document.createElement("div");
    media.className = "cart-item-media";

    if (produto.image) {
      const img = document.createElement("img");
      img.src = produto.image;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => media.classList.add("image-missing"), { once: true });
      media.appendChild(img);
    } else {
      media.classList.add("image-missing");
    }

    const content = document.createElement("div");
    content.className = "cart-item-content";

    const top = document.createElement("div");
    top.className = "cart-item-top";

    const text = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = produto.name || "Produto";
    const category = document.createElement("p");
    category.textContent = label(produto.category);
    text.append(name, category);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "cart-remove";
    remove.setAttribute("aria-label", `Remover ${produto.name} do pedido`);
    remove.textContent = "×";
    remove.addEventListener("click", () => removerDoCarrinho(produto.id));

    top.append(text, remove);

    const bottom = document.createElement("div");
    bottom.className = "cart-item-bottom";

    const stepper = document.createElement("div");
    stepper.className = "quantity-stepper";
    stepper.setAttribute("aria-label", `Quantidade de ${produto.name}`);

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Diminuir quantidade de ${produto.name}`);
    minus.addEventListener("click", () => alterarQuantidadeCarrinho(produto.id, -1));

    const qty = document.createElement("span");
    qty.textContent = String(item.quantity);
    qty.setAttribute("aria-live", "polite");

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Aumentar quantidade de ${produto.name}`);
    plus.addEventListener("click", () => alterarQuantidadeCarrinho(produto.id, 1));

    stepper.append(minus, qty, plus);

    const price = document.createElement("strong");
    price.textContent = money(produto.price * item.quantity);

    bottom.append(stepper, price);
    content.append(top, bottom);
    article.append(media, content);
    cartItems.appendChild(article);
  });

  const temItens = cart.length > 0;
  if (vazio) vazio.hidden = temItens;
  if (footer) footer.hidden = !temItens;
  if (total) total.textContent = money(totalCarrinho());
  atualizarContadorCarrinho();
}

function abrirCarrinho() {
  if (!cartDrawer) return;
  ultimoFocoCarrinho = document.activeElement;
  renderCarrinho();
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.getElementById("cartButton")?.setAttribute("aria-expanded", "true");
  document.body.classList.add("cart-open");
  window.requestAnimationFrame(() => document.getElementById("cartClose")?.focus());
}

function fecharCarrinho() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.getElementById("cartButton")?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("cart-open");
  if (ultimoFocoCarrinho && typeof ultimoFocoCarrinho.focus === "function") {
    ultimoFocoCarrinho.focus();
  }
}

function finalizarCarrinhoWhatsApp() {
  if (!cart.length) return;
  if (!WHATSAPP_NUMBER) {
    alert("O WhatsApp da loja ainda não foi configurado.");
    return;
  }

  const linhas = [
    `Olá! Gostaria de fazer este pedido na ${STORE_NAME}:`,
    ""
  ];

  cart.forEach(item => {
    const produto = obterProdutoCarrinho(item.id);
    if (!produto) return;
    linhas.push(`${item.quantity}x ${produto.name} — ${money(produto.price * item.quantity)}`);
  });

  linhas.push(
    "",
    `Total estimado: ${money(totalCarrinho())}`,
    `Forma de pagamento: ${paymentMethod}`,
    "",
    "Pode confirmar disponibilidade e entrega?"
  );

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(linhas.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function sincronizarFormaPagamento() {
  const opcoes = document.querySelectorAll('input[name="paymentMethod"]');
  opcoes.forEach(opcao => {
    opcao.checked = opcao.value === paymentMethod;
    opcao.addEventListener("change", () => {
      if (!opcao.checked) return;
      paymentMethod = opcao.value;
      localStorage.setItem(PAYMENT_STORAGE_KEY, paymentMethod);
    });
  });
}

function mostrarToast(texto) {
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.className = "cart-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = texto;
  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");
  clearTimeout(mostrarToast.timer);
  mostrarToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ==================================================
// RENDERIZAR PRODUTOS
// ==================================================

function renderProducts() {

  const query =
    searchInput
      .value
      .trim()
      .toLowerCase();


  const filtered =
    products.filter(
      produto => {


        const matchMain =

          activeMainCategory ===
            "todos" ||

          produto.mainCategory ===
            activeMainCategory;


        const matchSub =

          activeSubCategory ===
            "todos" ||

          produto.category ===
            activeSubCategory;


        const nome =

          (
            produto.name ||
            ""
          ).toLowerCase();


        const matchSearch =

          !query ||

          nome.includes(
            query
          );


        return (

          matchMain &&
          matchSub &&
          matchSearch

        );

      }
    );


  const ordenados = [...filtered].sort((a, b) =>
    Number(Boolean(b.destaque)) - Number(Boolean(a.destaque))
  );


  grid.innerHTML =
    ordenados.map(
      produto => `

        <article
          class="product-card${produto.destaque ? " featured" : ""}"
          data-id="${produto.id}"
        >

          <img
            class="product-image"
            src="${escapeHtml(produto.image || "")}"
            alt="${escapeHtml(produto.name)}"
            loading="lazy"
          >


          <div class="product-info">

            <span
              class="availability-tag ${availabilityClass(produto.availability)}"
            >
              ${availabilityLabel(produto.availability)}
            </span>

            <h3 class="product-name">
              ${escapeHtml(produto.name)}
            </h3>


            <p class="product-category">
              ${escapeHtml(label(produto.category))}
            </p>


            <p class="product-price">
              ${money(produto.price)}
            </p>

            <div class="product-actions">
              <button
                class="product-details"
                type="button"
                data-open-product="${produto.id}"
                aria-label="Ver detalhes de ${escapeHtml(produto.name)}"
              >
                DETALHES
              </button>

              <button
                class="product-add"
                type="button"
                data-add-cart="${produto.id}"
                aria-label="Adicionar ${escapeHtml(produto.name)} ao pedido"
              >
                <span>ADICIONAR</span>
                <span aria-hidden="true">＋</span>
              </button>
            </div>

          </div>

        </article>

      `
    ).join("");


  empty.style.display =
    ordenados.length
      ? "none"
      : "block";


  document
    .querySelectorAll(
      ".product-card"
    )
    .forEach(
      card => {

        const abrirCard = () => {
          openProduct(Number(card.dataset.id));
        };

        card.addEventListener("click", event => {
          if (event.target.closest("button")) return;
          abrirCard();
        });

        const detailsButton = card.querySelector("[data-open-product]");
        if (detailsButton) {
          detailsButton.addEventListener("click", event => {
            event.stopPropagation();
            abrirCard();
          });
        }

        const addButton = card.querySelector("[data-add-cart]");
        if (addButton) {
          addButton.addEventListener("click", event => {
            event.stopPropagation();
            adicionarAoCarrinho(Number(addButton.dataset.addCart));
          });
        }

        const imagem = card.querySelector(".product-image");
        if (imagem) {
          imagem.addEventListener("error", () => {
            imagem.hidden = true;
            card.classList.add("image-missing");
          }, { once: true });
        }

      }
    );

}


let ultimoElementoFocado = null;

// ==================================================
// ABRIR PRODUTO
// ==================================================

function openProduct(
  id
) {

  const produto =
    products.find(
      item =>
        item.id === id
    );


  if (!produto) {

    return;

  }


  const modalImage =
    document.getElementById(
      "modalImage"
    );


  const modalImageWrap = modalImage.closest(".modal-image-wrap");
  modalImage.hidden = false;
  if (modalImageWrap) modalImageWrap.classList.remove("image-missing");
  modalImage.onerror = () => {
    modalImage.hidden = true;
    if (modalImageWrap) modalImageWrap.classList.add("image-missing");
  };
  modalImage.src = produto.image || "";


  modalImage.alt =
    produto.name ||
    "";


  document
    .getElementById(
      "modalCategory"
    )
    .textContent =
    label(
      produto.category
    );


  const modalName =
    document.getElementById(
      "modalName"
    );

  let modalAvailability =
    document.getElementById(
      "modalAvailability"
    );

  if (!modalAvailability && modalName) {

    modalAvailability =
      document.createElement(
        "span"
      );

    modalAvailability.id =
      "modalAvailability";

    modalName.parentNode.insertBefore(
      modalAvailability,
      modalName
    );

  }

  if (modalAvailability) {

    modalAvailability.className =
      `availability-tag modal-availability ${availabilityClass(produto.availability)}`;

    modalAvailability.textContent =
      availabilityLabel(
        produto.availability
      );

  }


  if (modalName) {

    modalName.textContent =
      produto.name ||
      "";

  }


  document
    .getElementById(
      "modalPrice"
    )
    .textContent =
    money(
      produto.price
    );


  document
    .getElementById(
      "modalDescription"
    )
    .textContent =
    produto.description ||
    "";


  produtoModalAtual = produto.id;

  document
    .getElementById(
      "modalAddCart"
    )
    .onclick =
    () => {
      adicionarAoCarrinho(produto.id);
    };

  document
    .getElementById(
      "modalWhatsapp"
    )
    .onclick =
    () =>
      openWhatsApp(
        produto
      );


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body
    .classList.add(
      "modal-open"
    );

  ultimoElementoFocado = document.activeElement;
  document.getElementById("modalClose").focus();

}


// ==================================================
// FECHAR PRODUTO
// ==================================================

function closeProduct() {

  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body
    .classList.remove(
      "modal-open"
    );

  produtoModalAtual = null;

  if (ultimoElementoFocado && typeof ultimoElementoFocado.focus === "function") {
    ultimoElementoFocado.focus();
  }

}


// ==================================================
// WHATSAPP
// ==================================================

function openWhatsApp(
  product = null
) {

  if (
    !WHATSAPP_NUMBER
  ) {

    alert(
      "O WhatsApp da loja ainda não foi configurado."
    );


    return;

  }


  const text =
    product

      ? `Olá! Gostaria de consultar a disponibilidade de ${product.name}.`

      : `Olá! Vim pelo site da ${STORE_NAME} e gostaria de conhecer os produtos disponíveis.`;



  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==================================================
// CATEGORIAS E SUBCATEGORIAS (config.js)
// ==================================================

const subcategories = Object.fromEntries(
  CATEGORY_CONFIG.map(category => [
    category.value,
    [
      { value: "todos", label: "Todos" },
      ...(Array.isArray(category.subcategories)
        ? category.subcategories
        : [])
    ]
  ])
);

function renderMainFilters() {
  if (!mainFiltersContainer) return;

  const categoriesHtml = CATEGORY_CONFIG.map(category => `
    <button
      class="filter"
      data-main-category="${escapeHtml(category.value)}"
    >
      ${escapeHtml(category.label)}
    </button>
  `).join("");

  mainFiltersContainer.innerHTML = `
    <button class="filter active" data-main-category="todos">Todos</button>
    ${categoriesHtml}
  `;

  mainFilters = Array.from(
    mainFiltersContainer.querySelectorAll("[data-main-category]")
  );

  mainFilters.forEach(button => {
    button.addEventListener("click", () => {
      mainFilters.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      activeMainCategory = button.dataset.mainCategory;
      activeSubCategory = "todos";
      renderSubFilters();
      renderProducts();
    });
  });
}

// ==================================================
// SUBFILTROS
// ==================================================

function renderSubFilters() {

  if (
    activeMainCategory ===
    "todos"
  ) {

    subFilters.innerHTML =
      "";


    return;

  }


  const items =
    subcategories[
      activeMainCategory
    ] || [];


  subFilters.innerHTML =
    items.map(
      item => `

        <button
          class="filter ${
            item.value ===
            "todos"
              ? "active"
              : ""
          }"

          data-sub-category="${item.value}"
        >

          ${item.label}

        </button>

      `
    ).join("");


  document
    .querySelectorAll(
      "[data-sub-category]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {


            document
              .querySelectorAll(
                "[data-sub-category]"
              )
              .forEach(
                item => {

                  item.classList.remove(
                    "active"
                  );

                }
              );


            button.classList.add(
              "active"
            );


            activeSubCategory =
              button.dataset.subCategory;


            renderProducts();

          }
        );

      }
    );

}


// ==================================================
// BUSCA
// ==================================================

document
  .getElementById(
    "searchToggle"
  )
  .addEventListener(
    "click",
    () => {

      const box =
        document.getElementById(
          "searchBox"
        );


      box.classList.toggle(
        "open"
      );


      if (
        box.classList.contains(
          "open"
        )
      ) {

        searchInput.focus();

      }

    }
  );


searchInput.addEventListener(
  "input",
  renderProducts
);


// ==================================================
// MODAL
// ==================================================

document
  .getElementById(
    "modalClose"
  )
  .addEventListener(
    "click",
    closeProduct
  );


document
  .getElementById(
    "modalBackdrop"
  )
  .addEventListener(
    "click",
    closeProduct
  );


document.addEventListener(
  "keydown",
  event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeProduct();
      return;
    }

    if (event.key === "Tab" && modal.classList.contains("open")) {
      const focaveis = [...modal.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.hidden);
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primeiro.focus();
      }
    }
  }
);


// ==================================================
// WHATSAPP
// ==================================================

document
  .getElementById(
    "whatsappFloat"
  )
  .addEventListener(
    "click",
    () => {

      openWhatsApp();

    }
  );


const footerWhatsappButton =
  document.getElementById(
    "footerWhatsapp"
  );


if (footerWhatsappButton) {

  footerWhatsappButton.addEventListener(
    "click",
    () => {
      openWhatsApp();
    }
  );

}


document
  .getElementById(
    "menuWhatsapp"
  )
  .addEventListener(
    "click",
    event => {

      event.preventDefault();


      openWhatsApp();

    }
  );


// ==================================================
// SACOLA — EVENTOS
// ==================================================

document.getElementById("cartButton")?.addEventListener("click", abrirCarrinho);
document.getElementById("cartClose")?.addEventListener("click", fecharCarrinho);
document.getElementById("cartBackdrop")?.addEventListener("click", fecharCarrinho);
sincronizarFormaPagamento();

document.getElementById("cartCheckout")?.addEventListener("click", finalizarCarrinhoWhatsApp);
document.getElementById("cartContinue")?.addEventListener("click", fecharCarrinho);
document.getElementById("cartContinueEmpty")?.addEventListener("click", () => {
  fecharCarrinho();
  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", event => {
  if (!cartDrawer?.classList.contains("open")) return;

  if (event.key === "Escape") {
    fecharCarrinho();
    return;
  }

  if (event.key === "Tab") {
    const focaveis = [...cartDrawer.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.hidden && el.offsetParent !== null);
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  }
});

// ==================================================
// MENU MOBILE
// ==================================================

const menu =
  document.getElementById(
    "mobileMenu"
  );


const menuButton =
  document.getElementById(
    "menuButton"
  );


function fecharMenu() {

  menu.classList.remove(
    "open"
  );


  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


menuButton.addEventListener(
  "click",
  () => {

    menu.classList.add(
      "open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

  }
);


document
  .getElementById(
    "menuClose"
  )
  .addEventListener(
    "click",
    fecharMenu
  );


document
  .querySelectorAll(
    ".mobile-menu a"
  )
  .forEach(
    link => {

      if (
        link.id !==
        "menuWhatsapp"
      ) {

        link.addEventListener(
          "click",
          fecharMenu
        );

      }

    }
  );


// ==================================================
// LOADER
// ==================================================

function esconderLoader() {

  const loader =
    document.getElementById(
      "pageLoader"
    );


  setTimeout(
    () => {

      loader.classList.add(
        "hide"
      );

    },
    350
  );

}


atualizarContadorCarrinho();


// ==================================================
// INICIAR SITE
// ==================================================

async function iniciarSite() {

  let temaInicial = "noir_gold";
  try {
    temaInicial = localStorage.getItem("ag_theme_cache") || temaInicial;
  } catch (_) {}

  // Aplica o cache sem regravá-lo. O banco confirma o tema oficial.
  aplicarTema(temaInicial, false);
  renderMainFilters();
  renderSubFilters();

  const timeout = new Promise(resolve => {
    setTimeout(() => resolve("timeout"), 8000);
  });

  try {
    await Promise.race([
      Promise.all([carregarConfiguracoes(), carregarProdutos()]),
      timeout
    ]);
  } catch (erro) {
    console.error("Falha na inicialização do site:", erro);
  } finally {
    esconderLoader();
  }
}


iniciarSite();