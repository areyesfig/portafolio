// Colores por lenguaje (GitHub Linguist)
export const LANGUAGE_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Java: "#ed8b00",
  Kotlin: "#7f52ff",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export const getLanguageColor = (lang) => LANGUAGE_COLORS[lang] || "#2dd4bf";
