import "./../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Enterprise Knowledge Platform
      </div>

      <ul className="nav-links">

        <li>
          <a href="#">Home</a>
        </li>

        <li>
          <a href="#">Upload</a>
        </li>

        <li>
          <a href="#">Chat</a>
        </li>

        <li>
          <a href="#">Search</a>
        </li>

        <li>
          <a href="#">About</a>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;