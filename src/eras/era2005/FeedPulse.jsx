import { useState } from 'react';
import './FeedPulse.css';

const AVAILABLE_FEEDS = [
  {
    id: 'ajaxian',
    name: 'Ajaxian Weekly',
    url: 'http://ajaxian.com/index.xml',
    subscribed: true,
    items: [
      {
        id: 'a1',
        title: 'Building Drag-and-Drop Lists with Prototype & Script.aculo.us',
        date: 'Nov 26, 2005',
        body: 'Rich client-side interactions are now possible in every major browser using lightweight JavaScript effects.',
      },
      {
        id: 'a2',
        title: 'Why JSON Is Replacing Verbose XML Payloads',
        date: 'Nov 22, 2005',
        body: 'Developers are discovering that JavaScript Object Notation parses faster and keeps AJAX responses tiny.',
      },
    ],
  },
  {
    id: 'csszen',
    name: 'CSS Zen Journal',
    url: 'http://csszengarden.com/rss.xml',
    subscribed: true,
    items: [
      {
        id: 'c1',
        title: 'Designing Reflections and Glossy Headers Without Tables',
        date: 'Nov 25, 2005',
        body: 'Clean semantic markup paired with PNG alpha transparency gives Web 2.0 sites their signature polish.',
      },
    ],
  },
  {
    id: 'signal',
    name: 'Signal vs. Noise',
    url: 'http://37signals.com/svn/index.xml',
    subscribed: false,
    items: [
      {
        id: 's1',
        title: 'Keep Software Simple: Why Less Is More in 2005',
        date: 'Nov 21, 2005',
        body: 'Shipping focused web apps in Ruby on Rails beats bloated enterprise portals every time.',
      },
    ],
  },
  {
    id: 'tech2005',
    name: 'Web 2.0 Radar',
    url: 'http://web2radar.org/feed.xml',
    subscribed: false,
    items: [
      {
        id: 't1',
        title: 'Podcasting & RSS Enclosures Hit the Mainstream',
        date: 'Nov 19, 2005',
        body: 'Subscribe once to an XML feed and new audio episodes sync automatically to your MP3 player.',
      },
    ],
  },
];

function FeedPulse() {
  const [feeds, setFeeds] = useState(AVAILABLE_FEEDS);
  const [selectedFeedId, setSelectedFeedId] = useState('ajaxian');
  const [customTitle, setCustomTitle] = useState('');

  const subscribedFeeds = feeds.filter((f) => f.subscribed);
  const activeFeed =
    subscribedFeeds.find((f) => f.id === selectedFeedId) || subscribedFeeds[0] || null;

  const toggleSubscribe = (id) => {
    setFeeds((prev) =>
      prev.map((f) => (f.id === id ? { ...f, subscribed: !f.subscribed } : f))
    );
  };

  const handleAddCustom = (event) => {
    event.preventDefault();
    if (!customTitle.trim()) return;
    const id = `custom-${Date.now()}`;
    const newFeed = {
      id,
      name: customTitle.trim(),
      url: `http://feeds.web2.local/${customTitle.trim().toLowerCase().replace(/\s+/g, '-')}.xml`,
      subscribed: true,
      items: [
        {
          id: `${id}-1`,
          title: `Welcome to ${customTitle.trim()} RSS Feed`,
          date: 'Today',
          body: 'Sample syndicated entry added locally to your FeedPulse reader.',
        },
      ],
    };
    setFeeds((prev) => [...prev, newFeed]);
    setSelectedFeedId(id);
    setCustomTitle('');
  };

  return (
    <div className="fp-grid">
      <aside className="fp-sidebar">
        <div className="fp-head">
          <span className="fp-rss-badge">RSS</span>
          <h3>Subscriptions ({subscribedFeeds.length})</h3>
        </div>

        <div className="fp-feed-list">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className={`fp-feed-row ${activeFeed?.id === feed.id ? 'is-active' : ''}`}
            >
              <button
                type="button"
                className="fp-feed-select"
                onClick={() => {
                  if (!feed.subscribed) toggleSubscribe(feed.id);
                  setSelectedFeedId(feed.id);
                }}
              >
                {feed.name}
              </button>
              <button
                type="button"
                className={`fp-sub-btn ${feed.subscribed ? 'is-sub' : ''}`}
                onClick={() => toggleSubscribe(feed.id)}
              >
                {feed.subscribed ? 'Subscribed' : '+ Subscribe'}
              </button>
            </div>
          ))}
        </div>

        <form className="fp-add-form" onSubmit={handleAddCustom}>
          <input
            type="text"
            className="w2-input"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="New feed name..."
            required
          />
          <button type="submit" className="w2-gloss-btn">
            Add Feed
          </button>
        </form>
      </aside>

      <div className="fp-reader">
        {activeFeed ? (
          <>
            <div className="fp-reader-head">
              <h2>{activeFeed.name}</h2>
              <span>{activeFeed.url}</span>
            </div>
            <div className="fp-articles">
              {activeFeed.items.map((item) => (
                <article key={item.id} className="fp-article">
                  <h3>{item.title}</h3>
                  <div className="fp-date">{item.date}</div>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="fp-empty">
            No feeds subscribed yet. Click &quot;+ Subscribe&quot; on any sample feed.
          </p>
        )}
      </div>
    </div>
  );
}

export default FeedPulse;
