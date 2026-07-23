import React from 'react';

/**
 * Chrono - The Time Explorer Clock Robot Mascot
 * Mood states: 'idle' | 'happy' | 'thinking' | 'celebrate' | 'curious' | 'encouraging'
 */
export function Mascot({ mood = 'idle', message = null, className = '', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }[size] || 'w-24 h-24';

  const getEyeExpression = () => {
    switch (mood) {
      case 'happy':
      case 'celebrate':
        return (
          <>
            <path d="M 32 40 Q 38 32 44 40" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 56 40 Q 62 32 68 40" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        );
      case 'thinking':
      case 'curious':
        return (
          <>
            <circle cx="38" cy="38" r="5" fill="#0f172a" />
            <circle cx="62" cy="34" r="5" fill="#0f172a" />
          </>
        );
      case 'encouraging':
        return (
          <>
            <circle cx="38" cy="38" r="6" fill="#0f172a" />
            <circle cx="62" cy="38" r="6" fill="#0f172a" />
            <circle cx="40" cy="36" r="2" fill="#ffffff" />
            <circle cx="64" cy="36" r="2" fill="#ffffff" />
          </>
        );
      default: // idle
        return (
          <>
            <circle cx="38" cy="38" r="5" fill="#0f172a" />
            <circle cx="62" cy="38" r="5" fill="#0f172a" />
          </>
        );
    }
  };

  const getMouthExpression = () => {
    switch (mood) {
      case 'happy':
      case 'celebrate':
        return <path d="M 38 52 Q 50 64 62 52" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 'thinking':
        return <path d="M 42 56 Q 50 52 58 56" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 'encouraging':
        return <path d="M 40 54 Q 50 60 60 54" stroke="#0f172a" strokeWidth="4" fill="none" />;
      default:
        return <path d="M 42 54 Q 50 58 58 54" stroke="#0f172a" strokeWidth="3" fill="none" />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center relative ${className}`}>
      {message && (
        <div className="mb-2 max-w-xs bg-slate-800 text-teal-200 border border-teal-500/40 rounded-2xl px-4 py-2 text-xs md:text-sm font-semibold shadow-lg animate-bounce-short relative text-center">
          {message}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-slate-800"></div>
        </div>
      )}

      <div className={`${sizeClasses} relative group transition-transform duration-300 hover:scale-105`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Top Antenna */}
          <line x1="50" y1="18" x2="50" y2="6" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="5" r="4" fill="#2dd4bf" className="animate-pulse" />

          {/* Compass / Ears */}
          <circle cx="12" cy="50" r="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />
          <circle cx="88" cy="50" r="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />

          {/* Main Head Outer Ring */}
          <circle cx="50" cy="50" r="38" fill="url(#chronoGrad)" stroke="#2dd4bf" strokeWidth="4" />
          <circle cx="50" cy="50" r="32" fill="#334155" stroke="#0f172a" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" fill="#f8fafc" />

          {/* Clock Markings */}
          <line x1="50" y1="24" x2="50" y2="27" stroke="#94a3b8" strokeWidth="2" />
          <line x1="50" y1="73" x2="50" y2="76" stroke="#94a3b8" strokeWidth="2" />
          <line x1="24" y1="50" x2="27" y2="50" stroke="#94a3b8" strokeWidth="2" />
          <line x1="73" y1="50" x2="76" y2="50" stroke="#94a3b8" strokeWidth="2" />

          {/* Eyes & Mouth */}
          {getEyeExpression()}
          {getMouthExpression()}

          {/* Cheeks */}
          <circle cx="30" cy="46" r="4" fill="#f43f5e" opacity="0.4" />
          <circle cx="70" cy="46" r="4" fill="#f43f5e" opacity="0.4" />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="chronoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
