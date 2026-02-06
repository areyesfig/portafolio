import React from "react";
import PropTypes from "prop-types";
import { smoothScrollTo } from "../utils/smoothScroll";

const Footer = ({ data }) => {
  const handleBackToTop = (e) => {
    e.preventDefault();
    smoothScrollTo("home");
  };

  if (data) {
    var networks = data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
  }

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>

          <ul className="copyright">
            <li>
              Made by{" "}
              <a title="PAPA" href="https://github.com/areyesfig">
                Areyesfig
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a
            href="#home"
            onClick={handleBackToTop}
            title="Back to Top"
            aria-label="Back to top"
          >
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.shape({
    social: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        className: PropTypes.string,
      })
    ),
  }),
};

export default Footer;
