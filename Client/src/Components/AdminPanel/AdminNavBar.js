import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../NavBar/images/logo.png';

function AdminNavBar({ onLogout }) {
  return (
    <nav className="navbar-container admin-navbar-shell">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="KDS Logo" />
        </Link>
      </div>
      <div>
        <ul className="navbar-links admin-navbar-links">
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="Navbar-button admin-logout-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default AdminNavBar;
