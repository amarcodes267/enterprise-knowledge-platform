from __future__ import annotations

from functools import wraps
from typing import Any, Callable

from flask import jsonify, request

from backend.utils.jwt_helper import decode_access_token_safely


def auth_required(view_func: Callable[..., Any]) -> Callable[..., Any]:
    """Decorator to require a valid Bearer JWT access token.

    - Reads Authorization: Bearer <token>
    - Verifies/decodes token
    - Rejects missing/invalid/expired tokens
    - Attaches decoded claims to request context: request.auth

    The wrapped view function receives the decoded claims as its first argument.
    """

    @wraps(view_func)
    def wrapper(*args: Any, **kwargs: Any):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"status": "error", "message": "Missing Bearer token"}), 401

        token = auth_header.split(" ", 1)[1].strip()
        ok, result = decode_access_token_safely(token)
        if not ok:
            # result is an error message string
            return jsonify({"status": "error", "message": str(result)}), 401

        # result is claims dict
        request.auth = result  # type: ignore[attr-defined]
        return view_func(result, *args, **kwargs)

    return wrapper

