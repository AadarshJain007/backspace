import { useEffect, useState } from 'react';
import './TubeBox.css';

const INITIAL_VIDEOS = [
  {
    id: 'quad',
    title: 'Me at the Campus Quad (2005)',
    author: 'alex_vlogs',
    duration: 18,
    views: 14280,
    ratingSum: 44,
    ratingCount: 10,
    color: '#0ea5e9',
    description:
      'Testing out my new 2MP digital camera video mode between classes!',
    comments: [
      { id: 1, user: 'skater_99', text: 'First!! Awesome quality for 2005 lol' },
      { id: 2, user: 'sarah_b', text: 'Whoa you can embed videos right in the page!' },
    ],
  },
  {
    id: 'ipod',
    title: 'Unboxing the First iPod Nano',
    author: 'gadget_guru',
    duration: 24,
    views: 38910,
    ratingSum: 95,
    ratingCount: 20,
    color: '#f97316',
    description:
      '1000 songs in your pocket—way thinner than a pencil.',
    comments: [
      { id: 1, user: 'mp3_kid', text: 'That click wheel is so smooth!' },
    ],
  },
  {
    id: 'css-demo',
    title: 'How to Make Glossy Web 2.0 Buttons',
    author: 'pixel_craft',
    duration: 20,
    views: 9412,
    ratingSum: 39,
    ratingCount: 8,
    color: '#22c55e',
    description:
      'Quick screencast on rounded corners, reflections, and pastel gradients.',
    comments: [
      { id: 1, user: 'dev_dan', text: 'Finally no more bevel tables!!' },
    ],
  },
];

function TubeBox() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [activeId, setActiveId] = useState(INITIAL_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const activeVideo = videos.find((v) => v.id === activeId) || videos[0];
  const avgRating = (activeVideo.ratingSum / activeVideo.ratingCount).toFixed(1);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + 1 >= activeVideo.duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 350);
    return () => clearInterval(timer);
  }, [isPlaying, activeVideo.duration]);

  const handleSelectVideo = (id) => {
    setActiveId(id);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleRate = (stars) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === activeVideo.id
          ? {
              ...v,
              ratingSum: v.ratingSum + stars,
              ratingCount: v.ratingCount + 1,
            }
          : v
      )
    );
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: commentAuthor.trim(),
      text: commentText.trim(),
    };
    setVideos((prev) =>
      prev.map((v) =>
        v.id === activeVideo.id
          ? { ...v, comments: [newComment, ...v.comments] }
          : v
      )
    );
    setCommentText('');
  };

  return (
    <div className="tb-wrap">
      <div className="tb-main">
        <div className="tb-player-card">
          <div
            className="tb-screen"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${activeVideo.color}, #0f172a 75%)`,
            }}
          >
            <div className={`tb-visual ${isPlaying ? 'is-playing' : ''}`}>
              <div className="tb-visual-badge">
                {isPlaying ? '▶ PLAYING' : '❚❚ PAUSED'}
              </div>
              <div className="tb-visual-title">{activeVideo.title}</div>
              <div className="tb-visual-time">
                0:{String(progress).padStart(2, '0')} / 0:
                {String(activeVideo.duration).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="tb-controls">
            <button
              type="button"
              className="w2-gloss-btn"
              onClick={() => setIsPlaying((prev) => !prev)}
            >
              {isPlaying ? 'Pause' : 'Play Video'}
            </button>
            <div className="tb-bar-track" aria-hidden="true">
              <div
                className="tb-bar-fill"
                style={{
                  width: `${(progress / activeVideo.duration) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="tb-info-card">
          <h2 className="tb-title">{activeVideo.title}</h2>
          <div className="tb-meta-row">
            <span>
              Uploaded by <strong>{activeVideo.author}</strong> ·{' '}
              {activeVideo.views.toLocaleString()} views
            </span>
            <div className="tb-rating">
              <span>
                Rating: <strong>{avgRating}</strong>/5 ({activeVideo.ratingCount})
              </span>
              <div className="tb-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="tb-star-btn"
                    onClick={() => handleRate(star)}
                    title={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="tb-desc">{activeVideo.description}</p>
        </div>

        <div className="tb-comments-card">
          <h3>Comments ({activeVideo.comments.length})</h3>
          <form className="tb-comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              className="w2-input"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="Your screen name"
              required
            />
            <input
              type="text"
              className="w2-input tb-comment-grow"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Post a comment on this video..."
              required
            />
            <button type="submit" className="w2-gloss-btn">
              Post
            </button>
          </form>

          <ul className="tb-comment-list">
            {activeVideo.comments.map((c) => (
              <li key={c.id}>
                <strong>{c.user}:</strong> {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="tb-sidebar">
        <h3>Related Videos</h3>
        <div className="tb-related-list">
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`tb-related-item ${v.id === activeVideo.id ? 'is-active' : ''}`}
              onClick={() => handleSelectVideo(v.id)}
            >
              <span
                className="tb-related-thumb"
                style={{ backgroundColor: v.color }}
              >
                ▶
              </span>
              <span className="tb-related-text">
                <strong>{v.title}</strong>
                <small>{v.views.toLocaleString()} views</small>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default TubeBox;
