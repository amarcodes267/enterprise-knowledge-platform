# Day 8: Semantic Search API

## 📚 What is Semantic Search?

Semantic search is a search technique that understands the **meaning** and **context** of user queries and documents, rather than just matching keywords. It goes beyond simple string matching to find results based on the actual intent and content meaning.

### Key Characteristics:
- **Meaning-based**: Finds semantically similar content even if keywords don't match exactly
- **Context-aware**: Understands the context and intent behind the query
- **Similarity-based**: Uses embeddings and distance metrics to measure relevance

### Example:
- **Query**: "What is machine learning?"
- **Keyword Search**: Looks for pages with "machine" AND "learning"
- **Semantic Search**: Finds pages about AI, neural networks, deep learning, data science, algorithms, etc.

---

## 🔍 Keyword Search vs Semantic Search

| Aspect | Keyword Search | Semantic Search |
|--------|---|---|
| **Method** | Exact string matching | Embedding-based similarity |
| **Understanding** | No context, just keywords | Understands meaning and intent |
| **Flexibility** | Rigid, requires exact terms | Flexible, finds related concepts |
| **Example Query** | "python tutorial" | "how to learn python programming" |
| **Results** | Only pages with "python" + "tutorial" | Pages about Python courses, guides, learning resources, etc. |
| **Accuracy** | Lower for complex queries | Higher for natural language queries |

---

## 📐 Cosine Similarity (Concept)

Cosine similarity measures how similar two vectors (embeddings) are by computing the angle between them.

### Formula:
$$\cos(\theta) = \frac{A \cdot B}{||A|| \times ||B||}$$

Where:
- **A** and **B** are embedding vectors
- Result ranges from **-1 to 1** (typically 0 to 1 for document similarity)
- **1.0** = identical documents
- **0.0** = completely different
- **-1.0** = opposite (rarely used in semantic search)

### Why Cosine Similarity?
- Works well with high-dimensional vectors (embeddings)
- Computationally efficient
- Measures direction, not magnitude (important for text)

---

## 🔗 Query Embeddings

An embedding is a numerical representation of text. It captures the semantic meaning of the text in a vector of numbers.

### How Query Embeddings Work:
1. User asks a question: `"What is machine learning?"`
2. The embedding model converts it to a vector: `[0.25, -0.18, 0.92, ..., 0.11]`
3. This vector is compared to all document embeddings in the database
4. Documents with similar embeddings are returned

### Popular Embedding Models:
- **SentenceTransformers**: `all-MiniLM-L6-v2` (our implementation)
- **OpenAI Embeddings**: `text-embedding-3-small`
- **Google Embeddings**: `text-embedding-004`

---

## 🎯 Top-K Search

Top-K search returns the **K most similar results** from the database.

### Why Top-K?
- We don't need all results, just the most relevant ones
- Reduces noise and improves response quality
- **K=3**: Return top 3 results (our implementation)
- Reduces latency and computational cost

### Process:
1. Generate query embedding
2. Calculate similarity score between query and all documents
3. Sort by similarity score (highest first)
4. Return top K results

---

## 💾 ChromaDB collection.query()

The `query()` method searches the ChromaDB collection for similar documents.

### Syntax:
```python
results = collection.query(
    query_embeddings=[query_vector],
    n_results=3
)
```

### Returns:
```python
{
    "documents": [["chunk1", "chunk2", "chunk3"]],
    "metadatas": [[{"filename": "doc.pdf"}, ...], ...],
    "distances": [[0.15, 0.28, 0.42]],
    "ids": [["0", "1", "2"]]
}
```

### Key Parameters:
- `query_embeddings`: List of query vectors to search with
- `n_results`: Number of top results to return
- `where`: (Optional) Filter by metadata
- `include`: (Optional) Specify what to return

---

## 📋 Implementation Summary

### Step 1: Generate Query Embedding
```python
query_embedding = generate_embeddings([query])[0]
```

### Step 2: Search ChromaDB
```python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=3
)
```

### Step 3: Extract Results
```python
chunks = results["documents"][0]
metadatas = results["metadatas"][0]
distances = results["distances"][0]
```

### Step 4: Return JSON Response
```python
{
    "status": "success",
    "query": "user's question",
    "results": ["chunk1", "chunk2", "chunk3"],
    "metadatas": [{"filename": "..."}],
    "distances": [0.15, 0.28, 0.42]
}
```

---

## 🚀 What Was Built Today

### Files Created:
1. **`backend/services/search_service.py`**: Core search functionality
   - `search_documents()`: Performs semantic search with top-3 results
   
2. **`backend/routes/search.py`**: API endpoint
   - `POST /search`: Accepts queries and returns relevant chunks

### Modifications:
1. **`backend/app.py`**: Registered the search blueprint

### API Testing:
**POST** `http://127.0.0.1:5000/search`

Request Body:
```json
{
    "query": "What is machine learning?"
}
```

Response:
```json
{
    "status": "success",
    "query": "What is machine learning?",
    "results": [
        "Machine learning is a branch of artificial intelligence...",
        "ML algorithms learn from data...",
        "Neural networks are used in deep learning..."
    ],
    "metadatas": [
        {"filename": "document1.pdf"},
        {"filename": "document2.pdf"},
        {"filename": "document3.pdf"}
    ],
    "distances": [0.15, 0.28, 0.42]
}
```

---

## 🎓 Key Learnings

1. **Semantic Search** is more powerful than keyword search for natural language queries
2. **Embeddings** convert text to numerical vectors that capture semantic meaning
3. **Cosine Similarity** efficiently measures document relevance
4. **Top-K Search** balances accuracy with performance
5. **ChromaDB** provides an easy-to-use vector database for semantic search
6. **Query Embeddings** must use the same embedding model as the stored documents
7. **Metadata** helps track document sources alongside search results

---

## 🔮 Next Steps (Day 9)

On Day 9, we'll integrate an LLM (Large Language Model) to:
1. Take the top 3 semantic search results
2. Use them as context for the LLM
3. Generate a comprehensive answer based on the retrieved documents
4. Complete the RAG (Retrieval-Augmented Generation) pipeline

This will transform our platform into a true **Enterprise Knowledge Intelligence Platform with RAG**!

---

## 📚 Resources

- [ChromaDB Documentation](https://docs.trychroma.com/)
- [SentenceTransformers](https://www.sbert.net/)
- [Cosine Similarity Explained](https://en.wikipedia.org/wiki/Cosine_similarity)
- [Semantic Search Overview](https://www.elastic.co/what-is/semantic-search)
