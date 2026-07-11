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
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {success ? <div style={{ color: "#0a7a0a", marginTop: 10 }}>{success}</div> : null}
      {error ? <div style={{ color: "#b00020", marginTop: 10 }}>{error}</div> : null}
    </div>
  );
}

export default UploadBox;

