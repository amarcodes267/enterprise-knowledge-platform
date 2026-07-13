from flask import Blueprint, jsonify, request

from backend.services.auth_service import (
    verify_google_token,
    create_tokens_for_google_user,
    revoke_tokens,
)
from backend.utils.jwt_helper import require_bearer_token

auth_bp = Blueprint("auth", __name__)




@auth_bp.route("/auth/google", methods=["POST"])
def google_auth():
    data = request.get_json(silent=True) or {}

    token = data.get("token")
    if not token:
        return jsonify({"success": False, "message": "Google token is required"}), 400

    verification = verify_google_token(token)
    if verification.get("status") != "success":
        return (
            jsonify({"success": False, "message": verification.get("message", "Google authentication failed"), "code": verification.get("code")}),
            401,
        )

    tokens = create_tokens_for_google_user(verification)
    if tokens.get("status") == "error":
        return jsonify({"success": False, "message": "Failed to create JWT tokens"}), 500


    return (
        jsonify(
            {
                "success": True,
                "token": tokens.get("access_token"),
                "user": {
                    "name": verification.get("name"),
                    "email": verification.get("email"),
                    "google_id": verification.get("google_id"),
                    "picture": verification.get("picture"),
                },
            }
        ),
        200,
    )



@auth_bp.route("/auth/logout", methods=["POST"])
@require_bearer_token
def logout():

    auth_header = request.headers.get("Authorization", "")
    access_token = auth_header.split(" ", 1)[1] if " " in auth_header else None
    if access_token:
        revoke_tokens(access_token)

    return jsonify({"status": "success", "message": "Logged out"}), 200


@auth_bp.route("/auth/me", methods=["GET"])
@require_bearer_token
def me(auth_claims):
    return jsonify({"status": "success", "user": {"email": auth_claims.get("email"), "sub": auth_claims.get("sub")}}), 200

