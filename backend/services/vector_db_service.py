from __future__ import annotations

import os
import hashlib

"""Vector DB service (Chroma).

This module is imported at Flask startup via routes/upload.
In some environments, optional Chroma dependencies (like opentelemetry extras)
may be missing, causing the whole app to fail import-time.

To keep the localhost server running, we lazy-load chromadb and fail gracefully
when Chroma is unavailable.
"""

from typing import Any, Optional

_client: Any = None
_collection: Any = None
_chroma_error: str | None = None

PERSIST_DIR = os.path.join(os.getcwd(), "chroma_db")


def _get_collection():
    global _client, _collection, _chroma_error

    if _collection is not None or _chroma_error is not None:
        return _collection

    try:
        import chromadb  # type: ignore

        _client = chromadb.PersistentClient(path=PERSIST_DIR)
        _collection = _client.get_or_create_collection(name="documents")
        return _collection
    except Exception as e:  # pragma: no cover
        _chroma_error = str(e)
        _client = None
        _collection = None
        return None


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

    collection = _get_collection()
    if collection is None:
        raise RuntimeError(f"Chroma collection is unavailable: {_chroma_error or 'unknown error'}")

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadata,
    )


    return "Embeddings stored successfully"

