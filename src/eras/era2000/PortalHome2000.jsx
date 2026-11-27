import { useState } from 'react';

export const NEWS_SECTIONS = {
  top: {
    label: 'Top Stories',
    items: [
      {
        id: 'y2k-clear',
        title: 'Y2K Rollover Passes Without Major Infrastructure Outages',
        source: 'PortalWire · 9:14 AM',
        summary:
          'Utilities, airlines, and banking systems worldwide transitioned into January 2000 smoothly after years of COBOL patching and readiness audits.',
      },
      {
        id: 'broadband-rise',
        title: 'Home Broadband Subscriptions Double as DSL Rollout Expands',
        source: 'NetDaily · 10:02 AM',
        summary:
          'More households are trading 56k dial-up modems for always-on cable and DSL connections, fueling demand for streaming audio and Flash portals.',
      },
      {
        id: 'olympics-web',
        title: 'Sydney 2000 Sets Record for Live Online Scoreboards',
        source: 'WorldSports · 11:30 AM',
        summary:
          'Millions of fans followed real-time medal tables and text play-by-play updates directly from their office browsers.',
      },
    ],
  },
  tech: {
    label: 'Tech & Dot-Com',
    items: [
      {
        id: 'flash-5',
        title: 'Macromedia Flash 5 Introduces ActionScript for Interactive Sites',
        source: 'WebDev2000 · 8:45 AM',
        summary:
          'Designers celebrate vector animations, custom preloaders, and interactive menus that run consistently across Internet Explorer and Netscape.',
      },
      {
        id: 'napster-buzz',
        title: 'Campus Networks Report Surge in MP3 Sharing Traffic',
        source: 'TechBeat · 12:15 PM',
        summary:
          'University IT departments debate bandwidth caps as peer-to-peer music swapping becomes the top topic in dorm message boards.',
      },
    ],
  },
  science: {
    label: 'Science',
    items: [
      {
        id: 'iss-crew',
        title: 'First Resident Crew Arrives at the International Space Station',
        source: 'SpaceNet · 7:50 AM',
        summary:
          'Expedition 1 begins continuous human presence in low Earth orbit, beaming telemetry and mission logs back to web portals.',
      },
      {
        id: 'genome-draft',
        title: 'Human Genome Project Releases Working Draft Sequence',
        source: 'BioWire · 1:10 PM',
        summary:
          'Researchers publish milestone map online, making raw genetic reference data accessible to laboratories around the globe.',
      },
    ],
  },
};

export const PORTAL_CATEGORIES = [
  {
    id: 'computers',
    name: 'Computers & Internet',
    subs: ['HTML & CSS', 'Free Web Hosting', 'Winamp Skins', 'Shareware'],
    description:
      'Tutorials, Perl CGI scripts, Macromedia Flash showcases, and free 15 MB personal homepages.',
  },
  {
    id: 'news',
    name: 'News & Media',
    subs: ['Headlines', 'Tech Wire', 'Weather', 'World Markets'],
    description:
      '24-hour breaking news tickers, stock quotes with 20-minute delays, and regional newspapers.',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subs: ['Movie Trailers', 'MP3 Charts', 'Flash Games', 'TV Listings'],
    description:
      'QuickTime movie previews, Shockwave arcade games, and fan clubs for sci-fi television.',
  },
  {
    id: 'business',
    name: 'Business & Economy',
    subs: ['Dot-Com IPOs', 'Personal Finance', 'Job Boards', 'E-Commerce'],
    description:
      'Silicon Valley startup coverage, online auctions, and mortgage rate calculators.',
  },
  {
    id: 'science',
    name: 'Science & Space',
    subs: ['Astronomy', 'Space Station', 'Biology', 'Physics'],
    description:
      'NASA mission galleries, Hubble snapshots, and university research archives.',
  },
  {
    id: 'society',
    name: 'Community & Clubs',
    subs: ['Message Boards', 'Chat Rooms', 'Personal Pages', 'Pen Pals'],
    description:
      'Topic-based clubs, moderated forums, and member directories across the web.',
  },
];

const WEATHER_CITIES = [
  { city: 'San Francisco, CA', temp: '64°F', cond: 'Partly Cloudy', high: '67°', low: '52°' },
  { city: 'New York, NY', temp: '52°F', cond: 'Clear Skies', high: '56°', low: '41°' },
  { city: 'London, UK', temp: '49°F', cond: 'Light Rain', high: '51°', low: '43°' },
  { city: 'Tokyo, JP', temp: '61°F', cond: 'Breezy', high: '65°', low: '53°' },
];

function PortalHome2000({
  unreadCount,
  onOpenInbox,
  onOpenCommunity,
  onSelectCategory,
  onStatusChange,
}) {
  const [activeNewsTab, setActiveNewsTab] = useState('top');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [pollVotes, setPollVotes] = useState({ dialup: 48, dsl: 34, t1: 18 });
  const [voted, setVoted] = useState(false);

  const newsGroup = NEWS_SECTIONS[activeNewsTab];
  const weather = WEATHER_CITIES[weatherIndex];
  const totalVotes = pollVotes.dialup + pollVotes.dsl + pollVotes.t1;

  const handleVote = (option) => {
    if (voted) return;
    setPollVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
    setVoted(true);
    if (onStatusChange) {
      onStatusChange('Poll vote recorded');
    }
  };

  return (
    <div className="p2k-grid">
      <div className="p2k-main-col">
        <div className="p2k-box">
          <div className="p2k-box-header p2k-tabs-header">
            <span>PORTAL NEWSWIRE</span>
            <div className="p2k-news-tabs">
              {Object.entries(NEWS_SECTIONS).map(([key, section]) => (
                <button
                  key={key}
                  type="button"
                  className={`p2k-tab-btn ${activeNewsTab === key ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveNewsTab(key);
                    setSelectedArticle(null);
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p2k-box-body">
            {selectedArticle ? (
              <div className="p2k-article">
                <button
                  type="button"
                  className="p2k-link"
                  onClick={() => setSelectedArticle(null)}
                >
                  « Back to {newsGroup.label}
                </button>
                <h2 className="p2k-article-title">{selectedArticle.title}</h2>
                <div className="p2k-article-meta">{selectedArticle.source}</div>
                <p className="p2k-article-summary">{selectedArticle.summary}</p>
              </div>
            ) : (
              <ul className="p2k-news-list">
                {newsGroup.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="p2k-link p2k-news-link"
                      onClick={() => {
                        setSelectedArticle(item);
                        if (onStatusChange) {
                          onStatusChange(`Reading: ${item.title}`);
                        }
                      }}
                    >
                      {item.title}
                    </button>
                    <span className="p2k-news-source"> — {item.source}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>WEB DIRECTORY &amp; CATEGORIES</span>
          </div>
          <div className="p2k-box-body">
            <div className="p2k-cat-grid">
              {PORTAL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p2k-cat-card">
                  <button
                    type="button"
                    className="p2k-link p2k-cat-title"
                    onClick={() => onSelectCategory(cat)}
                  >
                    {cat.name}
                  </button>
                  <div className="p2k-cat-subs">
                    {cat.subs.map((sub, idx) => (
                      <span key={sub}>
                        <button
                          type="button"
                          className="p2k-sub-link"
                          onClick={() => onSelectCategory(cat, sub)}
                        >
                          {sub}
                        </button>
                        {idx < cat.subs.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="p2k-side-col">
        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>MY MAIL</span>
          </div>
          <div className="p2k-box-body p2k-compact">
            <div>
              <strong>alex@webmail2000.com</strong>
            </div>
            <div className="p2k-muted">
              You have <strong>{unreadCount}</strong> unread message
              {unreadCount === 1 ? '' : 's'}.
            </div>
            <button
              type="button"
              className="p2k-btn p2k-btn-full"
              onClick={onOpenInbox}
            >
              Check Inbox ({unreadCount})
            </button>
          </div>
        </div>

        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>WEATHER</span>
            <select
              aria-label="Select weather city"
              className="p2k-select"
              value={weatherIndex}
              onChange={(e) => setWeatherIndex(Number(e.target.value))}
            >
              {WEATHER_CITIES.map((item, idx) => (
                <option key={item.city} value={idx}>
                  {item.city.split(',')[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="p2k-box-body p2k-weather-body">
            <div className="p2k-weather-temp">{weather.temp}</div>
            <div className="p2k-weather-info">
              <strong>{weather.city}</strong>
              <div>{weather.cond}</div>
              <div className="p2k-muted">
                Hi {weather.high} / Lo {weather.low}
              </div>
            </div>
          </div>
        </div>

        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>COMMUNITY POLL</span>
          </div>
          <div className="p2k-box-body p2k-compact">
            <div className="p2k-poll-q">How do you connect to the Net?</div>
            <div className="p2k-poll-options">
              <button
                type="button"
                className="p2k-poll-btn"
                disabled={voted}
                onClick={() => handleVote('dialup')}
              >
                56k Modem ({Math.round((pollVotes.dialup / totalVotes) * 100)}%)
              </button>
              <button
                type="button"
                className="p2k-poll-btn"
                disabled={voted}
                onClick={() => handleVote('dsl')}
              >
                Cable / DSL ({Math.round((pollVotes.dsl / totalVotes) * 100)}%)
              </button>
              <button
                type="button"
                className="p2k-poll-btn"
                disabled={voted}
                onClick={() => handleVote('t1')}
              >
                School / Work T1 ({Math.round((pollVotes.t1 / totalVotes) * 100)}%)
              </button>
            </div>
            <div className="p2k-muted">Total votes: {totalVotes}</div>
          </div>
        </div>

        <div className="p2k-box">
          <div className="p2k-box-header">
            <span>CLUBS &amp; BOARDS</span>
          </div>
          <div className="p2k-box-body p2k-compact">
            <div className="p2k-muted">
              Active clubs: Webmasters 2000, MP3 &amp; Winamp, Flash Tips
            </div>
            <button
              type="button"
              className="p2k-link"
              onClick={onOpenCommunity}
            >
              Visit Community Boards »
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default PortalHome2000;
