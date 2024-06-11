import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <h5 className="credits">
          <a
            target="_blank"
            href="https://github.com/justArale/recipe-book-app"
          >
            Recipe Book
          </a>{" "}
          made with ❤️ by{" "}
          <a target="_blank" href="https://github.com/justArale">
            Arale
          </a>
        </h5>
      </div>
    </footer>
  );
}

export default Footer;
