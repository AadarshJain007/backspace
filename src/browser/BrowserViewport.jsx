import './BrowserViewport.css';

function BrowserViewport({ era, isLoading }) {
  return (
    <div className={`bs-stage bs-stage--${era.chromeStyle}`}>
      <div className="bs-stage-label">
        <span>ERA CONTENT VIEWPORT</span>
        <span>{era.browser}</span>
      </div>

      <div className="bs-stage-canvas">
        {isLoading ? (
          <div className="bs-stage-loading">
            <span className="bs-stage-year-stamp">[{era.year}]</span>
            <p>Connecting to {era.url}...</p>
          </div>
        ) : (
          <>
            <p className="bs-stage-year-stamp">[{era.year}]</p>
            <h3 className="bs-stage-heading">{era.preview.heading}</h3>
            <p className="bs-stage-body">{era.preview.body}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default BrowserViewport;
