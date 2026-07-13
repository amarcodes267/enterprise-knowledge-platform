import UploadBox from "../components/UploadBox";

function Upload() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>Upload PDF</h1>
          <p>Upload documents to build your knowledge base for semantic search and chat.</p>
        </header>

        <UploadBox />
      </div>
    </div>
  );
}

export default Upload;
