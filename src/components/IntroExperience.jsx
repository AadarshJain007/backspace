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
        <div className="bs-intro-eyebrow">TEMPORAL ARCHIVE · INITIALIZING</div>
        <h1 id="intro-title" className="bs-intro-title">
          BACKSPACE
        </h1>
        <p className="bs-intro-copy">
          An interactive internet time machine. Travel across three decades of
          web history—from 1995 dial-up hypertext to post-browser spatial
          canvases—and feel how interfaces, protocols, and browsers evolved.
        </p>

        <ul className="bs-intro-instructions">
          <li>Select any milestone along the timeline to jump eras.</li>
          <li>
            Use <kbd>←</kbd> and <kbd>→</kbd> arrow keys or the central selector
            to step through time.
          </li>
        </ul>

        <button
          type="button"
          className="bs-intro-cta"
          onClick={onDismiss}
          autoFocus
        >
          ENTER TIME MACHINE →
        </button>
      </div>
    </div>
  );
}

export default IntroExperience;
