import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import "./Menu.css";

const Menu = ({ username = "User", isDarkMode, onToggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const displayName = username.trim() || "User";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "http://localhost:3000/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" className="brand-logo" />

      <div className="menus">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul className={menuOpen ? "mobile-menu-open" : ""}>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Holdings
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Positions
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Funds
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeMenuClass : menuClass}
            >
              Apps
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className={`profile${profileOpen ? " profile-open" : ""}`}>
          <button
            className="avatar"
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label={`Open profile menu for ${displayName}`}
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            {avatarInitial}
          </button>
          <div className="profile-dropdown">
            <p className="username" title={displayName}>{displayName}</p>
            <button
              className="theme-toggle"
              type="button"
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
              <span className="theme-label">{isDarkMode ? "Light mode" : "Dark mode"}</span>
            </button>
            <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
