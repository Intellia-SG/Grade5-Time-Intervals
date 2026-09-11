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
    <header className="sticky top-0 z-40 bg-[#0c0e28]/95 backdrop-blur-md border-b border-[#1e2259] px-4 md:px-8 py-3.5 shadow-xl">
      <div className="max-w-[1400px] mx-auto flex items-center justify-start gap-4 sm:gap-6 md:gap-8">
        {/* Left Side: Brand Logo & Home Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleStepClick('intro')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center font-bold text-slate-950 font-fredoka shadow-md hover:scale-105 transition text-lg"
            title="Go to Intro"
          >
            ⏰
          </button>

          <button
            onClick={() => handleStepClick('intro')}
            className="p-2 py-1.5 rounded-full bg-[#191c4d] hover:bg-[#232766] border border-[#2e337d] text-slate-300 hover:text-white transition shadow flex items-center gap-1.5 px-3"
            title="Go to Home / Intro"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-fredoka hidden sm:inline text-amber-300">Home</span>
          </button>

          <div>
            <h1 className="font-fredoka font-bold text-lg md:text-xl text-amber-400 tracking-tight flex items-center gap-2">
              TimeExplorers
              <span className="text-xs bg-[#191c4d] text-orange-300 px-2.5 py-0.5 rounded-full border border-[#2e337d] font-mono">
                Grade 5
              </span>
            </h1>
          </div>
        </div>

        {/* 6-Phase Tracker Pills (Shifted Left) + Mute Button directly after 6. Reflect */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-1">
          {phases.map((p, idx) => {
            const isActive = currentPhase === p.id;
            const isDone = phaseComplete[p.id] || idx < currentIndex;

            return (
              <button
                key={p.id}
                onClick={() => handleStepClick(p.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg scale-105 ring-2 ring-amber-300 font-fredoka'
                    : isDone
                    ? 'bg-[#191c4d] text-amber-300 border border-[#2e337d] hover:bg-[#232766]'
                    : 'bg-[#13153b] text-slate-400 border border-[#1e2259] hover:text-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isActive ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-[#0c0e28]'
                }`}>
                  {p.label}
                </span>
                <span className="hidden sm:inline">{p.name}</span>
              </button>
            );
          })}

          {/* Mute Narration Button directly after 6. Reflect */}
          <button
            onClick={() => {
              playSFX('click');
              onToggleAudio();
            }}
            className={`p-2.5 rounded-full border transition shadow-lg shrink-0 ml-1.5 ${
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
