import BASE_URL from "./api";

export async function searchDocuments(query) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("query", query);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Search failed: ${res.status} ${text}`);
  }

  return res.json();
}







