import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>🧠 Enterprise Knowledge Platform</h2>
            <p>
              AI-powered document intelligence platform built with React,
              Flask, Gemini AI, ChromaDB, and Semantic Search.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/upload">Upload</a>
            <a href="/search">Search</a>
            <a href="/chat">Chat</a>
          </div>

          <div className="footer-tech">
            <h3>Technology</h3>
            <span>⚛ React</span>
            <span>🐍 Flask</span>
            <span>🧠 Gemini AI</span>
            <span>🗄 ChromaDB</span>
          </div>
        </div>

        <hr />

        <div className="copyright">
          © 2026 Amar Dhingra • Enterprise Knowledge Platform
        </div>
      </div>
    </footer>
  );
}



