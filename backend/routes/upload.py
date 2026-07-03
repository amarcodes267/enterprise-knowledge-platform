from flask import Blueprint, request, jsonify
from services.pdf_service import extract_text_from_pdf
from services.chunk_service import chunk_text
from services.embedding_service import generate_embeddings
import os

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"

@upload_bp.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "No file selected"
        }), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    file.save(filepath)

    # Extract text
    text = extract_text_from_pdf(filepath)

    # Create chunks
    chunks = chunk_text(text)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)
    store_embeddings(chunks, embeddings, file.filename)

    return jsonify({
    "status": "success",
    "filename": file.filename,
    "total_chunks": len(chunks),
    "embedding_count": len(embeddings),
    "stored": True
})