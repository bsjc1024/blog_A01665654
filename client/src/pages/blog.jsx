import { useState, useEffect } from 'react'
import { CardList } from '../components/Cards'
import { Link } from 'react-router'

const API = import.meta.env.VITE_API_URL;

function Blog() {
  const [filteredText, setFilteredText] = useState("")
  const [entries, setEntries] = useState([])

  useEffect(() => {
    fetch(`${API}/posts`)
      .then((res) => res.json())
      .then((posts) => setEntries(posts));
  }, []);

  function handleChange(e) {
    setFilteredText(e.target.value);
  }

  const filtered = entries.filter(entry =>
    entry.title.toLowerCase().includes(filteredText.toLowerCase())
  );

  return (
    <>
      <h1>Mi blog de perros</h1>
      <div className="filter">
        <p>Buscar:</p>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Escribe una raza"
            value={filteredText}
            onChange={handleChange}
          />
          {filteredText && (
            <button className="clear-btn" onClick={() => setFilteredText("")}>✕</button>
          )}
        </div>
        {filteredText && (
          <p className="results-count">{filtered.length} resultado(s)</p>
        )}
      </div>
      <CardList entries={filtered} filteredText={filteredText} />
      <Link to="/blog/new">
        <button>Crear Post</button>
      </Link>
    </>
  )
}

export default Blog