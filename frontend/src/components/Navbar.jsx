import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="logo"
          aria-label="Enterprise Knowledge Platform"
        >
          <div className="logo-mark">
            <span className="logo-dot"></span>
          </div>

          <div className="logo-content">
            <h2>Enterprise Knowledge Platform</h2>
            <p>AI Powered Enterprise Search</p>
          </div>
        </Link>

        {/* ================= NAVIGATION ================= */}

        <nav className="nav-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Upload
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            AI Chat
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>

        {/* ================= BUTTON ================= */}

        <div className="nav-actions">
          <Link to="/upload" className="primary-btn">
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}