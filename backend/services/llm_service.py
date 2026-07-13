import os

"""LLM service (Gemini).

This module is imported at Flask startup.
In some local environments, optional google generative language dependencies may be missing,
causing import-time failure.

To ensure the server can start on localhost, we lazy-load Gemini and fail gracefully.
"""

from dotenv import load_dotenv

from backend.services.chat_service import format_chat_history

load_dotenv()

_model = None
_model_error: str | None = None


def _get_model():
    global _model, _model_error
    if _model is not None or _model_error is not None:
        return _model

    try:
        import google.generativeai as genai  


        api_key = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
        genai.configure(api_key=api_key)
        _model = genai.GenerativeModel("gemini-2.5-flash")
        return _model
    except Exception as e:
        _model_error = str(e)
        _model = None
        return None


def generate_answer(query, context):
    """Generate an answer based on chat history and retrieved document context.

    search_documents() returns a dict: {status, results, metadatas, distances}
    where `results` is a list of chunk texts.
    """

    if isinstance(context, str):
        formatted_context = context
    elif isinstance(context, dict):
        chunks = context.get("results", [])
        formatted_context = "\n\n".join(chunks) if isinstance(chunks, list) else str(chunks)
    else:
        formatted_context = "\n\n".join(context)

    formatted_history = format_chat_history()

    prompt = f"""
You are an AI assistant for an Enterprise Knowledge Platform.

Your job is to answer the user's question using the conversation history and the document context.

Rules:
1. Use the conversation history to understand previous messages.
2. Use ONLY the provided document context to answer factual questions.
3. Do not make up information.
4. If the answer is not found in the context, reply:
"I could not find the answer in the uploaded documents."
5. Keep the answer clear and concise.

Conversation History:
{formatted_history}

Document Context:
{formatted_context}

Current Question:
{query}

Answer:
"""

    model = _get_model()
    if model is None:
        return "Unable to generate response"

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception:
        return "Unable to generate response"

