/**
 * Desplazamiento suave hacia una sección por su id.
 * Reemplaza la funcionalidad de jQuery smoothscroll.
 */
export const smoothScrollTo = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
