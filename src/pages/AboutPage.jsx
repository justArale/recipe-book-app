import "../components/AboutPage.css";
import { GitHub } from "@just1arale/icons";
import { LinkedIn } from "@just1arale/icons";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="about-content">
        <h1 className="pageTitle">About</h1>
        <p className="mainFont">
          Hey, this is Arale and you just stumbled upon my recipe book. Here I
          collect all my favourites dishes and some other rare finds. Mainly
          asian cuisine as you might already figured.
        </p>
      </div>
      <div className="social-pages">
        <button className=" noUnderline socialButton github">
          <a target="_blank" href="https://github.com/justArale">
            <GitHub width="32" height="32" color="#000" alt="Github Icon" />
          </a>
        </button>

        <button className=" noUnderline socialButton linkedIn">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/s-kuechler-jr-fullstack-dev"
          >
            <LinkedIn width="32" height="32" color="#000" alt="Linkedin Icon" />
          </a>
        </button>
      </div>
    </div>
  );
}
