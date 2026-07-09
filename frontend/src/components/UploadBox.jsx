import { useState } from "react";
import uploadPDF from "../services/uploadService";

function UploadBox() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const result = await uploadPDF(file);

      // backend returns: { status, filename, total_chunks, embedding_count, stored }
      if (result?.status === "success") {
        alert(
          `PDF uploaded successfully: ${result.filename}\nChunks: ${result.total_chunks}, Embeddings: ${result.embedding_count}`
        );
      } else {
        alert(result?.message || "Upload failed.");
      }
    } catch (error) {
      alert("Upload failed. Check console for details.");
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <button onClick={handleUpload}>
        Upload PDF
      </button>
    </div>
  );
}

export default UploadBox;