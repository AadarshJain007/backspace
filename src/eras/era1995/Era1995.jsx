import { useEffect, useState } from 'react';
import Home1995 from './Home1995.jsx';
import Guestbook1995 from './Guestbook1995.jsx';
import Directory1995, { DIRECTORY_SITES } from './Directory1995.jsx';
import Gallery1995 from './Gallery1995.jsx';
import './Era1995.css';

const PAGE_URLS = {
  home: 'http://www.cyberspace.org/~alex/index.html',
  guestbook: 'http://www.cyberspace.org/~alex/guestbook.html',
  directory: 'http://www.cyberspace.org/~alex/directory.html',
  gallery: 'http://www.cyberspace.org/~alex/gallery.html',
  construction: 'http://www.cyberspace.org/~alex/jukebox.html',
};

const WEBRING_STOPS = [
  { id: 'alex-home', label: "Alex's Cyberspace Corner", type: 'home' },
  { id: 'cern', label: 'CERN WorldWideWeb', type: 'site' },
  { id: 'mosaic', label: "NCSA Mosaic What's New", type: 'site' },
  { id: 'html', label: 'HTML 2.0 Quick Reference', type: 'site' },
  { id: 'ascii', label: 'ASCII Art Archive', type: 'site' },
];

function Era1995({ isLoading, refreshTick, onUrlChange }) {
  const [activePage, setActivePage] = useState('home');
  const [activeSiteId, setActiveSiteId] = useState(null);
  const [visitorCount, setVisitorCount] = useState(4819);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Connected at 28,800 bps · Ready'
  );

  useEffect(() => {
    setVisitorCount((prev) => prev + 1);
  }, [refreshTick]);

  useEffect(() => {
    if (!onUrlChange) return;
    if (activePage === 'directory' && activeSiteId && DIRECTORY_SITES[activeSiteId]) {
      onUrlChange(DIRECTORY_SITES[activeSiteId].url);
    } else {
      onUrlChange(PAGE_URLS[activePage] || PAGE_URLS.home);
    }
  }, [activePage, activeSiteId, onUrlChange]);

  const handleNavigate = (page) => {
    setActivePage(page);
    setActiveSiteId(null);
    setStatusMessage(`Loaded ${PAGE_URLS[page] || PAGE_URLS.home}`);
  };

  const handleOpenSite = (siteId) => {
    if (!siteId) {
      setActivePage('directory');
      setActiveSiteId(null);
      setStatusMessage('Viewing Cyberspace Web Directory');
      return;
    }
    setActivePage('directory');
    setActiveSiteId(siteId);
    const site = DIRECTORY_SITES[siteId];
    if (site) {
      setStatusMessage(`Transfer complete: ${site.title}`);
    }
  };

  const handleRandomSite = () => {
    const siteKeys = Object.keys(DIRECTORY_SITES);
    const candidates = siteKeys.filter((key) => key !== activeSiteId);
    const pool = candidates.length > 0 ? candidates : siteKeys;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    handleOpenSite(pick);
  };

  const currentRingIndex =
    activePage === 'directory' && activeSiteId
      ? WEBRING_STOPS.findIndex((stop) => stop.id === activeSiteId)
      : 0;
  const safeRingIndex = currentRingIndex >= 0 ? currentRingIndex : 0;

  const handleWebRingStep = (direction) => {
    const nextIndex =
      (safeRingIndex + direction + WEBRING_STOPS.length) % WEBRING_STOPS.length;
    const target = WEBRING_STOPS[nextIndex];
    if (target.type === 'home') {
      handleNavigate('home');
    } else {
      handleOpenSite(target.id);
    }
  };

  if (isLoading) {
    return (
      <div className="w95-root w95-loading">
        <p>Connecting to 28.8k modem host...</p>
        <p>Receiving HTML 2.0 document...</p>
      </div>
    );
  }

  return (
    <div className={`w95-root ${crtEnabled ? 'is-crt' : ''}`}>
      <div className="w95-topbar-nav">
        <button
          type="button"
          className={`w95-bevel-btn ${activePage === 'home' ? 'is-pressed' : ''}`}
          onClick={() => handleNavigate('home')}
        >
          Home
        </button>
        <button
          type="button"
          className={`w95-bevel-btn ${activePage === 'guestbook' ? 'is-pressed' : ''}`}
          onClick={() => handleNavigate('guestbook')}
        >
          Guestbook
        </button>
        <button
          type="button"
          className={`w95-bevel-btn ${activePage === 'directory' ? 'is-pressed' : ''}`}
          onClick={() => handleNavigate('directory')}
        >
          Web Directory
        </button>
        <button
          type="button"
          className={`w95-bevel-btn ${activePage === 'gallery' ? 'is-pressed' : ''}`}
          onClick={() => handleNavigate('gallery')}
        >
          Image Gallery
        </button>
        <button
          type="button"
          className={`w95-bevel-btn ${activePage === 'construction' ? 'is-pressed' : ''}`}
          onClick={() => handleNavigate('construction')}
        >
          Under Construction
        </button>
        <button
          type="button"
          className="w95-bevel-btn"
          onClick={handleRandomSite}
        >
          Random Site!
        </button>
        <button
          type="button"
          className={`w95-bevel-btn w95-crt-toggle ${crtEnabled ? 'is-pressed' : ''}`}
          onClick={() => {
            setCrtEnabled((prev) => !prev);
            setStatusMessage(
              !crtEnabled ? 'CRT Scanlines: ON' : 'CRT Scanlines: OFF'
            );
          }}
        >
          CRT: {crtEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {activePage === 'home' && (
        <Home1995
          visitorCount={visitorCount}
          onNavigate={handleNavigate}
          onOpenSite={handleOpenSite}
          onRandomSite={handleRandomSite}
        />
      )}

      {activePage === 'guestbook' && (
        <Guestbook1995
          onBackHome={() => handleNavigate('home')}
          onStatusChange={setStatusMessage}
        />
      )}

      {activePage === 'directory' && (
        <Directory1995
          activeSiteId={activeSiteId}
          onOpenSite={handleOpenSite}
          onBackHome={() => handleNavigate('home')}
        />
      )}

      {activePage === 'gallery' && (
        <Gallery1995
          onBackHome={() => handleNavigate('home')}
          onStatusChange={setStatusMessage}
        />
      )}

      {activePage === 'construction' && (
        <div className="w95-section">
          <div className="w95-crumb">
            <button
              type="button"
              className="w95-link-btn"
              onClick={() => handleNavigate('home')}
            >
              ← Back to Alex&apos;s Home Page
            </button>
          </div>
          <h1 className="w95-h1">MIDI Jukebox &amp; Java Corner</h1>
          <table className="w95-construction-box" cellPadding="10">
            <tbody>
              <tr>
                <td>
                  <strong>PARDON OUR PIXEL DUST!</strong>
                  <p className="w95-p">
                    This section is still under heavy construction. I am
                    waiting for my 3.5&quot; floppy disk with SoundBlaster MIDI
                    files to finish uploading over dial-up!
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <hr className="w95-hr" />

      <table className="w95-webring-table" cellPadding="6">
        <tbody>
          <tr>
            <td align="center">
              <div className="w95-webring-title">
                CYBERSPACE BUILDERS WEBRING · Stop {safeRingIndex + 1} of{' '}
                {WEBRING_STOPS.length}
              </div>
              <div className="w95-webring-controls">
                <button
                  type="button"
                  className="w95-link-btn"
                  onClick={() => handleWebRingStep(-1)}
                >
                  [← Prev Site]
                </button>
                <button
                  type="button"
                  className="w95-link-btn"
                  onClick={() => handleNavigate('directory')}
                >
                  [List Sites]
                </button>
                <button
                  type="button"
                  className="w95-link-btn"
                  onClick={handleRandomSite}
                >
                  [Random Site]
                </button>
                <button
                  type="button"
                  className="w95-link-btn"
                  onClick={() => handleWebRingStep(1)}
                >
                  [Next Site →]
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="w95-retro-status" role="status">
        <span>NETSCAPE STATUS:</span> {statusMessage}
      </div>

      <footer className="w95-footer">
        Copyright © 1995 Alex&apos;s Cyberspace Corner · Hand-coded in Notepad
      </footer>
    </div>
  );
}

export default Era1995;
