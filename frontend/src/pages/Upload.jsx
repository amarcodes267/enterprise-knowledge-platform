import UploadBox from "../components/UploadBox";
import "../styles/upload.css";

function Upload() {
  return (
    <div className="upload-page">

      <div className="container">

        <div className="upload-header">

          <span className="page-badge">
            Enterprise Knowledge Platform
          </span>

          <h1>
            Upload Enterprise
            <span> Documents</span>
          </h1>

          <p>
            Securely upload PDF documents to create an AI-powered enterprise
            knowledge base. Your files are processed into vector embeddings,
            enabling semantic search and intelligent conversations using
            Retrieval-Augmented Generation (RAG).
          </p>

        </div>

        <div className="upload-layout">

          <div className="upload-left">

            <UploadBox />

          </div>

          <div className="upload-right">

            <div className="info-card">

              <h3>📄 Supported Format</h3>

              <p>
                Upload PDF documents to automatically extract text and build
                your enterprise knowledge base.
              </p>

            </div>

            <div className="info-card">

              <h3>⚡ AI Processing</h3>

              <p>
                Documents are chunked, embedded using vector embeddings,
                and indexed for lightning-fast semantic retrieval.
              </p>

            </div>

            <div className="info-card">

              <h3>🤖 AI Ready</h3>

              <p>
                Once processed, your documents become instantly available
                for AI chat and semantic search.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Upload;
