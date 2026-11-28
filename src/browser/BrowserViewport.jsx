import Era1995 from '../eras/era1995/Era1995.jsx';
import Era2000 from '../eras/era2000/Era2000.jsx';
import Era2005 from '../eras/era2005/Era2005.jsx';
import Era2010 from '../eras/era2010/Era2010.jsx';
import Era2015 from '../eras/era2015/Era2015.jsx';
import Era2020 from '../eras/era2020/Era2020.jsx';
import Era2026 from '../eras/era2026/Era2026.jsx';
import EraFuture from '../eras/eraFuture/EraFuture.jsx';
import './BrowserViewport.css';

function BrowserViewport({
  era,
  isLoading,
  refreshTick,
  onUrlChange,
  onSelectEraIndex,
}) {
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

  if (era.id === '2020') {
    return <Era2020 isLoading={isLoading} onUrlChange={onUrlChange} />;
  }

  if (era.id === '2026') {
    return <Era2026 isLoading={isLoading} onUrlChange={onUrlChange} />;
  }

  if (era.id === 'future') {
    return (
      <EraFuture
        isLoading={isLoading}
        onJumpTo1995={() => onSelectEraIndex && onSelectEraIndex(0)}
      />
    );
  }

  return null;
}

export default BrowserViewport;
