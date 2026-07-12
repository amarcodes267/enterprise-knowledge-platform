import { Link } from "react-router-dom";
import "../styles/Navbar.css";import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🧠 Enterprise Knowledge Platform
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/upload">Upload</Link>
          </li>

          <li>
            <Link to="/search">Search</Link>
          </li>

          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>

        <Link to="/login" className="login-btn">
          Login
        </Link>

      </div>
    </nav>
  );
}