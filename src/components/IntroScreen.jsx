import React from 'react';
import { Mascot } from './shared/Mascot.jsx';
import { playSFX } from '../utils/audio.js';
import { Sparkles, Target, Award, Clock } from 'lucide-react';

export function IntroScreen({ onStart, phaseComplete = {} }) {
  const phases = [
    { icon: '🤔', name: 'Wonder', desc: 'A time mystery!' },
    { icon: '📖', name: 'Story', desc: 'Global Explorers Club' },
    { icon: '🧪', name: 'Simulate', desc: '3 clock stations' },
    { icon: '🎮', name: 'Practice', desc: '100 challenges' },
    { icon: '📓', name: 'Reflect', desc: 'Quiz & review' }
  ];

  return (
    <div className="w-full max-w-[1350px] mx-auto flex flex-col items-center gap-8 py-8 px-2 md:px-4 text-slate-100 min-h-[85vh] justify-center">
      {/* Top Category Badge */}
      <div className="bg-[#191c4d] border border-[#2e337d] text-amber-300 px-5 py-2 rounded-full text-xs md:text-sm font-bold font-fredoka flex items-center gap-2 shadow-lg">
        <Sparkles className="w-4 h-4 text-amber-400" /> Grade 5 Math
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-fredoka text-amber-400 tracking-tight drop-shadow-lg">
          TimeExplorers
        </h1>
        <h2 className="text-xl md:text-3xl font-black font-fredoka text-orange-400 tracking-wide mt-1">
          Time Intervals & Schedules up to 24-Hour!
        </h2>
      </div>

      {/* Mascot Speech Bubble Banner */}
      <div className="flex items-center gap-4 bg-[#191c4d] border-2 border-[#2e337d] rounded-3xl px-6 py-4 shadow-2xl max-w-2xl">
        <Mascot mood="happy" size="md" />
        <span className="text-base md:text-xl font-bold text-slate-100 font-fredoka flex-1 leading-snug">
          Let's master time intervals, elapsed time & schedules! ⏰
        </span>
      </div>

      {/* 5 Phase Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-5xl">
        {phases.map((p, idx) => {
          return (
            <div
              key={idx}
              className="bg-[#191c4d] border-2 border-[#2e337d] rounded-3xl p-5 flex flex-col items-center text-center justify-center gap-2.5 hover:scale-105 hover:border-amber-400/60 transition duration-300 shadow-2xl min-h-[150px]"
            >
              <span className="text-4xl">{p.icon}</span>
              <h3 className="font-extrabold text-lg text-white font-fredoka">{p.name}</h3>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-snug">{p.desc}</p>
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
        className="py-5 px-14 rounded-full btn-journey text-slate-950 font-black font-fredoka text-2xl md:text-3xl shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center gap-4 mt-2"
      >
        🚀 Begin Your Journey!
      </button>

      {/* 3 Bottom Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <div className="bg-[#191c4d] border border-[#2e337d] px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold text-slate-200 flex items-center gap-2 shadow">
          <Target className="w-4.5 h-4.5 text-rose-400" />
          <span>100 Questions</span>
        </div>

        <div className="bg-[#191c4d] border border-[#2e337d] px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold text-slate-200 flex items-center gap-2 shadow">
          <Clock className="w-4.5 h-4.5 text-cyan-400" />
          <span>12h / 24h & Schedules</span>
        </div>

        <div className="bg-[#191c4d] border border-[#2e337d] px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold text-slate-200 flex items-center gap-2 shadow">
          <Award className="w-4.5 h-4.5 text-amber-400" />
          <span>Badges & XP</span>
        </div>
      </div>
    </div>
  );
}
