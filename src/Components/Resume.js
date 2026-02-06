import React from "react";
import PropTypes from "prop-types";

const Resume = ({ data }) => {
  if (data) {
    var education = data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });
    var work = data.work.map(function (work) {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          <p>{work.description}</p>
        </div>
      );
    });
    var certifications = data.certifications?.map(function (cert) {
      return (
        <div key={cert.name} className="certification-item">
          <h3>{cert.name}</h3>
          <p className="info">
            {cert.issuer}
            {cert.date && (
              <>
                <span>&bull;</span> <em className="date">{cert.date}</em>
              </>
            )}
          </p>
        </div>
      );
    });
  }

  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{education}</div>
          </div>
        </div>
      </div>

      {certifications?.length > 0 && (
        <div className="row certifications">
          <div className="three columns header-col">
            <h1>
              <span>Certifications</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{certifications}</div>
            </div>
          </div>
        </div>
      )}

      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">{work}</div>
      </div>
    </section>
  );
};

Resume.propTypes = {
  data: PropTypes.shape({
    education: PropTypes.array,
    work: PropTypes.array,
    certifications: PropTypes.array,
  }),
};

export default Resume;
