// Tema inicial aplicado antes do CSS para reduzir flash visual.
(() => {
  const temasIniciais = {
    noir_gold: { bg: "#080808", surface: "#111111", text: "#f4f0e8", muted: "#a6a19a", accent: "#d6ae55", line: "#292722", header: "rgba(8,8,8,.92)" },
    oud_bronze: { bg: "#100c09", surface: "#1b1510", text: "#f4ede4", muted: "#ad9b8a", accent: "#b98245", line: "#3b2c21", header: "rgba(16,12,9,.93)" },
    royal_burgundy: { bg: "#12070a", surface: "#1d0d12", text: "#f7eeee", muted: "#b29ba0", accent: "#d2aa58", line: "#44202a", header: "rgba(18,7,10,.93)" },
    emerald_luxury: { bg: "#06100d", surface: "#0d1a16", text: "#edf4f0", muted: "#94a59d", accent: "#cba956", line: "#233b32", header: "rgba(6,16,13,.93)" },
    ivory_gold: { bg: "#f6f1e8", surface: "#fffaf2", text: "#1c1915", muted: "#746d63", accent: "#8a6527", line: "#d8cebd", header: "rgba(246,241,232,.93)" },
    pearl_nude: { bg: "#f7efea", surface: "#fff9f6", text: "#342820", muted: "#75635a", accent: "#8f6251", line: "#ddcbc3", header: "rgba(247,239,234,.93)" },
    minimal_white: { bg: "#fafafa", surface: "#ffffff", text: "#191919", muted: "#707070", accent: "#222222", line: "#dedede", header: "rgba(250,250,250,.94)" },
    sand_luxury: { bg: "#eee2ce", surface: "#f8efdf", text: "#28231d", muted: "#6c5d4c", accent: "#765732", line: "#d1c0a6", header: "rgba(238,226,206,.93)" },
    rose_beige: { bg: "#f3e7e2", surface: "#fcf4f0", text: "#3c2b27", muted: "#765f59", accent: "#87574c", line: "#dbc6bf", header: "rgba(243,231,226,.94)" },
    ice_silver: { bg: "#f3f6f7", surface: "#ffffff", text: "#20272b", muted: "#5d696f", accent: "#53636c", line: "#d1d9dc", header: "rgba(243,246,247,.94)" }
  };

  let nome = "noir_gold";
  try { nome = localStorage.getItem("ag_theme_cache") || nome; } catch (_) {}
  const tema = temasIniciais[nome] || temasIniciais.noir_gold;
  const root = document.documentElement;
  root.style.setProperty("--bg", tema.bg);
  root.style.setProperty("--surface", tema.surface);
  root.style.setProperty("--text", tema.text);
  root.style.setProperty("--muted", tema.muted);
  root.style.setProperty("--accent", tema.accent);
  root.style.setProperty("--line", tema.line);
  root.style.setProperty("--header-bg", tema.header);
  root.style.backgroundColor = tema.bg;
})();
