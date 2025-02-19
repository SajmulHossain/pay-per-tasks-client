import { Link } from "react-router-dom";
import logo from "../assets/images/black-logo.png";
import whitelogo from "../assets/images/white-logo.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-main-color/10">
      <section className="footer section">
        <aside className="dark:hidden">
          <img src={logo} className="h-20" alt="logo" />
        </aside>
        <aside>
          <img src={whitelogo} className="h-20" alt="logo" />
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://linkedin.com/in/sajmulhossain" target="_blank">
              <FaLinkedin size={24} />
            </Link>
            <Link to="https://github.com/sajmulhossain" target="_blank">
              <FaGithub size={24} />
            </Link>
            <Link to="https://facebook.com/sajmulhossain.14" target="_blank">
              <FaFacebook size={24} />
            </Link>
          </div>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;