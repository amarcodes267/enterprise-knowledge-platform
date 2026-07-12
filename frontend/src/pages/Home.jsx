import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
  return (
    <>

      <Hero />

      <FeatureCards />

      {/* Why Choose Us Section */}

      <section className="why-section">

        <h2>Why Choose Our Platform?</h2>

        <p className="section-subtitle">
          Build an intelligent enterprise knowledge base powered by
          Retrieval-Augmented Generation (RAG), ChromaDB, and Gemini AI.
        </p>

        <div className="why-grid">

          <div className="why-card">
            <h3>⚡ Lightning Fast</h3>

            <p>
              Retrieve answers from thousands of documents in seconds
              using semantic search.
            </p>
          </div>

          <div className="why-card">
            <h3>🔒 Secure</h3>

            <p>
              Protected authentication with Google OAuth and JWT
              authorization.
            </p>
          </div>

          <div className="why-card">
            <h3>🧠 AI Powered</h3>

            <p>
              Get accurate AI-generated responses using Gemini AI and
              Retrieval-Augmented Generation.
            </p>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <div className="stat-card">
          <h2>24/7</h2>
          <p>AI Availability</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Semantic Search</p>
        </div>

        <div className="stat-card">
          <h2>Gemini</h2>
          <p>AI Powered</p>
        </div>

        <div className="stat-card">
          <h2>RAG</h2>
          <p>Knowledge Retrieval</p>
        </div>

      </section>

      {/* Tech Stack */}

      <section className="tech-stack">

        <h2>Built With Modern Technologies</h2>

        <div className="tech-grid">

          <div className="tech-item">⚛ React</div>

          <div className="tech-item">🐍 Flask</div>

          <div className="tech-item">🧠 Gemini AI</div>

          <div className="tech-item">🗄 ChromaDB</div>

          <div className="tech-item">🔍 Semantic Search</div>

          <div className="tech-item">🔐 Google OAuth</div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;