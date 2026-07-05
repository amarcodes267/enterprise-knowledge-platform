import os
import google.generativeai as genai
from services.chat_service import format_chat_history

# Configure Gemini API from environment variable
api_key = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_answer(query, context):
    if isinstance(context, str):
        formatted_context = context
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

    response = model.generate_content(prompt)

    return response.text