import { useCallback, useEffect, useState } from 'react';
import { ERAS } from './data/eras.js';
import { playEraTransitionSound } from './utils/soundEffects.js';
import BrowserShell from './browser/BrowserShell.jsx';
import BrowserViewport from './browser/BrowserViewport.jsx';
import Taskbar from './components/Taskbar.jsx';

function getInitialEraIndex() {
  if (typeof window === 'undefined') return 0;
  const hashId = window.location.hash.replace(/^#/, '').toLowerCase();
  const idx = ERAS.findIndex((e) => e.id === hashId);
  return idx >= 0 ? idx : 0;
}

function App() {
  const [history, setHistory] = useState(() => [getInitialEraIndex()]);
  const [historyPointer, setHistoryPointer] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const [customUrl, setCustomUrl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSecretNote, setShowSecretNote] = useState(false);

  const currentIndex = history[historyPointer];
  const currentEra = ERAS[currentIndex];
  const canGoBack = historyPointer > 0;
  const canGoForward = historyPointer < history.length - 1;

  const triggerTransition = useCallback(
    (eraId) => {
      setIsTransitioning(true);
      playEraTransitionSound(eraId, soundEnabled);
    },
    [soundEnabled]
  );

  const navigateToEra = useCallback(
    (nextIndex) => {
      if (nextIndex === currentIndex) {
        setIsMinimized(false);
        return;
      }
      setHistory((prev) => {
        const sliced = prev.slice(0, historyPointer + 1);
        return [...sliced, nextIndex];
      });
      setHistoryPointer((prev) => prev + 1);
      setIsMinimized(false);
      triggerTransition(ERAS[nextIndex].id);
    },
    [currentIndex, historyPointer, triggerTransition]
  );

  const goPrev = useCallback(() => {
    if (currentIndex > 0) navigateToEra(currentIndex - 1);
  }, [currentIndex, navigateToEra]);

  const goNext = useCallback(() => {
    if (currentIndex < ERAS.length - 1) navigateToEra(currentIndex + 1);
  }, [currentIndex, navigateToEra]);

  const goRandom = useCallback(() => {
    const indices = ERAS.map((_, idx) => idx).filter((idx) => idx !== currentIndex);
    const pick = indices[Math.floor(Math.random() * indices.length)];
    navigateToEra(pick);
  }, [currentIndex, navigateToEra]);

  const handleBrowserBack = useCallback(() => {
    if (canGoBack) {
      const targetIndex = history[historyPointer - 1];
      setHistoryPointer((prev) => prev - 1);
      triggerTransition(ERAS[targetIndex].id);
    }
  }, [canGoBack, history, historyPointer, triggerTransition]);

  const handleBrowserForward = useCallback(() => {
    if (canGoForward) {
      const targetIndex = history[historyPointer + 1];
      setHistoryPointer((prev) => prev + 1);
      triggerTransition(ERAS[targetIndex].id);
    }
  }, [canGoForward, history, historyPointer, triggerTransition]);

  const handleRefresh = useCallback(() => {
    setRefreshTick((prev) => prev + 1);
    triggerTransition(currentEra.id);
  }, [currentEra.id, triggerTransition]);

  useEffect(() => {
    setCustomUrl(null);
  }, [currentEra.id]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => setIsTransitioning(false), 450);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  useEffect(() => {
    document.documentElement.setAttribute('data-year', currentEra.id);
    if (window.location.hash !== `#${currentEra.id}`) {
      window.history.replaceState(null, '', `#${currentEra.id}`);
    }
  }, [currentEra.id]);

  useEffect(() => {
    const handleHashChange = () => {
      const hashId = window.location.hash.replace(/^#/, '').toLowerCase();
      const idx = ERAS.findIndex((e) => e.id === hashId);
      if (idx >= 0 && idx !== currentIndex) {
        navigateToEra(idx);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentIndex, navigateToEra]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showAbout || showSecretNote) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setShowAbout(false);
          setShowSecretNote(false);
        }
        return;
      }

      const tag = event.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        goRandom();
      } else if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setSoundEnabled((prev) => !prev);
      } else if (event.shiftKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setShowSecretNote((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAbout, showSecretNote, goPrev, goNext, goRandom]);

  return (
    <main className="os-desktop">
      <div className="os-icons" aria-label="Desktop icons">
        <button
          type="button"
          className="os-icon"
          onClick={() => setIsMinimized(false)}
        >
          <span className="os-icon-glyph" aria-hidden="true">
            🌐
          </span>
          <span className="os-icon-label">Browser</span>
        </button>

        <button
          type="button"
          className="os-icon"
          onClick={() => setShowAbout(true)}
        >
          <span className="os-icon-glyph" aria-hidden="true">
            📄
          </span>
          <span className="os-icon-label">ReadMe.txt</span>
        </button>

        <button
          type="button"
          className="os-icon"
          onClick={() => setSoundEnabled((prev) => !prev)}
        >
          <span className="os-icon-glyph" aria-hidden="true">
            {soundEnabled ? '🔊' : '🔇'}
          </span>
          <span className="os-icon-label">
            {soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
          </span>
        </button>
      </div>

      <BrowserShell
        era={currentEra}
        displayUrl={customUrl}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onBack={handleBrowserBack}
        onForward={handleBrowserForward}
        onRefresh={handleRefresh}
        isLoading={isTransitioning}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded((prev) => !prev)}
        isMinimized={isMinimized}
        onClose={() => setIsMinimized(true)}
        onOpenAbout={() => setShowAbout(true)}
      >
        <BrowserViewport
          era={currentEra}
          isLoading={isTransitioning}
          refreshTick={refreshTick}
          onUrlChange={setCustomUrl}
          onSelectEraIndex={navigateToEra}
        />
      </BrowserShell>

      <Taskbar
        eras={ERAS}
        currentIndex={currentIndex}
        soundEnabled={soundEnabled}
        onSelectEra={navigateToEra}
        onRandomEra={goRandom}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenBrowser={() => setIsMinimized(false)}
        onOpenAbout={() => setShowAbout(true)}
      />

      {showAbout && (
        <div className="os-modal-backdrop" role="dialog" aria-modal="true">
          <div className="os-modal-card">
            <h2>BACKSPACE OS</h2>
            <p>
              An interactive internet time machine. Switch years in the taskbar
              to transform both the desktop OS and the web inside the browser.
            </p>
            <ul>
              <li>Drag the browser title bar to move the window.</li>
              <li>Use ← / → to step eras, R for random, M for sound.</li>
              <li>Press Shift + B for hidden curator notes.</li>
            </ul>
            <button
              type="button"
              className="os-modal-btn"
              onClick={() => setShowAbout(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSecretNote && (
        <div className="os-modal-backdrop" role="dialog" aria-modal="true">
          <div className="os-modal-card">
            <h2>Curator&apos;s Margin Note</h2>
            <ul>
              <li>1995: Click the &quot;Last updated&quot; date or the tiny π in the footer.</li>
              <li>2005: Click Tom in the Top 8 friends grid.</li>
              <li>Future: Tap the Temporal Echo node.</li>
            </ul>
            <button
              type="button"
              className="os-modal-btn"
              onClick={() => setShowSecretNote(false)}
            >
              Close Note
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
