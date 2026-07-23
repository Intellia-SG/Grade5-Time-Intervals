import React from 'react';
import { ALL_BADGES } from '../../utils/badgeEngine.js';
import { X, Lock, CheckCircle2 } from 'lucide-react';

export function BadgePanel({ unlockedBadges = [], isOpen, onClose }) {
  if (!isOpen) return null;

  const unlockedSet = new Set(unlockedBadges);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold font-fredoka text-white flex items-center gap-2">
              🏆 Explorer Achievements ({unlockedSet.size}/{ALL_BADGES.length})
            </h2>
            <p className="text-xs text-slate-400">Complete challenges to earn all lesson badges!</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto py-4 pr-1">
          {ALL_BADGES.map(badge => {
            const isUnlocked = unlockedSet.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/50 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                  isUnlocked ? 'bg-amber-500/20 border border-amber-400/40' : 'bg-slate-800 border border-slate-700'
                }`}>
                  {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm truncate ${isUnlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{badge.description}</p>
                </div>

                {isUnlocked && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-sm transition"
        >
          Close Panel
        </button>
      </div>
    </div>
  );
}
