import { useState } from "react";
import { searchDocuments } from "../services/searchService";

function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError("");

    try {
      const data = await searchDocuments(q);
      setResult(data);
    } catch (e) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Search</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search query..."
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading || query.trim().length === 0}
          style={{ padding: "10px 14px", borderRadius: 6, border: 0, background: "#111", color: "#fff" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error ? <div style={{ color: "#b00020" }}>{error}</div> : null}

      {result ? (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Answer</div>
          <div style={{ whiteSpace: "pre-wrap", marginBottom: 12 }}>{result.answer}</div>

          <div style={{ fontWeight: 700, marginBottom: 6 }}>Sources</div>
          <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8, overflow: "auto" }}>
            {JSON.stringify(result.sources, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

export default Search;

