import React from 'react';
import { WORLDS } from '../../data/questionBank.js';
import { calcWorldStars } from '../../utils/scoring.js';
import { StarRating } from './StarRating.jsx';
import { Lock, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { playSFX } from '../../utils/audio.js';

export function WorldMap({ worldScores = [], selectedWorld = 0, onSelectWorld }) {
  return (
    <div className="w-full glass-panel rounded-3xl p-5 border border-slate-800 shadow-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-fredoka text-white flex items-center gap-2">
            🌍 Global Challenge Map (10 Worlds)
          </h3>
          <p className="text-xs text-slate-400">Score ≥6/10 to unlock the next world landmark!</p>
        </div>
        <div className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
          World {selectedWorld + 1} of 10
        </div>
      </div>

      {/* 10-World Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {WORLDS.map((w, idx) => {
          const score = worldScores[idx];
          const isCompleted = score !== null && score !== undefined;
          const stars = isCompleted ? calcWorldStars(score) : 0;
          
          // Unlocked if it's world 0 OR previous world score >= 6
          const isUnlocked = idx === 0 || (worldScores[idx - 1] !== null && worldScores[idx - 1] >= 6);
          const isCurrent = selectedWorld === idx;

          return (
            <button
              key={w.id}
              onClick={() => {
                if (isUnlocked) {
                  playSFX('click');
                  onSelectWorld(idx);
                }
              }}
              disabled={!isUnlocked}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between min-h-[100px] ${
                isCurrent
                  ? 'bg-gradient-to-tr from-cyan-950 to-slate-900 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg scale-105'
                  : isUnlocked
                  ? 'bg-slate-900/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  : 'bg-slate-950/40 border-slate-850 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xl">{w.flag}</span>
                {isUnlocked ? (
                  isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  )
                ) : (
                  <Lock className="w-4 h-4 text-slate-600" />
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block truncate">
                  W{idx + 1}: {w.name}
                </span>
                <h4 className="text-xs font-bold text-slate-200 truncate">{w.landmark}</h4>
              </div>

              <div className="mt-1 flex items-center justify-between border-t border-slate-800/80 pt-1">
                {isUnlocked ? (
                  <StarRating stars={stars} size="sm" />
                ) : (
                  <span className="text-[10px] text-slate-600 italic">Locked</span>
                )}
                {isCompleted && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{score}/10</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
