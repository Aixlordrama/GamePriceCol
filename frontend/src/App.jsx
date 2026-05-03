import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}`);
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Failed to fetch');
      setResults(json.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header>
        <h1>Zipa Gaming Hub</h1>
        <p>Compare Colombian retail prices and historical stock for video games.</p>
      </header>

      <section className="search-panel">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a game like 'GTA VI'"
        />
        <button onClick={search} disabled={loading}>
          {loading ? 'Searching...' : 'Search prices'}
        </button>
      </section>

      {error && <div className="error-box">{error}</div>}

      <section className="results-panel">
        <h2>Results</h2>
        {results.length === 0 ? (
          <p>No results yet. Search for a game to view prices.</p>
        ) : (
          <div className="results-grid">
            {results.map((item) => (
              <article key={item.id} className="result-card">
                <div className="result-header">
                  <span className="retailer">{item.retailer}</span>
                  <span className={item.stock_status ? 'stock in-stock' : 'stock out-of-stock'}>
                    {item.stock_status ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <h3>{item.game_name}</h3>
                <p className="price">COP {Number(item.price).toLocaleString('es-CO')}</p>
                <p className="date">{new Date(item.scraped_at).toLocaleString()}</p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  Go to offer
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
