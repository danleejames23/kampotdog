import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && closeMobileMenu();
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  const links = [
    ['/', 'Home'], ['/vet-debt', 'Vet Debt'], ['/donations', 'Donations'],
    ['/adopt-sponsor', 'Adopt / Sponsor'], ['/the-pack', 'The Pack'],
    ['/blogs', 'Stories'], ['/contact', 'Contact'],
  ];

  return (
    <nav className="navbar-container" aria-label="Main navigation">
      <div className="navbar-left">
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          {links.map(([to, label]) => (
            <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>
          ))}
        </ul>
      </div>
      <div className="navbar-right">
        <Link className="Navbar-button" to="/donations#payment-methods">Donate</Link>
        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileMenuOpen && <button className="navbar-mobile-backdrop" aria-label="Close menu" onClick={closeMobileMenu} />}
      <div id="mobile-menu" className={`navbar-mobile-menu ${mobileMenuOpen ? "navbar-mobile-menu-open" : ""}`}>
        <ul>
          {links.map(([to, label]) => (
            <li key={to}><NavLink to={to} end={to === '/'} onClick={closeMobileMenu}>{label}</NavLink></li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
