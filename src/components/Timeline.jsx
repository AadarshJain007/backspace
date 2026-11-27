import './Timeline.css';

function Timeline({ eras, currentIndex, onSelectEra }) {
  return (
    <nav className="bs-timeline" aria-label="Internet eras timeline">
      <ol className="bs-timeline-track">
        {eras.map((era, index) => {
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;

          return (
            <li key={era.id} className="bs-timeline-item">
              <button
                type="button"
                className={`bs-timeline-node ${isActive ? 'is-active' : ''} ${
                  isPast ? 'is-past' : ''
                }`}
                onClick={() => onSelectEra(index)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="bs-timeline-dot" aria-hidden="true" />
                <span className="bs-timeline-year">{era.year}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Timeline;
