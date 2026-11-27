import { useState } from 'react';
import './MySpace2005.css';

const INITIAL_FRIENDS = [
  { id: 1, name: 'Tom', color: '#0284c7' },
  { id: 2, name: 'Sarah_K', color: '#db2777' },
  { id: 3, name: 'DJ_Pixel', color: '#7c3aed' },
  { id: 4, name: 'CodeNinja', color: '#059669' },
  { id: 5, name: 'SkaterMike', color: '#ea580c' },
  { id: 6, name: 'Indie_Jen', color: '#2563eb' },
];

const INITIAL_POSTS = [
  {
    id: 1,
    time: 'Today · 2:14 PM',
    text: 'Just learned how to make rounded corners and glossy gradients with CSS!',
  },
  {
    id: 2,
    time: 'Yesterday · 9:40 PM',
    text: 'Listening to my new playlist on Winamp while coding my profile layout.',
  },
];

function MySpace2005() {
  const [profile, setProfile] = useState({
    name: 'Alex_2005',
    mood: 'caffeinated & coding',
    song: 'Dashboard Confessional — Vindicated',
    bio: 'Web 2.0 enthusiast, coffee drinker, and late-night CSS tinkerer.',
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [postText, setPostText] = useState('');

  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [newFriend, setNewFriend] = useState('');

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setProfile(draft);
    setEditing(false);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    if (!postText.trim()) return;
    setPosts((prev) => [
      { id: Date.now(), time: 'Just now', text: postText.trim() },
      ...prev,
    ]);
    setPostText('');
  };

  const handleAddFriend = (event) => {
    event.preventDefault();
    if (!newFriend.trim() || friends.length >= 8) return;
    const palette = ['#0ea5e9', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];
    const color = palette[friends.length % palette.length];
    setFriends((prev) => [
      ...prev,
      { id: Date.now(), name: newFriend.trim(), color },
    ]);
    setNewFriend('');
  };

  return (
    <div className="mc-grid">
      <div className="mc-left">
        <div className="mc-card">
          <div className="mc-profile-top">
            <div className="mc-avatar" aria-hidden="true">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="mc-name">{profile.name}</h2>
              <div className="mc-mood">
                Mood: <strong>{profile.mood}</strong>
              </div>
              <div className="mc-song">♪ {profile.song}</div>
            </div>
          </div>

          {editing ? (
            <form className="mc-edit-form" onSubmit={handleSaveProfile}>
              <input
                type="text"
                className="w2-input"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Display Name"
                required
              />
              <input
                type="text"
                className="w2-input"
                value={draft.mood}
                onChange={(e) => setDraft({ ...draft, mood: e.target.value })}
                placeholder="Current Mood"
              />
              <input
                type="text"
                className="w2-input"
                value={draft.song}
                onChange={(e) => setDraft({ ...draft, song: e.target.value })}
                placeholder="Profile Song"
              />
              <textarea
                rows="3"
                className="w2-input"
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                placeholder="About me..."
              />
              <div className="mc-actions">
                <button type="submit" className="w2-gloss-btn">
                  Save Profile
                </button>
                <button
                  type="button"
                  className="w2-soft-btn"
                  onClick={() => {
                    setDraft(profile);
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="mc-bio">{profile.bio}</p>
              <button
                type="button"
                className="w2-gloss-btn"
                onClick={() => {
                  setDraft(profile);
                  setEditing(true);
                }}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        <div className="mc-card">
          <div className="mc-card-head">
            <h3>{profile.name}&apos;s Top 8 Friends ({friends.length}/8)</h3>
          </div>
          <div className="mc-friends-grid">
            {friends.map((f) => (
              <div key={f.id} className="mc-friend-tile">
                <div
                  className="mc-friend-pic"
                  style={{ background: f.color }}
                >
                  {f.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="mc-friend-name">{f.name}</span>
              </div>
            ))}
          </div>
          <form className="mc-friend-form" onSubmit={handleAddFriend}>
            <input
              type="text"
              className="w2-input"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              placeholder={
                friends.length >= 8 ? 'Top 8 is full!' : 'Add friend to Top 8...'
              }
              disabled={friends.length >= 8}
            />
            <button
              type="submit"
              className="w2-gloss-btn"
              disabled={friends.length >= 8}
            >
              Add
            </button>
          </form>
        </div>
      </div>

      <div className="mc-right">
        <div className="mc-card">
          <h3>Post a Bulletin / Status Update</h3>
          <form className="mc-post-form" onSubmit={handleCreatePost}>
            <textarea
              rows="2"
              className="w2-input"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What are you working on right now?"
              required
            />
            <button type="submit" className="w2-gloss-btn">
              Publish Post
            </button>
          </form>
        </div>

        <div className="mc-card">
          <h3>Recent Posts ({posts.length})</h3>
          <div className="mc-posts-list">
            {posts.map((post) => (
              <article key={post.id} className="mc-post-item">
                <div className="mc-post-time">{post.time}</div>
                <p>{post.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySpace2005;
