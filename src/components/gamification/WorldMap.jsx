import React from 'react';
import { WORLDS } from '../../data/questionBank.js';
import { calcWorldStars } from '../../utils/scoring.js';
import { StarRating } from './StarRating.jsx';
import { Lock, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { playSFX } from '../../utils/audio.js';

export function WorldMap({ worldScores = [], selectedWorld = 0, onSelectWorld }) {
  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-xl md:text-2xl font-black font-fredoka text-white flex items-center gap-2.5">
            🌍 Global Challenge Map (10 Landmark Worlds)
          </h3>
          <p className="text-xs md:text-sm text-slate-300 font-medium">Click any unlocked world landmark to open its 10-question challenge page!</p>
        </div>
        <div className="text-xs md:text-sm font-mono text-cyan-300 font-extrabold bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-800 shadow">
          Current: World {selectedWorld + 1} of 10
        </div>
      </div>

      {/* 10-World Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
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
              className={`p-4 rounded-3xl border-2 text-left transition-all duration-200 relative flex flex-col justify-between min-h-[140px] group ${
                isCurrent
                  ? 'bg-gradient-to-tr from-cyan-950 via-slate-900 to-slate-950 border-cyan-400 ring-4 ring-cyan-400/40 shadow-2xl scale-102'
                  : isUnlocked
                  ? 'bg-slate-900/90 border-slate-700 hover:border-cyan-400/80 hover:bg-slate-800/90 shadow-xl hover:scale-102'
                  : 'bg-slate-950/60 border-slate-900 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl drop-shadow">{w.flag}</span>
                {isUnlocked ? (
                  isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <MapPin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition" />
                  )
                ) : (
                  <Lock className="w-5 h-5 text-slate-600" />
                )}
              </div>

              <div className="mt-2">
                <span className="text-[11px] uppercase font-mono font-extrabold tracking-wider text-cyan-400 block truncate">
                  World {idx + 1}
                </span>
                <h4 className="text-sm font-black text-white font-fredoka truncate">{w.name}</h4>
                <p className="text-[11px] text-slate-300 truncate">{w.landmark}</p>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-slate-800/80 pt-2">
                {isUnlocked ? (
                  <StarRating stars={stars} size="sm" />
                ) : (
                  <span className="text-[10px] text-slate-500 italic font-mono">Locked</span>
                )}
                {isUnlocked && (
                  <span className="text-[11px] font-fredoka font-black text-cyan-300 group-hover:text-emerald-400 flex items-center gap-0.5">
                    Play <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
