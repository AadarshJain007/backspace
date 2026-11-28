import { useEffect, useState } from 'react';
import Video2020 from './Video2020.jsx';
import Stream2020 from './Stream2020.jsx';
import Forum2020 from './Forum2020.jsx';
import Workspace2020 from './Workspace2020.jsx';
import './Era2020.css';

const APPS = [
  { id: 'video', label: 'StreamTube', url: 'https://streamtube.app/watch' },
  { id: 'stream', label: 'CineGrid', url: 'https://cinegrid.tv/browse' },
  { id: 'forum', label: 'DevBoard', url: 'https://devboard.community/r/web' },
  { id: 'workspace', label: 'FlowIssue', url: 'https://flowissue.app/team/bsp' },
];

function Era2020({ isLoading, onUrlChange }) {
  const [activeApp, setActiveApp] = useState('video');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (!onUrlChange) return;
    const found = APPS.find((a) => a.id === activeApp);
    onUrlChange(found ? found.url : APPS[0].url);
  }, [activeApp, onUrlChange]);

  if (isLoading) {
    return (
      <div className={`e20-root is-${theme} e20-loading`}>
        Connecting via HTTP/2...
      </div>
    );
  }

  return (
    <div className={`e20-root is-${theme}`}>
      <header className="e20-header">
        <div className="e20-brand">2020 Web</div>

        <nav className="e20-nav" aria-label="2020 apps">
          {APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              className={`e20-nav-btn ${activeApp === app.id ? 'is-active' : ''}`}
              onClick={() => setActiveApp(app.id)}
            >
              {app.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="e20-pill-btn"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? '☀ Light' : '☾ Dark'}
        </button>
      </header>

      <div className="e20-stage">
        {activeApp === 'video' && <Video2020 />}
        {activeApp === 'stream' && <Stream2020 />}
        {activeApp === 'forum' && <Forum2020 />}
        {activeApp === 'workspace' && <Workspace2020 />}
      </div>
    </div>
  );
}

export default Era2020;
