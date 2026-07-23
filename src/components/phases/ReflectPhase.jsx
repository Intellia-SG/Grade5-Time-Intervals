import React, { useState } from 'react';
import { Mascot } from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { getReflectNarration } from '../../utils/narration.js';
import { playSFX } from '../../utils/audio.js';
import { Sparkles, Send, Award, Zap, Star, Share2, CheckCircle2 } from 'lucide-react';

export function ReflectPhase({ xp = 0, totalStars = 0, unlockedBadges = [], audioEnabled = true }) {
  useAudio(getReflectNarration(), audioEnabled, []);

  const [journalText, setJournalText] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const handleSendJournal = (e) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    playSFX('correct');
    setAiResponse(
      `That sounds like an epic adventure! Chrono calculates that your planned journey interval will be unforgettable! 🌟`
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-6 px-4">
      {/* Header */}
      <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
        <Sparkles className="w-4 h-4 text-emerald-400" /> Phase 5 — REFLECT & CERTIFICATE
      </span>

      {/* Hero Completion Card */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border border-emerald-500/40 shadow-2xl flex flex-col items-center text-center gap-6 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-4xl shadow-2xl border-4 border-emerald-200">
          🌍
        </div>

        <div>
          <h2 className="text-2xl md:text-4xl font-black font-fredoka text-white tracking-tight">
            Lesson Completed! Global Explorer!
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            You've mastered Grade 5 Time Intervals, Elapsed Time, 12h/24h Conversions, and Schedule Reasoning!
          </p>
        </div>

        {/* Stats Summary Chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
          <div className="bg-amber-500/10 border border-amber-500/40 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-extrabold text-amber-300 text-base">{xp} Total XP</span>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/40 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-extrabold text-yellow-300 text-base">{totalStars} Total Stars</span>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/40 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="font-extrabold text-purple-300 text-base">{unlockedBadges.length} Badges Unlocked</span>
          </div>
        </div>

        {/* Reflection Journal Box */}
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-4">
          <Mascot
            mood="happy"
            message={aiResponse || "If you could plan a trip anywhere in the world, what start & end time would you choose?"}
            size="md"
          />

          <form onSubmit={handleSendJournal} className="w-full flex gap-2">
            <input
              type="text"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="e.g. Flight to Tokyo: leave 8:00 a.m., arrive 6:30 p.m...."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" /> Share
            </button>
          </form>
        </div>

        {/* Share / Export Certificate Button */}
        <button
          onClick={() => {
            playSFX('click');
            window.print();
          }}
          className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black font-fredoka text-base shadow-xl flex items-center gap-2 transition transform hover:scale-105"
        >
          <Share2 className="w-5 h-5" /> Export Completion Certificate
        </button>
      </div>
    </div>
  );
}
