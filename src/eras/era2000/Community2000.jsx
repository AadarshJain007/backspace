import { useState } from 'react';

const INITIAL_CLUBS = [
  {
    id: 'webmasters',
    name: 'Webmasters 2000',
    members: 1420,
    posts: [
      {
        id: 1,
        author: 'PixelDave',
        time: 'Today 10:15 AM',
        text: 'Tip: Use 1px spacer GIFs if Netscape 4 collapses your empty table cells.',
      },
      {
        id: 2,
        author: 'FlashQueen',
        time: 'Today 11:02 AM',
        text: 'Anyone testing Macromedia Flash 5? The new ActionScript editor is huge.',
      },
    ],
  },
  {
    id: 'winamp',
    name: 'MP3 & Winamp Skins',
    members: 3890,
    posts: [
      {
        id: 1,
        author: 'LlamaRider',
        time: 'Yesterday',
        text: 'Just uploaded a blue brushed-metal Winamp skin to my GeoCities page!',
      },
    ],
  },
  {
    id: 'y2k',
    name: 'Y2K Tech Archive',
    members: 615,
    posts: [
      {
        id: 1,
        author: 'COBOL_Sam',
        time: 'Jan 02, 2000',
        text: 'All our mainframe clocks rolled over cleanly. Time to sleep!',
      },
    ],
  },
];

function Community2000({ onBackPortal, onStatusChange }) {
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [activeClubId, setActiveClubId] = useState(INITIAL_CLUBS[0].id);
  const [author, setAuthor] = useState('');
  const [reply, setReply] = useState('');

  const activeClub = clubs.find((c) => c.id === activeClubId) || clubs[0];

  const handlePost = (event) => {
    event.preventDefault();
    if (!author.trim() || !reply.trim()) return;
    const newPost = {
      id: Date.now(),
      author: author.trim(),
      time: 'Just now',
      text: reply.trim(),
    };
    setClubs((prev) =>
      prev.map((club) =>
        club.id === activeClub.id
          ? { ...club, posts: [...club.posts, newPost] }
          : club
      )
    );
    setReply('');
    if (onStatusChange) {
      onStatusChange(`Posted reply in ${activeClub.name}`);
    }
  };

  return (
    <div className="p2k-box">
      <div className="p2k-box-header">
        <span>PORTAL CLUBS &amp; MESSAGE BOARDS</span>
        <button
          type="button"
          className="p2k-tab-btn"
          onClick={onBackPortal}
        >
          Portal Home
        </button>
      </div>

      <div className="p2k-box-body">
        <div className="p2k-club-tabs">
          {clubs.map((club) => (
            <button
              key={club.id}
              type="button"
              className={`p2k-club-btn ${club.id === activeClub.id ? 'is-active' : ''}`}
              onClick={() => setActiveClubId(club.id)}
            >
              {club.name} ({club.members})
            </button>
          ))}
        </div>

        <div className="p2k-board-list">
          {activeClub.posts.map((post) => (
            <div key={post.id} className="p2k-board-post">
              <div className="p2k-board-meta">
                <strong>{post.author}</strong> · <span>{post.time}</span>
              </div>
              <div>{post.text}</div>
            </div>
          ))}
        </div>

        <form className="p2k-board-form" onSubmit={handlePost}>
          <input
            type="text"
            className="p2k-input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your nickname"
            required
          />
          <input
            type="text"
            className="p2k-input p2k-input-grow"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={`Post a message to ${activeClub.name}...`}
            required
          />
          <button type="submit" className="p2k-btn">
            Post Reply
          </button>
        </form>
      </div>
    </div>
  );
}

export default Community2000;
