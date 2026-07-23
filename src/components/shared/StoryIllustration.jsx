import React, { useState } from 'react';

export function StoryIllustration({ panelId = 1, className = '' }) {
  const [imgError, setImgError] = useState(false);
  const imagePath = `/assets/images/story/panel${panelId}.png`;

  if (!imgError) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-slate-900 flex items-center justify-center ${className}`}>
        <img
          src={imagePath}
          alt={`Story Panel ${panelId}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        {/* Subtle gradient overlay at bottom for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c4d] via-transparent to-transparent opacity-60 pointer-events-none"></div>
      </div>
    );
  }

  // Fallback if image path fails
  return (
    <div className={`w-full h-full bg-gradient-to-br from-indigo-950 via-[#151845] to-[#0c0e28] p-4 flex flex-col justify-between relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-[#2e337d] pb-2">
        <span className="text-xs font-mono font-bold text-cyan-300">Story Panel {panelId} Scene</span>
      </div>
      <div className="flex items-center justify-center flex-1">
        <span className="text-4xl">📖</span>
      </div>
    </div>
  );
}
