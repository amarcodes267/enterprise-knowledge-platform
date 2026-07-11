import { useState } from "react";

import { searchDocuments } from "../services/searchService";

function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setError("");
    setResults([]);

    const q = query.trim();
    if (!q) {
      setError("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);
      const res = await searchDocuments(q);

      if (res?.status === "success") {
        setResults(Array.isArray(res.sources) ? res.sources : []);
      } else {
        setError(res?.message || "Search failed.");
      }
    } catch (e) {
      console.error(e);
      setError("Unable to get search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Search Documents</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          value={query}
          placeholder="Enter query..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error ? <div style={{ color: "#b00020" }}>{error}</div> : null}

      {!loading && results.length === 0 && query.trim() ? (
        <div style={{ color: "#666", marginTop: 12 }}>No results found.</div>
      ) : null}

      {results.length > 0 ? (
        <div style={{ marginTop: 16 }}>
          <h2>Results</h2>
          <ul>
            {results.map((src, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{src}</pre>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Search;

