import './YearSelector.css';

function YearSelector({
  era,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}) {
  return (
    <section className="bs-year-selector" aria-label="Era selector">
      <button
        type="button"
        className="bs-step-btn"
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous era"
      >
        <span aria-hidden="true">←</span>
        <span className="bs-step-label">PREV</span>
      </button>

      <div className="bs-year-readout">
        <span className="bs-year-kicker">TEMPORAL COORDINATE</span>
        <h1 className="bs-year-value">{era.year}</h1>
        <p className="bs-year-era-name">{era.title}</p>
      </div>

      <button
        type="button"
        className="bs-step-btn"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next era"
      >
        <span className="bs-step-label">NEXT</span>
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

export default YearSelector;
