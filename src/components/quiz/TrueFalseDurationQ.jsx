import React from 'react';
import { playSFX } from '../../utils/audio.js';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export function TrueFalseDurationQ({ question, onSelectAnswer, selectedOption, disabled = false }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {['True', 'False'].map((opt) => {
          const isSelected = selectedOption === opt;
          const isTrue = opt === 'True';

          return (
            <button
              key={opt}
              onClick={() => {
                if (!disabled) {
                  playSFX('click');
                  onSelectAnswer(opt);
                }
              }}
              disabled={disabled}
              className={`py-6 rounded-2xl border text-center font-bold text-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                isSelected
                  ? isTrue
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50 shadow-xl scale-105'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/50 shadow-xl scale-105'
                  : 'bg-slate-900/80 border-slate-700 hover:border-slate-500 text-slate-100'
              }`}
            >
              {isTrue ? <ThumbsUp className="w-8 h-8 text-emerald-400" /> : <ThumbsDown className="w-8 h-8 text-rose-400" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimetableMCQ({ question, onSelectAnswer, selectedOption, disabled = false }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Timetable Graphic Display */}
      {question.timetableRows && (
        <div className="w-full max-w-lg glass-panel rounded-2xl p-4 border border-slate-700 overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-cyan-400">
                <th className="py-2 px-3 font-bold">Route / Vehicle</th>
                <th className="py-2 px-3 font-bold font-mono">Departure</th>
                <th className="py-2 px-3 font-bold font-mono">Arrival</th>
              </tr>
            </thead>
            <tbody>
              {question.timetableRows.map((r, i) => (
                <tr key={i} className="border-b border-slate-800/60 hover:bg-slate-800/30">
                  <td className="py-2 px-3 font-semibold text-slate-200">{r.label}</td>
                  <td className="py-2 px-3 font-mono text-cyan-300">{r.departure}</td>
                  <td className="py-2 px-3 font-mono text-emerald-300">{r.arrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export function UnitConversionQ({ question, onSelectAnswer, selectedOption, disabled = false }) {
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
              className={`p-4 rounded-2xl border text-center font-bold text-base font-mono transition-all duration-200 ${
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
