import { NavLink, useNavigate } from "react-router-dom";

import BASE_URL from "../services/api";
import { clearTokens, getAccessToken } from "../utils/auth";

import "../styles/Navbar.css";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = getAccessToken();

    try {
      if (token) {
        await fetch(`${BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      clearTokens();
      navigate("/login");
    }
  };

  const token = getAccessToken();

  return (
    <nav className="navbar">
      <h2 className="logo">Enterprise Knowledge Platform</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {token ? (
          <>
            <li>
              <NavLink to="/upload">Upload</NavLink>
            </li>
            <li>
              <NavLink to="/chat">Chat</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
          </>
        ) : null}

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {token ? (
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>

      {user?.email ? (
        <div className="nav-user" style={{ marginLeft: "auto", paddingRight: 12, color: "#666" }}>
          {user.email}
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
