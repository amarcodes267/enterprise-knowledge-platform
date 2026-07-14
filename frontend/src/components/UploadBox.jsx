import { useState } from "react";
import uploadPDF from "../services/uploadService";
import "../styles/UploadBox.css";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    setError("");
    setSuccess("");
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    const lower = (file.name || "").toLowerCase();

    if (!lower.endsWith(".pdf")) {
      setError("Only PDF files are accepted.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadPDF(file);

      if (result?.status === "success") {
        setSuccess(
          `Document processed successfully.
Filename: ${result.filename}
Chunks: ${result.total_chunks}
Embeddings: ${result.embedding_count}`
        );
      } else {
        setError(result?.message || "Upload failed.");
      }
    } catch (e) {
      console.error(e);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">

      <div className="upload-top">

        <div className="upload-icon">
          📄
        </div>

        <h2>Upload PDF Document</h2>

        <p>
          Upload enterprise PDF documents to create your AI-powered
          knowledge base.
        </p>

      </div>

      <label className="upload-dropzone">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={loading}
        />

        <div className="dropzone-content">

          <div className="drop-icon">
            ☁️
          </div>

          <h3>
            Drag & Drop your PDF
          </h3>

          <p>
            or click to browse files
          </p>

        </div>

      </label>

      {file && (

        <div className="selected-file">

          <span>📑</span>

          <div>

            <strong>{file.name}</strong>

            <small>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </small>

          </div>

        </div>

      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Processing Document..." : "Upload & Process"}
      </button>

      {success && (
        <div className="upload-success">
          {success}
        </div>
      )}

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}

    </div>
  );
}

export default UploadBox;