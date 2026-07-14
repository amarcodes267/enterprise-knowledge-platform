import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
  return (
    <>

      <Hero />

      <FeatureCards />

      {/* Why Choose Our Platform */}

      <section className="why-section">

        <div className="container">

          <div className="section-header">

            <span className="section-badge">
              Why Choose Us
            </span>

            <h2>
              Built for Modern
              <span> Enterprise AI</span>
            </h2>

            <p>
              A complete AI-powered knowledge platform designed for intelligent
              document management, semantic search, and conversational AI using
              Retrieval-Augmented Generation.
            </p>

          </div>

          <div className="why-grid">

            <div className="why-card">

              <div className="why-icon">⚡</div>

              <h3>Lightning Fast Search</h3>

              <p>
                Retrieve accurate answers from thousands of enterprise documents
                within milliseconds using semantic vector search.
              </p>

            </div>

            <div className="why-card">

              <div className="why-icon">🛡️</div>

              <h3>Enterprise Ready</h3>

              <p>
                Built with scalable architecture, secure APIs, and intelligent
                document processing suitable for enterprise environments.
              </p>

            </div>

            <div className="why-card">

              <div className="why-icon">🤖</div>

              <h3>AI Powered</h3>

              <p>
                Generate contextual answers using Gemini AI combined with
                Retrieval-Augmented Generation and ChromaDB.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <div className="container">

          <div className="stats-grid">

            <div className="stat-card">
              <h2>10K+</h2>
              <p>Documents Indexed</p>
            </div>

            <div className="stat-card">
              <h2>98%</h2>
              <p>Search Accuracy</p>
            </div>

            <div className="stat-card">
              <h2>300ms</h2>
              <p>Average Response</p>
            </div>

            <div className="stat-card">
              <h2>24/7</h2>
              <p>AI Availability</p>
            </div>

          </div>

        </div>

      </section>

      {/* Technology Stack */}

      <section className="tech-stack">

        <div className="container">

          <div className="section-header">

            <span className="section-badge">
              Technology Stack
            </span>

            <h2>
              Built Using Modern AI Technologies
            </h2>

            <p>
              A production-inspired technology stack combining AI, vector
              databases, and modern web development.
            </p>

          </div>

          <div className="tech-grid">

            <div className="tech-item">⚛ React</div>

            <div className="tech-item">🐍 Flask</div>

            <div className="tech-item">🤖 Gemini AI</div>

            <div className="tech-item">🗄️ ChromaDB</div>

            <div className="tech-item">🔍 Semantic Search</div>

            <div className="tech-item">📚 RAG Pipeline</div>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;