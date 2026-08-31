let ctx: AudioContext | null = null;
let alarmTimer: number | null = null;
let active: AudioNode[] = [];

function audio() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function stopNodes() {
  for (const n of active) {
    try {
      n.disconnect();
    } catch {
      /* already down */
    }
  }
  active = [];
}

export function stopAlarm() {
  if (alarmTimer != null) {
    window.clearInterval(alarmTimer);
    alarmTimer = null;
  }
  stopNodes();
}

function beep(frequency: number, start: number, duration: number, gain = 0.22) {
  const ac = audio();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = frequency;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
  active.push(osc, g);
}

function burst() {
  const ac = audio();
  const t = ac.currentTime + 0.01;
  // IEC-style high-priority medical alarm: three pulses, two tones
  beep(960, t, 0.16, 0.28);
  beep(770, t + 0.2, 0.16, 0.28);
  beep(960, t + 0.4, 0.18, 0.3);
}

export function startMismatchAlarm() {
  stopAlarm();
  burst();
  alarmTimer = window.setInterval(burst, 900);
}

export function playMatchChime() {
  stopAlarm();
  const ac = audio();
  const t = ac.currentTime + 0.01;
  beep(523.25, t, 0.12, 0.12);
  beep(659.25, t + 0.12, 0.12, 0.12);
  beep(783.99, t + 0.24, 0.22, 0.14);
}

export function playClick() {
  const ac = audio();
  beep(1400, ac.currentTime, 0.04, 0.05);
}
