import React from 'react';
import { Mascot } from './shared/Mascot.jsx';
import { playSFX } from '../utils/audio.js';
import { Sparkles, Target, Award, Clock } from 'lucide-react';

export function IntroScreen({ onStart, phaseComplete = {} }) {
  const phases = [
    { icon: '🤔', name: 'Wonder', desc: 'A time mystery!' },
    { icon: '📖', name: 'Story', desc: 'Global Explorers Club' },
    { icon: '🧪', name: 'Simulate', desc: '3 clock stations' },
    { icon: '🎮', name: 'Play', desc: '100 challenges' },
    { icon: '📓', name: 'Reflect', desc: 'Quiz & review' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 py-8 px-4 text-slate-100 min-h-[80vh] justify-center">
      {/* Top Category Badge */}
      <div className="bg-[#191c4d] border border-[#2e337d] text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold font-fredoka flex items-center gap-1.5 shadow-lg">
        <Sparkles className="w-4 h-4 text-amber-400" /> Grade 5 Math
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center flex flex-col items-center gap-1">
        <h1 className="text-4xl md:text-6xl font-black font-fredoka text-amber-400 tracking-tight drop-shadow-md">
          TimeExplorers
        </h1>
        <h2 className="text-lg md:text-2xl font-bold font-fredoka text-orange-400 tracking-wide mt-1">
          Time Intervals & Schedules up to 24-Hour!
        </h2>
      </div>

      {/* Mascot Speech Bubble Banner */}
      <div className="flex items-center gap-3 bg-[#191c4d] border border-[#2e337d] rounded-2xl px-5 py-3 shadow-xl max-w-lg">
        <Mascot mood="happy" size="sm" />
        <span className="text-sm md:text-base font-bold text-slate-100 font-fredoka flex-1">
          Let's master time intervals, elapsed time & schedules! ⏰
        </span>
      </div>

      {/* 5 Phase Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 w-full">
        {phases.map((p, idx) => {
          return (
            <div
              key={idx}
              className="bg-[#191c4d] border border-[#2e337d] rounded-3xl p-4 flex flex-col items-center text-center justify-center gap-2 hover:scale-105 hover:border-amber-400/50 transition duration-300 shadow-xl min-h-[130px]"
            >
              <span className="text-3xl">{p.icon}</span>
              <h3 className="font-bold text-base text-white font-fredoka">{p.name}</h3>
              <p className="text-xs text-slate-400 font-medium leading-snug">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Big Yellow CTA Button */}
      <button
        onClick={() => {
          playSFX('click');
          onStart();
        }}
        className="py-4 px-10 rounded-full btn-journey text-slate-950 font-black font-fredoka text-xl md:text-2xl shadow-2xl transition transform active:scale-95 flex items-center gap-3 mt-2"
      >
        🚀 Begin Your Journey!
      </button>

      {/* 3 Bottom Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <div className="bg-[#191c4d] border border-[#2e337d] px-4 py-2 rounded-full text-xs font-bold text-slate-200 flex items-center gap-2 shadow">
          <Target className="w-4 h-4 text-rose-400" />
          <span>100 Questions</span>
        </div>

        <div className="bg-[#191c4d] border border-[#2e337d] px-4 py-2 rounded-full text-xs font-bold text-slate-200 flex items-center gap-2 shadow">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>12h / 24h & Schedules</span>
        </div>

        <div className="bg-[#191c4d] border border-[#2e337d] px-4 py-2 rounded-full text-xs font-bold text-slate-200 flex items-center gap-2 shadow">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Badges & XP</span>
        </div>
      </div>
    </div>
  );
}
