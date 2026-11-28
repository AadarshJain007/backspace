import Era1995 from '../eras/era1995/Era1995.jsx';
import Era2000 from '../eras/era2000/Era2000.jsx';
import Era2005 from '../eras/era2005/Era2005.jsx';
import Era2010 from '../eras/era2010/Era2010.jsx';
import Era2015 from '../eras/era2015/Era2015.jsx';
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

  if (era.id === '2000') {
    return <Era2000 isLoading={isLoading} onUrlChange={onUrlChange} />;
  }

  if (era.id === '2005') {
    return <Era2005 isLoading={isLoading} onUrlChange={onUrlChange} />;
  }

  if (era.id === '2010') {
    return <Era2010 isLoading={isLoading} onUrlChange={onUrlChange} />;
  }

  if (era.id === '2015') {
    return <Era2015 isLoading={isLoading} onUrlChange={onUrlChange} />;
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
