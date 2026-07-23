import React, { useState } from 'react';
import { Delete, Check } from 'lucide-react';
import { playSFX } from '../../utils/audio.js';

export function TimePad({ onSelectTime, format = '12h', className = '' }) {
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('a.m.');
  const [activeField, setActiveField] = useState('hour'); // 'hour' | 'minute'

  const handleNumClick = (digit) => {
    playSFX('click');
    if (activeField === 'hour') {
      const newHour = (hour + digit).slice(-2);
      setHour(newHour);
    } else {
      const newMin = (minute + digit).slice(-2);
      setMinute(newMin);
    }
  };

  const handleClear = () => {
    playSFX('click');
    if (activeField === 'hour') setHour('00');
    else setMinute('00');
  };

  const handleConfirm = () => {
    playSFX('click');
    let hInt = parseInt(hour, 10) || 0;
    const mInt = parseInt(minute, 10) || 0;

    if (format === '12h') {
      if (hInt === 0) hInt = 12;
      const formatted = `${hInt}:${String(mInt).padStart(2, '0')} ${period}`;
      onSelectTime(formatted, { hour: hInt, minute: mInt, period });
    } else {
      const formatted = `${String(hInt).padStart(2, '0')}:${String(mInt).padStart(2, '0')}`;
      onSelectTime(formatted, { hour: hInt, minute: mInt });
    }
  };

  return (
    <div className={`w-full max-w-sm glass-panel rounded-2xl p-4 border border-cyan-500/30 flex flex-col items-center gap-3 ${className}`}>
      {/* Display Fields */}
      <div className="flex items-center gap-2 font-mono text-2xl md:text-3xl font-bold bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 w-full justify-center">
        <button
          onClick={() => setActiveField('hour')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            activeField === 'hour' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-transparent text-slate-300'
          }`}
        >
          {hour}
        </button>
        <span className="text-slate-500">:</span>
        <button
          onClick={() => setActiveField('minute')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            activeField === 'minute' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-transparent text-slate-300'
          }`}
        >
          {minute}
        </button>

        {format === '12h' && (
          <button
            onClick={() => setPeriod(period === 'a.m.' ? 'p.m.' : 'a.m.')}
            className="ml-2 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-400 text-teal-300 text-base md:text-lg font-sans font-bold"
          >
            {period}
          </button>
        )}
      </div>

      {/* 3x4 Keypad Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
          <button
            key={num}
            onClick={() => handleNumClick(num)}
            className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-100 font-bold text-xl border border-slate-700 transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-bold flex items-center justify-center"
        >
          <Delete className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleNumClick('0')}
          className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xl border border-slate-700"
        >
          0
        </button>
        <button
          onClick={handleConfirm}
          className="py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-base border border-teal-300 flex items-center justify-center gap-1 shadow-lg"
        >
          <Check className="w-5 h-5" /> Set
        </button>
      </div>
    </div>
  );
}
