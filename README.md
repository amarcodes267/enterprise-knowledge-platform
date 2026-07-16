# Enterprise Knowledge Intelligence Platform (RAG + Semantic Search)

---

## Overview

An AI-powered enterprise knowledge platform that lets users:
- Sign in with Google
- Upload PDF documents
- Perform semantic search over uploaded content
- Chat with an AI assistant grounded in retrieved document context (Retrieval-Augmented Generation / RAG)

This project is intended for teams that want a lightweight, end-to-end example of a RAG workflow using a React frontend and a Flask backend.

---

## Features

### 🔐 Authentication
- Google OAuth ID token verification (backend)
- JWT-based authentication (Bearer tokens)
- Protected API routes for upload/search/chat
- `/auth/me` user info endpoint

### 📄 PDF Upload
- Uploads PDF files (frontend → `POST /upload`)
- Extracts text from PDFs
- Splits text into chunks
- Generates embeddings for chunks
- Stores embeddings + chunk text in a Chroma vector database

### 🔍 Semantic Search
- Query via `GET /search?query=...`
- Embedding-based similarity search against stored chunks

### 🤖 AI Chat
- Chat via `POST /chat` with a `message`
- Combines:
  - conversation history (in-memory)
  - retrieved document context
- Generates responses using Google Gemini

### 🌐 Frontend Pages
- Login page (Google login)
- Home page
- Upload page
- Chat page
- Search page

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- `@react-oauth/google` (Google OAuth UI)

### Backend
- Python
- Flask
- Flask-CORS
- `python-dotenv`
- JWT handling via PyJWT (with a fallback token decoder if PyJWT is unavailable)

### Database / Vector Store
- ChromaDB (`chromadb.PersistentClient`)
- Stored locally under a `chroma_db` directory created relative to the runtime working directory

### AI / ML Libraries
- Sentence Transformers (`sentence-transformers`, model: `all-MiniLM-L6-v2`)
- Google Generative AI (`google-generativeai`, model: `gemini-2.5-flash`)
- PDF parsing: `pypdf` (`PdfReader`)

---

## Project Architecture

High-level flow:

```mermaid
flowchart TD
  U[User] -->|Google sign-in| FE[React Frontend]
  FE -->|POST /auth/google| BE[Flask Backend]
  BE -->|Access token (JWT)| FE

  U -->|Upload PDF| FE
  FE -->|POST /upload (Bearer)| BE
  BE --> PDF[Extract text from PDF]
  BE --> CHUNK[Chunk text]
  BE --> EMB[Generate embeddings]
  BE --> CHROMA[Store in ChromaDB]

  U -->|Ask a question| FE
  FE -->|POST /chat (Bearer)| BE
  BE --> SEARCH[Semantic search in Chroma]
  BE --> PROMPT[Build prompt from history + retrieved context]
  BE --> GEMINI[Generate response via Gemini]
  BE --> HIST[Append to in-memory chat history]
  BE --> FE
```

Notes based on implementation:
- Chat history is stored in-memory (`backend/services/chat_service.py`) and is not persisted in a database.
- Chroma is used for semantic retrieval; embeddings are generated at upload-time.

---

## Folder Structure

```text
.
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── chat.py
│   │   ├── health.py
│   │   ├── search.py
│   │   └── upload.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── chat_service.py
│   │   ├── chunk_service.py
│   │   ├── embedding_service.py
│   │   ├── llm_service.py
│   │   ├── pdf_service.py
│   │   ├── search_service.py
│   │   └── vector_db_service.py
│   ├── utils/
│   │   ├── auth_required.py
│   │   └── jwt_helper.py
│   └── uploads/
│       └── .gitkeep
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── utils/
│       └── assets/
├── docs/
└── tests/
```

---

## Installation

### 1) Backend
1. Create a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   ```
2. Activate it:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 2) Frontend
1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

---

## Environment Variables

### Backend
Required by the backend code:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
# or alternatively:
# SECRET_KEY=your_jwt_secret_here

# Optional:
JWT_ISSUER=enterprise-knowledge-platform
```

### Frontend
Used by the Vite build and runtime:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_BASE_URL=http://127.0.0.1:5000
```

---

## Running the Project Locally

To run the project locally, you need two separate terminal windows (one for the backend and one for the frontend).

### 1. Start the Backend
Open your first terminal and run:

```bash
# Make sure your virtual environment is activated!
cd backend
python app.py
```
*(The backend will start on http://localhost:5000)*

### 2. Start the Frontend
Open your second terminal and run:

```bash
cd frontend
npm run dev
```
*(The frontend will start on http://localhost:5173)*

Now, open **`http://localhost:5173`** in your browser. 
> **Note:** Do NOT use the deployed Firebase URL to test local changes, as browsers block requests from public websites to your local backend.

---

## Build Instructions (Frontend Production)

```bash
cd frontend
npm run build
```

---

## API Endpoints

Base URL: depends on your backend host/port (default Flask dev server).

### Health
- **GET** `/health`
  - **Auth required:** No
  - **Description:** Returns server status.

### Authentication
- **POST** `/auth/google`
  - **Auth required:** No
  - **Description:** Verifies a Google OAuth ID token and returns an access token.
  - **Request body:**
    ```json
    { "token": "<google_id_token>" }
    ```
  - **Response (success):**
    ```json
    {
      "success": true,
      "token": "<access_jwt>",
      "user": { "name": "...", "email": "...", "google_id": "...", "picture": "..." }
    }
    ```

- **GET** `/auth/me`
  - **Auth required:** Yes (Bearer)
  - **Description:** Returns the current user claims.
  - **Response (success):**
    ```json
    {
      "status": "success",
      "user": { "email": "...", "sub": "..." }
    }
    ```

- **POST** `/auth/logout`
  - **Auth required:** Yes (Bearer)
  - **Description:** Returns a success message. Token blacklist/revocation is not persisted by this project.

### Upload
- **POST** `/upload`
  - **Auth required:** Yes (Bearer)
  - **Description:** Uploads a PDF, extracts text, chunks it, generates embeddings, and stores them in Chroma.
  - **Request:** `multipart/form-data`
    - field: `file` (PDF)

### Search
- **GET** `/search?query=...`
  - **Auth required:** Yes (Bearer)
  - **Description:** Performs semantic search over stored chunks.

- **Response (success):**
  ```json
  {
    "status": "success",
    "query": "...",
    "answer": "...",
    "sources": ["chunk text", "chunk text"],
    "total_sources": 2
  }
  ```

### Chat
- **POST** `/chat`
  - **Auth required:** Yes (Bearer)
  - **Description:** Stores the user message, retrieves relevant document context, generates a Gemini response, stores the assistant message, and returns chat history.
  - **Request body:**
    ```json
    { "message": "Hello" }
    ```
  - **Response (success):**
    ```json
    {
      "status": "success",
      "answer": "...",
      "history": [ {"role": "user", "message": "..."}, {"role": "assistant", "message": "..."} ],
      "total_messages": 2
    }
    ```

---

## Authentication

### Google Login (Frontend → Backend)
1. Frontend uses `@react-oauth/google` to obtain a Google token.
2. Frontend calls `POST /auth/google` with `{ "token": "..." }`.
3. Backend verifies the Google token using `GOOGLE_CLIENT_ID`.
4. Backend returns a JWT access token.
5. Frontend stores the access token in `localStorage` under `access_token`.

### JWT (Bearer)
- Protected routes require the header:
  - `Authorization: Bearer <access_token>`
- JWT secret is configured by `JWT_SECRET` or `SECRET_KEY`.

---

## AI Pipeline (RAG) 

Based strictly on the implementation in `backend/services/*`.

1. **PDF Upload** (`POST /upload`)
   - Extract text from each PDF page (`pypdf.PdfReader`)
2. **Chunking**
   - Split text into chunks of size `500` characters
3. **Embeddings**
   - Create embeddings using `SentenceTransformer("all-MiniLM-L6-v2")`
4. **Vector Database Storage**
   - Store chunk texts + embeddings in Chroma collection `documents`
   - Chroma persistent data directory is `./chroma_db` relative to runtime working directory
5. **Semantic Search** (`GET /search` and `POST /chat`)
   - Embed the query using the same embedding model
   - Retrieve top `top_k=3` closest chunks
6. **LLM Response Generation** (`gemini-2.5-flash`)
   - Prompt includes:
     - in-memory conversation history
     - retrieved document context
     - current user question
   - If the context does not contain the answer, the assistant is instructed to respond with:
     - `I could not find the answer in the uploaded documents.`

---

## Screenshots

Placeholders:
- ![Login screenshot](docs/screenshots/login.png)
- ![Upload screenshot](docs/screenshots/upload.png)
- ![Search screenshot](docs/screenshots/search.png)
- ![Chat screenshot](docs/screenshots/chat.png)

---

## Future Improvements

Realistic enhancements based on the current implementation:
- Persist chat history per user/document instead of in-memory only
- Add refresh-token support on the frontend (currently `/auth/google` returns only `token` and `/auth/google` does not expose `refresh_token` in the backend response)
- Add safer server-side file storage and cleanup strategy for uploaded PDFs
- Improve chunking strategy (e.g., overlap, token-based chunking) beyond fixed `500` character chunks
- Add token revocation/blacklisting if logout should fully invalidate tokens

---

## Deployment

### Backend prerequisites
- Set required environment variables (at minimum):
  - `GOOGLE_CLIENT_ID`
  - `GEMINI_API_KEY`
  - `JWT_SECRET` (or `SECRET_KEY`)

### Local runtime behavior to consider
- Chroma data persists to `chroma_db` in the process working directory.

### Frontend prerequisites
- Set:
  - `VITE_GOOGLE_CLIENT_ID`
  - `VITE_API_BASE_URL` to point to the deployed backend

---

## Troubleshooting

- **401 Unauthorized / Missing Bearer token**
  - Ensure frontend sends `Authorization: Bearer <access_token>`
- **`GOOGLE_CLIENT_ID is not configured`**
  - Configure `GOOGLE_CLIENT_ID` in the backend environment
- **Unable to generate response**
  - Check `GEMINI_API_KEY` and Gemini connectivity
- **Chroma collection is unavailable**
  - Ensure Chroma dependencies are installed and the server can create/write to the `chroma_db` directory
- **Embedding model errors**
  - Ensure `sentence-transformers` model downloads are permitted and compatible

---

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-change
   ```
3. Commit your changes
4. Open a Pull Request

---

## License

MIT License (not explicitly found in the inspected files; if your repo uses a different license, update this section accordingly). 

