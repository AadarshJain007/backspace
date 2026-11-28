import { useEffect, useState } from 'react';
import './Taskbar.css';

function Taskbar({
  eras,
  currentIndex,
  soundEnabled,
  onSelectEra,
  onRandomEra,
  onToggleSound,
  onOpenBrowser,
  onOpenAbout,
}) {
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    update();
    const timer = setInterval(update, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {startOpen && (
        <div className="os-start-menu" role="menu">
          <div className="os-start-banner">BACKSPACE OS</div>
          <div className="os-start-years">
            {eras.map((era, idx) => (
              <button
                key={era.id}
                type="button"
                className={`os-start-item ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => {
                  onSelectEra(idx);
                  setStartOpen(false);
                }}
              >
                {era.year}
              </button>
            ))}
          </div>
          <div className="os-start-sep" />
          <button
            type="button"
            className="os-start-item"
            onClick={() => {
              onRandomEra();
              setStartOpen(false);
            }}
          >
            🎲 Random Era (R)
          </button>
          <button
            type="button"
            className="os-start-item"
            onClick={() => {
              onOpenBrowser();
              setStartOpen(false);
            }}
          >
            🌐 Open Browser Window
          </button>
          <button
            type="button"
            className="os-start-item"
            onClick={() => {
              onToggleSound();
              setStartOpen(false);
            }}
          >
            {soundEnabled ? '🔊 Sound: ON (M)' : '🔇 Sound: OFF (M)'}
          </button>
          <button
            type="button"
            className="os-start-item"
            onClick={() => {
              onOpenAbout();
              setStartOpen(false);
            }}
          >
            📄 About Backspace
          </button>
        </div>
      )}

      <nav className="os-taskbar" aria-label="Taskbar and year picker">
        <button
          type="button"
          className="os-start-btn"
          onClick={() => setStartOpen((prev) => !prev)}
          aria-expanded={startOpen}
        >
          <span aria-hidden="true">⊞</span>
          <span>Start</span>
        </button>

        <div className="os-year-strip">
          {eras.map((era, idx) => (
            <button
              key={era.id}
              type="button"
              className={`os-year-btn ${idx === currentIndex ? 'is-active' : ''}`}
              onClick={() => {
                onSelectEra(idx);
                setStartOpen(false);
              }}
              aria-current={idx === currentIndex ? 'step' : undefined}
            >
              {era.year}
            </button>
          ))}
        </div>

        <div className="os-tray">
          <button
            type="button"
            className="os-tray-sound"
            onClick={onToggleSound}
            title="Toggle sound (M)"
            aria-label="Toggle sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <span className="os-tray-clock">{clock}</span>
        </div>
      </nav>
    </>
  );
}

export default Taskbar;
