import './YearSelector.css';

function YearSelector({
  era,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onRandom,
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
        <span className="bs-step-label">Prev</span>
      </button>

      <div className="bs-year-readout">
        <h1 className="bs-year-value">{era.year}</h1>
        <p className="bs-year-era-name">{era.title}</p>
        <button
          type="button"
          className="bs-random-btn"
          onClick={onRandom}
          title="Jump to a random era (R)"
        >
          Random Era
        </button>
      </div>

      <button
        type="button"
        className="bs-step-btn"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next era"
      >
        <span className="bs-step-label">Next</span>
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

export default YearSelector;
