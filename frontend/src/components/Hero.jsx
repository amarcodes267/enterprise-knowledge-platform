import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="badge">
          🚀 AI Powered Enterprise Search
        </span>

        <h1>
          Transform Your Documents
          <br />
          Into AI Knowledge
        </h1>

        <p>
          Upload PDFs, perform semantic search, and chat with your
          enterprise documents using
          <strong> RAG, ChromaDB, and Gemini AI.</strong>
        </p>

        <div className="hero-buttons">

          <Link to="/upload" className="primary-btn">
            📄 Upload Documents
          </Link>

          <Link to="/chat" className="secondary-btn">
            💬 Start Chat
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <div className="glass-card">

          <h3>🧠 AI Assistant</h3>

          <p>
            Ask questions from thousands of documents
            instantly using Retrieval-Augmented Generation.
          </p>

          <div className="status">
            <span className="dot"></span>
            Connected to Gemini AI
          </div>

        </div>

      </div>

    </section>
  );
}