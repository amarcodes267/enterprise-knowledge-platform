// When frontend + backend are served from the same Render domain,
// use same-origin relative URLs.
// You can still override with VITE_API_BASE_URL if needed.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default BASE_URL;





