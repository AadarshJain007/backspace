import { Suspense, lazy } from 'react';
import './BrowserViewport.css';

const Era1995 = lazy(() => import('../eras/era1995/Era1995.jsx'));
const Era2000 = lazy(() => import('../eras/era2000/Era2000.jsx'));
const Era2005 = lazy(() => import('../eras/era2005/Era2005.jsx'));
const Era2010 = lazy(() => import('../eras/era2010/Era2010.jsx'));
const Era2015 = lazy(() => import('../eras/era2015/Era2015.jsx'));
const Era2020 = lazy(() => import('../eras/era2020/Era2020.jsx'));
const Era2026 = lazy(() => import('../eras/era2026/Era2026.jsx'));
const EraFuture = lazy(() => import('../eras/eraFuture/EraFuture.jsx'));

function BrowserViewport({
  era,
  isLoading,
  refreshTick,
  onUrlChange,
  onSelectEraIndex,
}) {
  const fallback = (
    <div className="bs-stage">
      <div className="bs-stage-loading">
        <span>Loading {era.year}...</span>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      {era.id === '1995' && (
        <Era1995
          isLoading={isLoading}
          refreshTick={refreshTick}
          onUrlChange={onUrlChange}
        />
      )}
      {era.id === '2000' && (
        <Era2000 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === '2005' && (
        <Era2005 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === '2010' && (
        <Era2010 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === '2015' && (
        <Era2015 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === '2020' && (
        <Era2020 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === '2026' && (
        <Era2026 isLoading={isLoading} onUrlChange={onUrlChange} />
      )}
      {era.id === 'future' && (
        <EraFuture
          isLoading={isLoading}
          onJumpTo1995={() => onSelectEraIndex && onSelectEraIndex(0)}
        />
      )}
    </Suspense>
  );
}

export default BrowserViewport;
