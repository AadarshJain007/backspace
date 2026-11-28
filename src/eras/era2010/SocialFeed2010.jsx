import { useState } from 'react';

const INITIAL_FEED = [
  {
    id: 1,
    author: 'Maya Lin',
    time: '12 mins ago',
    text: 'Anyone else obsessed with brushed leather textures and drop shadows in iOS 4 apps right now?',
    likes: 9,
    liked: false,
    comments: [{ id: 1, user: 'Alex', text: 'Yes! That stitched notes app looks so real.' }],
  },
  {
    id: 2,
    author: 'Sam Patel',
    time: '45 mins ago',
    text: 'Just finished a 960px grid layout using jQuery slideToggle. Feels super smooth.',
    likes: 14,
    liked: false,
    comments: [],
  },
];

function SocialFeed2010() {
  const [posts, setPosts] = useState(INITIAL_FEED);
  const [status, setStatus] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const handleStatusSubmit = (event) => {
    event.preventDefault();
    if (!status.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        author: 'Alex (You)',
        time: 'Just now',
        text: status.trim(),
        likes: 0,
        liked: false,
        comments: [],
      },
      ...prev,
    ]);
    setStatus('');
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleAddComment = (event, postId) => {
    event.preventDefault();
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, { id: Date.now(), user: 'Alex', text }],
            }
          : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="s10-two-col">
      <div className="s10-main-col">
        <form className="s10-card s10-composer" onSubmit={handleStatusSubmit}>
          <input
            type="text"
            className="s10-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Share a status update on your Wall..."
            required
          />
          <div className="s10-composer-actions">
            <button type="submit" className="s10-btn">
              Share Post
            </button>
          </div>
        </form>

        <div className="s10-feed-stack">
          {posts.map((post) => (
            <article key={post.id} className="s10-card s10-wall-post">
              <div className="s10-wall-head">
                <div className="s10-avatar">{post.author.slice(0, 1)}</div>
                <div>
                  <strong>{post.author}</strong>
                  <div className="s10-muted">{post.time}</div>
                </div>
              </div>
              <p className="s10-wall-text">{post.text}</p>
              <div className="s10-post-actions">
                <button
                  type="button"
                  className={`s10-action-link ${post.liked ? 'is-liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  👍 {post.liked ? 'Unlike' : 'Like'} ({post.likes})
                </button>
              </div>

              <div className="s10-comments-box">
                {post.comments.map((c) => (
                  <div key={c.id} className="s10-comment-row">
                    <strong>{c.user}</strong> {c.text}
                  </div>
                ))}
                <form
                  className="s10-comment-form"
                  onSubmit={(e) => handleAddComment(e, post.id)}
                >
                  <input
                    type="text"
                    className="s10-input"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                  />
                  <button type="submit" className="s10-btn-soft">
                    Comment
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="s10-side-col">
        <div className="s10-card">
          <h3 className="s10-side-title">Online Friends (4)</h3>
          <ul className="s10-online-list">
            <li>● Maya Lin</li>
            <li>● Sam Patel</li>
            <li>● Sarah Chen</li>
            <li>● Mike Torres</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SocialFeed2010;
