import { Link } from "react-router-dom";
import "../styles/FeatureCards.css";

const features = [
  {
    icon: "📄",
    title: "Smart Document Upload",
    description:
      "Securely upload PDFs and automatically transform enterprise documents into an AI-ready knowledge base.",
    link: "/upload",
    button: "Upload Documents",
  },
  {
    icon: "🔍",
    title: "Semantic Search",
    description:
      "Retrieve the most relevant information instantly using vector embeddings and semantic understanding.",
    link: "/search",
    button: "Explore Search",
  },
  {
    icon: "🤖",
    title: "AI Knowledge Chat",
    description:
      "Interact naturally with your enterprise documents using Retrieval-Augmented Generation powered by Gemini AI.",
    link: "/chat",
    button: "Start Conversation",
  },
];

export default function FeatureCards() {
  return (
    <section className="features">

      <div className="container">

        <div className="section-title">

          <span className="section-badge">
            Enterprise Features
          </span>

          <h2>
            Everything You Need for
            <span> Enterprise AI</span>
          </h2>

          <p>
            Build an intelligent knowledge platform with document processing,
            semantic search, and conversational AI in one unified experience.
          </p>

        </div>

        <div className="feature-grid">

          {features.map((feature, index) => (
            <div className="feature-card" key={index}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <Link
                to={feature.link}
                className="feature-btn"
              >
                {feature.button}
                <span>→</span>
              </Link>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
