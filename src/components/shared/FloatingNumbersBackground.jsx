import React, { useMemo } from 'react';

// Time intervals and math symbols relevant to Grade 5 Time Interval learning
const TIME_SYMBOLS = [
  '12:00', '+15m', '08:30', '60m', '24h', '+45m', ':30', '03:15',
  '12h', '+90m', '00:00', '+30m', '18:45', ':15', '+5m', '10:00',
  '+2h', '7:30', ':45', '12', '60', '24', '15', '30', '45',
  '⏰', '⏱️', '⌛', '🕒', 'AM', 'PM'
];

const COLOR_CLASSES = [
  'text-amber-400/20',
  'text-cyan-400/20',
  'text-indigo-400/25',
  'text-teal-400/20',
  'text-purple-400/20',
  'text-yellow-300/15',
  'text-blue-400/20',
];

export function FloatingNumbersBackground() {
  // Generate floating items with deterministic variance for pleasant visual balance
  const items = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const symbol = TIME_SYMBOLS[i % TIME_SYMBOLS.length];
      const color = COLOR_CLASSES[i % COLOR_CLASSES.length];
      const left = ((i * 3.1 + (i % 7) * 11) % 94) + 3; // Spread evenly 3% to 97%
      const duration = 16 + (i % 9) * 3; // 16s to 40s duration
      const delay = -((i * 4.7) % duration); // Negative delay so screen starts pre-filled
      const fontSize = 14 + (i % 5) * 6; // 14px to 38px
      const rotation = (i % 2 === 0 ? 1 : -1) * (10 + (i % 6) * 5); // -35deg to 35deg
      const targetOpacity = 0.12 + (i % 4) * 0.05; // 0.12 to 0.27 opacity
      const blur = i % 4 === 0 ? 'blur-[1px]' : i % 7 === 0 ? 'blur-[2px]' : '';
      const isGlowing = i % 3 === 0;

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
        blur,
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
          className={`absolute font-mono font-bold tracking-wider ${item.color} ${item.blur} transition-opacity duration-1000`}
          style={{
            left: item.left,
            bottom: '-10%',
            fontSize: item.fontSize,
            animation: `floatUp ${item.duration} linear infinite`,
            animationDelay: item.delay,
            '--target-opacity': item.targetOpacity,
            '--target-rotation': item.rotation,
            textShadow: item.isGlowing ? '0 0 10px currentColor' : 'none',
          }}
        >
          <div
            style={{
              animation: `sway ${6 + (item.id % 4) * 2}s ease-in-out infinite alternate`,
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
