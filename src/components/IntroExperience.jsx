import { useEffect } from 'react';
import './IntroExperience.css';

function IntroExperience({ onDismiss }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      className="bs-intro-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
    >
      <div className="bs-intro-panel">
        <div className="bs-intro-eyebrow">1995 — FUTURE</div>
        <h1 id="intro-title" className="bs-intro-title">
          BACKSPACE
        </h1>
        <p className="bs-intro-copy">
          Explore how websites, browsers, and everyday interactions evolved
          across the web—from 1995 dial-up pages and 2000 portals to Web 2.0,
          early social media, and modern interfaces.
        </p>

        <ul className="bs-intro-instructions">
          <li>Click any year on the timeline to jump to that era.</li>
          <li>
            Use <kbd>←</kbd> and <kbd>→</kbd> arrow keys or Prev / Next to
            step through time.
          </li>
        </ul>

        <button
          type="button"
          className="bs-intro-cta"
          onClick={onDismiss}
          autoFocus
        >
          Start Browsing →
        </button>
      </div>
    </div>
  );
}

export default IntroExperience;
