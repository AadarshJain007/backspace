import { useEffect, useState } from 'react';
import './Era2015.css';

const INITIAL_ITEMS = [
  {
    id: 'feed-1',
    section: 'feed',
    title: 'Why Material Design Is Replacing Skeuomorphism',
    author: 'Elena Vance · 2h ago',
    summary:
      'Paper-inspired elevation, bold primary colors, and meaningful motion are unifying web and Android interfaces.',
    body: 'By treating pixels as digital ink on layered sheets of paper, 2015 interfaces eliminate faux leather and glossy bevels in favor of clarity, generous whitespace, and responsive grids.',
    color: '#2196f3',
    likes: 128,
    liked: false,
    saved: false,
  },
  {
    id: 'feed-2',
    section: 'feed',
    title: 'Building Component-Driven SPAs with ES6 and Flexbox',
    author: 'Marcus Reed · 5h ago',
    summary:
      'Single-page applications now hydrate views client-side without full page reloads, powered by Flexbox layouts.',
    body: 'With Flexbox replacing fragile floats and ES6 modules organizing UI components, frontend teams ship fast, mobile-first experiences from a single codebase.',
    color: '#009688',
    likes: 94,
    liked: false,
    saved: false,
  },
  {
    id: 'gallery-1',
    section: 'gallery',
    title: 'Minimalist Workspace Flatlay',
    author: 'Studio_2015',
    summary: 'Clean aluminum laptop, notebook, and pour-over coffee.',
    body: 'Shot on a mirrorless camera and shared in a responsive Material card grid with zero decorative borders.',
    color: '#3f51b5',
    likes: 215,
    liked: false,
    saved: false,
  },
  {
    id: 'gallery-2',
    section: 'gallery',
    title: 'Pacific Coast Highway at Dusk',
    author: 'NomadLens',
    summary: 'Vibrant flat horizon tones and crisp aspect-ratio cards.',
    body: 'Mobile-first photo streams prioritize edge-to-edge imagery and quick floating-action interactions.',
    color: '#ff5722',
    likes: 173,
    liked: false,
    saved: false,
  },
  {
    id: 'video-1',
    section: 'videos',
    title: 'Keynote: Designing for 60fps Mobile Web',
    author: 'WebConf 2015 · 14:20',
    summary: 'How hardware-accelerated transforms keep card drawers smooth on phones.',
    body: 'A deep dive into compositor layers, touch-target sizing (48dp), and avoiding layout thrashing on mid-range smartphones.',
    color: '#e91e63',
    likes: 310,
    liked: false,
    saved: false,
  },
  {
    id: 'video-2',
    section: 'videos',
    title: 'React + Flexbox Layout Walkthrough',
    author: 'DevCast · 09:45',
    summary: 'Refactoring a 2010 table/float layout into responsive Material cards.',
    body: 'Step-by-step demonstration of building reusable cards, hamburger menus, and detail routes.',
    color: '#673ab7',
    likes: 189,
    liked: false,
    saved: false,
  },
];

const SECTIONS = [
  { id: 'feed', label: 'Social Feed' },
  { id: 'gallery', label: 'Image Gallery' },
  { id: 'videos', label: 'Video Discovery' },
];

function Era2015({ isLoading, onUrlChange }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [section, setSection] = useState('feed');
  const [selectedId, setSelectedId] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedId) || null;
  const visibleItems = items.filter((item) => item.section === section);
  const savedCount = items.filter((item) => item.saved).length;

  useEffect(() => {
    if (!onUrlChange) return;
    if (selectedItem) {
      onUrlChange(`https://pulse2015.app/${selectedItem.section}/${selectedItem.id}`);
    } else {
      onUrlChange(`https://pulse2015.app/${section}`);
    }
  }, [section, selectedItem, onUrlChange]);

  const toggleLike = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const toggleSave = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  if (isLoading) {
    return (
      <div className="m15-root m15-loading">
        Hydrating SPA bundle...
      </div>
    );
  }

  return (
    <div className="m15-root">
      <div className="m15-preview-bar">
        <span className="m15-preview-label">
          VIEWPORT MODE · Saved ({savedCount})
        </span>
        <div className="m15-preview-switches">
          <button
            type="button"
            className={`m15-mode-btn ${previewMode === 'desktop' ? 'is-active' : ''}`}
            onClick={() => setPreviewMode('desktop')}
          >
            Desktop
          </button>
          <button
            type="button"
            className={`m15-mode-btn ${previewMode === 'mobile' ? 'is-active' : ''}`}
            onClick={() => setPreviewMode('mobile')}
          >
            Mobile (360px)
          </button>
        </div>
      </div>

      <div className={`m15-frame ${previewMode === 'mobile' ? 'is-mobile' : ''}`}>
        <header className="m15-appbar">
          <div className="m15-appbar-left">
            <button
              type="button"
              className="m15-hamburger"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
            <span className="m15-brand">Pulse</span>
          </div>

          <nav
            className={`m15-nav ${drawerOpen ? 'is-open' : ''}`}
            aria-label="2015 sections"
          >
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                className={`m15-nav-tab ${section === sec.id && !selectedItem ? 'is-active' : ''}`}
                onClick={() => {
                  setSection(sec.id);
                  setSelectedId(null);
                  setDrawerOpen(false);
                }}
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="m15-body">
          {selectedItem ? (
            <article className="m15-detail-card">
              <button
                type="button"
                className="m15-back-btn"
                onClick={() => setSelectedId(null)}
              >
                ← Back to {SECTIONS.find((s) => s.id === selectedItem.section)?.label}
              </button>

              <div
                className="m15-detail-hero"
                style={{ backgroundColor: selectedItem.color }}
              >
                {selectedItem.section === 'videos' && (
                  <span className="m15-play-fab">▶</span>
                )}
              </div>

              <div className="m15-detail-content">
                <h2>{selectedItem.title}</h2>
                <div className="m15-meta">{selectedItem.author}</div>
                <p>{selectedItem.body}</p>

                <div className="m15-card-actions">
                  <button
                    type="button"
                    className={`m15-flat-btn ${selectedItem.liked ? 'is-active' : ''}`}
                    onClick={() => toggleLike(selectedItem.id)}
                  >
                    ♥ LIKE ({selectedItem.likes})
                  </button>
                  <button
                    type="button"
                    className={`m15-flat-btn ${selectedItem.saved ? 'is-active' : ''}`}
                    onClick={() => toggleSave(selectedItem.id)}
                  >
                    {selectedItem.saved ? '★ SAVED' : '☆ SAVE'}
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div className="m15-card-grid">
              {visibleItems.map((item) => (
                <article key={item.id} className="m15-card">
                  <button
                    type="button"
                    className="m15-card-media"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setSelectedId(item.id)}
                  >
                    {item.section === 'videos' && (
                      <span className="m15-play-fab">▶</span>
                    )}
                  </button>

                  <div className="m15-card-body">
                    <button
                      type="button"
                      className="m15-card-title"
                      onClick={() => setSelectedId(item.id)}
                    >
                      {item.title}
                    </button>
                    <div className="m15-meta">{item.author}</div>
                    <p className="m15-summary">{item.summary}</p>
                  </div>

                  <div className="m15-card-actions">
                    <button
                      type="button"
                      className={`m15-flat-btn ${item.liked ? 'is-active' : ''}`}
                      onClick={() => toggleLike(item.id)}
                    >
                      ♥ {item.likes}
                    </button>
                    <button
                      type="button"
                      className={`m15-flat-btn ${item.saved ? 'is-active' : ''}`}
                      onClick={() => toggleSave(item.id)}
                    >
                      {item.saved ? 'SAVED' : 'SAVE'}
                    </button>
                    <button
                      type="button"
                      className="m15-flat-btn m15-open-btn"
                      onClick={() => setSelectedId(item.id)}
                    >
                      OPEN
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Era2015;
