import React, { useState } from 'react';
import { ClockFace } from '../shared/ClockFace.jsx';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { DurationBlockTray } from '../shared/DurationBlockTray.jsx';
import { Mascot } from '../shared/Mascot.jsx';
import { playSFX } from '../../utils/audio.js';
import { RotateCcw, CheckCircle, ArrowRight } from 'lucide-react';
import { formatTimeDisplay, formatDuration } from '../../utils/timeMath.js';

export function ClockJourneyStation({ onCompleteStation, format = '12h' }) {
  const rounds = [
    { startMins: 480, targetDuration: 90, label: "Round 1: Build a 1 hr 30 min morning trip starting at 8:00 a.m." },
    { startMins: 975, targetDuration: 105, label: "Round 2: Build a 1 hr 45 min afternoon ride starting at 4:15 p.m." },
    { startMins: 650, targetDuration: 40, label: "Round 3: Build a 40 min flight interval crossing 11:00 a.m." },
    { startMins: 1395, targetDuration: 150, label: "Round 4: Build a 2 hr 30 min night journey crossing midnight from 11:15 p.m." }
  ];

  const [roundIdx, setRoundIdx] = useState(0);
  const [addedMinutes, setAddedMinutes] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx];
  const currentEndMinutes = (currentRound.startMins + addedMinutes + 1440 * 10) % 1440;

  const handleAddBlock = (mins) => {
    setAddedMinutes(prev => prev + mins);
    setFeedback(null);
  };

  const handleReset = () => {
    playSFX('click');
    setAddedMinutes(0);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (addedMinutes === currentRound.targetDuration) {
      playSFX('correct');
      setFeedback({ type: 'success', text: 'Perfect! You built the journey duration exactly!' });

      setTimeout(() => {
        if (roundIdx < rounds.length - 1) {
          setRoundIdx(r => r + 1);
          setAddedMinutes(0);
          setFeedback(null);
        } else {
          onCompleteStation();
        }
      }, 1500);
    } else {
      playSFX('incorrect');
      const diffMsg = addedMinutes > 0 ? formatDuration(addedMinutes) : `${addedMinutes} min`;
      setFeedback({ type: 'error', text: `Not quite! Target duration is ${formatDuration(currentRound.targetDuration)}. Your current added duration is ${diffMsg}.` });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      {/* Header Info */}
      <div className="text-center max-w-xl">
        <span className="text-xs uppercase tracking-widest font-extrabold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
          Station A — Concrete Exploration ({roundIdx + 1}/{rounds.length})
        </span>
        <h3 className="text-lg md:text-xl font-bold font-fredoka text-white mt-2">
          {currentRound.label}
        </h3>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Clock Faces comparison */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ClockFace
            minutes={currentRound.startMins}
            label="Start Time"
            size="sm"
            format={format}
          />
          <ArrowRight className="w-6 h-6 text-teal-400 hidden sm:block" />
          <ClockFace
            minutes={currentEndMinutes}
            label="Current Time"
            size="sm"
            highlighted={addedMinutes !== 0}
            format={format}
          />
        </div>

        {/* Mascot & Controls */}
        <div className="flex flex-col items-center gap-4">
          <Mascot
            mood={feedback?.type === 'success' ? 'happy' : feedback?.type === 'error' ? 'thinking' : 'encouraging'}
            message={feedback?.text || `Target Duration: ${formatDuration(currentRound.targetDuration)}`}
            size="md"
          />

          <TimelineBar
            startMinutes={currentRound.startMins}
            durationMinutes={Math.max(0, addedMinutes)}
            endMinutes={currentEndMinutes}
            format={format}
          />

          <DurationBlockTray onAddBlock={handleAddBlock} />

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <button
              onClick={handleReset}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-sm shadow-lg border border-teal-300 flex items-center justify-center gap-1.5 transition"
            >
              <CheckCircle className="w-4 h-4" /> Submit Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
