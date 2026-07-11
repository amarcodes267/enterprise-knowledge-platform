"""Semantic search service.

This module previously imported chromadb at import-time.
If optional Chroma telemetry dependencies are missing, it can prevent Flask from starting.
We lazy-load Chroma and fail gracefully when it isn't available.
"""

from __future__ import annotations

from typing import Any

from backend.services.embedding_service import generate_embeddings
from backend.services.vector_db_service import _get_collection



def search_documents(query, top_k=3):

    """

    Search for relevant documents based on a query using semantic search.
    
    Args:
        query (str): The search query
        top_k (int): Number of top results to return (default: 3)
    
    Returns:
        dict: Dictionary containing results with keys:
            - "status": "success" or "error"
            - "results": List of matching chunks
            - "metadatas": List of metadata for each result
            - "distances": List of distances for each result
    """
    
    try:
        query_embedding = generate_embeddings([query])[0]

        collection = _get_collection()
        if collection is None:
            return {
                "status": "error",
                "message": "Chroma collection is unavailable",
                "results": [],
            }

        results = collection.query(

            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        if results["documents"] and len(results["documents"]) > 0:
            chunks = results["documents"][0]
            metadatas = results["metadatas"][0] if results["metadatas"] else []
            distances = results["distances"][0] if results["distances"] else []
            
            return {
                "status": "success",
                "results": chunks,
                "metadatas": metadatas,
                "distances": distances
            }

        else:
            return {
                "status": "success",
                "results": [],
                "metadatas": [],
                "distances": []
            }
    
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "results": []
        }
