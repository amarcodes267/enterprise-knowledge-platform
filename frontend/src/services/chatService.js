import BASE_URL from "./api";

export async function sendChatMessage(message) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat failed: ${res.status} ${text}`);
  }

  return res.json();
}

