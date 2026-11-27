import './BrowserViewport.css';

function BrowserViewport({ era }) {
  return (
    <section
      className={`bs-browser bs-browser--${era.chromeStyle}`}
      aria-label={`Browser viewport for ${era.year}`}
    >
      <div className="bs-browser-chrome">
        <div className="bs-browser-controls" aria-hidden="true">
          <span className="bs-ctrl" />
          <span className="bs-ctrl" />
          <span className="bs-ctrl" />
        </div>

        <div className="bs-browser-address" aria-label="Simulated URL bar">
          <span className="bs-protocol-tag">{era.protocol}</span>
          <span className="bs-url-text">{era.url}</span>
        </div>

        <div className="bs-browser-res">{era.resolution}</div>
      </div>

      <div className="bs-browser-stage">
        <div className="bs-stage-label">
          <span>ERA PREVIEW CONTAINER</span>
          <span>{era.browser}</span>
        </div>

        <div className="bs-stage-canvas">
          <p className="bs-stage-year-stamp">[{era.year}]</p>
          <h3 className="bs-stage-heading">{era.preview.heading}</h3>
          <p className="bs-stage-body">{era.preview.body}</p>
        </div>
      </div>

      <div className="bs-browser-statusbar">
        <span>{era.preview.status}</span>
        <span>{era.bandwidth}</span>
      </div>
    </section>
  );
}

export default BrowserViewport;
