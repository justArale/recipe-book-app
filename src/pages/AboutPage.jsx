import "../components/AboutPage.css";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="about-content">
        <h1 className="pageTitle">About</h1>
        <p className="mainFont">
          Hey, this is Arale and you just stumbled upon my recipe book. Here I
          collect all my favourites dishes and some other rare finds. Mainly
          asian cousin as you might already figured.
        </p>
        <div className="social-pages">
          <a target="_blank" href="https://github.com/justArale">
            <button className="buttonFont noUnderline primaryColor socialButton">
              <div className="buttonContentWrapper">
                <div className="iconWrapper">
                  <img src={githubIcon} alt="Icon" />
                </div>
                <span className="buttonFont">Github</span>
              </div>
            </button>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/s-kuechler-jr-fullstack-dev"
          >
            <button className="buttonFont noUnderline primaryColor socialButton">
              <div className="buttonContentWrapper">
                <div className="iconWrapper">
                  <img src={linkedinIcon} alt="Icon" />
                </div>
                <span className="buttonFont">LinkedIn</span>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
