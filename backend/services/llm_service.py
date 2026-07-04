import os
import google.generativeai as genai

# Configure Gemini API from environment variable
api_key = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_answer(query, context):

    # Convert list of chunks into readable text
    formatted_context = "\n\n".join(context)

    prompt = f"""
You are an AI assistant for an Enterprise Knowledge Platform.

Your job is to answer the user's question using ONLY the information provided in the context.

Rules:
1. Do not use outside knowledge.
2. Do not make up information.
3. If the answer is not found in the context, reply:
   "I could not find the answer in the uploaded documents."
4. Keep the answer clear and concise.
5. Use bullet points if appropriate.

Context:
{formatted_context}

Question:
{query}

Answer:
"""

    response = model.generate_content(prompt)

    return response.text