import React from "react";
import PropTypes from "prop-types";
import ProjectCard from "./portfolio/ProjectCard";
import { useGitHubRepos } from "../hooks";

const Portfolio = ({ data }) => {
  const githubUsername = data?.githubUsername;
  const manualProjects =
    data?.projects?.filter((p) => p.url && p.url.trim() !== "") || [];

  const { repos: githubProjects, loading, error } = useGitHubRepos(
    githubUsername,
    9
  );

  const allProjects = [...manualProjects, ...githubProjects];
  const hasProjects = allProjects.length > 0 || loading;

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Check Out Some of My Works.</h1>

          {error && (
            <p className="portfolio-error">
              {error}. Puedes agregar proyectos manualmente en{" "}
              <code>resumeData.json</code>.
            </p>
          )}

          {loading && (
            <div className="portfolio-loading">
              <div className="portfolio-spinner" />
              <p>Cargando proyectos desde GitHub...</p>
            </div>
          )}

          <div
            id="portfolio-wrapper"
            className="repo-grid"
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {allProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
                isFromGitHub={
                  !!githubUsername && index >= manualProjects.length
                }
              />
            ))}
          </div>

          {!hasProjects && !loading && (
            <p className="portfolio-empty">
              Agrega <code>githubUsername: &quot;tu-usuario&quot;</code> en la
              sección portfolio de <code>resumeData.json</code> para mostrar tus
              repos de GitHub automáticamente.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

Portfolio.propTypes = {
  data: PropTypes.shape({
    githubUsername: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
};

export default Portfolio;
