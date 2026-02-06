import { useState, useEffect } from "react";

/**
 * Controla la visibilidad y opacidad del nav según el scroll.
 * Reemplaza la lógica jQuery de fade in/out del nav.
 */
export const useNavVisibility = () => {
  const [navState, setNavState] = useState({
    visible: true,
    opaque: false,
  });

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const handleScroll = () => {
      const headerHeight = header.offsetHeight;
      const scrollY = window.scrollY;
      const isDesktop = window.outerWidth > 768;

      if (isDesktop && scrollY > headerHeight * 0.2 && scrollY < headerHeight) {
        setNavState({ visible: false, opaque: false });
      } else {
        if (scrollY < headerHeight * 0.2) {
          setNavState({ visible: true, opaque: false });
        } else {
          setNavState({ visible: true, opaque: true });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // estado inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return navState;
};
