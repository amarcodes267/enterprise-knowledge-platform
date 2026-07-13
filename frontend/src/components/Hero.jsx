import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero() {
  return (
<section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="badge">🚀 AI Powered Enterprise Search</span>

          <h1>
            Transform Your Documents
            <br />
            Into AI Knowledge
          </h1>

          <p>
            Upload PDFs, perform semantic search, and chat with your enterprise
            documents using <strong>RAG, ChromaDB, and Gemini AI</strong>.
          </p>

          <div className="hero-buttons">
            <Link to="/upload" className="btn btn-primary">
              📄 Upload Documents
            </Link>

            <Link to="/chat" className="btn btn-secondary">
              💬 Start Chat
            </Link>
          </div>

          <div className="hero-meta">
            <div className="meta-pill">⚡ Fast semantic retrieval</div>
            <div className="meta-pill">🔒 Secure enterprise access</div>
          </div>
        </div>

        <div className="hero-image">
          <div className="glass-card card">
            <h3>🧠 AI Assistant</h3>
            <p>
              Ask questions from thousands of documents instantly using Retrieval-Augmented
              Generation.
            </p>
            <div className="status">
              <span className="dot" />
              Connected to Gemini AI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




