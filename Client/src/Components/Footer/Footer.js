import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-desktop">
        <div className="footer-desktop-top">
          <div className="footer-desktop-brand">
            <Link className="logo-container" to="/">
              <img className="navbar-logo" src={logo} alt="KDS Logo" />
            </Link>
            <p>Kampot Dog Sanctuary</p>
            <span>Rescue, rehabilitation, and second chances.</span>
          </div>

          <div className="footer-desktop-links">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/adopt-sponsor">Adopt/Sponsor</Link>
            <Link to="/the-pack">The Pack</Link>
            <Link to="/blogs">Blogs</Link>
          </div>

          <div className="footer-desktop-links">
            <h4>Support</h4>
            <Link to="/donations">Donations</Link>
            <Link to="/vet-debt">Vet Debt</Link>
            <Link to="/contact">Contact</Link>
            <a href="mailto:kampotdogsanctuary@gmail.com">Email Us</a>
          </div>

          <div className="footer-desktop-connect">
            <h4>Connect</h4>
            <div className="footer-contact-icons">
              <a
                className="footer-contact-icon"
                href="https://www.facebook.com/kampotdogsanctuary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="footer-contact-icon"
                href="mailto:kampotdogsanctuary@gmail.com"
                aria-label="Email"
              >
                <i className="fa fa-envelope"></i>
              </a>
              <a
                className="footer-contact-icon"
                href="https://www.instagram.com/kampotdogsanctuary/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
            <a className="footer-desktop-cta" href="/donations#payment-methods">Donate Now</a>
          </div>
        </div>

        <div className="footer-desktop-bottom">
          <p>2026 Kampot Dog Sanctuary. All rights reserved.</p>
        </div>
      </div>

      <div className="footer-mobile">
        <div className="footer-brand">
          <Link className="logo-container" to="/">
            <img className="navbar-logo" src={logo} alt="KDS Logo" />
          </Link>
          <div className="footer-contact-icons">
            <a
              className="footer-contact-icon"
              href="https://www.facebook.com/kampotdogsanctuary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook"></i>
            </a>
            <a
              className="footer-contact-icon"
              href="mailto:kampotdogsanctuary@gmail.com"
              aria-label="Email"
            >
              <i className="fa fa-envelope"></i>
            </a>
            <a
              className="footer-contact-icon"
              href="https://www.instagram.com/kampotdogsanctuary/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
