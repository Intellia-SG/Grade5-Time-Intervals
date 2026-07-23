import React from 'react';
import { formatTimeDisplay, formatDuration } from '../../utils/timeMath.js';
import { Clock } from 'lucide-react';

export function TimelineBar({
  startMinutes = 540,
  durationMinutes = 120,
  endMinutes = 660,
  hideStart = false,
  hideEnd = false,
  hideDuration = false,
  format = '12h',
  className = ''
}) {
  const computedEnd = (startMinutes + durationMinutes) % 1440;
  const endToUse = endMinutes !== undefined ? endMinutes : computedEnd;

  const startStr = hideStart ? '?' : formatTimeDisplay(startMinutes, format);
  const endStr = hideEnd ? '?' : formatTimeDisplay(endToUse, format);
  const durStr = hideDuration ? '? min' : formatDuration(durationMinutes);

  return (
    <div className={`w-full max-w-xl glass-card rounded-2xl p-4 border border-teal-500/30 ${className}`}>
      <div className="flex items-center justify-between gap-2 text-xs md:text-sm font-semibold mb-2">
        {/* Start Time Label */}
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Clock className="w-4 h-4" />
          <span>Start: <strong className={`font-mono ${hideStart ? 'text-amber-400 text-base font-bold' : 'text-white'}`}>{startStr}</strong></span>
        </div>

        {/* Duration Label */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${hideDuration ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'}`}>
          + {durStr}
        </div>

        {/* End Time Label */}
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span>End: <strong className={`font-mono ${hideEnd ? 'text-amber-400 text-base font-bold' : 'text-white'}`}>{endStr}</strong></span>
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Visual Bar Track */}
      <div className="relative w-full h-5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 p-0.5 flex items-center">
        {/* Start point marker */}
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-md ml-1 z-10"></div>
        
        {/* Animated Gradient Bar Span */}
        <div className="flex-1 h-3 mx-1 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>

        {/* End point marker */}
        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-md mr-1 z-10"></div>
      </div>
    </div>
  );
}
