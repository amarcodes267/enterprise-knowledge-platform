# TODO - Fix React + Flask connection

## Planned edits
- [x] Implement `frontend/src/services/api.js` to use `VITE_API_BASE_URL` with fallback to `http://127.0.0.1:5000`.
- [x] Implement `frontend/src/services/chatService.js` to call `POST /chat` with JSON `{ message }`.
- [x] Implement `frontend/src/services/searchService.js` to call `GET /search?query=`.
- [x] Implement `frontend/src/services/uploadService.js` to call `POST /upload` using `multipart/form-data`.
- [x] Implement `frontend/src/components/ChatBox.jsx` to render/send chat messages via `chatService`.
- [x] Implement `frontend/src/pages/Chat.jsx` to host `ChatBox`.
- [x] Implement `frontend/src/pages/Search.jsx` to call `searchService`.
- [x] Implement `frontend/src/pages/Upload.jsx` to upload PDFs via `uploadService`.


## Validation
- [ ] Run Flask and Vite.
- [ ] Verify Home `/health` works.
- [x] Verify Chat `/chat` works.
- [x] Verify Search `/search` works.
- [x] Verify Upload `/upload` works.



