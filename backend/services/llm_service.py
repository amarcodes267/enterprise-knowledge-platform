import os
import google.generativeai as genai

# Configure Gemini API from environment variable
api_key = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_answer(query, context):

    prompt = f"""
You are an AI assistant.

Use ONLY the information provided in the context below to answer the question.

If the answer is not available in the context, reply:
"I could not find the answer in the uploaded documents."

Context:
{context}

Question:
{query}

Answer:
"""

    response = model.generate_content(prompt)

    return response.text