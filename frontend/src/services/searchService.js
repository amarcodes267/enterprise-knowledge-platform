import BASE_URL from "./api";
import { getAccessToken } from "../utils/auth";

export async function searchDocuments(query) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("query", query);

  const token = getAccessToken();

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Search failed: ${res.status} ${text}`);
  }

  return res.json();
}



