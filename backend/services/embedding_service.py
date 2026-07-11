"""Embedding service.

This module is imported by backend routes at startup.
Some environments may not have a compatible torch / torchdata stack.
To ensure the Flask app can still run on localhost, we lazy-load the model
and fail gracefully when embeddings cannot be generated.
"""

from __future__ import annotations

from typing import Any, List


_model: Any = None
_model_error: str | None = None


def _get_model():
    global _model, _model_error

    if _model is not None or _model_error is not None:
        return _model

    try:
        from sentence_transformers import SentenceTransformer  # type: ignore

        _model = SentenceTransformer("all-MiniLM-L6-v2")
        return _model
    except Exception as e:  # pragma: no cover
        _model_error = str(e)
        _model = None
        return None


def generate_embeddings(chunks: List[str]):
    """Generate embeddings for a list of text chunks.

    Raises RuntimeError if embeddings cannot be generated.
    """
    model = _get_model()
    if model is None:
        raise RuntimeError(
            "Embedding model is not available. "
            f"Original error: {_model_error or 'unknown'}"
        )

    embeddings = model.encode(chunks)
    return embeddings.tolist()
