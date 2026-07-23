import React, { useRef } from 'react';
import { formatTo12h, formatTo24h } from '../../utils/timeMath.js';

export function ClockFace({
  minutes = 540,
  label = null,
  size = 'md',
  interactive = false,
  onChange = null,
  format = '12h',
  highlighted = false,
  showDigitalPill = true,
  className = ''
}) {
  const clockRef = useRef(null);

  const normMinutes = (minutes % 1440 + 1440) % 1440;
  const hours24 = Math.floor(normMinutes / 60);
  const mins = normMinutes % 60;

  // Clock Hand Angles
  const minuteAngle = mins * 6; // 360 deg / 60 min
  const hourAngle = ((hours24 % 12) + mins / 60) * 30; // 360 deg / 12 hr

  const sizePx = {
    sm: 140,
    md: 200,
    lg: 260
  }[size] || 200;

  // Handle interaction for dragging hands or clicking clock face
  const handleClockClick = (e) => {
    if (!interactive || !onChange || !clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = e.clientX - centerX;
    const clickY = e.clientY - centerY;

    // Angle in degrees from top (12 o'clock position)
    let rad = Math.atan2(clickY, clickX);
    let deg = (rad * 180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    // Round deg to nearest 5-minute interval (30 deg = 5 mins)
    const newMinsRound = Math.round(deg / 6) % 60;
    const currentHour = Math.floor(normMinutes / 60);
    const updatedMinutes = currentHour * 60 + newMinsRound;
    onChange(updatedMinutes);
  };

  const displayTime = format === '24h' 
    ? formatTo24h(normMinutes)
    : formatTo12h(normMinutes).formatted;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Clock Face Circle */}
      <div 
        ref={clockRef}
        onClick={handleClockClick}
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
        className={`relative rounded-full glass-panel p-2 shadow-2xl transition-all duration-300 ${
          highlighted ? 'ring-4 ring-cyan-400 glow-cyan scale-105' : 'border border-slate-700/80'
        } ${interactive ? 'cursor-pointer hover:border-teal-400' : ''}`}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer Dial Background */}
          <circle cx="100" cy="100" r="92" fill="#0f172a" stroke="#1e293b" strokeWidth="4" />
          <circle cx="100" cy="100" r="86" fill="#1e293b" stroke="#334155" strokeWidth="2" opacity="0.4" />

          {/* Minute Ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHourTick = i % 5 === 0;
            const angle = (i * 6) * Math.PI / 180;
            const r1 = isHourTick ? 74 : 79;
            const r2 = 82;
            const x1 = 100 + r1 * Math.sin(angle);
            const y1 = 100 - r1 * Math.cos(angle);
            const x2 = 100 + r2 * Math.sin(angle);
            const y2 = 100 - r2 * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHourTick ? '#38bdf8' : '#64748b'}
                strokeWidth={isHourTick ? 3 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour Numbers 1..12 */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const r = 62;
            const x = 100 + r * Math.sin(angle);
            const y = 100 - r * Math.cos(angle) + 4; // slight vertical centering tweak

            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#f8fafc"
                fontFamily="Fredoka, sans-serif"
              >
                {num}
              </text>
            );
          })}

          {/* Hour Hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 44 * Math.sin(hourAngle * Math.PI / 180)}
            y2={100 - 44 * Math.cos(hourAngle * Math.PI / 180)}
            stroke="#38bdf8"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          {/* Minute Hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 64 * Math.sin(minuteAngle * Math.PI / 180)}
            y2={100 - 64 * Math.cos(minuteAngle * Math.PI / 180)}
            stroke="#2dd4bf"
            strokeWidth="4"
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          {/* Center Pin */}
          <circle cx="100" cy="100" r="7" fill="#f8fafc" stroke="#0284c7" strokeWidth="3" />
        </svg>
      </div>

      {/* Digital Sub-Display Pill (positioned cleanly below the dial) */}
      {showDigitalPill && (
        <div className="mt-2 bg-slate-900/90 border border-slate-700 text-teal-300 font-mono text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow whitespace-nowrap">
          {displayTime}
        </div>
      )}

      {/* Optional Custom Outer Label */}
      {label && (
        <span className="mt-1 text-xs md:text-sm font-bold text-slate-300 tracking-wide text-center whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
