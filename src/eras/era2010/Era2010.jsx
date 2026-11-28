import { useEffect, useState } from 'react';
import Microblog2010 from './Microblog2010.jsx';
import SocialFeed2010 from './SocialFeed2010.jsx';
import PhotoShare2010 from './PhotoShare2010.jsx';
import CasualGame2010 from './CasualGame2010.jsx';
import './Era2010.css';

const TABS = [
  { id: 'chirp', label: 'Chirp', url: 'https://chirp.social2010.local/home' },
  { id: 'wall', label: 'WallFeed', url: 'https://wallfeed.social2010.local/feed' },
  { id: 'photos', label: 'InstaSnap', url: 'https://instasnap.social2010.local/stream' },
  { id: 'game', label: 'Arcade', url: 'https://arcade.social2010.local/tapthedot' },
];

function Era2010({ isLoading, onUrlChange }) {
  const [activeTab, setActiveTab] = useState('chirp');

  useEffect(() => {
    if (!onUrlChange) return;
    const found = TABS.find((t) => t.id === activeTab);
    onUrlChange(found ? found.url : TABS[0].url);
  }, [activeTab, onUrlChange]);

  if (isLoading) {
    return <div className="s10-root s10-loading">Loading social stream...</div>;
  }

  return (
    <div className="s10-root">
      <header className="s10-topbar">
        <div className="s10-brand">SocialWeb 2010</div>
        <nav className="s10-nav" aria-label="2010 social apps">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`s10-nav-btn ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="s10-content">
        {activeTab === 'chirp' && <Microblog2010 />}
        {activeTab === 'wall' && <SocialFeed2010 />}
        {activeTab === 'photos' && <PhotoShare2010 />}
        {activeTab === 'game' && <CasualGame2010 />}
      </div>
    </div>
  );
}

export default Era2010;
