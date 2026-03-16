// ═══════════════════════════════════════════════════════════
//  SOUND ENGINE – Web Audio API
//  Synthesized SFX + Music for Jeopardy Filosofía
// ═══════════════════════════════════════════════════════════

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ───────── Utility: play a tone ─────────
function playTone(freq, duration, type = 'sine', volume = 0.15, delay = 0) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

// ───────── Utility: play a sequence of notes ─────────
function playMelody(notes, baseVolume = 0.12) {
  let time = 0;
  for (const [freq, dur, type] of notes) {
    playTone(freq, dur, type || 'sine', baseVolume, time);
    time += dur * 0.85;
  }
}

// ═══════════════════════════════════════════
//  GAME SOUND EFFECTS
// ═══════════════════════════════════════════

export function sfxCardSelect() {
  playTone(880, 0.08, 'sine', 0.1);
  playTone(1320, 0.12, 'sine', 0.08, 0.06);
}

export function sfxRevealAnswer() {
  const notes = [
    [523, 0.12, 'triangle'],
    [659, 0.12, 'triangle'],
    [784, 0.15, 'triangle'],
    [1047, 0.3, 'sine'],
  ];
  playMelody(notes, 0.1);
}

export function sfxCorrect() {
  const notes = [
    [523, 0.1, 'sine'],
    [659, 0.1, 'sine'],
    [784, 0.1, 'sine'],
    [1047, 0.25, 'sine'],
  ];
  playMelody(notes, 0.12);
}

export function sfxWrong() {
  playTone(200, 0.15, 'sawtooth', 0.08);
  playTone(180, 0.15, 'sawtooth', 0.08, 0.12);
  playTone(150, 0.4, 'sawtooth', 0.06, 0.24);
}

export function sfxGameStart() {
  const notes = [
    [392, 0.15, 'triangle'],
    [523, 0.15, 'triangle'],
    [659, 0.15, 'triangle'],
    [784, 0.2, 'triangle'],
    [1047, 0.4, 'sine'],
  ];
  playMelody(notes, 0.1);
}

export function sfxBoardAppear() {
  for (let i = 0; i < 6; i++) {
    playTone(300 + i * 80, 0.06, 'sine', 0.04, i * 0.04);
  }
}

export function sfxHover() {
  playTone(600, 0.04, 'sine', 0.03);
}

export function sfxModalOpen() {
  playTone(440, 0.08, 'triangle', 0.06);
  playTone(660, 0.12, 'triangle', 0.05, 0.06);
}

export function sfxModalClose() {
  playTone(660, 0.08, 'triangle', 0.05);
  playTone(440, 0.12, 'triangle', 0.04, 0.06);
}

// ═══════════════════════════════════════════
//  VICTORY FANFARE
// ═══════════════════════════════════════════
export function sfxVictoryFanfare() {
  // Triumphant fanfare melody
  const notes = [
    [392, 0.2, 'triangle'],  // G
    [392, 0.2, 'triangle'],  // G
    [392, 0.2, 'triangle'],  // G
    [523, 0.5, 'sine'],      // C
    [392, 0.2, 'triangle'],  // G
    [494, 0.2, 'triangle'],  // B
    [523, 0.8, 'sine'],      // C
  ];
  playMelody(notes, 0.1);
}

// ═══════════════════════════════════════════
//  STAR WARS INSPIRED EPIC THEME
//  (simplified fanfare for crawl credits)
// ═══════════════════════════════════════════
let crawlInterval = null;

export function playStarWarsCrawlTheme() {
  stopCrawlTheme();

  // Main Star Wars-inspired melody, played slower for more epic feel
  const theme = [
    // Intro / pick-up
    [466, 0.6, 'triangle'],   // Bb4
    [698, 0.6, 'triangle'],   // F5
    [622, 0.25, 'triangle'],  // Eb5
    [587, 0.25, 'triangle'],  // D5
    [523, 0.25, 'triangle'],  // C5
    [932, 0.8, 'sine'],       // Bb5

    [698, 0.5, 'triangle'],   // F5
    [622, 0.25, 'triangle'],  // Eb5
    [587, 0.25, 'triangle'],  // D5
    [523, 0.25, 'triangle'],  // C5
    [932, 0.8, 'sine'],       // Bb5

    [698, 0.5, 'triangle'],   // F5
    [622, 0.25, 'triangle'],  // Eb5
    [587, 0.25, 'triangle'],  // D5
    [622, 0.25, 'triangle'],  // Eb5
    [523, 0.9, 'sine'],       // C5

    // Repeat section for extra length
    [466, 0.4, 'triangle'],   // Bb4
    [466, 0.2, 'triangle'],   // Bb4
    [466, 0.2, 'triangle'],   // Bb4
    [698, 0.6, 'triangle'],   // F5
    [622, 0.25, 'triangle'],  // Eb5
    [587, 0.25, 'triangle'],  // D5
    [523, 0.25, 'triangle'],  // C5
    [932, 0.8, 'sine'],       // Bb5

    [698, 0.5, 'triangle'],   // F5
    [622, 0.25, 'triangle'],  // Eb5
    [587, 0.25, 'triangle'],  // D5
    [622, 0.25, 'triangle'],  // Eb5
    [523, 1.2, 'sine'],       // C5 (long resolve)
  ];

  playMelody(theme, 0.13);

  // Extend ambient bass drone to last for the rest of the 50s crawl
  let droneCount = 0;
  // Start drone after the melody finishes (~10 seconds in)
  setTimeout(() => {
    crawlInterval = setInterval(() => {
      droneCount++;
      if (droneCount > 110) { // Approx 55 seconds of drone
        stopCrawlTheme();
        return;
      }
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = [116, 146, 130, 146][droneCount % 4];
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    }, 500);
  }, 12500);
}

export function stopCrawlTheme() {
  if (crawlInterval) {
    clearInterval(crawlInterval);
    crawlInterval = null;
  }
}

// ═══════════════════════════════════════════
//  AMBIENT GAME MUSIC (gentle loop)
// ═══════════════════════════════════════════
let bgMusicInterval = null;
let bgMusicPlaying = false;

export function startBackgroundMusic() {
  if (bgMusicPlaying) return;
  bgMusicPlaying = true;

  // Gentle ambient pad — rotating through philosophical-sounding chords
  const chords = [
    [261, 329, 392],  // C major
    [293, 369, 440],  // D major
    [220, 277, 329],  // A minor
    [261, 311, 392],  // C minor
    [246, 311, 369],  // B minor
    [261, 329, 392],  // C major
  ];
  let chordIndex = 0;

  function playChord() {
    if (!bgMusicPlaying) return;
    const ctx = getCtx();
    const chord = chords[chordIndex % chords.length];
    chordIndex++;

    for (const freq of chord) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3);
    }
  }

  playChord(); // play immediately
  bgMusicInterval = setInterval(playChord, 3000);
}

export function stopBackgroundMusic() {
  bgMusicPlaying = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

// ═══════════════════════════════════════════
//  JEOPARDY THINKING MUSIC (tick-tock)
// ═══════════════════════════════════════════
let thinkingInterval = null;

export function startThinkingMusic() {
  stopThinkingMusic();
  let tick = true;

  function playTick() {
    playTone(tick ? 440 : 330, 0.08, 'sine', 0.04);
    tick = !tick;
  }

  playTick();
  thinkingInterval = setInterval(playTick, 460);
}

export function stopThinkingMusic() {
  if (thinkingInterval) {
    clearInterval(thinkingInterval);
    thinkingInterval = null;
  }
}

// Resume audio context on first user interaction
export function initAudio() {
  getCtx();
}
