import './Header.css';

function Header({
  currentIndex,
  totalCount,
  soundEnabled,
  onToggleSound,
  onOpenIntro,
}) {
  return (
    <header className="bs-header">
      <div className="bs-brand">
        <span className="bs-brand-name">BACKSPACE</span>
        <span className="bs-brand-sub">Internet History Archive</span>
      </div>

      <div className="bs-header-meta">
        <span className="bs-kbd-hint" title="Arrows: navigate · R: random era · M: sound">
          <kbd>←</kbd> <kbd>→</kbd> <kbd>R</kbd>
        </span>
        <span className="bs-era-counter" aria-label={`Era ${currentIndex + 1} of ${totalCount}`}>
          {currentIndex + 1} / {totalCount}
        </span>
        <button
          type="button"
          className="bs-intro-trigger"
          onClick={onToggleSound}
          title="Toggle transition audio (M)"
        >
          {soundEnabled ? 'Sound: On' : 'Sound: Off'}
        </button>
        <button
          type="button"
          className="bs-intro-trigger"
          onClick={onOpenIntro}
        >
          About
        </button>
      </div>
    </header>
  );
}

export default Header;
