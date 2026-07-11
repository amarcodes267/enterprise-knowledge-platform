from flask import Blueprint, jsonify, request

from backend.services.search_service import search_documents
from backend.services.llm_service import generate_answer

from backend.utils.auth_required import auth_required


search_bp = Blueprint("search", __name__)



@search_bp.route("/search", methods=["GET"])
@auth_required

def search(auth_claims):

    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({
            "status": "error",
            "message": "Query parameter 'query' is required",
        }), 400

    results = search_documents(query)

    if isinstance(results, dict) and results.get("status") == "error":
        return jsonify(results), 500

    answer = generate_answer(query, results)

    sources = results.get("results", []) if isinstance(results, dict) else []


    return jsonify({
        "status": "success",
        "query": query,
        "answer": answer,
        "sources": sources,
        "total_sources": len(sources),
    })
