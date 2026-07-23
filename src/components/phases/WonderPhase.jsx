import React from 'react';
import { Mascot } from '../shared/Mascot.jsx';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { ClockFace } from '../shared/ClockFace.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { getWonderNarration } from '../../utils/narration.js';
import { playSFX } from '../../utils/audio.js';
import { Plane, ArrowRight, Sparkles } from 'lucide-react';

export function WonderPhase({ onNext, audioEnabled = true, format = '12h' }) {
  useAudio(getWonderNarration(), audioEnabled, []);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-6 px-4">
      {/* Phase Badge */}
      <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
        <Sparkles className="w-4 h-4 text-cyan-400" /> Phase 1 — WONDER HOOK
      </span>

      {/* Main Question Card */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-6">
        {/* Animated Flight Path Background */}
        <div className="flex items-center justify-between w-full max-w-md bg-slate-900/80 p-3 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
            <span>🇬🇧 London</span>
            <span className="font-mono text-white">9:45 a.m.</span>
          </div>

          <div className="flex-1 px-4 relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-slate-700"></div>
            <Plane className="w-6 h-6 text-teal-400 absolute animate-pulse" />
          </div>

          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <span>🇺🇸 New York</span>
            <span className="font-mono text-white">?</span>
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-extrabold font-fredoka text-white max-w-2xl leading-relaxed">
          "Sarah's flight leaves London at <span className="text-cyan-300 font-mono">9:45 a.m.</span> and lands in New York <span className="text-teal-300 font-mono">8 hours 20 minutes</span> later. What time does Sarah land?"
        </h2>

        <Mascot
          mood="thinking"
          message="Let's discover how TIME INTERVALS help us solve this!"
          size="lg"
        />

        <TimelineBar
          startMinutes={585} // 9:45 a.m.
          durationMinutes={500} // 8 hr 20 min
          endMinutes={1085} // 6:05 p.m.
          format={format}
        />
      </div>

      <button
        onClick={() => {
          playSFX('click');
          onNext();
        }}
        className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black font-fredoka text-base shadow-xl flex items-center gap-2 transition transform hover:scale-105"
      >
        <span>Explore Story Phase</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
