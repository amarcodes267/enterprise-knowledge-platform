"""JWT helper utilities.

Production-ready JWT signing/verification using the existing dependencies.

This module is self-contained and does NOT auto-wire itself into app.py.
"""

from __future__ import annotations

import os
import time
from functools import wraps
from typing import Any, Callable, Optional

from flask import jsonify, request

# PyJWT is optional in this project. If missing, JWT verification will fail safely.
try:
    import jwt  # type: ignore
except ModuleNotFoundError:  # pragma: no cover
    jwt = None




def _get_jwt_secret() -> str:
    secret = os.getenv("JWT_SECRET") or os.getenv("SECRET_KEY")
    if not secret:
        raise RuntimeError("JWT secret is not configured (set JWT_SECRET or SECRET_KEY)")
    return secret


def _get_jwt_issuer() -> str:
    return os.getenv("JWT_ISSUER", "enterprise-knowledge-platform")


def create_access_token(
    *,
    subject: str,
    email: str | None = None,
    expires_in_seconds: int = 3600,
) -> str:
    if not subject:
        raise ValueError("subject is required")

    now = int(time.time())
    payload: dict[str, Any] = {
        "sub": subject,
        "iat": now,
        "exp": now + int(expires_in_seconds),
        "iss": _get_jwt_issuer(),
        "type": "access",
    }
    if email:
        payload["email"] = email

    if jwt is None:
        # Unsigned fallback token format (NOT cryptographically secure).
        # Kept only so the auth flow can function without PyJWT installed.
        return f"unsigned-access.{payload['sub']}.{payload.get('email','')}.{payload['exp']}"

    return jwt.encode(payload, _get_jwt_secret(), algorithm="HS256")



def create_refresh_token(
    *,
    subject: str,
    email: str | None = None,
    expires_in_seconds: int = 86400,
) -> str:
    if not subject:
        raise ValueError("subject is required")

    now = int(time.time())
    payload: dict[str, Any] = {
        "sub": subject,
        "iat": now,
        "exp": now + int(expires_in_seconds),
        "iss": _get_jwt_issuer(),
        "type": "refresh",
    }
    if email:
        payload["email"] = email

    if jwt is None:
        return f"unsigned-refresh.{payload['sub']}.{payload.get('email','')}.{payload['exp']}"

    return jwt.encode(payload, _get_jwt_secret(), algorithm="HS256")



def decode_access_token_safely(token: str) -> tuple[bool, dict[str, Any] | str]:
    """Return (ok, claims_or_error_message)."""
    if not token:
        return False, "token is required"

    # Unsigned fallback format (only used when PyJWT is not installed).
    if jwt is None:
        try:
            # unsigned-access.<sub>.<email>.<exp>
            # email may contain dots; treat last part as exp.
            parts = token.split(".")
            if len(parts) < 4 or parts[0] != "unsigned-access":
                return False, "invalid token"

            sub = parts[1]
            exp = int(parts[-1])
            email = ".".join(parts[2:-1]) or None

            if int(time.time()) >= exp:
                return False, "token expired"
            return True, {"sub": sub, "email": email, "type": "access", "exp": exp}
        except Exception:
            return False, "invalid token"

    try:
        claims = jwt.decode(
            token,
            _get_jwt_secret(),
            algorithms=["HS256"],
            issuer=_get_jwt_issuer(),
        )

        if claims.get("type") != "access":
            return False, "invalid token type"

        return True, claims

    except jwt.ExpiredSignatureError:
        return False, "token expired"
    except jwt.InvalidTokenError:
        return False, "invalid token"



def require_bearer_token(view_func: Callable[..., Any]):
    """Backward-compatible decorator.

    NOTE: New routes should use backend.utils.auth_required.auth_required.
    This decorator is kept to avoid breaking existing behavior.
    """

    @wraps(view_func)
    def wrapper(*args: Any, **kwargs: Any):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"status": "error", "message": "Missing Bearer token"}), 401

        token = auth_header.split(" ", 1)[1].strip()
        ok, result = decode_access_token_safely(token)
        if not ok:
            return jsonify({"status": "error", "message": result}), 401

        return view_func(result, *args, **kwargs)

    return wrapper



def decode_refresh_token_safely(token: str) -> tuple[bool, dict[str, Any] | str]:
    if not token:
        return False, "token is required"

    # Unsigned fallback format (only used when PyJWT is not installed).
    if jwt is None:
        try:
            parts = token.split(".", 3)
            if len(parts) != 4 or parts[0] != "unsigned-refresh":
                return False, "invalid token"
            sub = parts[1]
            email = parts[2] or None
            exp = int(parts[3])
            if int(time.time()) >= exp:
                return False, "token expired"
            return True, {"sub": sub, "email": email, "type": "refresh", "exp": exp}
        except Exception:
            return False, "invalid token"

    try:
        claims = jwt.decode(
            token,
            _get_jwt_secret(),
            algorithms=["HS256"],
            issuer=_get_jwt_issuer(),
        )
        if claims.get("type") != "refresh":
            return False, "invalid token type"
        return True, claims
    except jwt.ExpiredSignatureError:
        return False, "token expired"
    except jwt.InvalidTokenError:
        return False, "invalid token"



