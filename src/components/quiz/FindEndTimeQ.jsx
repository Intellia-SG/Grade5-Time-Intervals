import React from 'react';
import { ClockFace } from '../shared/ClockFace.jsx';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { playSFX } from '../../utils/audio.js';

export function FindEndTimeQ({ question, onSelectAnswer, selectedOption, disabled = false, format = '12h' }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Visual Scaffolding */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-full">
        {question.startMinutes !== undefined && (
          <ClockFace minutes={question.startMinutes} label="Start Time" size="sm" format={format} />
        )}
        {question.startMinutes !== undefined && question.durationMinutes !== undefined && (
          <TimelineBar
            startMinutes={question.startMinutes}
            durationMinutes={question.durationMinutes}
            hideEnd={true}
            format={format}
          />
        )}
      </div>

      {/* MCQ 4-Option Grid */}
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
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/50 shadow-lg scale-102'
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
