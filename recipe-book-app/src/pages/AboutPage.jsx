import "../components/AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <div className="about-content">
        <h1 className="content-title">About</h1>
        <p className="content-description">
          Hey, this is Arale and you just stumbled upon my recipe book. Here I
          collect all my favourites dishes and some other rare finds. Mainly
          asian cousin as you might already figured.
        </p>
        <div className="social-pages">
          <a href="https://github.com/justArale">
            <button>GitHub</button>
          </a>
          <a href="https://linkedin.com/in/s-kuechler-future-jr-dev">
            <button>LinkedIn</button>
          </a>
        </div>
        <div className="space"></div>
      </div>
    </>
  );
}
