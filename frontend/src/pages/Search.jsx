import { useState } from "react";
import { searchDocuments } from "../services/searchService";
import "../styles/Search.css";

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
      setError("Unable to retrieve search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">

      <div className="container">

        <div className="search-header">

          <span className="page-badge">
            Enterprise Semantic Search
          </span>

          <h1>
            AI Powered
            <span> Document Search</span>
          </h1>

          <p>
            Search across your enterprise knowledge base using semantic
            retrieval powered by vector embeddings and Retrieval-Augmented
            Generation.
          </p>

        </div>

        <div className="search-card">

          <div className="search-box">

            <input
              type="text"
              value={query}
              placeholder="Search your enterprise knowledge..."
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>

          </div>

          {error && (
            <div className="search-error">
              {error}
            </div>
          )}

          {!loading && results.length === 0 && query.trim() && (
            <div className="search-empty">
              No matching documents found.
            </div>
          )}

          {results.length > 0 && (

            <div className="results-section">

              <h2>Search Results</h2>

              <div className="results-grid">

                {results.map((item, index) => (

                  <div className="result-card" key={index}>

                    <div className="result-top">

                      <span className="result-number">
                        #{index + 1}
                      </span>

                      <span className="confidence">
                        Semantic Match
                      </span>

                    </div>

                    <pre>{item}</pre>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Search;