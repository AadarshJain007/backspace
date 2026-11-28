import { useState } from 'react';

const VIDEOS = [
  {
    id: 'v1',
    title: 'How CSS Grid & Variable Fonts Changed Web Layout',
    channel: 'Frontend Craft',
    category: 'Design',
    views: '240K views · 3 days ago',
    color: '#6366f1',
    likes: 8400,
    liked: false,
    subscribed: false,
    comments: [
      { id: 1, user: 'Maya', text: 'Dark mode + CSS Grid made 2020 sites feel so clean.' },
    ],
  },
  {
    id: 'v2',
    title: 'Lo-Fi Beats to Code From Home To (2020 Mix)',
    channel: 'ChillWave FM',
    category: 'Lo-fi',
    views: '1.2M views · 2 months ago',
    color: '#ec4899',
    likes: 42100,
    liked: false,
    subscribed: true,
    comments: [],
  },
  {
    id: 'v3',
    title: 'Building Zero-Latency Web Apps with HTTP/2 & Vite',
    channel: 'EdgeDev',
    category: 'Tech',
    views: '98K views · 1 week ago',
    color: '#10b981',
    likes: 3100,
    liked: false,
    subscribed: false,
    comments: [],
  },
];

function Video2020() {
  const [videos, setVideos] = useState(VIDEOS);
  const [activeId, setActiveId] = useState('v1');
  const [category, setCategory] = useState('All');
  const [playing, setPlaying] = useState(false);
  const [commentText, setCommentText] = useState('');

  const active = videos.find((v) => v.id === activeId) || videos[0];
  const filtered =
    category === 'All' ? videos : videos.filter((v) => v.category === category);

  const toggleLike = () => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === active.id
          ? { ...v, liked: !v.liked, likes: v.liked ? v.likes - 1 : v.likes + 1 }
          : v
      )
    );
  };

  const toggleSub = () => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === active.id ? { ...v, subscribed: !v.subscribed } : v
      )
    );
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setVideos((prev) =>
      prev.map((v) =>
        v.id === active.id
          ? {
              ...v,
              comments: [
                { id: Date.now(), user: 'You', text: commentText.trim() },
                ...v.comments,
              ],
            }
          : v
      )
    );
    setCommentText('');
  };

  return (
    <div className="e20-video-layout">
      <div className="e20-video-main">
        <div
          className="e20-player"
          style={{
            background: `radial-gradient(circle at 25% 25%, ${active.color}, #09090b 80%)`,
          }}
        >
          <span className="e20-chip">{active.category}</span>
          <h3>{active.title}</h3>
          <button
            type="button"
            className="e20-play-btn"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? '❚❚ Pause Stream' : '▶ Play 1080p60'}
          </button>
        </div>

        <div className="e20-video-bar">
          <div>
            <h2>{active.title}</h2>
            <div className="e20-muted">
              {active.channel} · {active.views}
            </div>
          </div>
          <div className="e20-video-actions">
            <button
              type="button"
              className={`e20-pill-btn ${active.liked ? 'is-active' : ''}`}
              onClick={toggleLike}
            >
              👍 {active.likes.toLocaleString()}
            </button>
            <button
              type="button"
              className={`e20-pill-btn ${active.subscribed ? 'is-active' : ''}`}
              onClick={toggleSub}
            >
              {active.subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </div>
        </div>

        <div className="e20-card">
          <h4>Comments ({active.comments.length})</h4>
          <form className="e20-row-form" onSubmit={addComment}>
            <input
              type="text"
              className="e20-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a public comment..."
            />
            <button type="submit" className="e20-accent-btn">
              Comment
            </button>
          </form>
          <div className="e20-comment-list">
            {active.comments.map((c) => (
              <div key={c.id} className="e20-comment">
                <strong>{c.user}</strong>: {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="e20-video-side">
        <div className="e20-chips">
          {['All', 'Design', 'Tech', 'Lo-fi'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`e20-chip-btn ${category === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="e20-queue">
          {filtered.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`e20-queue-item ${v.id === active.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveId(v.id);
                setPlaying(false);
              }}
            >
              <span className="e20-queue-thumb" style={{ background: v.color }}>
                ▶
              </span>
              <span>
                <strong>{v.title}</strong>
                <small>{v.channel}</small>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Video2020;
