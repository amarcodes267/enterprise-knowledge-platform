from flask import Blueprint, request, jsonify

from backend.services.chat_service import (
    store_message,
    get_chat_history,
)

from backend.services.search_service import search_documents
from backend.services.llm_service import generate_answer

from backend.utils.auth_required import auth_required


chat_bp = Blueprint("chat", __name__)



@chat_bp.route("/chat", methods=["POST"])
@auth_required

def chat(auth_claims):

    data = request.get_json()


    if not data or "message" not in data:
        return jsonify({
            "status": "error",
            "message": "Message is required"
        }), 400

    message = data["message"]

    store_message("user", message)

    results = search_documents(message)

    answer = generate_answer(message, results)

    store_message("assistant", answer)


    history = get_chat_history()

    return jsonify({
        "status": "success",
        "answer": answer,
        "history": history,
        "total_messages": len(history)
    })