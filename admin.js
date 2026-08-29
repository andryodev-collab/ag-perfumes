const APP_CONFIG = window.APP_CONFIG || {};
const SUPABASE_URL = APP_CONFIG.supabaseUrl || "https://yorgqratqcuwzlskfajo.supabase.co";
const SUPABASE_KEY = APP_CONFIG.supabaseKey || "sb_publishable_CpxAtwR_wwe6-SKa7jO0Pg_IWTVKhH0";

const DEFAULT_STORE_NAME =
  APP_CONFIG.defaultStoreName || "Minha Loja";

const loginStoreName =
  document.getElementById("loginStoreName");

const loginStoreLogo =
  document.getElementById("loginStoreLogo");

function aplicarIdentidadeLogin(nome, logoUrl = "") {
  const nomeFinal =
    String(nome || DEFAULT_STORE_NAME).trim() ||
    DEFAULT_STORE_NAME;

  document.title = `${nomeFinal} | Admin`;

  if (loginStoreName) {
    loginStoreName.textContent = nomeFinal;
  }

  if (!loginStoreLogo) return;

  if (logoUrl) {
    loginStoreLogo.src = logoUrl;
    loginStoreLogo.alt = `Logo ${nomeFinal}`;
    loginStoreLogo.hidden = false;

    loginStoreLogo.onerror = () => {
      loginStoreLogo.removeAttribute("src");
      loginStoreLogo.hidden = true;
    };
  } else {
    loginStoreLogo.removeAttribute("src");
    loginStoreLogo.hidden = true;
  }
}

aplicarIdentidadeLogin(DEFAULT_STORE_NAME);

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function carregarIdentidadePublica() {
  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY ||
    SUPABASE_URL.includes("COLE_AQUI") ||
    SUPABASE_KEY.includes("SUA_PUBLISHABLE_KEY")
  ) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("configuracoes")
      .select("nome_loja, logo_url")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error || !data) return;

    aplicarIdentidadeLogin(
      data.nome_loja || DEFAULT_STORE_NAME,
      data.logo_url || ""
    );
  } catch (erro) {
    console.warn(
      "Não foi possível carregar a identidade visual do login:",
      erro
    );
  }
}

const loginForm =
  document.getElementById("loginForm");

const message =
  document.getElementById("message");

const loginButton =
  loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    if (loginButton.disabled) return;

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const password =
      document
        .getElementById("password")
        .value;

    loginButton.disabled = true;

    const textoOriginal =
      loginButton.textContent;

    loginButton.textContent =
      "ENTRANDO...";

    message.textContent =
      "Entrando...";

    try {
      const { error } =
        await supabaseClient
          .auth
          .signInWithPassword({
            email,
            password
          });

      if (error) {
        message.textContent =
          "E-mail ou senha inválidos.";
        return;
      }

      const {
        data: adminOk,
        error: adminError
      } =
        await supabaseClient
          .rpc("is_admin");

      if (
        adminError ||
        adminOk !== true
      ) {
        await supabaseClient
          .auth
          .signOut();

        message.textContent =
          "Usuário sem permissão administrativa.";

        return;
      }

      message.textContent =
        "Login realizado com sucesso!";

      window.location.href =
        "painel.html";

    } catch (erro) {
      console.error(erro);

      message.textContent =
        "Não foi possível entrar agora. Tente novamente.";

    } finally {
      loginButton.disabled =
        false;

      loginButton.textContent =
        textoOriginal;
    }
  }
);

(async function iniciarLogin() {
  await carregarIdentidadePublica();

  try {
    const { data } =
      await supabaseClient
        .auth
        .getSession();

    if (!data.session) return;

    const {
      data: adminOk
    } =
      await supabaseClient
        .rpc("is_admin");

    if (adminOk === true) {
      window.location.href =
        "painel.html";
    }
  } catch (erro) {
    console.warn(
      "Não foi possível verificar a sessão atual:",
      erro
    );
  }
})();