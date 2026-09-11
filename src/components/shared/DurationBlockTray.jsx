import React, { useState } from 'react';
import { Plus, Minus, Clock } from 'lucide-react';
import { playSFX } from '../../utils/audio.js';

export function DurationBlockTray({ onAddBlock, disabled = false, className = '' }) {
  const [mode, setMode] = useState('add'); // 'add' | 'subtract'

  const addBlocks = [
    { label: '+5 min', minutes: 5, color: 'from-cyan-600 to-blue-500 border-cyan-400' },
    { label: '+10 min', minutes: 10, color: 'from-blue-600 to-indigo-500 border-blue-400' },
    { label: '+15 min', minutes: 15, color: 'from-teal-600 to-cyan-500 border-teal-400' },
    { label: '+30 min', minutes: 30, color: 'from-emerald-600 to-teal-500 border-emerald-400' },
    { label: '+1 hr', minutes: 60, color: 'from-amber-600 to-yellow-500 border-amber-400' },
    { label: '+2 hr', minutes: 120, color: 'from-purple-600 to-indigo-500 border-purple-400' }
  ];

  const subBlocks = [
    { label: '-5 min', minutes: -5, color: 'from-rose-700 to-red-600 border-rose-400' },
    { label: '-10 min', minutes: -10, color: 'from-red-800 to-rose-700 border-red-400' },
    { label: '-15 min', minutes: -15, color: 'from-pink-700 to-rose-600 border-pink-400' },
    { label: '-30 min', minutes: -30, color: 'from-purple-800 to-pink-700 border-purple-400' },
    { label: '-1 hr', minutes: -60, color: 'from-orange-800 to-amber-700 border-orange-400' },
    { label: '-2 hr', minutes: -120, color: 'from-indigo-900 to-purple-800 border-indigo-400' }
  ];

  const handleTap = (blockMins) => {
    if (disabled) return;
    playSFX('click');
    onAddBlock(blockMins);
  };

  const activeBlocks = mode === 'add' ? addBlocks : subBlocks;

  return (
    <div className={`w-full glass-panel rounded-2xl p-5 border border-slate-700/80 flex flex-col items-center gap-4 shadow-xl ${className}`}>
      {/* Mode Toggle Bar (+ Add / - Subtract) */}
      <div className="flex items-center justify-between w-full flex-wrap gap-3">
        <span className="text-xs md:text-sm uppercase tracking-wider font-extrabold text-teal-300 flex items-center gap-2">
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-teal-400" /> Tap Duration Blocks to Modify Time
        </span>

        <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              playSFX('click');
              setMode('add');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-extrabold transition flex items-center gap-1.5 ${
              mode === 'add'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" /> Add (+)
          </button>
          <button
            onClick={() => {
              playSFX('click');
              setMode('subtract');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-extrabold transition flex items-center gap-1.5 ${
              mode === 'subtract'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Minus className="w-4 h-4" /> Subtract (-)
          </button>
        </div>
      </div>

      {/* Blocks Grid (6 Options) */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full">
        {activeBlocks.map((b, idx) => (
          <button
            key={idx}
            onClick={() => handleTap(b.minutes)}
            disabled={disabled}
            className={`py-4 px-3 rounded-2xl bg-gradient-to-r ${b.color} border-2 text-white font-black font-mono text-sm md:text-base shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-1.5`}
          >
            {mode === 'add' ? <Plus className="w-4 h-4 shrink-0" /> : <Minus className="w-4 h-4 shrink-0" />}
            <span>{b.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
