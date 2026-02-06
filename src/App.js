import React from "react";
import { ResumeDataProvider, useResumeData } from "./context";
import ErrorBoundary from "./Components/ErrorBoundary";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";

import "./App.css";
import "./styles/apple-theme.css";

const PortfolioContent = () => {
  const { data, loading, error } = useResumeData();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        <div>
          <div
            style={{
              width: 48,
              height: 48,
              border: "3px solid rgba(45, 212, 191, 0.3)",
              borderTopColor: "#2dd4bf",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p>Cargando portafolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
          Error al cargar
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#2dd4bf",
            border: "none",
            borderRadius: "12px",
            color: "#0f172a",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={data.main} />
      <About data={data.main} />
      <Resume data={data.resume} />
      <Portfolio data={data.portfolio} />
      <Contact data={data.main} />
      <Footer data={data.main} />
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <ResumeDataProvider>
      <div className="App">
        <PortfolioContent />
      </div>
    </ResumeDataProvider>
  </ErrorBoundary>
);

export default App;
