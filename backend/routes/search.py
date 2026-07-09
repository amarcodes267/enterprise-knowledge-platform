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
            "message": "Query parameter 'query' is required",
        }), 400

    results = search_documents(query)

    if isinstance(results, dict) and results.get("status") == "error":
        return jsonify(results), 500

    # generate_answer expects the search_service return shape.
    answer = generate_answer(query, results)

    # /search returns sources as the list of chunks (not the whole result dict)
    sources = results.get("results", []) if isinstance(results, dict) else []

    return jsonify({
        "status": "success",
        "query": query,
        "answer": answer,
        "sources": sources,
        "total_sources": len(sources),
    })
