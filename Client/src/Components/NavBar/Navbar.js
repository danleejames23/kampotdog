import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="KDS Logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vet-debt">Vet Debt</Link></li>
          <li><Link to="/donations">Donations</Link></li>
          <li><Link to="/adopt-sponsor">Adopt/Sponsor</Link></li>
          <li><Link to="/the-pack">The Pack</Link></li>
          <li><Link to="/blogs">Information / Blogs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/donations#payment-methods">
          <button className="Navbar-button">Donate</button>
        </a>
        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar-mobile-menu ${mobileMenuOpen ? "navbar-mobile-menu-open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/vet-debt" onClick={closeMobileMenu}>Vet Debt</Link></li>
          <li><Link to="/donations" onClick={closeMobileMenu}>Donations</Link></li>
          <li><Link to="/adopt-sponsor" onClick={closeMobileMenu}>Adopt/Sponsor</Link></li>
          <li><Link to="/the-pack" onClick={closeMobileMenu}>The Pack</Link></li>
          <li><Link to="/blogs" onClick={closeMobileMenu}>Information / Blogs</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
