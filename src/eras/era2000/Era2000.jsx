import { useEffect, useState } from 'react';
import PortalHome2000, { NEWS_SECTIONS, PORTAL_CATEGORIES } from './PortalHome2000.jsx';
import Inbox2000 from './Inbox2000.jsx';
import Community2000 from './Community2000.jsx';
import './Era2000.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'Portal Team <welcome@webmail2000.com>',
    subject: 'Welcome to your free 10 MB WebMail Inbox!',
    date: 'Nov 26, 2000',
    read: false,
    body: 'Thanks for signing up for WebMail 2000! Customize your My Portal homepage with local weather, stock tickers, and community clubs.',
  },
  {
    id: 2,
    from: 'GeoCities_Host <support@geocities.com>',
    subject: 'Your homepage bandwidth limit reminder',
    date: 'Nov 24, 2000',
    read: false,
    body: 'Your SiliconValley neighborhood site received 412 hits this week. Upgrade to GeoCities Plus for 25 MB of storage and no banner ads.',
  },
  {
    id: 3,
    from: 'Alex_Friend <sam99@hotmail.com>',
    subject: 'Re: Did you see that Flash intro?',
    date: 'Nov 20, 2000',
    read: true,
    body: 'Check out the new Flash 5 showcase in the Computers & Internet directory—takes 40 seconds to load on 56k, totally worth it!',
  },
];

function Era2000({ isLoading, onUrlChange }) {
  const [view, setView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [statusText, setStatusText] = useState('Portal Ready · 56k Connected');

  const unreadCount = messages.filter((m) => !m.read).length;

  useEffect(() => {
    if (!onUrlChange) return;
    if (view === 'mail') {
      onUrlChange('http://mail.portal2000.com/inbox');
    } else if (view === 'community') {
      onUrlChange('http://clubs.portal2000.com/boards');
    } else if (view === 'search') {
      onUrlChange(
        `http://search.portal2000.com/find?q=${encodeURIComponent(submittedQuery)}`
      );
    } else if (view === 'category' && selectedCategory) {
      onUrlChange(`http://dir.portal2000.com/${selectedCategory.category.id}`);
    } else {
      onUrlChange('http://www.portal2000.com/');
    }
  }, [view, submittedQuery, selectedCategory, onUrlChange]);

  const handleSearch = (event) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSubmittedQuery(q);
    setView('search');
    setStatusText(`Search results for "${q}"`);
  };

  const handleMarkRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleSendMessage = ({ to, subject, body }) => {
    const sent = {
      id: Date.now(),
      from: `To: ${to}`,
      subject: `[Sent] ${subject}`,
      date: 'Just now',
      read: true,
      body,
    };
    setMessages((prev) => [sent, ...prev]);
    setStatusText(`Message sent to ${to}`);
  };

  const handleDeleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setStatusText('Message moved to Trash');
  };

  const allNews = Object.values(NEWS_SECTIONS).flatMap((sec) => sec.items);
  const qLower = submittedQuery.toLowerCase();
  const matchedNews = allNews.filter(
    (item) =>
      item.title.toLowerCase().includes(qLower) ||
      item.summary.toLowerCase().includes(qLower)
  );
  const matchedCategories = PORTAL_CATEGORIES.filter(
    (cat) =>
      cat.name.toLowerCase().includes(qLower) ||
      cat.subs.some((s) => s.toLowerCase().includes(qLower))
  );

  if (isLoading) {
    return (
      <div className="p2k-root p2k-loading">
        Connecting to www.portal2000.com...
      </div>
    );
  }

  return (
    <div className="p2k-root">
      <header className="p2k-header">
        <div className="p2k-logo-row">
          <button
            type="button"
            className="p2k-logo"
            onClick={() => setView('home')}
          >
            Portal<span>2000</span>!
          </button>

          <nav className="p2k-top-links" aria-label="Portal navigation">
            <button
              type="button"
              className={`p2k-top-btn ${view === 'home' ? 'is-active' : ''}`}
              onClick={() => setView('home')}
            >
              Portal Home
            </button>
            <button
              type="button"
              className={`p2k-top-btn ${view === 'mail' ? 'is-active' : ''}`}
              onClick={() => setView('mail')}
            >
              Mail ({unreadCount})
            </button>
            <button
              type="button"
              className={`p2k-top-btn ${view === 'community' ? 'is-active' : ''}`}
              onClick={() => setView('community')}
            >
              Clubs &amp; Boards
            </button>
          </nav>
        </div>

        <form className="p2k-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="p2k-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the Web, News, or Directory (e.g. Flash, Y2K, MP3)..."
            aria-label="Portal search"
          />
          <button type="submit" className="p2k-btn">
            Search
          </button>
        </form>
      </header>

      {view === 'home' && (
        <PortalHome2000
          unreadCount={unreadCount}
          onOpenInbox={() => setView('mail')}
          onOpenCommunity={() => setView('community')}
          onSelectCategory={(category, sub = null) => {
            setSelectedCategory({ category, sub });
            setView('category');
            setStatusText(`Browsing ${category.name}`);
          }}
          onStatusChange={setStatusText}
        />
      )}

      {view === 'mail' && (
        <Inbox2000
          messages={messages}
          onMarkRead={handleMarkRead}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onBackPortal={() => setView('home')}
        />
      )}

      {view === 'community' && (
        <Community2000
          onBackPortal={() => setView('home')}
          onStatusChange={setStatusText}
        />
      )}

      {view === 'category' && selectedCategory && (
        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>
              DIRECTORY: {selectedCategory.category.name.toUpperCase()}
              {selectedCategory.sub ? ` > ${selectedCategory.sub}` : ''}
            </span>
            <button
              type="button"
              className="p2k-tab-btn"
              onClick={() => setView('home')}
            >
              « Portal Home
            </button>
          </div>
          <div className="p2k-box-body">
            <p className="p2k-article-summary">
              {selectedCategory.category.description}
            </p>
            <div className="p2k-dir-subs">
              {selectedCategory.category.subs.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={`p2k-club-btn ${
                    selectedCategory.sub === sub ? 'is-active' : ''
                  }`}
                  onClick={() =>
                    setSelectedCategory({
                      category: selectedCategory.category,
                      sub,
                    })
                  }
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'search' && (
        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>SEARCH RESULTS FOR &quot;{submittedQuery}&quot;</span>
            <button
              type="button"
              className="p2k-tab-btn"
              onClick={() => setView('home')}
            >
              « Portal Home
            </button>
          </div>
          <div className="p2k-box-body p2k-search-results">
            <div>
              <strong>
                Directory Matches ({matchedCategories.length})
              </strong>
              {matchedCategories.length === 0 ? (
                <p className="p2k-muted">No matching categories.</p>
              ) : (
                <ul className="p2k-news-list">
                  {matchedCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className="p2k-link"
                        onClick={() => {
                          setSelectedCategory({ category: cat, sub: null });
                          setView('category');
                        }}
                      >
                        {cat.name}
                      </button>{' '}
                      — {cat.subs.join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <strong>News Matches ({matchedNews.length})</strong>
              {matchedNews.length === 0 ? (
                <p className="p2k-muted">No matching news stories.</p>
              ) : (
                <ul className="p2k-news-list">
                  {matchedNews.map((item) => (
                    <li key={item.id}>
                      <strong>{item.title}</strong> ({item.source})
                      <div className="p2k-muted">{item.summary}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="p2k-footer">
        <span>{statusText}</span>
        <span>Portal2000! Network · Best viewed at 800×600</span>
      </footer>
    </div>
  );
}

export default Era2000;
