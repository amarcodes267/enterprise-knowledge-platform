import { useState } from "react";
import uploadPDF from "../services/uploadService";

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
          `PDF uploaded successfully: ${result.filename} | Chunks: ${result.total_chunks}, Embeddings: ${result.embedding_count}`
        );
      } else {
        setError(result?.message || "Upload failed.");
      }
    } catch (e) {
      console.error(e);
      setError("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass upload-card">
      <div className="upload-header">
        <div className="upload-title">Upload your PDF</div>
        <div className="upload-subtitle">Only .pdf files are supported.</div>
      </div>

      <input className="file" type="file" accept=".pdf" onChange={handleFileChange} disabled={loading} />

      <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {success ? <div className="alert alert-success">{success}</div> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </div>
  );
}

export default UploadBox;

