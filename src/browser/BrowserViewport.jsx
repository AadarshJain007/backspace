import Era1995 from '../eras/era1995/Era1995.jsx';
import './BrowserViewport.css';

function BrowserViewport({ era, isLoading, refreshTick, onUrlChange }) {
  if (era.id === '1995') {
    return (
      <Era1995
        isLoading={isLoading}
        refreshTick={refreshTick}
        onUrlChange={onUrlChange}
      />
    );
  }

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
