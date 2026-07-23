import React from 'react';
import { Zap, Flame, Star, Award, Clock } from 'lucide-react';
import { playSFX } from '../utils/audio.js';

export function BottomNavBar({
  xp = 0,
  streak = 0,
  totalStars = 0,
  unlockedBadges = [],
  clockFormat = '12h',
  onToggleClockFormat,
  onOpenBadges
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e28]/95 backdrop-blur-md border-t border-[#1e2259] py-2.5 px-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 text-xs font-bold">
        {/* Left: XP & Streak */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#191c4d] border border-[#2e337d] px-3 py-1 rounded-full text-amber-300">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-mono">{xp} XP</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#191c4d] border border-[#2e337d] px-3 py-1 rounded-full text-orange-400">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="font-mono">{streak} Streak</span>
          </div>
        </div>

        {/* Center: Total Stars */}
        <div className="flex items-center gap-1.5 bg-[#191c4d] border border-[#2e337d] px-3.5 py-1 rounded-full text-yellow-300">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-mono font-bold text-sm">{totalStars} / 30 Stars</span>
        </div>

        {/* Right: Badges & Clock Format */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSFX('click');
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 bg-[#191c4d] hover:bg-[#232766] border border-[#2e337d] px-3 py-1 rounded-full text-purple-300 transition"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Badges:</span>
            <span className="font-mono">{unlockedBadges.length}/8</span>
          </button>

          <button
            onClick={() => {
              playSFX('click');
              onToggleClockFormat();
            }}
            className="flex items-center gap-1 bg-[#191c4d] hover:bg-[#232766] border border-[#2e337d] px-3 py-1 rounded-full text-cyan-300 font-mono transition"
            title="Toggle Clock Format (12h/24h)"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{clockFormat.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
