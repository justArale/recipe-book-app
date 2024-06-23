import "../components/AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <div className="about-content">
        <h1 className="pageTitle">About</h1>
        <p className="body">
          Hey, this is Arale and you just stumbled upon my recipe book. Here I
          collect all my favourites dishes and some other rare finds. Mainly
          asian cousin as you might already figured.
        </p>
        <div className="social-pages">
          <a target="_blank" href="https://github.com/justArale">
            <button>GitHub</button>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/s-kuechler-jr-fullstack-dev"
          >
            <button>LinkedIn</button>
          </a>
        </div>
      </div>
    </>
  );
}
