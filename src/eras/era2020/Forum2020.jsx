import { useState } from 'react';

const INITIAL_THREADS = [
  {
    id: 1,
    flair: 'Discussion',
    author: 'u/css_minimalist',
    title: 'Unpopular opinion: prefers-color-scheme: dark is the best web standard of 2020',
    votes: 342,
    userVote: 0,
    replies: [
      { id: 1, user: 'u/nightowl', text: '100% agreed, especially with subtle 1px translucent borders.' },
    ],
  },
  {
    id: 2,
    flair: 'Showcase',
    author: 'u/indie_builder',
    title: 'Built a keyboard-driven command palette (⌘K) in pure React',
    votes: 189,
    userVote: 0,
    replies: [],
  },
];

function Forum2020() {
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [newTitle, setNewTitle] = useState('');
  const [replyDrafts, setReplyDrafts] = useState({});

  const vote = (id, dir) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextVote = t.userVote === dir ? 0 : dir;
        const delta = nextVote - t.userVote;
        return { ...t, userVote: nextVote, votes: t.votes + delta };
      })
    );
  };

  const createThread = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setThreads((prev) => [
      {
        id: Date.now(),
        flair: 'Discussion',
        author: 'u/you',
        title: newTitle.trim(),
        votes: 1,
        userVote: 1,
        replies: [],
      },
      ...prev,
    ]);
    setNewTitle('');
  };

  const addReply = (e, id) => {
    e.preventDefault();
    const text = (replyDrafts[id] || '').trim();
    if (!text) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, replies: [...t.replies, { id: Date.now(), user: 'u/you', text }] }
          : t
      )
    );
    setReplyDrafts((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="e20-forum">
      <form className="e20-card e20-row-form" onSubmit={createThread}>
        <input
          type="text"
          className="e20-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Start a new community thread..."
          required
        />
        <button type="submit" className="e20-accent-btn">
          Post Thread
        </button>
      </form>

      {threads.map((t) => (
        <article key={t.id} className="e20-card e20-thread">
          <div className="e20-vote-col">
            <button
              type="button"
              className={`e20-vote-btn ${t.userVote === 1 ? 'is-up' : ''}`}
              onClick={() => vote(t.id, 1)}
              aria-label="Upvote"
            >
              ▲
            </button>
            <span>{t.votes}</span>
            <button
              type="button"
              className={`e20-vote-btn ${t.userVote === -1 ? 'is-down' : ''}`}
              onClick={() => vote(t.id, -1)}
              aria-label="Downvote"
            >
              ▼
            </button>
          </div>

          <div className="e20-thread-body">
            <div className="e20-thread-meta">
              <span className="e20-flair">{t.flair}</span>
              <span className="e20-muted">Posted by {t.author}</span>
            </div>
            <h3>{t.title}</h3>

            <div className="e20-replies">
              {t.replies.map((r) => (
                <div key={r.id} className="e20-reply">
                  <strong>{r.user}</strong>: {r.text}
                </div>
              ))}
              <form className="e20-row-form" onSubmit={(e) => addReply(e, t.id)}>
                <input
                  type="text"
                  className="e20-input"
                  value={replyDrafts[t.id] || ''}
                  onChange={(e) =>
                    setReplyDrafts((prev) => ({ ...prev, [t.id]: e.target.value }))
                  }
                  placeholder="Write a reply..."
                />
                <button type="submit" className="e20-pill-btn">
                  Reply
                </button>
              </form>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Forum2020;
