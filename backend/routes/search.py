from flask import Blueprint, jsonify, request

from services.search_service import search_documents
from services.llm_service import generate_answer

search_bp = Blueprint("search", __name__)

@search_bp.route("/search", methods=["GET"])
def search():

    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({
            "status": "error",
            "message": "Query parameter 'query' is required"
        }), 400

    # Search documents
    results = search_documents(query)

    # If search failed
    if isinstance(results, dict) and results.get("status") == "error":
        return jsonify(results), 500

    # Generate AI answer
    answer = generate_answer(query, results)

    return jsonify({
        "status": "success",
        "query": query,
        "answer": answer,
        "sources": results,
        "total_sources": len(results)
    })