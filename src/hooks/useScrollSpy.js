import { useState, useEffect } from "react";
import { SECTION_IDS } from "../constants";

/**
 * Detecta la sección actual visible usando Intersection Observer.
 * Reemplaza waypoints.js para resaltar el nav activo.
 */
export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -65% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return activeSection;
};
