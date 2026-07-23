import React, { useMemo } from 'react';

// Time intervals, clock symbols & Grade 5 time digits
const TIME_SYMBOLS = [
  '12:00', '+15m', '08:30', '60m', '24h', '+45m', ':30', '03:15',
  '12h', '+90m', '00:00', '+30m', '18:45', ':15', '+5m', '10:00',
  '+2h', '7:30', ':45', '12', '60', '24', '15', '30', '45',
  '⏰', '⏱️', '⌛', '🕒', 'AM', 'PM', '06:00', '+10m', '14:30',
  ':00', '120m', '+1h', '09:15', '23:59', '+35m', '07:45', '+50m',
  '15:00', '3600s', ':20', '+40m', '11:11', '04:20', '+25m'
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
  'text-amber-300',
  'text-cyan-300',
];

export function FloatingNumbersBackground() {
  // Generate 50 items perfectly distributed vertically and horizontally across full screen
  const items = useMemo(() => {
    const totalItems = 50;
    return Array.from({ length: totalItems }).map((_, i) => {
      const symbol = TIME_SYMBOLS[i % TIME_SYMBOLS.length];
      const color = COLOR_CLASSES[i % COLOR_CLASSES.length];
      
      // Horizontal distribution (4% to 96%)
      const left = ((i * 7.7 + (i % 7) * 11) % 92) + 4;
      
      // Float animation speed (18s to 38s)
      const duration = 18 + (i % 8) * 2.5; 
      
      // CRITICAL FIX: Distribute initial vertical progress evenly across full height (0% to 100%)
      const progressFraction = i / totalItems;
      const delay = -(progressFraction * duration);
      
      const fontSize = 16 + (i % 6) * 5; // 16px to 41px font size
      const rotation = (i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 6); // -32deg to +32deg rotation
      const targetOpacity = 0.3 + (i % 4) * 0.08; // 0.3 to 0.54 vibrant opacity
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
            bottom: '0px',
            fontSize: item.fontSize,
            animation: `floatUp ${item.duration} linear infinite`,
            animationDelay: item.delay,
            '--target-opacity': item.targetOpacity,
            '--target-rotation': item.rotation,
            filter: item.isGlowing ? 'drop-shadow(0 0 8px currentColor)' : 'drop-shadow(0 0 3px rgba(0,0,0,0.6))',
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
