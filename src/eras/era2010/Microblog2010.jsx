import { useState } from 'react';

const INITIAL_CHIRPS = [
  {
    id: 1,
    author: 'Sarah Chen',
    handle: '@sarah_dev',
    time: '4m',
    text: 'Just discovered HTML5 localStorage and CSS3 border-radius. Goodbye spacer GIFs! #webdev',
    likes: 18,
    liked: false,
  },
  {
    id: 2,
    author: 'TechPulse 2010',
    handle: '@techpulse',
    time: '22m',
    text: 'HTML5 video is gaining momentum across Safari and Chrome as mobile browsing explodes.',
    likes: 42,
    liked: false,
  },
  {
    id: 3,
    author: 'Alex Rivera',
    handle: '@alex_95',
    time: '1h',
    text: 'Testing out responsive media queries on my iPhone 4 screen. Everything fits in 320px!',
    likes: 11,
    liked: false,
  },
];

const SUGGESTED_USERS = [
  { handle: '@sarah_dev', name: 'Sarah Chen', following: true },
  { handle: '@techpulse', name: 'TechPulse 2010', following: false },
  { handle: '@pixel_mike', name: 'Mike Torres', following: false },
];

function Microblog2010() {
  const [chirps, setChirps] = useState(INITIAL_CHIRPS);
  const [draft, setDraft] = useState('');
  const [users, setUsers] = useState(SUGGESTED_USERS);

  const handlePost = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setChirps((prev) => [
      {
        id: Date.now(),
        author: 'Alex',
        handle: '@alex_2010',
        time: 'now',
        text: draft.trim(),
        likes: 0,
        liked: false,
      },
      ...prev,
    ]);
    setDraft('');
  };

  const toggleLike = (id) => {
    setChirps((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  const toggleFollow = (handle) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.handle === handle ? { ...u, following: !u.following } : u
      )
    );
  };

  return (
    <div className="s10-two-col">
      <div className="s10-main-col">
        <form className="s10-card s10-composer" onSubmit={handlePost}>
          <div className="s10-composer-head">
            <strong>What&apos;s happening?</strong>
            <span className="s10-char-count">{140 - draft.length}</span>
          </div>
          <textarea
            rows="2"
            maxLength={140}
            className="s10-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Compose a 140-character chirp..."
            required
          />
          <div className="s10-composer-actions">
            <button type="submit" className="s10-btn">
              Chirp
            </button>
          </div>
        </form>

        <div className="s10-card s10-feed">
          {chirps.map((c) => (
            <article key={c.id} className="s10-post">
              <div className="s10-avatar">{c.author.slice(0, 1)}</div>
              <div className="s10-post-body">
                <div className="s10-post-meta">
                  <strong>{c.author}</strong> <span>{c.handle}</span> ·{' '}
                  <span>{c.time}</span>
                </div>
                <p>{c.text}</p>
                <div className="s10-post-actions">
                  <button
                    type="button"
                    className={`s10-action-link ${c.liked ? 'is-liked' : ''}`}
                    onClick={() => toggleLike(c.id)}
                  >
                    ♥ {c.liked ? 'Liked' : 'Like'} ({c.likes})
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="s10-side-col">
        <div className="s10-card">
          <h3 className="s10-side-title">Who to follow</h3>
          <div className="s10-follow-list">
            {users.map((u) => (
              <div key={u.handle} className="s10-follow-row">
                <div>
                  <strong>{u.name}</strong>
                  <div className="s10-muted">{u.handle}</div>
                </div>
                <button
                  type="button"
                  className={`s10-follow-btn ${u.following ? 'is-following' : ''}`}
                  onClick={() => toggleFollow(u.handle)}
                >
                  {u.following ? 'Following' : '+ Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Microblog2010;
