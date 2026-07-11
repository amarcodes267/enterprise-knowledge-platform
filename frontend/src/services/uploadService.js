import BASE_URL from "./api";
import { getAccessToken } from "../utils/auth";

async function uploadPDF(file) {
  const token = getAccessToken();

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  return data;
}

export default uploadPDF;


