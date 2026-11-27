import { useState } from 'react';
import './FlickShot.css';

const INITIAL_PHOTOS = [
  {
    id: 'sunset',
    title: 'Golden Gate Dusk',
    author: 'alex_2005',
    tags: ['bridge', 'sunset', 'sf'],
    faves: 34,
    gradient: 'linear-gradient(180deg, #f97316, #db2777 65%, #1e1b4b)',
  },
  {
    id: 'coffee',
    title: 'Morning Latte & PowerBook',
    author: 'design_kat',
    tags: ['coffee', 'apple', 'desk'],
    faves: 52,
    gradient: 'linear-gradient(135deg, #fde68a, #d97706 60%, #78350f)',
  },
  {
    id: 'neon',
    title: 'Downtown Arcade Glow',
    author: 'retro_sam',
    tags: ['neon', 'night', 'city'],
    faves: 27,
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1 60%, #0f172a)',
  },
  {
    id: 'vinyl',
    title: 'Weekend Record Crate',
    author: 'indie_jen',
    tags: ['music', 'vinyl', 'analog'],
    faves: 19,
    gradient: 'linear-gradient(135deg, #34d399, #059669 60%, #064e3b)',
  },
];

function FlickShot() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [activeTag, setActiveTag] = useState('all');

  const allTags = ['all', ...new Set(photos.flatMap((p) => p.tags))];
  const visible =
    activeTag === 'all'
      ? photos
      : photos.filter((p) => p.tags.includes(activeTag));

  const handleFave = (id) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, faves: p.faves + 1 } : p))
    );
  };

  return (
    <div className="fs-wrap">
      <div className="fs-filter-bar">
        <span>Filter by tag:</span>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={`fs-tag-btn ${activeTag === t ? 'is-active' : ''}`}
            onClick={() => setActiveTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="fs-grid">
        {visible.map((photo) => (
          <article key={photo.id} className="fs-card">
            <div className="fs-frame" style={{ background: photo.gradient }}>
              <span className="fs-reflection" aria-hidden="true" />
            </div>
            <div className="fs-card-body">
              <h3>{photo.title}</h3>
              <div className="fs-author">by {photo.author}</div>
              <div className="fs-card-footer">
                <div className="fs-photo-tags">
                  {photo.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="fs-fave-btn"
                  onClick={() => handleFave(photo.id)}
                >
                  ♥ {photo.faves}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FlickShot;
