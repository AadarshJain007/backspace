import { useEffect, useState } from 'react';
import './Era2026.css';

const SEARCH_KB = [
  {
    query: 'How did web layouts evolve from 1995 to 2026?',
    overview:
      'Early 1995 sites relied on unstyled HTML documents and table hacks. By 2005–2015, CSS2, AJAX, and Flexbox enabled responsive single-page apps, while 2026 blends container queries, view transitions, and local-first state.',
    sources: [
      { title: 'MDN: Container Queries & Modern CSS', domain: 'developer.mozilla.org' },
      { title: 'Web History Archive (1995–2026)', domain: 'backspace.archive' },
    ],
  },
  {
    query: 'What makes a modern web app feel instant?',
    overview:
      'Local-first optimistic updates, edge caching over HTTP/3, and native View Transitions eliminate loading spinners and page flicker.',
    sources: [
      { title: 'Local-First Software Principles', domain: 'inkandswitch.com' },
      { title: 'HTTP/3 & QUIC Performance Notes', domain: 'web.dev' },
    ],
  },
];

const ARTICLES = [
  {
    id: 'a1',
    tag: 'Architecture',
    readTime: '4 min read',
    title: 'Designing Calm Interfaces After the Dashboard Boom',
    excerpt:
      'Contemporary web software trades noisy chrome and metric overload for quiet typography, clear hierarchy, and fast keyboard flow.',
    saved: false,
    claps: 42,
  },
  {
    id: 'a2',
    tag: 'Standards',
    readTime: '6 min read',
    title: 'Container Queries & View Transitions in Everyday Apps',
    excerpt:
      'Components now adapt to their own container width rather than guessing global viewport breakpoints.',
    saved: true,
    claps: 67,
  },
];

const INITIAL_NOTES = [
  { id: 1, tag: 'Design', text: 'Use warm neutral surfaces with crisp hairline borders.' },
  { id: 2, tag: 'Perf', text: 'Keep interactions optimistic and local-first.' },
];

function Era2026({ isLoading, onUrlChange }) {
  const [tab, setTab] = useState('search');
  const [theme, setTheme] = useState('light');
  const [searchInput, setSearchInput] = useState(SEARCH_KB[0].query);
  const [activeQuery, setActiveQuery] = useState(SEARCH_KB[0].query);
  const [articles, setArticles] = useState(ARTICLES);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [noteInput, setNoteInput] = useState('');
  const [noteTag, setNoteTag] = useState('Idea');

  useEffect(() => {
    if (!onUrlChange) return;
    onUrlChange(`https://backspace.archive/2026/${tab}`);
  }, [tab, onUrlChange]);

  const matchedOverview =
    SEARCH_KB.find((item) =>
      activeQuery.toLowerCase().includes('instant')
        ? item.query.includes('instant')
        : item.query.includes('1995')
    ) || SEARCH_KB[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveQuery(searchInput.trim());
  };

  const toggleSave = (id) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, saved: !a.saved } : a))
    );
  };

  const clapArticle = (id) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, claps: a.claps + 1 } : a))
    );
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setNotes((prev) => [
      { id: Date.now(), tag: noteTag, text: noteInput.trim() },
      ...prev,
    ]);
    setNoteInput('');
  };

  if (isLoading) {
    return (
      <div className={`e26-root is-${theme} e26-loading`}>
        Syncing edge canvas...
      </div>
    );
  }

  return (
    <div className={`e26-root is-${theme}`}>
      <header className="e26-header">
        <div className="e26-brand">Horizon 2026</div>
        <nav className="e26-nav" aria-label="2026 surfaces">
          <button
            type="button"
            className={`e26-tab ${tab === 'search' ? 'is-active' : ''}`}
            onClick={() => setTab('search')}
          >
            Search
          </button>
          <button
            type="button"
            className={`e26-tab ${tab === 'journal' ? 'is-active' : ''}`}
            onClick={() => setTab('journal')}
          >
            Reader
          </button>
          <button
            type="button"
            className={`e26-tab ${tab === 'canvas' ? 'is-active' : ''}`}
            onClick={() => setTab('canvas')}
          >
            Notes App
          </button>
        </nav>

        <button
          type="button"
          className="e26-theme-btn"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        >
          {theme === 'light' ? '☾ Dark' : '☀ Light'}
        </button>
      </header>

      {tab === 'search' && (
        <div className="e26-search-wrap">
          <form className="e26-search-box" onSubmit={handleSearch}>
            <input
              type="text"
              className="e26-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ask anything or search the web..."
            />
            <button type="submit" className="e26-primary-btn">
              Ask
            </button>
          </form>

          <div className="e26-suggestions">
            {SEARCH_KB.map((item) => (
              <button
                key={item.query}
                type="button"
                className="e26-chip"
                onClick={() => {
                  setSearchInput(item.query);
                  setActiveQuery(item.query);
                }}
              >
                {item.query}
              </button>
            ))}
          </div>

          <div className="e26-overview-card">
            <div className="e26-kicker">SYNTHESIZED ANSWER · {activeQuery}</div>
            <p>{matchedOverview.overview}</p>
            <div className="e26-sources">
              {matchedOverview.sources.map((src) => (
                <div key={src.domain} className="e26-source-pill">
                  <strong>{src.title}</strong>
                  <span>{src.domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'journal' && (
        <div className="e26-articles">
          {articles.map((article) => (
            <article key={article.id} className="e26-article-card">
              <div className="e26-article-meta">
                <span>{article.tag}</span>
                <span>{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="e26-article-actions">
                <button
                  type="button"
                  className="e26-chip"
                  onClick={() => clapArticle(article.id)}
                >
                  👏 {article.claps}
                </button>
                <button
                  type="button"
                  className={`e26-chip ${article.saved ? 'is-active' : ''}`}
                  onClick={() => toggleSave(article.id)}
                >
                  {article.saved ? 'Saved ✓' : 'Bookmark'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'canvas' && (
        <div className="e26-canvas">
          <form className="e26-note-form" onSubmit={addNote}>
            <select
              className="e26-select"
              value={noteTag}
              onChange={(e) => setNoteTag(e.target.value)}
              aria-label="Note tag"
            >
              <option value="Idea">Idea</option>
              <option value="Design">Design</option>
              <option value="Perf">Perf</option>
            </select>
            <input
              type="text"
              className="e26-input"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Capture a quick note locally..."
              required
            />
            <button type="submit" className="e26-primary-btn">
              Add
            </button>
          </form>

          <div className="e26-notes-grid">
            {notes.map((n) => (
              <div key={n.id} className="e26-note-card">
                <span className="e26-note-tag">{n.tag}</span>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Era2026;
