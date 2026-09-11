import React from 'react';
import { ClockFace } from '../shared/ClockFace.jsx';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { playSFX } from '../../utils/audio.js';

export function FindStartTimeQ({ question, onSelectAnswer, selectedOption, disabled = false, format = '12h' }) {
  const startMins = question.endMinutes !== undefined && question.durationMinutes !== undefined
    ? (question.endMinutes - question.durationMinutes + 1440) % 1440
    : 0;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-full">
        {question.endMinutes !== undefined && (
          <ClockFace minutes={question.endMinutes} label="End Time" size="sm" format={format} />
        )}
        {question.endMinutes !== undefined && question.durationMinutes !== undefined && (
          <TimelineBar
            startMinutes={startMins}
            endMinutes={question.endMinutes}
            durationMinutes={question.durationMinutes}
            hideStart={true}
            format={format}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {question.options?.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          return (
            <button
              key={idx}
              onClick={() => {
                if (!disabled) {
                  playSFX('click');
                  onSelectAnswer(opt);
                }
              }}
              disabled={disabled}
              className={`p-4 rounded-2xl border text-center font-bold text-base transition-all duration-200 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50 shadow-lg scale-102'
                  : 'bg-slate-900/80 border-slate-700 hover:border-slate-500 text-slate-100'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
