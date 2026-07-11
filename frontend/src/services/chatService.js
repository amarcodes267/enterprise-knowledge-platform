import BASE_URL from "./api";
import { getAccessToken } from "../utils/auth";

async function sendMessage(message) {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  const data = await response.json().catch(() => ({}));
  return data;
}

export default sendMessage;


