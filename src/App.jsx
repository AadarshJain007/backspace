import { useCallback, useEffect, useState } from 'react';
import { ERAS } from './data/eras.js';
import Header from './components/Header.jsx';
import IntroExperience from './components/IntroExperience.jsx';
import YearSelector from './components/YearSelector.jsx';
import Timeline from './components/Timeline.jsx';
import EraIndicator from './components/EraIndicator.jsx';
import BrowserShell from './browser/BrowserShell.jsx';
import BrowserViewport from './browser/BrowserViewport.jsx';

function App() {
  const [history, setHistory] = useState([0]);
  const [historyPointer, setHistoryPointer] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const currentIndex = history[historyPointer];
  const currentEra = ERAS[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ERAS.length - 1;

  const canGoBack = historyPointer > 0;
  const canGoForward = historyPointer < history.length - 1;

  const navigateToEra = useCallback(
    (nextIndex) => {
      if (nextIndex === currentIndex) return;
      setHistory((prev) => {
        const sliced = prev.slice(0, historyPointer + 1);
        return [...sliced, nextIndex];
      });
      setHistoryPointer((prev) => prev + 1);
      setIsMinimized(false);
    },
    [currentIndex, historyPointer]
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

  const handleBrowserBack = useCallback(() => {
    if (canGoBack) {
      setHistoryPointer((prev) => prev - 1);
    }
  }, [canGoBack]);

  const handleBrowserForward = useCallback(() => {
    if (canGoForward) {
      setHistoryPointer((prev) => prev + 1);
    }
  }, [canGoForward]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  useEffect(() => {
    if (!isRefreshing) return;
    const timer = setTimeout(() => setIsRefreshing(false), 450);
    return () => clearTimeout(timer);
  }, [isRefreshing]);

  useEffect(() => {
    document.documentElement.style.setProperty('--era-accent', currentEra.accent);
  }, [currentEra.accent]);

  useEffect(() => {
    if (showIntro) return;

    const handleKeyDown = (event) => {
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, goPrev, goNext]);

  return (
    <div className="app-layout">
      {showIntro && <IntroExperience onDismiss={() => setShowIntro(false)} />}

      <Header
        currentIndex={currentIndex}
        totalCount={ERAS.length}
        onOpenIntro={() => setShowIntro(true)}
      />

      <main className="app-main">
        <YearSelector
          era={currentEra}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={goPrev}
          onNext={goNext}
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
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            onBack={handleBrowserBack}
            onForward={handleBrowserForward}
            onRefresh={handleRefresh}
            isLoading={isRefreshing}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded((prev) => !prev)}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized((prev) => !prev)}
          >
            <BrowserViewport era={currentEra} isLoading={isRefreshing} />
          </BrowserShell>
        </div>
      </main>
    </div>
  );
}

export default App;
