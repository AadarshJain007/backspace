import { useEffect, useState } from 'react';

function CasualGame2010() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPos, setTargetPos] = useState({ x: 45, y: 45 });

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setTargetPos({
      x: 15 + Math.floor(Math.random() * 70),
      y: 15 + Math.floor(Math.random() * 70),
    });
    setRunning(true);
  };

  const handleHit = () => {
    if (!running) return;
    const nextScore = score + 1;
    setScore(nextScore);
    if (nextScore > best) {
      setBest(nextScore);
    }
    setTargetPos({
      x: 12 + Math.floor(Math.random() * 76),
      y: 15 + Math.floor(Math.random() * 70),
    });
  };

  return (
    <div className="s10-card s10-game-card">
      <div className="s10-game-head">
        <div>
          <h3>TapTheDot! (Casual Arcade)</h3>
          <div className="s10-muted">Click the bouncing target before time runs out!</div>
        </div>
        <div className="s10-game-stats">
          <span>Score: <strong>{score}</strong></span>
          <span>Time: <strong>{timeLeft}s</strong></span>
          <span>Best: <strong>{best}</strong></span>
        </div>
      </div>

      <div className="s10-game-arena">
        {running ? (
          <button
            type="button"
            className="s10-game-target"
            style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
            onClick={handleHit}
            aria-label="Hit target"
          >
            ★
          </button>
        ) : (
          <div className="s10-game-overlay">
            <p>
              {timeLeft === 0
                ? `Time's up! Final score: ${score}`
                : 'Ready to play a quick 15-second round?'}
            </p>
            <button type="button" className="s10-btn" onClick={startGame}>
              {timeLeft === 0 ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CasualGame2010;
