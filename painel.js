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
// ELEMENTOS PRINCIPAIS
// ==================================================

const productsContainer =
  document.getElementById(
    "adminProducts"
  );

const productCount =
  document.getElementById(
    "productCount"
  );

const logoutButton =
  document.getElementById(
    "logoutButton"
  );

const newProductButton =
  document.getElementById(
    "newProductButton"
  );

const panelStoreName =
  document.getElementById(
    "panelStoreName"
  );


// ==================================================
// BUSCA
// ==================================================

const adminSearch =
  document.getElementById(
    "adminSearch"
  );

const adminCategoryFilter =
  document.getElementById(
    "adminCategoryFilter"
  );


// ==================================================
// MODAL
// ==================================================

const editModal =
  document.getElementById(
    "editModal"
  );

const editBackdrop =
  document.getElementById(
    "editBackdrop"
  );

const editClose =
  document.getElementById(
    "editClose"
  );

const editForm =
  document.getElementById(
    "editForm"
  );

const formTitle =
  document.getElementById(
    "formTitle"
  );

const saveProductButton =
  document.getElementById(
    "saveProductButton"
  );

const editMessage =
  document.getElementById(
    "editMessage"
  );


// ==================================================
// CAMPOS DO PRODUTO
// ==================================================

const editId =
  document.getElementById(
    "editId"
  );

const editNome =
  document.getElementById(
    "editNome"
  );

const editPreco =
  document.getElementById(
    "editPreco"
  );

const editCategoriaPrincipal =
  document.getElementById(
    "editCategoriaPrincipal"
  );

const editSubcategoria =
  document.getElementById(
    "editSubcategoria"
  );

const editDescricao =
  document.getElementById(
    "editDescricao"
  );

const editDestaque =
  document.getElementById(
    "editDestaque"
  );

const editTipoDisponibilidade =
  document.getElementById(
    "editTipoDisponibilidade"
  );

const editImageFile =
  document.getElementById(
    "editImageFile"
  );

const editImageUrl =
  document.getElementById(
    "editImageUrl"
  );

const imagePreview =
  document.getElementById(
    "imagePreview"
  );


// ==================================================
// CONFIGURAÇÕES
// ==================================================

const settingsForm =
  document.getElementById(
    "settingsForm"
  );

const settingsMessage =
  document.getElementById(
    "settingsMessage"
  );

const settingsNome =
  document.getElementById(
    "settingsNome"
  );

const settingsLogoFile =
  document.getElementById(
    "settingsLogoFile"
  );

const settingsLogoUrl =
  document.getElementById(
    "settingsLogoUrl"
  );

const settingsLogoPreview =
  document.getElementById(
    "settingsLogoPreview"
  );

const settingsTema =
  document.getElementById(
    "settingsTema"
  );

const themeCards =
  document.querySelectorAll(
    "[data-theme]"
  );


// ==================================================
// HERO
// ==================================================

const settingsHeroTitulo =
  document.getElementById(
    "settingsHeroTitulo"
  );

const settingsHeroSlogan =
  document.getElementById(
    "settingsHeroSlogan"
  );

const settingsHeroBotao =
  document.getElementById(
    "settingsHeroBotao"
  );


// ==================================================
// SOBRE
// ==================================================

const settingsSobreTitulo =
  document.getElementById(
    "settingsSobreTitulo"
  );

const settingsSobre =
  document.getElementById(
    "settingsSobre"
  );


// ==================================================
// FOOTER
// ==================================================

const settingsFooterTitulo =
  document.getElementById(
    "settingsFooterTitulo"
  );

const settingsFooterSubtitulo =
  document.getElementById(
    "settingsFooterSubtitulo"
  );


// ==================================================
// CONTATO
// ==================================================

const settingsWhatsapp =
  document.getElementById(
    "settingsWhatsapp"
  );

const settingsInstagram =
  document.getElementById(
    "settingsInstagram"
  );

const settingsEndereco =
  document.getElementById(
    "settingsEndereco"
  );

const settingsHorario =
  document.getElementById(
    "settingsHorario"
  );


// ==================================================
// ESTADO
// ==================================================

let modoFormulario =
  "editar";

let produtosAdmin =
  [];

let configuracaoId =
  null;


// ==================================================
// TEMAS DO PAINEL
// ==================================================

const panelThemes = {


  noir_gold: {

    bg: "#080808",
    surface: "#111111",
    surface2: "#171717",
    input: "#0c0c0c",
    preview: "#0a0a0a",
    accent: "#d6ae55",
    accentHover: "#f1d78d",
    text: "#f4f0e8",
    muted: "#a6a19a",
    line: "#292722",
    buttonText: "#080808",
    header: "rgba(8,8,8,.95)",
    shadow: "rgba(0,0,0,.4)"

  },


  oud_bronze: {

    bg: "#100c09",
    surface: "#1b1510",
    surface2: "#241b14",
    input: "#140f0b",
    preview: "#0e0a07",
    accent: "#b98245",
    accentHover: "#d5a468",
    text: "#f4ede4",
    muted: "#ad9b8a",
    line: "#3b2c21",
    buttonText: "#130c07",
    header: "rgba(16,12,9,.95)",
    shadow: "rgba(0,0,0,.42)"

  },


  royal_burgundy: {

    bg: "#12070a",
    surface: "#1d0d12",
    surface2: "#291118",
    input: "#16090d",
    preview: "#100609",
    accent: "#d2aa58",
    accentHover: "#ecd181",
    text: "#f7eeee",
    muted: "#b29ba0",
    line: "#44202a",
    buttonText: "#16070a",
    header: "rgba(18,7,10,.95)",
    shadow: "rgba(0,0,0,.46)"

  },


  emerald_luxury: {

    bg: "#06100d",
    surface: "#0d1a16",
    surface2: "#12231d",
    input: "#08130f",
    preview: "#050d0a",
    accent: "#cba956",
    accentHover: "#e5cb82",
    text: "#edf4f0",
    muted: "#94a59d",
    line: "#233b32",
    buttonText: "#07110d",
    header: "rgba(6,16,13,.95)",
    shadow: "rgba(0,0,0,.44)"

  },


  ivory_gold: {

    bg: "#f6f1e8",
    surface: "#fffaf2",
    surface2: "#ece4d6",
    input: "#f4ecdf",
    preview: "#eee5d7",
    accent: "#8a6527",
    accentHover: "#966f2e",
    text: "#1c1915",
    muted: "#746d63",
    line: "#d8cebd",
    buttonText: "#fffaf2",
    header: "rgba(246,241,232,.95)",
    shadow: "rgba(68,51,30,.16)"

  },


  pearl_nude: {

    bg: "#f7efea",
    surface: "#fff9f6",
    surface2: "#ebddd6",
    input: "#f2e7e1",
    preview: "#eadcd5",
    accent: "#8f6251",
    accentHover: "#9d7160",
    text: "#342820",
    muted: "#75635a",
    line: "#ddcbc3",
    buttonText: "#fffafa",
    header: "rgba(247,239,234,.95)",
    shadow: "rgba(82,57,47,.15)"

  },


  minimal_white: {

    bg: "#fafafa",
    surface: "#ffffff",
    surface2: "#eeeeee",
    input: "#f4f4f4",
    preview: "#eeeeee",
    accent: "#222222",
    accentHover: "#555555",
    text: "#191919",
    muted: "#707070",
    line: "#dedede",
    buttonText: "#ffffff",
    header: "rgba(250,250,250,.96)",
    shadow: "rgba(0,0,0,.13)"

  },


  sand_luxury: {

    bg: "#eee2ce",
    surface: "#f8efdf",
    surface2: "#ded0ba",
    input: "#e9dcc7",
    preview: "#ded0ba",
    accent: "#765732",
    accentHover: "#765732",
    text: "#28231d",
    muted: "#6c5d4c",
    line: "#d1c0a6",
    buttonText: "#fffaf2",
    header: "rgba(238,226,206,.95)",
    shadow: "rgba(70,52,31,.16)"

  },


  rose_beige: {

    bg: "#f3e7e2",
    surface: "#fcf4f0",
    surface2: "#e5d3cd",
    input: "#eee0db",
    preview: "#e5d3cd",
    accent: "#87574c",
    accentHover: "#87574c",
    text: "#3c2b27",
    muted: "#765f59",
    line: "#dbc6bf",
    buttonText: "#fffafa",
    header: "rgba(243,231,226,.95)",
    shadow: "rgba(75,46,40,.14)"

  },


  ice_silver: {

    bg: "#f3f6f7",
    surface: "#ffffff",
    surface2: "#e4e9eb",
    input: "#edf1f2",
    preview: "#e4e9eb",
    accent: "#53636c",
    accentHover: "#53636c",
    text: "#20272b",
    muted: "#5d696f",
    line: "#d1d9dc",
    buttonText: "#ffffff",
    header: "rgba(243,246,247,.96)",
    shadow: "rgba(40,52,58,.14)"

  }

};


// ==================================================
// APLICAR TEMA AO PAINEL
// ==================================================

function aplicarTemaPainel(
  nomeTema
) {

  const theme =
    panelThemes[nomeTema] ||
    panelThemes.noir_gold;


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
    "--input",
    theme.input
  );


  root.style.setProperty(
    "--preview-bg",
    theme.preview
  );


  root.style.setProperty(
    "--gold",
    theme.accent
  );


  root.style.setProperty(
    "--gold-light",
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
    theme.header
  );


  root.style.setProperty(
    "--shadow",
    theme.shadow
  );

}

// ==================================================
// SEGURANÇA / ESCAPAR HTML
// ==================================================

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

// ==================================================
// CATEGORIAS E SUBCATEGORIAS (config.js)
// ==================================================

const subcategoriasAdmin = Object.fromEntries(
  CATEGORY_CONFIG.map(category => [
    category.value,
    Array.isArray(category.subcategories)
      ? category.subcategories
      : []
  ])
);

function configurarCategoriasPainel() {
  const opcoes = CATEGORY_CONFIG.map(category => `
    <option value="${escapeHtml(category.value)}">
      ${escapeHtml(category.label)}
    </option>
  `).join("");

  adminCategoryFilter.innerHTML = `
    <option value="todos">Todas as categorias</option>
    ${opcoes}
  `;

  editCategoriaPrincipal.innerHTML = opcoes;

  const primeira = CATEGORY_CONFIG[0]?.value || "";
  if (primeira) {
    editCategoriaPrincipal.value = primeira;
    preencherSubcategorias(primeira);
  }
}

// ==================================================
// SUBCATEGORIAS DO FORMULÁRIO
// ==================================================

function preencherSubcategorias(
  categoria,
  valorAtual = null
) {

  const itens =
    subcategoriasAdmin[categoria] ||
    [];


  editSubcategoria.innerHTML =
    itens.map(
      item => `

        <option value="${item.value}">
          ${item.label}
        </option>

      `
    ).join("");


  if (valorAtual) {

    editSubcategoria.value =
      valorAtual;

  }

}


// ==================================================
// DINHEIRO
// ==================================================

function money(
  value
) {

  return Number(value)
    .toLocaleString(
      APP_CONFIG.locale || "pt-BR",
      {
        style: "currency",
        currency: APP_CONFIG.currency || "BRL"
      }
    );

}


// ==================================================
// CATEGORIA
// ==================================================

function nomeCategoria(
  categoria
) {

  const item = CATEGORY_CONFIG.find(
    category => category.value === categoria
  );

  return item?.label || categoria || "";

}


// ==================================================
// PROTEGER PAINEL
// ==================================================

async function protegerPainel() {

  const {
    data,
    error
  } =
    await supabaseClient
      .auth
      .getSession();


  if (error || !data.session) {
    window.location.href = "admin.html";
    return false;
  }

  const { data: adminOk, error: adminError } =
    await supabaseClient.rpc("is_admin");

  if (adminError || adminOk !== true) {
    await supabaseClient.auth.signOut();
    window.location.href = "admin.html";
    return false;
  }

  return true;

}


// ==================================================
// NOVO PRODUTO
// ==================================================

function abrirNovoProduto() {

  modoFormulario =
    "novo";


  editId.value =
    "";


  editNome.value =
    "";


  editPreco.value =
    "";


  const categoriaInicial =
    CATEGORY_CONFIG[0]?.value || "";


  editCategoriaPrincipal.value =
    categoriaInicial;


  preencherSubcategorias(
    categoriaInicial
  );


  editDescricao.value =
    "";


  editDestaque.checked =
    false;

  if (editTipoDisponibilidade) {
    editTipoDisponibilidade.value =
      "pronta_entrega";
  }


  editImageFile.value =
    "";


  editImageUrl.value =
    "";


  imagePreview.src =
    "";


  imagePreview.style.display =
    "none";


  formTitle.textContent =
    "Novo produto";


  saveProductButton.textContent =
    "ADICIONAR PRODUTO";


  editMessage.textContent =
    "";


  editModal.hidden =
    false;

}


// ==================================================
// EDITAR PRODUTO
// ==================================================

function abrirEdicao(
  produto
) {

  modoFormulario =
    "editar";


  editId.value =
    produto.id;


  editNome.value =
    produto.nome ||
    "";


  editPreco.value =
    produto.preço ??
    "";


  editCategoriaPrincipal.value =
    produto.categoria_principal;


  preencherSubcategorias(
    produto.categoria_principal,
    produto.subcategoria
  );


  editDescricao.value =
    produto.descricao ||
    "";


  editDestaque.checked =
    !!produto.destaque;

  if (editTipoDisponibilidade) {
    editTipoDisponibilidade.value =
      produto.tipo_disponibilidade ||
      "pronta_entrega";
  }


  editImageFile.value =
    "";


  editImageUrl.value =
    produto.image_url ||
    "";


  if (
    produto.image_url
  ) {

    imagePreview.src =
      produto.image_url;


    imagePreview.style.display =
      "block";

  } else {

    imagePreview.src =
      "";


    imagePreview.style.display =
      "none";

  }


  formTitle.textContent =
    "Editar produto";


  saveProductButton.textContent =
    "SALVAR ALTERAÇÕES";


  editMessage.textContent =
    "";


  editModal.hidden =
    false;

}


// ==================================================
// FECHAR MODAL
// ==================================================

function fecharEdicao() {

  editModal.hidden =
    true;

}


// ==================================================
// EVENTOS DO MODAL
// ==================================================

newProductButton.addEventListener(
  "click",
  abrirNovoProduto
);


editClose.addEventListener(
  "click",
  fecharEdicao
);


editBackdrop.addEventListener(
  "click",
  fecharEdicao
);


editCategoriaPrincipal.addEventListener(
  "change",
  () => {

    preencherSubcategorias(
      editCategoriaPrincipal.value
    );

  }
);


// ==================================================
// PRÉVIA DA IMAGEM
// ==================================================

editImageFile.addEventListener(
  "change",
  () => {

    const file =
      editImageFile.files[0];


    if (!file) {
      return;
    }


    try {
      validarArquivoImagem(file);
    } catch (erro) {
      alert(erro.message);
      editImageFile.value = "";
      return;
    }


    if (
      !file.type.startsWith(
        "image/"
      )
    ) {

      alert(
        "Selecione uma imagem válida."
      );


      editImageFile.value =
        "";


      return;

    }


    const previewUrl =
      URL.createObjectURL(
        file
      );


    imagePreview.src =
      previewUrl;


    imagePreview.style.display =
      "block";

  }
);


// ==================================================
// IMAGENS: LIMITES, COMPRESSÃO E STORAGE
// ==================================================

const MAX_UPLOAD_BYTES =
  8 * 1024 * 1024;

const TIPOS_IMAGEM_ACEITOS =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp"
  ]);


function validarArquivoImagem(
  file
) {

  if (!file) {
    throw new Error(
      "Nenhuma imagem selecionada."
    );
  }


  if (
    !TIPOS_IMAGEM_ACEITOS.has(
      file.type
    )
  ) {

    throw new Error(
      "Use uma imagem JPG, PNG ou WebP."
    );

  }


  if (
    file.size >
    MAX_UPLOAD_BYTES
  ) {

    throw new Error(
      "A imagem deve ter no máximo 8 MB."
    );

  }

}


function carregarImagemLocal(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const url =
        URL.createObjectURL(file);

      const image =
        new Image();


      image.onload = () => {

        URL.revokeObjectURL(url);
        resolve(image);

      };


      image.onerror = () => {

        URL.revokeObjectURL(url);

        reject(
          new Error(
            "Não foi possível ler a imagem."
          )
        );

      };


      image.src = url;

    }
  );

}


async function comprimirImagem(
  file,
  {
    maxDimension = 1600,
    quality = 0.82
  } = {}
) {

  validarArquivoImagem(file);


  const image =
    await carregarImagemLocal(file);


  const maiorLado =
    Math.max(
      image.naturalWidth,
      image.naturalHeight
    );


  const escala =
    maiorLado > maxDimension
      ? maxDimension / maiorLado
      : 1;


  const width =
    Math.max(
      1,
      Math.round(
        image.naturalWidth * escala
      )
    );


  const height =
    Math.max(
      1,
      Math.round(
        image.naturalHeight * escala
      )
    );


  const canvas =
    document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;


  const context =
    canvas.getContext("2d", {
      alpha: true
    });


  if (!context) {
    throw new Error(
      "Seu navegador não conseguiu processar a imagem."
    );
  }


  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(
    image,
    0,
    0,
    width,
    height
  );


  const blob =
    await new Promise(
      resolve =>
        canvas.toBlob(
          resolve,
          "image/webp",
          quality
        )
    );


  if (!blob) {
    throw new Error(
      "Não foi possível comprimir a imagem."
    );
  }


  const nomeBase =
    file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") ||
    "imagem";


  return new File(
    [blob],
    `${nomeBase}.webp`,
    {
      type: "image/webp",
      lastModified: Date.now()
    }
  );

}


function obterCaminhoStorageDaUrl(
  url,
  bucket
) {

  if (!url) {
    return null;
  }


  try {

    const parsed =
      new URL(url);

    const marker =
      `/storage/v1/object/public/${bucket}/`;

    const index =
      parsed.pathname.indexOf(marker);


    if (index === -1) {
      return null;
    }


    return decodeURIComponent(
      parsed.pathname.slice(
        index + marker.length
      )
    );

  } catch (_) {

    return null;

  }

}


async function removerArquivoStorage(
  bucket,
  caminho
) {

  if (!caminho) {
    return;
  }


  const { error } =
    await supabaseClient
      .storage
      .from(bucket)
      .remove([caminho]);


  if (error) {

    console.warn(
      `Não foi possível limpar o arquivo antigo de ${bucket}:`,
      error
    );

  }

}


async function removerArquivoPorUrl(
  bucket,
  url
) {

  const caminho =
    obterCaminhoStorageDaUrl(
      url,
      bucket
    );


  if (caminho) {
    await removerArquivoStorage(
      bucket,
      caminho
    );
  }

}


// ==================================================
// NOME ÚNICO DE ARQUIVO
// ==================================================

function criarNomeArquivo(
  file,
  prefixo
) {

  const partes =
    file.name.split(".");


  const extensao =
    partes.length > 1
      ? partes.pop().toLowerCase()
      : "jpg";


  let identificador;


  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {

    identificador =
      crypto.randomUUID();

  } else {

    identificador =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;

  }


  return (
    `${prefixo}-${identificador}.${extensao}`
  );

}


// ==================================================
// UPLOAD PRODUTO
// ==================================================

async function uploadImagemProduto(
  file
) {

  const arquivoComprimido =
    await comprimirImagem(
      file,
      {
        maxDimension: 1600,
        quality: 0.82
      }
    );


  const nomeArquivo =
    criarNomeArquivo(
      arquivoComprimido,
      "produto"
    );


  const caminho =
    `catalogo/${nomeArquivo}`;


  const { error } =
    await supabaseClient
      .storage
      .from("produtos")
      .upload(
        caminho,
        arquivoComprimido,
        {
          cacheControl: "31536000",
          upsert: false,
          contentType: "image/webp"
        }
      );


  if (error) {
    console.error(
      "Erro no upload:",
      error
    );
    throw error;
  }


  const { data } =
    supabaseClient
      .storage
      .from("produtos")
      .getPublicUrl(caminho);


  return {
    publicUrl: data.publicUrl,
    path: caminho
  };

}


// ==================================================
// DISPONIBILIDADE
// ==================================================

async function alterarDisponibilidade(
  id,
  novoValor
) {

  const {
    error
  } =
    await supabaseClient
      .from("produtos")
      .update({
        disponivel:
          novoValor
      })
      .eq(
        "id",
        id
      );


  if (error) {

    console.error(
      error
    );


    alert(
      "Não foi possível atualizar o produto."
    );


    return;

  }


  await carregarProdutosAdmin();

}


// ==================================================
// RENDERIZAR PRODUTOS
// ==================================================

function renderizarProdutosAdmin(
  lista
) {

  const total =
    produtosAdmin.length;

  const exibidos =
    lista.length;

  const existeFiltro =
    adminSearch.value.trim() ||
    adminCategoryFilter.value !== "todos";


  productCount.textContent =
    existeFiltro
      ? `${exibidos} de ${total} produtos`
      : `${total} produto${total === 1 ? "" : "s"} cadastrado${total === 1 ? "" : "s"}`;


  productsContainer.replaceChildren();


  if (!lista.length) {

    const emptyMessage =
      document.createElement("p");

    emptyMessage.className =
      "empty";

    emptyMessage.textContent =
      "Nenhum produto encontrado.";

    productsContainer.append(
      emptyMessage
    );

    return;

  }


  const fragment =
    document.createDocumentFragment();


  lista.forEach(produto => {

    const article =
      document.createElement("article");

    article.className =
      "product";


    const image =
      document.createElement("img");

    image.src =
      produto.image_url || "";

    image.alt =
      produto.nome || "Produto";

    image.loading =
      "lazy";

    image.addEventListener("error", () => {
      image.removeAttribute("src");
      image.alt = "Imagem indisponível";
      image.classList.add("image-missing");
    }, { once: true });


    const main =
      document.createElement("div");

    main.className =
      "product-main";


    const name =
      document.createElement("h3");

    name.className =
      "product-name";

    name.textContent =
      produto.nome || "";


    const price =
      document.createElement("p");

    price.className =
      "product-price";

    price.textContent =
      money(produto.preço);


    const category =
      document.createElement("p");

    category.className =
      "product-category";

    category.textContent =
      `${nomeCategoria(produto.categoria_principal)} • ${produto.subcategoria || ""}`;


    const status =
      document.createElement("span");

    status.className =
      `status ${produto.disponivel ? "active" : "hidden"}`;

    status.textContent =
      produto.disponivel
        ? "● ATIVO"
        : "● OCULTO";


    main.append(
      name,
      price,
      category,
      status
    );


    const buttons =
      document.createElement("div");

    buttons.className =
      "product-buttons";


    const editButton =
      document.createElement("button");

    editButton.type =
      "button";

    editButton.className =
      "edit";

    editButton.dataset.edit =
      String(produto.id);

    editButton.textContent =
      "EDITAR";


    const toggleButton =
      document.createElement("button");

    toggleButton.type =
      "button";

    toggleButton.dataset.toggle =
      String(produto.id);

    toggleButton.textContent =
      produto.disponivel
        ? "OCULTAR"
        : "ATIVAR";


    const deleteButton =
      document.createElement("button");

    deleteButton.type =
      "button";

    deleteButton.className =
      "delete";

    deleteButton.dataset.delete =
      String(produto.id);

    deleteButton.textContent =
      "EXCLUIR";


    buttons.append(
      editButton,
      toggleButton,
      deleteButton
    );


    article.append(
      image,
      main,
      buttons
    );


    fragment.append(article);

  });


  productsContainer.append(
    fragment
  );


  adicionarEventosProdutos();

}


// ==================================================
// EVENTOS DOS PRODUTOS
// ==================================================

function adicionarEventosProdutos() {


  document
    .querySelectorAll(
      "[data-toggle]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            const id =
              Number(
                button.dataset.toggle
              );


            const produto =
              produtosAdmin.find(
                item =>
                  item.id === id
              );


            if (!produto) {
              return;
            }


            if (button.disabled) return;
            button.disabled = true;
            try {
              await alterarDisponibilidade(id, !produto.disponivel);
            } finally {
              button.disabled = false;
            }

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-edit]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              Number(
                button.dataset.edit
              );


            const produto =
              produtosAdmin.find(
                item =>
                  item.id === id
              );


            if (!produto) {
              return;
            }


            abrirEdicao(
              produto
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-delete]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            const id =
              Number(
                button.dataset.delete
              );


            const produto =
              produtosAdmin.find(
                item =>
                  item.id === id
              );


            if (!produto) {
              return;
            }


            const confirmar =
              confirm(
                `Tem certeza que deseja excluir "${produto.nome}"?\n\nEssa ação não pode ser desfeita.`
              );


            if (!confirmar) {
              return;
            }


            if (button.disabled) return;
            button.disabled = true;

            const {
              error
            } =
              await supabaseClient
                .from("produtos")
                .delete()
                .eq(
                  "id",
                  id
                );


            if (error) {

              console.error(
                error
              );

              alert(
                "Não foi possível excluir o produto."
              );
              button.disabled = false;
              return;

            }


            // O registro já foi removido. Agora limpa a imagem antiga.
            await removerArquivoPorUrl(
              "produtos",
              produto.image_url
            );


            await carregarProdutosAdmin();

          }
        );

      }
    );

}


// ==================================================
// FILTRAR PRODUTOS
// ==================================================

function filtrarProdutosAdmin() {

  const busca =
    adminSearch
      .value
      .trim()
      .toLowerCase();


  const categoria =
    adminCategoryFilter.value;


  const filtrados =
    produtosAdmin.filter(
      produto => {

        const nome =
          (
            produto.nome ||
            ""
          ).toLowerCase();


        const matchBusca =
          !busca ||
          nome.includes(
            busca
          );


        const matchCategoria =
          categoria ===
            "todos" ||
          produto.categoria_principal ===
            categoria;


        return (
          matchBusca &&
          matchCategoria
        );

      }
    );


  renderizarProdutosAdmin(
    filtrados
  );

}


adminSearch.addEventListener(
  "input",
  filtrarProdutosAdmin
);


adminCategoryFilter.addEventListener(
  "change",
  filtrarProdutosAdmin
);


// ==================================================
// CARREGAR PRODUTOS
// ==================================================

async function carregarProdutosAdmin() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("produtos")
      .select("*")
      .order(
        "id",
        {
          ascending: true
        }
      );


  if (error) {

    console.error(
      error
    );


    productsContainer.innerHTML = `
      <p class="empty">
        Não foi possível carregar os produtos.
      </p>
    `;


    return;

  }


  produtosAdmin =
    data || [];


  filtrarProdutosAdmin();

}


// ==================================================
// SALVAR PRODUTO
// ==================================================

editForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    if (saveProductButton.disabled) return;
    saveProductButton.disabled = true;
    const textoBotaoOriginal = saveProductButton.textContent;
    saveProductButton.textContent = "SALVANDO...";

    editMessage.textContent =
      "Salvando...";


    const arquivoImagem =
      editImageFile.files[0];

    const imagemAnteriorUrl =
      editImageUrl.value.trim();

    let imageUrl =
      imagemAnteriorUrl;

    let novoArquivoPath =
      null;


    if (arquivoImagem) {

      editMessage.textContent =
        "Otimizando e enviando imagem...";

      try {

        const upload =
          await uploadImagemProduto(
            arquivoImagem
          );

        imageUrl =
          upload.publicUrl;

        novoArquivoPath =
          upload.path;

      } catch (erro) {

        console.error(erro);

        editMessage.textContent =
          erro?.message ||
          "Não foi possível enviar a imagem.";
        saveProductButton.disabled = false;
        saveProductButton.textContent = textoBotaoOriginal;
        return;

      }

    }


    const produtoDados = {

      nome:
        editNome.value.trim(),

      preço:
        Number(editPreco.value),

      categoria_principal:
        editCategoriaPrincipal.value,

      subcategoria:
        editSubcategoria.value,

      descricao:
        editDescricao.value.trim(),

      image_url:
        imageUrl,

      destaque:
        editDestaque.checked,

      tipo_disponibilidade:
        editTipoDisponibilidade
          ? editTipoDisponibilidade.value
          : "pronta_entrega"

    };


    let error;


    if (modoFormulario === "novo") {

      const resposta =
        await supabaseClient
          .from("produtos")
          .insert([
            {
              ...produtoDados,
              disponivel: true
            }
          ]);

      error = resposta.error;

    } else {

      const resposta =
        await supabaseClient
          .from("produtos")
          .update(produtoDados)
          .eq(
            "id",
            Number(editId.value)
          );

      error = resposta.error;

    }


    if (error) {

      console.error(error);

      // Se o banco falhou depois de um upload novo,
      // remove o arquivo recém-enviado para não criar órfãos.
      if (novoArquivoPath) {
        await removerArquivoStorage(
          "produtos",
          novoArquivoPath
        );
      }

      editMessage.textContent =
        "Não foi possível salvar o produto.";
      saveProductButton.disabled = false;
      saveProductButton.textContent = textoBotaoOriginal;
      return;

    }


    // Só remove a imagem anterior depois que a nova URL
    // já foi salva com sucesso no banco.
    if (
      novoArquivoPath &&
      imagemAnteriorUrl &&
      imagemAnteriorUrl !== imageUrl
    ) {

      await removerArquivoPorUrl(
        "produtos",
        imagemAnteriorUrl
      );

    }


    editImageUrl.value =
      imageUrl;


    editMessage.textContent =
      modoFormulario === "novo"
        ? "Produto adicionado. ✓"
        : "Produto atualizado. ✓";


    await carregarProdutosAdmin();
    saveProductButton.disabled = false;
    saveProductButton.textContent = textoBotaoOriginal;

    setTimeout(
      fecharEdicao,
      600
    );

  }
);


// ==================================================
// TEMA
// ==================================================

function selecionarTema(
  tema
) {

  const temaSelecionado =
    panelThemes[tema]
      ? tema
      : "noir_gold";


  settingsTema.value =
    temaSelecionado;


  themeCards.forEach(
    card => {

      card.classList.toggle(
        "selected",
        card.dataset.theme ===
          temaSelecionado
      );

    }
  );


  // AQUI ESTÁ A NOVIDADE:
  // o painel muda na hora.
  aplicarTemaPainel(
    temaSelecionado
  );

}


// ==================================================
// CLIQUE NOS TEMAS
// ==================================================

themeCards.forEach(
  card => {

    card.addEventListener(
      "click",
      () => {

        selecionarTema(
          card.dataset.theme
        );

      }
    );

  }
);


// ==================================================
// PRÉVIA DA LOGO
// ==================================================

settingsLogoFile.addEventListener(
  "change",
  () => {

    const file =
      settingsLogoFile.files[0];


    if (!file) {
      return;
    }


    try {
      validarArquivoImagem(file);
    } catch (erro) {
      alert(erro.message);
      settingsLogoFile.value = "";
      return;
    }


    if (
      !file.type.startsWith(
        "image/"
      )
    ) {

      alert(
        "Selecione uma imagem válida."
      );


      settingsLogoFile.value =
        "";


      return;

    }


    settingsLogoPreview.src =
      URL.createObjectURL(
        file
      );


    settingsLogoPreview.style.display =
      "block";

  }
);


// ==================================================
// UPLOAD DA LOGO
// ==================================================

async function uploadLogoLoja(
  file
) {

  const arquivoComprimido =
    await comprimirImagem(
      file,
      {
        maxDimension: 1200,
        quality: 0.88
      }
    );


  const nomeArquivo =
    criarNomeArquivo(
      arquivoComprimido,
      "logo"
    );


  const caminho =
    `logos/${nomeArquivo}`;


  const { error } =
    await supabaseClient
      .storage
      .from("site-assets")
      .upload(
        caminho,
        arquivoComprimido,
        {
          cacheControl: "31536000",
          upsert: false,
          contentType: "image/webp"
        }
      );


  if (error) {
    console.error(error);
    throw error;
  }


  const { data } =
    supabaseClient
      .storage
      .from("site-assets")
      .getPublicUrl(caminho);


  return {
    publicUrl: data.publicUrl,
    path: caminho
  };

}


// ==================================================
// CARREGAR CONFIGURAÇÕES
// ==================================================

async function carregarConfiguracoes() {

  settingsMessage.textContent =
    "Carregando configurações...";


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
          ascending: true
        }
      )
      .limit(1)
      .maybeSingle();


  if (error) {

    console.error(
      error
    );


    settingsMessage.textContent =
      "Não foi possível carregar as configurações.";


    return;

  }


  if (!data) {

    settingsMessage.textContent =
      "Nenhuma configuração encontrada.";


    return;

  }


  configuracaoId =
    data.id;


  // NOME

  settingsNome.value =
    data.nome_loja ||
    "";


  panelStoreName.textContent =
    data.nome_loja ||
    APP_CONFIG.defaultStoreName ||
    "Minha Loja";


  document.title =
    `${data.nome_loja || "Loja"} | Painel`;


  // LOGO

  settingsLogoUrl.value =
    data.logo_url ||
    "";


  settingsLogoFile.value =
    "";


  if (
    data.logo_url
  ) {

    settingsLogoPreview.src =
      data.logo_url;


    settingsLogoPreview.style.display =
      "block";

  } else {

    settingsLogoPreview.src =
      "";


    settingsLogoPreview.style.display =
      "none";

  }


  // TEMA

  selecionarTema(
    data.tema ||
    "noir_gold"
  );


  try {
    localStorage.setItem(
      "ag_theme_cache",
      data.tema || "noir_gold"
    );
  } catch (_) {}


  // HERO

  settingsHeroTitulo.value =
    data.hero_titulo ||
    data.texto_hero ||
    "";


  settingsHeroSlogan.value =
    data.hero_slogan ||
    "";


  settingsHeroBotao.value =
    data.hero_botao_texto ||
    "";


  // SOBRE

  settingsSobreTitulo.value =
    data.sobre_titulo ||
    "";


  settingsSobre.value =
    data.texto_sobre ||
    "";


  // FOOTER

  settingsFooterTitulo.value =
    data.footer_titulo ||
    "";


  settingsFooterSubtitulo.value =
    data.footer_subtitulo ||
    "";


  // CONTATO

  settingsWhatsapp.value =
    data.whatsapp ||
    "";


  settingsInstagram.value =
    data.instagram ||
    "";


  settingsEndereco.value =
    data.endereco ||
    "";


  settingsHorario.value =
    data.horario ||
    "";


  settingsMessage.textContent =
    "";

}


// ==================================================
// SALVAR CONFIGURAÇÕES
// ==================================================

settingsForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    const saveSettingsButton = settingsForm.querySelector('button[type="submit"]');
    if (saveSettingsButton.disabled) return;
    const saveSettingsText = saveSettingsButton.textContent;
    saveSettingsButton.disabled = true;
    saveSettingsButton.textContent = "SALVANDO...";

    if (configuracaoId === null) {

      settingsMessage.textContent =
        "Nenhuma configuração encontrada.";

      return;

    }


    settingsMessage.textContent =
      "Salvando configurações...";


    const arquivoLogo =
      settingsLogoFile.files[0];

    const logoAnteriorUrl =
      settingsLogoUrl.value.trim();

    let logoUrl =
      logoAnteriorUrl;

    let novoLogoPath =
      null;


    if (arquivoLogo) {

      settingsMessage.textContent =
        "Otimizando e enviando logo...";

      try {

        const upload =
          await uploadLogoLoja(
            arquivoLogo
          );

        logoUrl =
          upload.publicUrl;

        novoLogoPath =
          upload.path;

      } catch (erro) {

        console.error(erro);

        settingsMessage.textContent =
          erro?.message ||
          "Não foi possível enviar a logo.";
        saveSettingsButton.disabled = false;
        saveSettingsButton.textContent = saveSettingsText;
        return;

      }

    }


    const temaSelecionado =
      settingsTema.value ||
      "noir_gold";


    const dadosConfiguracoes = {

      nome_loja:
        settingsNome.value.trim(),

      logo_url:
        logoUrl,

      tema:
        temaSelecionado,

      hero_titulo:
        settingsHeroTitulo.value.trim(),

      hero_slogan:
        settingsHeroSlogan.value.trim(),

      hero_botao_texto:
        settingsHeroBotao.value.trim(),

      sobre_titulo:
        settingsSobreTitulo.value.trim(),

      texto_sobre:
        settingsSobre.value.trim(),

      footer_titulo:
        settingsFooterTitulo.value.trim(),

      footer_subtitulo:
        settingsFooterSubtitulo.value.trim(),

      whatsapp:
        settingsWhatsapp.value.trim(),

      instagram:
        settingsInstagram.value.trim(),

      endereco:
        settingsEndereco.value.trim(),

      horario:
        settingsHorario.value.trim()

    };


    const { error } =
      await supabaseClient
        .from("configuracoes")
        .update(dadosConfiguracoes)
        .eq(
          "id",
          configuracaoId
        );


    if (error) {

      console.error(error);

      // Se o banco não aceitou a nova configuração,
      // limpa a logo que acabou de ser enviada.
      if (novoLogoPath) {
        await removerArquivoStorage(
          "site-assets",
          novoLogoPath
        );
      }

      settingsMessage.textContent =
        "Não foi possível salvar as configurações.";
      saveSettingsButton.disabled = false;
      saveSettingsButton.textContent = saveSettingsText;
      return;

    }


    // A nova logo já está registrada no banco.
    // Agora é seguro apagar a antiga.
    if (
      novoLogoPath &&
      logoAnteriorUrl &&
      logoAnteriorUrl !== logoUrl
    ) {

      await removerArquivoPorUrl(
        "site-assets",
        logoAnteriorUrl
      );

    }


    settingsLogoUrl.value =
      logoUrl;

    settingsLogoFile.value =
      "";


    if (logoUrl) {

      settingsLogoPreview.src =
        logoUrl;

      settingsLogoPreview.style.display =
        "block";

    }


    panelStoreName.textContent =
      settingsNome.value.trim() ||
      "Loja";


    document.title =
      `${settingsNome.value.trim() || "Loja"} | Painel`;


    try {
      localStorage.setItem(
        "ag_theme_cache",
        temaSelecionado
      );
    } catch (_) {}


    saveSettingsButton.disabled = false;
    saveSettingsButton.textContent = saveSettingsText;

    settingsMessage.textContent =
      "Configurações salvas com sucesso. ✓";


    setTimeout(
      () => {
        settingsMessage.textContent = "";
      },
      3000
    );

  }
);


// ==================================================
// LOGOUT
// ==================================================

logoutButton.addEventListener(
  "click",
  async () => {

    await supabaseClient
      .auth
      .signOut();


    window.location.href =
      "admin.html";

  }
);


// ==================================================
// INICIAR
// ==================================================

async function iniciarPainel() {

  configurarCategoriasPainel();

  panelStoreName.textContent =
    APP_CONFIG.defaultStoreName || "Minha Loja";

  let temaInicial =
    "noir_gold";

  try {
    temaInicial =
      localStorage.getItem("ag_theme_cache") ||
      temaInicial;
  } catch (_) {}

  aplicarTemaPainel(
    temaInicial
  );


  const autorizado =
    await protegerPainel();


  if (!autorizado) {
    return;
  }


  await Promise.all([

    carregarProdutosAdmin(),

    carregarConfiguracoes()

  ]);

}


iniciarPainel();