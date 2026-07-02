from flask import Blueprint, request, jsonify
from services.search_service import search_documents

# Create a Blueprint for search routes
search_bp = Blueprint("search", __name__)


@search_bp.route("/search", methods=["POST"])
def search():
    """
    Semantic search endpoint.
    
    Expected JSON request body:
    {
        "query": "What is machine learning?"
    }
    
    Returns:
    {
        "status": "success",
        "query": "What is machine learning?",
        "results": ["chunk1", "chunk2", "chunk3"]
    }
    """
    
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate query parameter
        if not data or "query" not in data:
            return jsonify({
                "status": "error",
                "message": "Missing 'query' parameter in request body"
            }), 400
        
        query = data.get("query")
        
        if not query or not isinstance(query, str) or query.strip() == "":
            return jsonify({
                "status": "error",
                "message": "Query must be a non-empty string"
            }), 400
        
        # Perform semantic search
        search_result = search_documents(query, top_k=3)
        
        # Check if search was successful
        if search_result["status"] == "error":
            return jsonify({
                "status": "error",
                "message": search_result.get("message", "Search failed")
            }), 500
        
        # Return successful response
        return jsonify({
            "status": "success",
            "query": query,
            "results": search_result["results"],
            "metadatas": search_result["metadatas"],
            "distances": search_result["distances"]
        }), 200
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred: {str(e)}"
        }), 500
