import BASE_URL from "./api";

async function sendMessage(message) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  const data = await response.json().catch(() => ({}));
  return data;
}

export default sendMessage;





