import React from 'react';
import { TimelineBar } from '../shared/TimelineBar.jsx';
import { ClockFace } from '../shared/ClockFace.jsx';
import { Lightbulb, Info } from 'lucide-react';

export function HintOverlay({ question, attemptCount = 0, hintsUsed = 0, format = '12h' }) {
  if (attemptCount === 0) return null;

  return (
    <div className="w-full max-w-xl glass-panel rounded-2xl p-4 border border-amber-500/40 bg-amber-950/20 text-slate-200 flex flex-col gap-3 my-2 animate-bounce-short">
      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
        <Lightbulb className="w-4 h-4 fill-amber-400" />
        <span>Exploration Hint (Attempt {attemptCount}/3):</span>
      </div>

      {attemptCount === 1 && (
        <p className="text-xs md:text-sm text-amber-200 leading-relaxed font-medium">
          {question.hint1 || "Break the time down: add the whole hours first, then add the remaining minutes!"}
        </p>
      )}

      {attemptCount === 2 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm text-amber-200 leading-relaxed font-medium">
            {question.hint2 || "Take a look at the timeline diagram below to trace the duration step by step:"}
          </p>
          {question.startMinutes !== undefined && (
            <TimelineBar
              startMinutes={question.startMinutes}
              durationMinutes={question.durationMinutes || 60}
              endMinutes={question.endMinutes}
              format={format}
            />
          )}
        </div>
      )}

      {attemptCount >= 3 && (
        <div className="flex flex-col gap-2 bg-slate-900/90 border border-teal-500/50 p-3 rounded-xl">
          <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs">
            <Info className="w-4 h-4" /> Full Explanation:
          </div>
          <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
            {question.explanation || `The correct answer is ${question.correctAnswer}.`}
          </p>
        </div>
      )}
    </div>
  );
}
