import React from 'react';
import { Volume2, VolumeX, Home } from 'lucide-react';
import { playSFX } from '../utils/audio.js';

export function ProgressMap({
  currentPhase,
  onSelectPhase,
  phaseComplete = {},
  audioEnabled = true,
  onToggleAudio
}) {
  const phases = [
    { id: 'intro', name: 'Intro', label: '1' },
    { id: 'wonder', name: 'Wonder', label: '2' },
    { id: 'story', name: 'Story', label: '3' },
    { id: 'simulate', name: 'Simulate', label: '4' },
    { id: 'play', name: 'Practice', label: '5' },
    { id: 'reflect', name: 'Reflect', label: '6' }
  ];

  const phaseOrder = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];
  const currentIndex = phaseOrder.indexOf(currentPhase);

  const handleStepClick = (phaseId) => {
    playSFX('click');
    onSelectPhase(phaseId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e28]/95 backdrop-blur-md border-b border-[#1e2259] px-4 py-3 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Title / Brand logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStepClick('intro')}
            className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center font-bold text-slate-950 font-fredoka shadow-md hover:scale-105 transition"
            title="Go to Intro"
          >
            ⏰
          </button>
          <div>
            <h1 className="font-fredoka font-bold text-base md:text-lg text-amber-400 tracking-tight flex items-center gap-1.5">
              TimeExplorers
              <span className="text-[10px] bg-[#191c4d] text-orange-300 px-2.5 py-0.5 rounded-full border border-[#2e337d] font-mono">
                Grade 5
              </span>
            </h1>
          </div>
        </div>

        {/* 6-Phase Tracker Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 px-1">
          {phases.map((p, idx) => {
            const isActive = currentPhase === p.id;
            const isDone = phaseComplete[p.id] || idx < currentIndex;

            return (
              <button
                key={p.id}
                onClick={() => handleStepClick(p.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg scale-105 ring-2 ring-amber-300 font-fredoka'
                    : isDone
                    ? 'bg-[#191c4d] text-amber-300 border border-[#2e337d] hover:bg-[#232766]'
                    : 'bg-[#13153b] text-slate-400 border border-[#1e2259] hover:text-slate-200'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isActive ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-[#0c0e28]'
                }`}>
                  {p.label}
                </span>
                <span className="hidden sm:inline">{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Audio Mute & Home Controls (Top Right Circle Icon) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStepClick('intro')}
            className="p-2 rounded-full bg-[#191c4d] hover:bg-[#232766] border border-[#2e337d] text-slate-300 transition shadow"
            title="Home / Intro"
          >
            <Home className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playSFX('click');
              onToggleAudio();
            }}
            className={`p-2.5 rounded-full border transition shadow-lg ${
              audioEnabled
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                : 'bg-[#191c4d] border-[#2e337d] text-slate-500'
            }`}
            title={audioEnabled ? "Mute Narration" : "Enable Narration"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
