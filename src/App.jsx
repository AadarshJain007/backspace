import { useCallback, useEffect, useState } from 'react';
import { ERAS } from './data/eras.js';
import { playEraTransitionSound } from './utils/soundEffects.js';
import Header from './components/Header.jsx';
import IntroExperience from './components/IntroExperience.jsx';
import YearSelector from './components/YearSelector.jsx';
import Timeline from './components/Timeline.jsx';
import EraIndicator from './components/EraIndicator.jsx';
import BrowserShell from './browser/BrowserShell.jsx';
import BrowserViewport from './browser/BrowserViewport.jsx';

function getInitialEraIndex() {
  if (typeof window === 'undefined') return 0;
  const hashId = window.location.hash.replace(/^#/, '').toLowerCase();
  const idx = ERAS.findIndex((e) => e.id === hashId);
  return idx >= 0 ? idx : 0;
}

function App() {
  const [history, setHistory] = useState(() => [getInitialEraIndex()]);
  const [historyPointer, setHistoryPointer] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const [customUrl, setCustomUrl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSecretNote, setShowSecretNote] = useState(false);

  const currentIndex = history[historyPointer];
  const currentEra = ERAS[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ERAS.length - 1;

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
      if (nextIndex === currentIndex) return;
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
    if (currentIndex > 0) {
      navigateToEra(currentIndex - 1);
    }
  }, [currentIndex, navigateToEra]);

  const goNext = useCallback(() => {
    if (currentIndex < ERAS.length - 1) {
      navigateToEra(currentIndex + 1);
    }
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
    document.documentElement.style.setProperty('--era-accent', currentEra.accent);
    if (window.location.hash !== `#${currentEra.id}`) {
      window.history.replaceState(null, '', `#${currentEra.id}`);
    }
  }, [currentEra.accent, currentEra.id]);

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
    if (showIntro) return;

    const handleKeyDown = (event) => {
      if (showSecretNote) {
        if (event.key === 'Escape') {
          event.preventDefault();
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
  }, [showIntro, showSecretNote, goPrev, goNext, goRandom]);

  return (
    <div className="app-layout">
      {showIntro && <IntroExperience onDismiss={() => setShowIntro(false)} />}

      {showSecretNote && (
        <div className="bs-intro-backdrop" role="dialog" aria-modal="true">
          <div className="bs-intro-panel">
            <div className="bs-intro-eyebrow">CURATOR&apos;S MARGIN NOTE</div>
            <h2 className="bs-intro-title">Hidden Details</h2>
            <ul className="bs-intro-instructions">
              <li>1995: Click the &quot;Last updated&quot; date or the tiny π in the footer.</li>
              <li>2005: Click Tom in the Top 8 friends grid.</li>
              <li>Future: Tap the Temporal Echo node.</li>
            </ul>
            <button
              type="button"
              className="bs-intro-cta"
              onClick={() => setShowSecretNote(false)}
            >
              Close Note
            </button>
          </div>
        </div>
      )}

      <Header
        currentIndex={currentIndex}
        totalCount={ERAS.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenIntro={() => setShowIntro(true)}
      />

      <main className="app-main">
        <YearSelector
          era={currentEra}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={goPrev}
          onNext={goNext}
          onRandom={goRandom}
        />

        <Timeline
          eras={ERAS}
          currentIndex={currentIndex}
          onSelectEra={navigateToEra}
        />

        <div
          className={`machine-workspace ${isExpanded ? 'is-expanded' : ''}`}
        >
          {!isExpanded && (
            <EraIndicator
              era={currentEra}
              currentIndex={currentIndex}
              totalCount={ERAS.length}
            />
          )}

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
            onToggleMinimize={() => setIsMinimized((prev) => !prev)}
          >
            <BrowserViewport
              era={currentEra}
              isLoading={isTransitioning}
              refreshTick={refreshTick}
              onUrlChange={setCustomUrl}
              onSelectEraIndex={navigateToEra}
            />
          </BrowserShell>
        </div>
      </main>
    </div>
  );
}

export default App;
