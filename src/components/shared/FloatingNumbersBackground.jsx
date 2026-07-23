import React, { useMemo } from 'react';

// Time intervals, clock symbols & Grade 5 time digits
const TIME_SYMBOLS = [
  '12:00', '+15m', '08:30', '60m', '24h', '+45m', ':30', '03:15',
  '12h', '+90m', '00:00', '+30m', '18:45', ':15', '+5m', '10:00',
  '+2h', '7:30', ':45', '12', '60', '24', '15', '30', '45',
  '⏰', '⏱️', '⌛', '🕒', 'AM', 'PM', '06:00', '+10m', '14:30',
  ':00', '120m', '+1h', '09:15', '23:59', '+35m'
];

const COLOR_CLASSES = [
  'text-amber-400',
  'text-cyan-400',
  'text-teal-300',
  'text-indigo-300',
  'text-purple-400',
  'text-yellow-300',
  'text-emerald-400',
  'text-sky-300',
  'text-rose-400',
];

export function FloatingNumbersBackground() {
  // Generate 40 floating items spread evenly across the viewport
  const items = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const symbol = TIME_SYMBOLS[i % TIME_SYMBOLS.length];
      const color = COLOR_CLASSES[i % COLOR_CLASSES.length];
      const left = ((i * 2.45 + (i % 7) * 9.5) % 94) + 3; // Spread across 3% to 97% width
      const duration = 14 + (i % 8) * 3.5; // 14s to 38.5s float duration
      const delay = -((i * 3.7) % duration); // Negative delay to pre-populate entire screen on load
      const fontSize = 16 + (i % 6) * 6; // 16px to 46px
      const rotation = (i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 6); // -32deg to +32deg rotation
      const targetOpacity = 0.25 + (i % 4) * 0.08; // 0.25 to 0.49 crisp opacity
      const isGlowing = i % 2 === 0;

      return {
        id: i,
        symbol,
        color,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        fontSize: `${fontSize}px`,
        rotation: `${rotation}deg`,
        targetOpacity,
        isGlowing,
      };
    });
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute font-mono font-extrabold tracking-wider ${item.color} transition-opacity duration-1000`}
          style={{
            left: item.left,
            bottom: '-12%',
            fontSize: item.fontSize,
            animation: `floatUp ${item.duration} linear infinite`,
            animationDelay: item.delay,
            '--target-opacity': item.targetOpacity,
            '--target-rotation': item.rotation,
            filter: item.isGlowing ? 'drop-shadow(0 0 8px currentColor)' : 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
          }}
        >
          <div
            style={{
              animation: `sway ${5 + (item.id % 4) * 2}s ease-in-out infinite alternate`,
            }}
          >
            {item.symbol}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FloatingNumbersBackground;
