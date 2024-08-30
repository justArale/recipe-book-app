import "./Footer.css";
import { Heart } from "@just1arale/icons";

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
          made with <Heart width="14" height="13" /> by{" "}
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
