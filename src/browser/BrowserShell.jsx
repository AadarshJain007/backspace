import './BrowserShell.css';

function BrowserShell({
  era,
  displayUrl,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onRefresh,
  isLoading,
  isExpanded,
  onToggleExpand,
  isMinimized,
  onToggleMinimize,
  children,
}) {
  const config = era.browserConfig || {};
  const chromeStyle = era.chromeStyle || 'modern-dark';
  const activeUrl = displayUrl || era.url;

  return (
    <section
      className={`bs-shell bs-shell--${chromeStyle} ${
        isMinimized ? 'is-minimized' : ''
      } ${isExpanded ? 'is-expanded' : ''}`}
      aria-label={`Browser window: ${config.windowTitle || era.browser}`}
    >
      
      <div className="bs-shell-topbar">
        <div className="bs-shell-title-group">
          <span className="bs-shell-era-badge">{era.year}</span>
          <span className="bs-shell-title">
            {config.windowTitle || era.browser}
          </span>
        </div>

        <div className="bs-shell-win-controls">
          <button
            type="button"
            className="bs-win-btn"
            onClick={onToggleMinimize}
            aria-label={isMinimized ? 'Restore browser window' : 'Minimize browser window'}
            title={isMinimized ? 'Restore' : 'Minimize'}
          >
            {isMinimized ? '□' : '—'}
          </button>
          <button
            type="button"
            className="bs-win-btn"
            onClick={onToggleExpand}
            aria-label={isExpanded ? 'Exit expanded view' : 'Expand browser view'}
            title={isExpanded ? 'Restore size' : 'Expand'}
          >
            {isExpanded ? '❐' : '▢'}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          
          <div className="bs-shell-toolbar">
            <div className="bs-shell-nav-buttons">
              <button
                type="button"
                className="bs-nav-btn"
                onClick={onBack}
                disabled={!canGoBack}
                aria-label="Back in browser history"
                title="Back"
              >
                {config.backLabel || '←'}
              </button>
              <button
                type="button"
                className="bs-nav-btn"
                onClick={onForward}
                disabled={!canGoForward}
                aria-label="Forward in browser history"
                title="Forward"
              >
                {config.forwardLabel || '→'}
              </button>
              <button
                type="button"
                className={`bs-nav-btn ${isLoading ? 'is-spinning' : ''}`}
                onClick={onRefresh}
                aria-label="Refresh era view"
                title="Refresh"
              >
                {config.refreshLabel || '↻'}
              </button>
            </div>

            <div className="bs-shell-address" aria-label="Address bar">
              {config.addressLabel && (
                <span className="bs-address-label">{config.addressLabel}</span>
              )}
              <span className="bs-protocol-tag">{era.protocol}</span>
              <span className="bs-url-text">{activeUrl}</span>
            </div>

            <div className="bs-shell-res">{era.resolution}</div>
          </div>

          
          <div
            className={`bs-shell-progress ${isLoading ? 'is-active' : ''}`}
            aria-hidden="true"
          />

          
          <div className="bs-shell-content">{children}</div>

          
          <div className="bs-shell-statusbar">
            <span>{isLoading ? `Loading ${era.url}...` : era.preview.status}</span>
            <span>{era.bandwidth}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default BrowserShell;
