import React from "react";
import PropTypes from "prop-types";
import { getLanguageColor } from "../../constants";
import { truncate } from "../../utils/truncate";

const ProjectCard = ({ project, isFromGitHub }) => {
  const hasUrl = project.url && project.url.trim() !== "";
  const langColor =
    isFromGitHub && project.language
      ? getLanguageColor(project.language)
      : null;
  const description = truncate(
    project.description || project.category || "",
    90
  );

  const CardContent = () => (
    <div className="repo-card">
      <div className="repo-card-header">
        <span className="repo-card-icon">
          <i className="fa fa-github" />
        </span>
        <h3 className="repo-card-title">{project.title}</h3>
      </div>
      {description && <p className="repo-card-desc">{description}</p>}
      <div className="repo-card-footer">
        {langColor && (
          <span
            className="repo-card-lang"
            style={{ backgroundColor: langColor }}
            title={project.language}
          >
            {project.language}
          </span>
        )}
        {isFromGitHub && project.stargazers_count > 0 && (
          <span className="repo-card-stars">
            <i className="fa fa-star" /> {project.stargazers_count}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="repo-card-wrap">
      {hasUrl ? (
        <a
          href={project.url}
          title={project.title}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-card-link"
        >
          <CardContent />
        </a>
      ) : (
        <div className="repo-card-link repo-card-link--disabled">
          <CardContent />
        </div>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    language: PropTypes.string,
    url: PropTypes.string,
    stargazers_count: PropTypes.number,
  }).isRequired,
  isFromGitHub: PropTypes.bool,
};

ProjectCard.defaultProps = {
  isFromGitHub: false,
};

export default ProjectCard;
