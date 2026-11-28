import { useState } from 'react';

const INITIAL_PHOTOS = [
  {
    id: 1,
    user: 'alex_2010',
    filter: 'Earlybird',
    caption: 'Latte art from my 3GS camera #coffee',
    likes: 24,
    liked: false,
    gradient: 'linear-gradient(135deg, #f59e0b, #78350f)',
    comments: [{ id: 1, user: 'maya_l', text: 'Love the warm vignette!' }],
  },
  {
    id: 2,
    user: 'sarah_dev',
    filter: 'Toaster',
    caption: 'Golden hour at the skatepark',
    likes: 37,
    liked: false,
    gradient: 'linear-gradient(135deg, #ec4899, #4c1d95)',
    comments: [],
  },
];

function PhotoShare2010() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [commentText, setCommentText] = useState({});

  const toggleLike = (id) => {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const addComment = (event, id) => {
    event.preventDefault();
    const text = (commentText[id] || '').trim();
    if (!text) return;
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [...p.comments, { id: Date.now(), user: 'alex_2010', text }],
            }
          : p
      )
    );
    setCommentText((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="s10-photo-grid">
      {photos.map((photo) => (
        <article key={photo.id} className="s10-card s10-photo-card">
          <div className="s10-photo-head">
            <strong>@{photo.user}</strong>
            <span className="s10-filter-tag">{photo.filter}</span>
          </div>
          <div className="s10-square-frame" style={{ background: photo.gradient }}>
            <span className="s10-square-badge">1:1</span>
          </div>
          <div className="s10-photo-meta">
            <button
              type="button"
              className={`s10-action-link ${photo.liked ? 'is-liked' : ''}`}
              onClick={() => toggleLike(photo.id)}
            >
              ♥ {photo.likes} likes
            </button>
            <p>
              <strong>{photo.user}</strong> {photo.caption}
            </p>
          </div>

          <div className="s10-comments-box">
            {photo.comments.map((c) => (
              <div key={c.id} className="s10-comment-row">
                <strong>{c.user}</strong> {c.text}
              </div>
            ))}
            <form
              className="s10-comment-form"
              onSubmit={(e) => addComment(e, photo.id)}
            >
              <input
                type="text"
                className="s10-input"
                value={commentText[photo.id] || ''}
                onChange={(e) =>
                  setCommentText((prev) => ({ ...prev, [photo.id]: e.target.value }))
                }
                placeholder="Add a comment..."
              />
              <button type="submit" className="s10-btn-soft">
                Send
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PhotoShare2010;
