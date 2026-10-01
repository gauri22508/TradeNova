import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Navbar() {
  const [cookies, , removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          TradeNova
        </Link>

        {/* Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {cookies.token ? (
                <button className="nav-link" onClick={handleLogout} type="button">
                  Logout
                </button>
              ) : (
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/signup">
                  SignUp
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/pricing">
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/support">
                Support
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;