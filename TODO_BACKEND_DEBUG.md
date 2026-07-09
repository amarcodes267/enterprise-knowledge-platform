# Backend debug / fix checklist

- [ ] Fix backend runtime breakers (upload import, search->llm context mismatch, search response fields)
- [ ] Fix Chroma storage correctness (unique ids per chunk; optional persistence directory)
- [ ] Add minimal robustness (ensure uploads dir exists; handle missing filenames)
- [ ] Run backend smoke test (python backend/app.py) and hit /health, /upload, /search, /chat

