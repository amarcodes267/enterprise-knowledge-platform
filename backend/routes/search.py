from flask import Blueprint, jsonify, request
from services.search_service import search_documents

search_bp = Blueprint("search", __name__)


@search_bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({
            "status": "error",
            "message": "Query parameter 'query' is required"
        }), 400

    result = search_documents(query)

    if result.get("status") == "error":
        return jsonify(result), 500

    return jsonify({
        "status": "success",
        "query": query,
        "results": result.get("results", []),
        "metadatas": result.get("metadatas", []),
        "distances": result.get("distances", [])
    })