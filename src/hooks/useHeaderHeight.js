import { useEffect } from "react";

/**
 * Ajusta la altura del header al viewport.
 * Reemplaza la lógica jQuery de header height.
 */
export const useHeaderHeight = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const setHeight = () => {
      header.style.height = `${window.innerHeight}px`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, []);
};
