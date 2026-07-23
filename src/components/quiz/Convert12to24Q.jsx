import React from 'react';
import { playSFX } from '../../utils/audio.js';

export function Convert12to24Q({ question, onSelectAnswer, selectedOption, disabled = false }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
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
              className={`p-4 rounded-2xl border text-center font-bold text-lg font-mono transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300 ring-2 ring-purple-400/50 shadow-lg scale-102'
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

export function Convert24to12Q({ question, onSelectAnswer, selectedOption, disabled = false }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
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
              className={`p-4 rounded-2xl border text-center font-bold text-lg font-sans transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 ring-2 ring-indigo-400/50 shadow-lg scale-102'
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
