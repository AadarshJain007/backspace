import { useState } from 'react';

const CATALOG = [
  {
    row: 'Trending Originals',
    items: [
      { id: 's1', title: 'Hypertext Horizon', tag: 'Docuseries · 2020', color: '#4f46e5' },
      { id: 's2', title: 'Silicon & Coffee', tag: 'Drama · 8 Episodes', color: '#0ea5e9' },
      { id: 's3', title: 'Packet Loss', tag: 'Sci-Fi · 4K HDR', color: '#db2777' },
    ],
  },
  {
    row: 'Design & Tech Picks',
    items: [
      { id: 's4', title: 'Grid Systems', tag: 'Documentary · 1h 18m', color: '#059669' },
      { id: 's5', title: 'The Browser Wars', tag: 'Limited Series', color: '#d97706' },
      { id: 's6', title: 'Latency Zero', tag: 'Tech Film', color: '#7c3aed' },
    ],
  },
];

function Stream2020() {
  const [myList, setMyList] = useState(['s1']);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);

  const toggleList = (id) => {
    setMyList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="e20-stream">
      <div className="e20-hero-banner">
        <span className="e20-hero-kicker">STREAMING ORIGINAL · 4K DOLBY</span>
        <h2>The Web at 25</h2>
        <p>
          From basement servers and 28.8k modems to global streaming—inside the
          protocols that connected the world.
        </p>
        <div className="e20-hero-actions">
          <button
            type="button"
            className="e20-accent-btn"
            onClick={() => setFeaturedPlaying((p) => !p)}
          >
            {featuredPlaying ? '❚❚ Playing Preview' : '▶ Watch Now'}
          </button>
          <button
            type="button"
            className="e20-pill-btn"
            onClick={() => toggleList('featured')}
          >
            {myList.includes('featured') ? '✓ In My List' : '+ My List'}
          </button>
        </div>
      </div>

      {CATALOG.map((group) => (
        <section key={group.row} className="e20-stream-row">
          <h3>{group.row}</h3>
          <div className="e20-poster-grid">
            {group.items.map((item) => {
              const saved = myList.includes(item.id);
              return (
                <article key={item.id} className="e20-poster-card">
                  <div
                    className="e20-poster-art"
                    style={{
                      background: `linear-gradient(155deg, ${item.color}, #09090b)`,
                    }}
                  >
                    <strong>{item.title}</strong>
                  </div>
                  <div className="e20-poster-foot">
                    <span className="e20-muted">{item.tag}</span>
                    <button
                      type="button"
                      className={`e20-mini-btn ${saved ? 'is-active' : ''}`}
                      onClick={() => toggleList(item.id)}
                    >
                      {saved ? '✓ Saved' : '+ List'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Stream2020;
