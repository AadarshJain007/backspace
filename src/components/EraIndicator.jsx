import './EraIndicator.css';

function EraIndicator({ era, currentIndex, totalCount }) {
  return (
    <aside className="bs-era-indicator" aria-label="Current era details">
      <div className="bs-era-badge-row">
        <span className="bs-era-pill">ACTIVE ERA</span>
        <span className="bs-era-index">
          #{String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(totalCount).padStart(2, '0')}
        </span>
      </div>

      <h2 className="bs-era-title">{era.title}</h2>
      <p className="bs-era-tagline">{era.tagline}</p>

      <dl className="bs-era-specs">
        <div className="bs-spec-row">
          <dt>BROWSER</dt>
          <dd>{era.browser}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>PROTOCOL</dt>
          <dd>{era.protocol}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>VIEWPORT</dt>
          <dd>{era.resolution}</dd>
        </div>
        <div className="bs-spec-row">
          <dt>LINK SPEED</dt>
          <dd>{era.bandwidth}</dd>
        </div>
      </dl>

      <div className="bs-era-traits">
        <span className="bs-traits-label">DEFINING SIGNALS</span>
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
