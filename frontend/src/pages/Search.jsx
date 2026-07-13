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
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>Search Documents</h1>
          <p>Find relevant answers and sources across your uploaded enterprise documents.</p>
        </header>

        <div className="glass">
          <div className="search-row">
            <input
              className="input"
              type="text"
              value={query}
              placeholder="Enter query..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error ? <div className="alert alert-danger">{error}</div> : null}

          {!loading && results.length === 0 && query.trim() ? (
            <div className="empty">No results found.</div>
          ) : null}

          {results.length > 0 ? (
            <div className="results">
              <h2>Results</h2>
              <div className="result-list">
                {results.map((src, idx) => (
                  <div className="result-item" key={idx}>
                    <pre>{src}</pre>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Search;


