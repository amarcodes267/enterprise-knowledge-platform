import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <div className="nav-left">

          <Link
            to="/"
            className="logo"
            aria-label="Enterprise Knowledge Platform"
          >
            <span className="logo-mark"></span>

            <div className="logo-text">
              Enterprise Knowledge
              <small>Intelligence Platform</small>
            </div>

          </Link>

        </div>

        {/* Navigation */}

        <ul className="nav-links">

          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Upload
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Search
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              AI Chat
            </NavLink>
          </li>

        </ul>

        {/* Right Button */}

        <div className="nav-right">

          <Link
            to="/upload"
            className="login-btn"
          >
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
}