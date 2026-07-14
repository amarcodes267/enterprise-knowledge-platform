import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background"></div>

      <div className="container hero-inner">
        {/* LEFT SIDE */}
        <div className="hero-content">
          <span className="hero-badge">
            ✨ Enterprise AI • RAG • Semantic Search
          </span>

          <h1 className="hero-title">
            Enterprise Knowledge
            <span> Intelligence Platform</span>
          </h1>

          <p className="hero-description">
            Unlock the power of your enterprise knowledge with an AI-powered
            platform that enables intelligent document search, semantic
            retrieval, and contextual conversations using{" "}
            <strong>RAG, ChromaDB, and Gemini AI.</strong>
          </p>

          <div className="hero-buttons">
            <Link to="/upload" className="btn-primary">
              Upload Documents
            </Link>

            <Link to="/chat" className="btn-secondary">
              Try AI Chat
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Documents Indexed</p>
            </div>

            <div className="stat-card">
              <h3>98%</h3>
              <p>Search Accuracy</p>
            </div>

            <div className="stat-card">
              <h3>300ms</h3>
              <p>Average Response</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-image">

          <div className="dashboard-card">

            <div className="dashboard-header">
              <div className="green-dot"></div>
              AI Knowledge Engine
            </div>

            <div className="dashboard-body">

              <div className="dashboard-item">
                📄 Document Uploaded
              </div>

              <div className="dashboard-item">
                🧠 Embeddings Generated
              </div>

              <div className="dashboard-item">
                🔍 Semantic Search Ready
              </div>

              <div className="dashboard-item">
                🤖 Gemini AI Connected
              </div>

            </div>

            <div className="dashboard-footer">

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <p>Knowledge Base Ready</p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}



