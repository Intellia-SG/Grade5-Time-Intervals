import React from 'react';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { playSFX } from '../../utils/audio.js';

export function JourneyWordProbQ({ question, onSelectAnswer, selectedOption, disabled = false, format = '12h' }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {question.startMinutes !== undefined && question.endMinutes !== undefined && (
        <TimelineBar
          startMinutes={question.startMinutes}
          endMinutes={question.endMinutes}
          durationMinutes={question.endMinutes - question.startMinutes}
          hideDuration={true}
          format={format}
        />
      )}

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
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 ring-2 ring-blue-400/50 shadow-lg scale-102'
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

export function ScheduleWordProbQ({ question, onSelectAnswer, selectedOption, disabled = false }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
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
              className={`p-4 rounded-2xl border text-left font-bold text-sm md:text-base transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50 shadow-lg scale-102'
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
