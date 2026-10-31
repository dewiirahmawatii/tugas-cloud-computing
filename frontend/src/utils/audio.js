// Synthesized Web Audio Effects for Emergency Sirens and Phone Tones

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let sirenOscillator = null;
let sirenGain = null;
let sirenInterval = null;

export function playSosSiren() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    stopSosSiren(); // ensure previous stopped

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    sirenOscillator = osc;
    sirenGain = gain;

    let high = true;
    sirenInterval = setInterval(() => {
      if (!sirenOscillator || !ctx) return;
      try {
        const freq = high ? 950 : 550;
        sirenOscillator.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.3);
        high = !high;
      } catch (e) {
        // ignore ramp err
      }
    }, 400);

  } catch (err) {
    console.warn("Audio Context playback prevented:", err);
  }
}

export function stopSosSiren() {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOscillator) {
    try {
      sirenOscillator.stop();
      sirenOscillator.disconnect();
    } catch (e) {}
    sirenOscillator = null;
  }
}

// Phone Ringing Tone
let ringInterval = null;
export function playPhoneRing() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopPhoneRing();

    const ring = () => {
      try {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.value = 440;
        osc2.frequency.value = 480;

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 1.2);
        osc2.stop(ctx.currentTime + 1.2);
      } catch (e) {}
    };

    ring();
    ringInterval = setInterval(ring, 3000);
  } catch (e) {}
}

export function stopPhoneRing() {
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }
}

// Click / Beep confirmation tone
export function playBeep(freq = 880, duration = 0.1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
