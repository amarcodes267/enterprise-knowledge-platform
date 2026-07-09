import os
import hashlib
import chromadb

# Persist Chroma to a local directory so uploads survive restarts.
# NOTE: This path is relative to the repo root.
PERSIST_DIR = os.path.join(os.getcwd(), "chroma_db")

client = chromadb.PersistentClient(path=PERSIST_DIR)
collection = client.get_or_create_collection(name="documents")


def _make_chunk_id(filename: str, chunk_index: int, chunk_text: str) -> str:
    """Create a stable, unique id per chunk."""
    base = f"{filename}::{chunk_index}::{hashlib.sha256(chunk_text.encode('utf-8', errors='ignore')).hexdigest()[:16]}"
    return hashlib.sha256(base.encode("utf-8")).hexdigest()


def store_embeddings(chunks, embeddings, filename):
    """Store embeddings for chunks.

    IDs must be unique across uploads; otherwise Chroma will overwrite.
    """
    ids = []
    metadata = []

    for i, chunk in enumerate(chunks):
        ids.append(_make_chunk_id(filename, i, chunk))
        metadata.append({"filename": filename, "chunk_index": i})

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadata,
    )

    return "Embeddings stored successfully"

