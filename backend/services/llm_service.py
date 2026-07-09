import os

import google.generativeai as genai
from dotenv import load_dotenv

from services.chat_service import format_chat_history

load_dotenv()

# Configure Gemini API from environment variable
api_key = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


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

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception:
        return "Unable to generate response"

