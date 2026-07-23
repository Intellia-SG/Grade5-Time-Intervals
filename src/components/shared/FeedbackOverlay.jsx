import React, { useEffect } from 'react';
import { Award, Zap, CheckCircle, XCircle } from 'lucide-react';
import { ALL_BADGES } from '../../utils/badgeEngine.js';

export function FeedbackOverlay({ status, xpEarned = 0, unlockedBadgeId = null, onClose }) {
  if (!status && !unlockedBadgeId) return null;

  const badgeObj = unlockedBadgeId ? ALL_BADGES.find(b => b.id === unlockedBadgeId) : null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      {/* XP Floater Toast */}
      {status === 'correct' && (
        <div className="animate-bounce-short bg-emerald-950/90 border-2 border-emerald-400 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <CheckCircle className="w-8 h-8 text-emerald-400 animate-spin-once" />
          <div>
            <h4 className="font-bold text-lg text-emerald-300">Correct! Great Job! 🎉</h4>
            {xpEarned > 0 && (
              <p className="text-amber-300 font-extrabold text-sm flex items-center gap-1">
                <Zap className="w-4 h-4 fill-amber-400" /> +{xpEarned} XP Earned!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Incorrect Toast */}
      {status === 'incorrect' && (
        <div className="animate-bounce-short bg-rose-950/90 border-2 border-rose-400 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <XCircle className="w-8 h-8 text-rose-400" />
          <div>
            <h4 className="font-bold text-lg text-rose-200">Not quite! Let's check again ⏰</h4>
            <p className="text-xs text-rose-300">Review the clock and hint for guidance.</p>
          </div>
        </div>
      )}

      {/* Badge Unlock Popup */}
      {badgeObj && (
        <div className="pointer-events-auto bg-slate-900/95 border-2 border-amber-400 text-white rounded-3xl p-6 shadow-2xl max-w-sm w-full flex flex-col items-center text-center gap-3 animate-bounce-short backdrop-blur-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl shadow-xl border-4 border-amber-200">
            {badgeObj.icon}
          </div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
            NEW BADGE UNLOCKED!
          </span>
          <h3 className="text-2xl font-black font-fredoka text-white">{badgeObj.title}</h3>
          <p className="text-sm text-slate-300">{badgeObj.description}</p>
          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 font-bold text-slate-950 shadow-lg transition"
          >
            Awesome! 🚀
          </button>
        </div>
      )}
    </div>
  );
}
