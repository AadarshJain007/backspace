import './EraIndicator.css';

function EraIndicator({ era, currentIndex, totalCount }) {
  return (
    <aside className="bs-era-indicator" aria-label="Current era details">
      <div className="bs-era-badge-row">
        <span className="bs-era-pill">{era.year}</span>
        <span className="bs-era-index">
          {currentIndex + 1} of {totalCount}
        </span>
      </div>

      <h2 className="bs-era-title">{era.title}</h2>
      <p className="bs-era-tagline">{era.tagline}</p>

      <dl className="bs-era-specs">
        <div className="bs-spec-row">
          <dt>Browser</dt>
          <dd>{era.browser}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>Protocol</dt>
          <dd>{era.protocol}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>Viewport</dt>
          <dd>{era.resolution}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>Connection</dt>
          <dd>{era.bandwidth}</dd>
        </div>
      </dl>

      <div className="bs-era-traits">
        <span className="bs-traits-label">What defined this era</span>
        <ul>
          {era.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default EraIndicator;
