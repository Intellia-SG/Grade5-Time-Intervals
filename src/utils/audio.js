/**
 * Audio Engine for ElevenLabs narration MP3 playback + Web Audio SFX
 */

import { audioMap } from './audioMap.js';

let currentAudio = null;
let queueSymbol = null;

// Segment creation helpers
export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct = (text) => ({ text, style: 'instruction' });

// Stop any currently playing audio narration
export function stopNarration() {
  queueSymbol = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// Speak a single text segment using ElevenLabs pre-generated MP3 asset
async function playSegment(segment, thisSymbol) {
  if (queueSymbol !== thisSymbol) return;

  const rawText = typeof segment === 'string' ? segment : segment?.text;
  if (!rawText) return;

  const text = rawText.trim();

  // Find exact or normalized key in audioMap
  let mappedAssetUrl = audioMap[text];

  if (!mappedAssetUrl) {
    const foundKey = Object.keys(audioMap).find(
      k => k.trim().toLowerCase() === text.toLowerCase()
    );
    if (foundKey) {
      mappedAssetUrl = audioMap[foundKey];
    }
  }

  // Play ElevenLabs pre-generated MP3 audio asset
  if (mappedAssetUrl) {
    try {
      await new Promise((resolve) => {
        const audio = new Audio(mappedAssetUrl);
        currentAudio = audio;

        audio.onended = () => {
          currentAudio = null;
          resolve();
        };

        audio.onerror = () => {
          console.warn('Failed to load ElevenLabs audio asset:', mappedAssetUrl);
          currentAudio = null;
          resolve();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio playback postponed until user interaction:', err);
            resolve();
          });
        }
      });
    } catch (e) {
      console.warn('Error during audio playback:', e);
    }
  } else {
    console.warn('No pre-generated ElevenLabs audio found for text:', text);
  }
}

// Play array of narration segments sequentially
export async function narrate(segments, enabled = true) {
  if (!enabled || !segments || segments.length === 0) {
    stopNarration();
    return;
  }

  stopNarration();
  const thisSymbol = Symbol('narrationQueue');
  queueSymbol = thisSymbol;

  for (const seg of segments) {
    if (queueSymbol !== thisSymbol) break;
    await playSegment(seg, thisSymbol);
    // Short pause between segments
    await new Promise(r => setTimeout(r, 250));
  }
}

// Play browser-synthesized Sound Effects (Beeps, Chimes, Buzzes) using Web Audio API
export function playSFX(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc1.frequency.setValueAtTime(1046.50, now + 0.3); // C6

      osc2.frequency.setValueAtTime(261.63, now);
      osc2.frequency.setValueAtTime(329.63, now + 0.1);
      osc2.frequency.setValueAtTime(392.00, now + 0.2);
      osc2.frequency.setValueAtTime(523.25, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } else if (type === 'incorrect') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'click') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'star') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    // Ignore audio context errors if browser blocks autoplay
  }
}
