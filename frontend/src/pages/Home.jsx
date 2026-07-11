import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">

      <h1 className="home-title">
        Enterprise Knowledge Intelligence Platform
      </h1>

      <p className="home-subtitle">
        Upload PDFs, Search Documents and Chat with AI using RAG &
        Semantic Search.
      </p>

      <div className="card-container">

        <div className="card">
          <h2>📄 Upload Documents</h2>

          <p>
            Upload PDF documents to build your enterprise knowledge base.
          </p>

          <Link to="/upload">
            Go to Upload
          </Link>
        </div>

        <div className="card">
          <h2>💬 Chat with Documents</h2>

          <p>
            Ask questions from uploaded documents using Gemini AI.
          </p>

          <Link to="/chat">
            Go to Chat
          </Link>
        </div>

        <div className="card">
          <h2>🔍 Search Documents</h2>

          <p>
            Perform semantic search across your knowledge base.
          </p>

          <Link to="/search">
            Go to Search
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;