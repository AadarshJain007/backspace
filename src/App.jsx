import { useCallback, useEffect, useState } from 'react';
import { ERAS } from './data/eras.js';
import Header from './components/Header.jsx';
import IntroExperience from './components/IntroExperience.jsx';
import YearSelector from './components/YearSelector.jsx';
import Timeline from './components/Timeline.jsx';
import EraIndicator from './components/EraIndicator.jsx';
import BrowserViewport from './browser/BrowserViewport.jsx';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const currentEra = ERAS[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ERAS.length - 1;

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(ERAS.length - 1, prev + 1));
  }, []);

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
          onSelectEra={setCurrentIndex}
        />

        <div className="machine-workspace">
          <EraIndicator
            era={currentEra}
            currentIndex={currentIndex}
            totalCount={ERAS.length}
          />
          <BrowserViewport era={currentEra} />
        </div>
      </main>
    </div>
  );
}

export default App;
