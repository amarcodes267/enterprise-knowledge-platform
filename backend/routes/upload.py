from flask import Blueprint, request, jsonify
import os

from backend.services.pdf_service import extract_text_from_pdf
from backend.services.chunk_service import chunk_text
from backend.services.embedding_service import generate_embeddings
from backend.services.vector_db_service import store_embeddings

from backend.utils.auth_required import auth_required


upload_bp = Blueprint("upload", __name__)


UPLOAD_FOLDER = "uploads"



@upload_bp.route("/upload", methods=["POST"])
@auth_required
def upload_file(auth_claims):

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No file uploaded",
        }), 400

    file = request.files["file"]

    if not file or file.filename == "":
        return jsonify({
            "status": "error",
            "message": "No file selected",
        }), 400

    filename = file.filename
    lower = filename.lower()

    if not lower.endswith(".pdf"):
        return jsonify({
            "status": "error",
            "message": "Only PDF files are accepted",
        }), 400

    content_type = (file.mimetype or "").lower()
    if content_type and content_type not in ["application/pdf"]:
        return jsonify({
            "status": "error",
            "message": "Invalid file type. Please upload a PDF.",
        }), 400

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        text = extract_text_from_pdf(filepath)
        chunks = chunk_text(text)
        embeddings = generate_embeddings(chunks)
        store_embeddings(chunks, embeddings, filename)
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
        }), 500

    return jsonify({
        "status": "success",
        "filename": filename,
        "total_chunks": len(chunks),
        "embedding_count": len(embeddings),
        "stored": True,
    })

