import React, { useState } from 'react';
import { ClockFace } from '../shared/ClockFace.jsx';
import { Mascot } from '../shared/Mascot.jsx';
import { playSFX } from '../../utils/audio.js';
import { CheckCircle2, XCircle, Check } from 'lucide-react';
import { formatDuration, elapsedMinutes } from '../../utils/timeMath.js';

export function SpotDurationStation({ onCompleteStation, format = '12h' }) {
  const rounds = [
    {
      id: 1,
      instruction: "Round 1: Tap all cards where the printed duration is CORRECT!",
      cards: [
        { id: 'a', start: 480, end: 600, claimed: "2 hours", correct: true }, // 8:00->10:00 = 2 hr
        { id: 'b', start: 540, end: 720, claimed: "4 hours", correct: false }, // 9:00->12:00 = 3 hr
        { id: 'c', start: 600, end: 780, claimed: "3 hours", correct: true }, // 10:00->1:00 = 3 hr
        { id: 'd', start: 840, end: 1020, claimed: "1 hour 30 min", correct: false } // 2:00->5:00 = 3 hr
      ]
    },
    {
      id: 2,
      instruction: "Round 2: Find the matching durations (half-hour and minute precision)!",
      cards: [
        { id: 'a', start: 510, end: 660, claimed: "2 hours 30 min", correct: fontEq(150, 150) }, // 8:30->11:00 = 2h 30m
        { id: 'b', start: 570, end: 705, claimed: "2 hours 15 min", correct: true }, // 9:30->11:45 = 2h 15m
        { id: 'c', start: 630, end: 735, claimed: "3 hours", correct: false }, // 10:30->12:15 = 1h 45m
        { id: 'd', start: 810, end: 945, claimed: "2 hours 15 min", correct: true } // 1:30->3:45 = 2h 15m
      ]
    }
  ];

  function fontEq(a, b) { return a === b; }

  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx];

  const handleCardClick = (cardId) => {
    playSFX('click');
    setSelectedCards(prev => 
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const handleSubmit = () => {
    const correctCardIds = currentRound.cards.filter(c => c.correct).map(c => c.id);
    const isExactMatch = 
      selectedCards.length === correctCardIds.length &&
      selectedCards.every(id => correctCardIds.includes(id));

    if (isExactMatch) {
      playSFX('correct');
      setFeedback({ type: 'success', text: 'Awesome eye! You spotted all the correct durations!' });

      setTimeout(() => {
        if (roundIdx < rounds.length - 1) {
          setRoundIdx(r => r + 1);
          setSelectedCards([]);
          setFeedback(null);
        } else {
          onCompleteStation();
        }
      }, 1500);
    } else {
      playSFX('incorrect');
      setFeedback({ type: 'error', text: 'Look closely at each clock pair and count the elapsed hours and minutes!' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      {/* Header Info */}
      <div className="text-center max-w-xl">
        <span className="text-xs uppercase tracking-widest font-extrabold text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
          Station B — Pictorial Matching ({roundIdx + 1}/{rounds.length})
        </span>
        <h3 className="text-lg md:text-xl font-bold font-fredoka text-white mt-2">
          {currentRound.instruction}
        </h3>
      </div>

      <Mascot
        mood={feedback?.type === 'success' ? 'happy' : feedback?.type === 'error' ? 'thinking' : 'curious'}
        message={feedback?.text || "Tap card(s) that state the accurate time interval!"}
        size="md"
      />

      {/* 2x2 Grid of Clock Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {currentRound.cards.map(card => {
          const isSelected = selectedCards.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3 relative ${
                isSelected
                  ? 'bg-teal-950/60 border-teal-400 ring-2 ring-teal-400/50 shadow-xl scale-102'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <ClockFace minutes={card.start} size="sm" format={format} label="Before" />
                <span className="text-slate-500 font-bold">→</span>
                <ClockFace minutes={card.end} size="sm" format={format} label="After" />
              </div>

              <div className="bg-slate-950 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-cyan-300">
                Claimed: {card.claimed}
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 bg-teal-500 text-slate-950 p-1 rounded-full shadow">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full max-w-xs py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-base shadow-xl border border-teal-300 flex items-center justify-center gap-2 transition"
      >
        <CheckCircle2 className="w-5 h-5" /> Submit Selection
      </button>
    </div>
  );
}
