import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="Enterprise Knowledge Platform">
            <span className="logo-mark" aria-hidden="true" />
            <span className="logo-text">Enterprise Knowledge Platform</span>
          </Link>
        </div>

        <ul className="nav-links" aria-label="Primary navigation">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Chat
            </NavLink>
          </li>
        </ul>

        <div className="nav-right">
          {/* Auth removed: keep UI simple */}
          <Link to="/" className="login-btn" aria-label="Home">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

