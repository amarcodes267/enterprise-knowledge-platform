from google.oauth2 import id_token
from google.auth.transport import requests
import os

from backend.utils.jwt_helper import create_access_token, create_refresh_token



def verify_google_token(token: str) -> dict:
    """Verify a Google OAuth ID token.

    Returns a structured dict:
      - success: true/false
      - on success: name, email, google_id, picture
      - on failure: message, and a safe error code
    """

    try:
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        if not client_id:
            return {
                "status": "error",
                "code": "server_misconfigured",
                "message": "GOOGLE_CLIENT_ID is not configured",
            }


        user_info = id_token.verify_oauth2_token(token, requests.Request(), client_id)


        name = user_info.get("name")
        email = user_info.get("email")
        google_id = user_info.get("sub")


        picture = user_info.get("picture") or user_info.get("picture_url")

        if not email or not google_id:
            return {
                "status": "error",
                "code": "invalid_token_payload",
                "message": "Google token payload missing required fields",
            }

        return {
            "status": "success",
            "name": name,
            "email": email,
            "google_id": google_id,
            "picture": picture,
        }

    except ValueError as e:

        return {
            "status": "error",
            "code": "invalid_google_token",
            "message": str(e) or "Invalid Google token",
        }
    except Exception as e:
        return {
            "status": "error",
            "code": "google_verification_failed",
            "message": str(e) or "Google token verification failed",
        }



def create_tokens_for_google_user(verification: dict) -> dict:
    """Create app tokens after successful Google verification."""

    if not verification or verification.get("status") != "success":
        return {"status": "error"}

    email = verification.get("email")
    google_id = verification.get("google_id") or email
    sub = google_id

    access = create_access_token(subject=sub, email=email)
    refresh = create_refresh_token(subject=sub, email=email)

    return {"access_token": access, "refresh_token": refresh}



def revoke_tokens(access_token: str) -> None:
    """Placeholder revocation hook.

    The current project does not implement a token blacklist/storage.
    """
    return None

