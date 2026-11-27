import { useEffect, useState } from 'react';
import TubeBox from './TubeBox.jsx';
import MySpace2005 from './MySpace2005.jsx';
import TagDigg from './TagDigg.jsx';
import FlickShot from './FlickShot.jsx';
import FeedPulse from './FeedPulse.jsx';
import './Era2005.css';

const APPS = [
  { id: 'tubebox', label: 'TubeBox', url: 'http://tubebox.web2.local/watch' },
  { id: 'mycorner', label: 'MyCorner', url: 'http://mycorner.web2.local/alex' },
  { id: 'tagdigg', label: 'digg.tag', url: 'http://diggtag.web2.local/popular' },
  { id: 'flickshot', label: 'FlickShot', url: 'http://flickshot.web2.local/explore' },
  { id: 'feedpulse', label: 'FeedPulse RSS', url: 'http://feedpulse.web2.local/reader' },
];

function Era2005({ isLoading, onUrlChange }) {
  const [activeApp, setActiveApp] = useState('tubebox');

  useEffect(() => {
    if (!onUrlChange) return;
    const found = APPS.find((app) => app.id === activeApp);
    onUrlChange(found ? found.url : APPS[0].url);
  }, [activeApp, onUrlChange]);

  if (isLoading) {
    return (
      <div className="w2-root w2-loading">
        Fetching AJAX fragments...
      </div>
    );
  }

  return (
    <div className="w2-root">
      <header className="w2-header">
        <div className="w2-brand">
          <span className="w2-brand-name">Web 2.0</span>
          <span className="w2-beta-ribbon">BETA</span>
        </div>

        <nav className="w2-tabs" aria-label="Web 2.0 applications">
          {APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              className={`w2-tab ${activeApp === app.id ? 'is-active' : ''}`}
              onClick={() => setActiveApp(app.id)}
            >
              {app.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="w2-stage">
        {activeApp === 'tubebox' && <TubeBox />}
        {activeApp === 'mycorner' && <MySpace2005 />}
        {activeApp === 'tagdigg' && <TagDigg />}
        {activeApp === 'flickshot' && <FlickShot />}
        {activeApp === 'feedpulse' && <FeedPulse />}
      </div>
    </div>
  );
}

export default Era2005;
