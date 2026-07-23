import React from 'react';
import { ClockFace } from '../shared/ClockFace.jsx';
import { playSFX } from '../../utils/audio.js';

export function FindDurationQ({ question, onSelectAnswer, selectedOption, disabled = false, format = '12h' }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Before / After Clock Faces */}
      <div className="flex items-center justify-center gap-4">
        {question.startMinutes !== undefined && (
          <ClockFace minutes={question.startMinutes} label="Start" size="sm" format={format} />
        )}
        <span className="text-slate-500 font-bold text-xl">→</span>
        {question.endMinutes !== undefined && (
          <ClockFace minutes={question.endMinutes} label="End" size="sm" format={format} />
        )}
      </div>

      {/* MCQ Options */}
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
                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 ring-2 ring-teal-400/50 shadow-lg scale-102'
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
