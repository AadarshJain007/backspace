import { useState } from 'react';
import './EraFuture.css';

function EraFuture({ isLoading, onJumpTo1995 }) {
  const [echoVisible, setEchoVisible] = useState(false);

  if (isLoading) {
    return (
      <div className="ef-root ef-loading">
        Synchronizing neural mesh...
      </div>
    );
  }

  return (
    <div className="ef-root">
      <div className="ef-field">
        <div className="ef-pulse-badge">INTENT FIELD · UNBOUNDED</div>
        <h2>Post-Browser Canvas</h2>
        <p>
          Tabs, URLs, and fixed frames have dissolved into contextual memory
          surfaces.
        </p>

        <button
          type="button"
          className="ef-echo-node"
          onClick={() => setEchoVisible((prev) => !prev)}
        >
          Temporal Echo · 1995 ↔ Future
        </button>

        {echoVisible && (
          <div className="ef-echo-card">
            <p>
              &quot;Every future interface eventually becomes someone else&apos;s
              nostalgia.&quot;
            </p>
            <button
              type="button"
              className="ef-loop-btn"
              onClick={onJumpTo1995}
            >
              Loop back to 1995 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EraFuture;
