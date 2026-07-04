import chromadb
from services.embedding_service import generate_embeddings

# Initialize ChromaDB client and collection
client = chromadb.Client()
collection = client.get_or_create_collection(name="documents")


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
        # Generate embedding for the query
        query_embedding = generate_embeddings([query])[0]
        
        # Query the collection for top_k results
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        # Extract and format the results
        if results["documents"] and len(results["documents"]) > 0:
            chunks = results["documents"][0]  # Get the first (and only) query result
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
