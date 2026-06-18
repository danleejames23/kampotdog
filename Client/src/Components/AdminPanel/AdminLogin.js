import React, { useState } from "react";
import AdminPanel from "./AdminPanel";
import { apiUrl } from '../../config/api';
import "./Admin.css";
import logo from '../NavBar/images/logo.png';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(
    !!localStorage.getItem('adminToken')
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl('/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setLoginSuccess(true);
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  if (loginSuccess) return <AdminPanel onLogout={() => {
    localStorage.removeItem('adminToken');
    setLoginSuccess(false);
  }} />;

  return (
    <div className="admin-login-shell">
      <div className="login-body">
        <div className="login-container">
          <div className="login-brand">
            <img src={logo} alt="KDS logo" className="login-logo" />
            <p className="login-kicker">Kampot Dog Sanctuary</p>
          </div>
          <h2>Admin Panel Login</h2>
          <p className="login-sub">Sign in to manage dogs, sponsorships, content and site updates.</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {showErrorMessage && (
            <p className="error-message">Incorrect username or password</p>
          )}
          <div className="login-hint">Default for now: username <strong>admin</strong> | password <strong>admin</strong></div>
          <button className="float-right" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
