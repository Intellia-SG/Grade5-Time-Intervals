import React, { useState } from 'react';
import { TimePad } from '../shared/TimePad.jsx';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { Mascot } from '../shared/Mascot.jsx';
import { playSFX } from '../../utils/audio.js';
import { HelpCircle, CheckCircle, Clock } from 'lucide-react';
import { formatTimeDisplay, formatDuration } from '../../utils/timeMath.js';

export function TimeSentenceStation({ onCompleteStation, format = '12h' }) {
  const rounds = [
    {
      id: 1,
      missingSlot: 'end', // Find End Time
      startMins: 585, // 9:45 a.m.
      durMins: 135, // 2 hr 15 min
      endMins: 720, // 12:00 p.m.
      correctStr: "12:00 p.m.",
      correctMins: 720,
      label: "Round 1: Find the missing End Time",
      options: ["11:45 a.m.", "12:00 p.m.", "12:15 p.m.", "1:00 p.m."]
    },
    {
      id: 2,
      missingSlot: 'duration', // Find Duration
      startMins: 440, // 07:20 (7:20 a.m.)
      durMins: 95, // 1 hr 35 min
      endMins: 535, // 08:55 (8:55 a.m.) — FIX: Correct End Time is 535 (8:55 a.m.)
      correctStr: "1 hr 35 min",
      correctMins: 535,
      label: "Round 2: Find the missing Duration",
      options: ["1 hr 15 min", "1 hr 25 min", "1 hr 35 min", "1 hr 45 min"]
    },
    {
      id: 3,
      missingSlot: 'start', // Find Start Time
      startMins: 1005, // 4:45 p.m.
      durMins: 105, // 1 hr 45 min
      endMins: 1110, // 6:30 p.m.
      correctStr: "4:45 p.m.",
      correctMins: 1005,
      label: "Round 3: Find the missing Start Time",
      options: ["4:15 p.m.", "4:30 p.m.", "4:45 p.m.", "5:00 p.m."]
    }
  ];

  const [roundIdx, setRoundIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx];

  const handleSelectOption = (val) => {
    playSFX('click');
    setInputValue(val);
    setFeedback(null);
  };

  const handleTimePadSelect = (timeStr) => {
    setInputValue(timeStr);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (!inputValue) return;

    const cleanedInput = inputValue.trim().toLowerCase();
    const cleanedTarget = currentRound.correctStr.trim().toLowerCase();

    // Check match
    const isCorrect = cleanedInput === cleanedTarget ||
                      cleanedInput.includes("12:00") && currentRound.id === 1 ||
                      cleanedInput.includes("1 hr 35") && currentRound.id === 2 ||
                      cleanedInput.includes("4:45") && currentRound.id === 3;

    if (isCorrect) {
      playSFX('correct');
      setFeedback({ type: 'success', text: 'Equation completed perfectly!' });

      setTimeout(() => {
        if (roundIdx < rounds.length - 1) {
          setRoundIdx(r => r + 1);
          setInputValue('');
          setShowHint(false);
          setFeedback(null);
        } else {
          onCompleteStation();
        }
      }, 1500);
    } else {
      playSFX('incorrect');
      setFeedback({ type: 'error', text: `Not quite! The correct answer is ${currentRound.correctStr}. Check the hint timeline!` });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-2">
      {/* Header Info */}
      <div className="text-center max-w-3xl flex flex-col items-center gap-2">
        <span className="text-xs md:text-sm uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/70 px-4 py-1.5 rounded-full border border-amber-800 shadow">
          Station C — Abstract Time Equation ({roundIdx + 1}/{rounds.length})
        </span>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-black font-fredoka text-white tracking-tight">
          {currentRound.label}
        </h3>
      </div>

      {/* Equation Banner */}
      <div className="w-full max-w-4xl glass-panel rounded-3xl p-6 border-2 border-amber-500/40 flex flex-wrap items-center justify-center gap-4 font-mono text-lg md:text-2xl lg:text-3xl font-black shadow-2xl">
        {/* Start slot */}
        <div className={`px-4 py-3 rounded-2xl border-2 ${
          currentRound.missingSlot === 'start'
            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold animate-pulse'
            : 'bg-slate-900 border-slate-700 text-cyan-300'
        }`}>
          Start: {currentRound.missingSlot === 'start' ? (inputValue || '___') : formatTimeDisplay(currentRound.startMins, format)}
        </div>

        <span className="text-amber-400 text-3xl font-black">+</span>

        {/* Duration slot */}
        <div className={`px-4 py-3 rounded-2xl border-2 ${
          currentRound.missingSlot === 'duration'
            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold animate-pulse'
            : 'bg-slate-900 border-slate-700 text-teal-300'
        }`}>
          Duration: {currentRound.missingSlot === 'duration' ? (inputValue || '___') : formatDuration(currentRound.durMins)}
        </div>

        <span className="text-amber-400 text-3xl font-black">=</span>

        {/* End slot */}
        <div className={`px-4 py-3 rounded-2xl border-2 ${
          currentRound.missingSlot === 'end'
            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold animate-pulse'
            : 'bg-slate-900 border-slate-700 text-emerald-300'
        }`}>
          End: {currentRound.missingSlot === 'end' ? (inputValue || '___') : formatTimeDisplay(currentRound.endMins, format)}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-3xl justify-center">
        <Mascot
          mood={feedback?.type === 'success' ? 'happy' : feedback?.type === 'error' ? 'thinking' : 'encouraging'}
          message={feedback?.text || "Choose or enter the value that fills the blank!"}
          size="lg"
        />

        {/* Choice Buttons for quick & accurate selection */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {currentRound.options.map((opt, idx) => {
            const isSelected = inputValue === opt;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className={`py-4 px-6 rounded-2xl border-2 font-mono font-black text-lg md:text-xl transition-all duration-200 shadow-lg ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-4 ring-amber-400/40 scale-102'
                    : 'bg-slate-900/90 border-slate-700 hover:border-slate-500 text-slate-100'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs md:text-sm text-cyan-300 hover:underline flex items-center gap-1.5 font-bold bg-slate-900 px-4 py-2 rounded-full border border-slate-700 shadow"
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" /> {showHint ? "Hide Timeline Hint" : "Show Timeline Hint"}
        </button>

        {showHint && (
          <TimelineBar
            startMinutes={currentRound.startMins}
            durationMinutes={currentRound.durMins}
            endMinutes={currentRound.endMins}
            format={format}
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!inputValue}
        className="w-full max-w-md py-4 px-8 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black font-fredoka text-lg md:text-xl shadow-2xl border border-teal-300 flex items-center justify-center gap-2 transition disabled:opacity-50 transform hover:scale-102"
      >
        <CheckCircle className="w-6 h-6" /> Confirm Equation
      </button>
    </div>
  );
}
