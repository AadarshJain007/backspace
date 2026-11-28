import { useEffect, useRef, useState } from 'react';
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
  onClose,
  onOpenAbout,
  children,
}) {
  const config = era.browserConfig || {};
  const activeUrl = displayUrl || era.url;
  const winRef = useRef(null);
  const [pos, setPos] = useState(null);
  const dragState = useRef({ active: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragState.current.active) return;
      setPos({
        x: Math.max(0, e.clientX - dragState.current.offsetX),
        y: Math.max(0, e.clientY - dragState.current.offsetY),
      });
    };
    const handleUp = () => {
      dragState.current.active = false;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  const startDrag = (e) => {
    if (isExpanded || e.target.closest('button') || !winRef.current) return;
    const rect = winRef.current.getBoundingClientRect();
    dragState.current = {
      active: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  if (isMinimized) {
    return null;
  }

  const inlinePos =
    pos && !isExpanded ? { left: `${pos.x}px`, top: `${pos.y}px` } : undefined;

  return (
    <section
      ref={winRef}
      style={inlinePos}
      className={`os-window ${isExpanded ? 'is-maximized' : ''}`}
      aria-label={`Browser window: ${config.windowTitle || era.browser}`}
    >
      <header className="os-titlebar" onMouseDown={startDrag}>
        <div className="os-titlebar-left">
          <div className="os-traffic-lights" aria-hidden="true">
            <button
              type="button"
              className="os-tl os-tl-close"
              onClick={onClose}
              title="Close"
            />
            <button
              type="button"
              className="os-tl os-tl-min"
              onClick={onClose}
              title="Minimize"
            />
            <button
              type="button"
              className="os-tl os-tl-max"
              onClick={onToggleExpand}
              title="Maximize"
            />
          </div>
          <span aria-hidden="true">🌐</span>
          <span className="os-titlebar-text">
            {config.windowTitle || era.browser}
          </span>
        </div>

        <div className="os-win-controls">
          <button
            type="button"
            className="os-win-btn"
            onClick={onClose}
            aria-label="Minimize window"
          >
            _
          </button>
          <button
            type="button"
            className="os-win-btn"
            onClick={onToggleExpand}
            aria-label="Maximize window"
          >
            □
          </button>
          <button
            type="button"
            className="os-win-btn os-win-btn-close"
            onClick={onClose}
            aria-label="Close window"
          >
            ×
          </button>
        </div>
      </header>

      <div className="os-menubar" role="menubar">
        <button type="button" className="os-menu-item" onClick={onRefresh}>
          File
        </button>
        <button type="button" className="os-menu-item" onClick={onToggleExpand}>
          View
        </button>
        <button type="button" className="os-menu-item" onClick={onRefresh}>
          Reload
        </button>
        <button type="button" className="os-menu-item" onClick={onOpenAbout}>
          Help
        </button>
      </div>

      <div className="os-addressbar">
        <div className="os-nav-group">
          <button
            type="button"
            className="os-nav-btn"
            onClick={onBack}
            disabled={!canGoBack}
            title="Back"
          >
            {config.backLabel || '←'}
          </button>
          <button
            type="button"
            className="os-nav-btn"
            onClick={onForward}
            disabled={!canGoForward}
            title="Forward"
          >
            {config.forwardLabel || '→'}
          </button>
          <button
            type="button"
            className="os-nav-btn"
            onClick={onRefresh}
            title="Refresh"
          >
            {config.refreshLabel || '↻'}
          </button>
        </div>

        <div className="os-address-box">
          <span className="os-protocol-tag">{era.protocol}</span>
          <span className="os-url-text">{activeUrl}</span>
        </div>

        <button type="button" className="os-go-btn" onClick={onRefresh}>
          Go
        </button>
      </div>

      <div className="os-viewport">
        {isLoading && (
          <div className="os-connecting" role="status" aria-live="polite">
            <div className="os-connecting-box">
              <div>{era.loadingMessage || 'Connecting...'}</div>
              <div className="os-progress-track">
                <div className="os-progress-fill" />
              </div>
            </div>
          </div>
        )}
        <div className="os-viewport-inner">{children}</div>
      </div>

      <footer className="os-statusbar">
        <span>
          {isLoading
            ? era.loadingMessage || `Loading ${activeUrl}...`
            : era.tagline}
        </span>
        <span>{era.bandwidth}</span>
      </footer>
    </section>
  );
}

export default BrowserShell;
