import './Header.css';

function Header({ currentIndex, totalCount, onOpenIntro }) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <header className="bs-header">
      <div className="bs-brand">
        <span className="bs-brand-mark" aria-hidden="true">
          ⌫
        </span>
        <div>
          <span className="bs-brand-name">BACKSPACE</span>
          <span className="bs-brand-sub">INTERNET TIME MACHINE</span>
        </div>
      </div>

      <div className="bs-header-meta">
        <span className="bs-kbd-hint" title="Use Left and Right arrow keys to travel">
          <kbd>←</kbd> <kbd>→</kbd> <span>NAVIGATE</span>
        </span>
        <span className="bs-era-counter" aria-label={`Era ${currentIndex + 1} of ${totalCount}`}>
          ERA {formattedIndex}/{formattedTotal}
        </span>
        <button
          type="button"
          className="bs-intro-trigger"
          onClick={onOpenIntro}
        >
          CALIBRATION
        </button>
      </div>
    </header>
  );
}

export default Header;
