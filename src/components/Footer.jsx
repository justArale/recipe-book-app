import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <h5 className="mainFont">
          <a
            target="_blank"
            href="https://github.com/justArale/recipe-book-app"
            className="secondaryColor noUnderline"
          >
            Recipe Book
          </a>{" "}
          made with ❤️ by{" "}
          <a
            target="_blank"
            href="https://github.com/justArale"
            className="secondaryColor noUnderline"
          >
            Arale
          </a>
        </h5>
      </div>
    </footer>
  );
}

export default Footer;
