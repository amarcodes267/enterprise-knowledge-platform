import { Link } from "react-router-dom";
import "../styles/FeatureCards.css";

const features = [
  {
    icon: "📄",
    title: "Upload Documents",
    description:
      "Upload PDFs securely and create your AI-powered enterprise knowledge base.",
    link: "/upload",
    button: "Upload Now",
  },
  {
    icon: "🔍",
    title: "Semantic Search",
    description:
      "Find relevant information instantly using AI-powered semantic search.",
    link: "/search",
    button: "Search",
  },
  {
    icon: "💬",
    title: "AI Chat",
    description:
      "Ask questions about your uploaded documents using Gemini AI and RAG.",
    link: "/chat",
    button: "Start Chat",
  },
];

export default function FeatureCards() {
  return (
    <section className="features">
      <div className="container">
        <div className="section-title">
          <h2>Platform Features</h2>
          <p>
            Everything you need to build an intelligent enterprise knowledge
            platform.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-card-inner">
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.link} className="feature-btn btn btn-secondary">
                  {feature.button} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



