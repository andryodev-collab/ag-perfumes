// ============================================================
// CONFIGURAÇÃO CENTRAL DA LOJA - TEMPLATE COMERCIAL V5.1
// ============================================================
// Edite ESTE arquivo ao instalar uma nova loja.
// Nunca coloque service_role, senha do banco ou qualquer chave secreta aqui.
// Use somente a Project URL e a Publishable Key (anon/public) do Supabase.

window.APP_CONFIG = {
  defaultStoreName: "AG Perfumes",
  locale: "pt-BR",
  currency: "BRL",

  supabaseUrl: "https://yorgqratqcuwzlskfajo.supabase.co",
  supabaseKey: "sb_publishable_CpxAtwR_wwe6-SKa7jO0Pg_IWTVKhH0",

  // Categorias do catálogo.
  // value = identificador técnico: minúsculo, sem espaço e sem acentos.
  // label = texto exibido para o cliente.
  categories: [
    {
      value: "perfumes",
      label: "Perfumes",
      subcategories: [
        { value: "masculino", label: "Masculino" },
        { value: "feminino", label: "Feminino" },
        { value: "unissex", label: "Unissex" }
      ]
    },
    {
      value: "beleza_cuidados",
      label: "Beleza & Cuidados",
      subcategories: [
        { value: "cremes", label: "Cremes" },
        { value: "hidratantes", label: "Hidratantes" },
        { value: "oleos", label: "Óleos" },
        { value: "corpo", label: "Corpo" },
        { value: "cabelo", label: "Cabelo" },
        { value: "outros", label: "Outros" }
      ]
    }
  ]
};
