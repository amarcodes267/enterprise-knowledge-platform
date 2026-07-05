from flask import Blueprint, request, jsonify

from services.chat_service import (
    store_message,
    get_chat_history
)

from services.search_service import search_documents
from services.llm_service import generate_answer

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "status": "error",
            "message": "Message is required"
        }), 400

    message = data["message"]

    # Store user message
    store_message("user", message)

    # Search documents
    results = search_documents(message)

    # Generate AI answer
    answer = generate_answer(message, results)

    # Store assistant response
    store_message("assistant", answer)

    history = get_chat_history()

    return jsonify({
        "status": "success",
        "answer": answer,
        "history": history,
        "total_messages": len(history)
    })