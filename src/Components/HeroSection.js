import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import HeroBackground from "./ThreeScene/HeroBackground";
import { useScrollSpy, useNavVisibility, useHeaderHeight } from "../hooks";
import { smoothScrollTo } from "../utils/smoothScroll";
import { NAV_ITEMS } from "../constants";

export default function HeroSection({ data }) {
  const activeSection = useScrollSpy();
  const navState = useNavVisibility();
  useHeaderHeight();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
  };

  const handleScrolldownClick = (e) => {
    e.preventDefault();
    smoothScrollTo("about");
  };

  let name, occupation, description, city, networks;
  if (data) {
    name = data.name;
    occupation = data.occupation;
    description = data.description;
    city = data.address.city;
    networks = data.social.map((network) => (
      <a
        key={network.name}
        href={network.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-social-link"
        aria-label={network.name}
      >
        <i className={network.className} aria-hidden />
      </a>
    ));
  }

  const navWrapClass = [
    "hero-nav",
    navState.opaque ? "hero-nav--opaque" : "",
    !navState.visible ? "hero-nav--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header id="home" className="hero">
      {/* Three.js Canvas - fondo 3D */}
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <color attach="background" args={["#15202b"]} />
          <Suspense fallback={null}>
            <HeroBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay con gradiente */}
      <div className="hero-overlay" aria-hidden />

      {/* Navegación glassmorphism */}
      <nav className={navWrapClass}>
        <ul className="hero-nav-list">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={activeSection === id ? "hero-nav-link active" : "hero-nav-link"}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido del hero */}
      <div className="hero-content">
        <h1 className="hero-title">
          {name ? (
            <>
              Hola, soy <span className="hero-title-accent">{name}</span>
            </>
          ) : (
            "Cargando..."
          )}
        </h1>
        <p className="hero-subtitle">
          {city && (
            <>
              <span className="hero-occupation">{occupation}</span>
              {description && (
                <>
                  {" · "}
                  {description}
                </>
              )}
            </>
          )}
        </p>
        <div className="hero-social">{networks}</div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="hero-scroll-btn"
        onClick={handleScrolldownClick}
        aria-label="Desplazarse a la sección siguiente"
      >
        <span className="hero-scroll-icon" />
      </button>
    </header>
  );
}

HeroSection.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    occupation: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.shape({ city: PropTypes.string }),
    social: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        className: PropTypes.string,
      })
    ),
  }),
};
