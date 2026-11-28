let sharedAudioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      sharedAudioCtx = new Ctx();
    }
  }
  return sharedAudioCtx;
}

function playTone(freq, duration, type, volume, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const startAt = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startAt);
    osc.stop(startAt + duration);
  } catch {
    return;
  }
}

export function playEraTransitionSound(eraId, enabled) {
  if (!enabled) return;
  if (eraId === '1995' || eraId === '2000') {
    playTone(1180, 0.08, 'square', 0.025, 0);
    playTone(1960, 0.11, 'sawtooth', 0.02, 0.09);
    playTone(1540, 0.14, 'square', 0.02, 0.21);
    return;
  }
  if (eraId === '2005' || eraId === '2010') {
    playTone(440, 0.1, 'sine', 0.035, 0);
    playTone(554.37, 0.14, 'sine', 0.035, 0.08);
    return;
  }
  if (eraId === 'future') {
    playTone(320, 0.16, 'triangle', 0.03, 0);
    playTone(640, 0.2, 'sine', 0.03, 0.1);
    return;
  }
  playTone(523.25, 0.09, 'sine', 0.03, 0);
  playTone(659.25, 0.12, 'sine', 0.025, 0.07);
}
