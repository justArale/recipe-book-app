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
      </div>
      <div className="social-pages">
        <button className=" noUnderline socialButton github">
          <a target="_blank" href="https://github.com/justArale">
            <div className=" iconWrapperBig">
              <img src={githubIcon} alt="Icon" />
            </div>
          </a>
        </button>

        <button className=" noUnderline socialButton linkedIn">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/s-kuechler-jr-fullstack-dev"
          >
            <div className=" iconWrapperBig">
              <img src={linkedinIcon} alt="Icon" />
            </div>
          </a>
        </button>
      </div>
    </div>
  );
}
