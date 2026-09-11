import React, { useState } from 'react';
import { STORY_PANELS } from '../../data/storyContent.js';
import { Mascot } from '../shared/Mascot.jsx';
import { StoryIllustration } from '../shared/StoryIllustration.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { getStoryPanelNarration } from '../../utils/narration.js';
import { playSFX } from '../../utils/audio.js';

export function StoryPhase({ onNext, audioEnabled = true, format = '12h' }) {
  const [panelIdx, setPanelIdx] = useState(0);
  const currentPanel = STORY_PANELS[panelIdx];

  useAudio(getStoryPanelNarration(panelIdx), audioEnabled, [panelIdx]);

  const handlePrev = () => {
    if (panelIdx > 0) {
      playSFX('click');
      setPanelIdx(p => p - 1);
    }
  };

  const handleNextPanel = () => {
    if (panelIdx < STORY_PANELS.length - 1) {
      playSFX('click');
      setPanelIdx(p => p + 1);
    } else {
      playSFX('click');
      onNext();
    }
  };

  const renderFormattedStoryText = (text) => {
    const keywords = [
      'Global Time Explorers Club', 'TIME INTERVALS',
      '4:15 p.m.', '1 hour and 40 minutes', '1 hour', '5:15 p.m.', '40 minutes', '5:55 p.m.',
      '14:30', '2:30 p.m.', '12-hour', '24-hour',
      '07:45', '08:20', '35 minutes',
      'New York', 'Tokyo', 'Cairo', 'London'
    ];
    keywords.sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${keywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const lower = part.toLowerCase();
      const isKeyword = keywords.some(k => k.toLowerCase() === lower);

      if (isKeyword) {
        if (lower.includes(':') || lower.includes('hour') || lower.includes('minute') || lower.includes('time intervals')) {
          return (
            <span key={index} className="text-amber-300 font-black bg-amber-400/25 px-2.5 py-1 rounded-xl border border-amber-400/50 shadow-md mx-1 inline-block">
              {part}
            </span>
          );
        }
        return (
          <span key={index} className="text-cyan-300 font-black bg-cyan-400/25 px-2.5 py-1 rounded-xl border border-cyan-400/50 shadow-md mx-1 inline-block">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-[1350px] mx-auto flex flex-col items-center gap-6 py-4 px-2 md:px-4">
      {/* Story Card Container */}
      <div className="w-full bg-[#161845] border-2 border-[#373c85] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Artwork Scene Image */}
        <div className="w-full h-80 md:h-[400px] relative border-b-2 border-[#373c85]">
          <StoryIllustration panelId={currentPanel.id} />
        </div>

        {/* Bottom Content Area */}
        <div className="p-8 md:p-10 flex flex-col gap-6 text-left">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-black font-fredoka text-amber-400 flex items-center gap-4 drop-shadow-md tracking-tight">
            <span>{currentPanel.title}</span>
            <span className="text-5xl">{currentPanel.flag}</span>
          </h2>

          {/* Prominent High-Visibility Narrative Box */}
          <div className="bg-[#08091e] border-2 border-amber-400/70 rounded-3xl p-8 md:p-10 shadow-2xl shadow-amber-500/10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-relaxed tracking-wide font-fredoka drop-shadow-lg">
              "{renderFormattedStoryText(currentPanel.text)}"
            </p>
          </div>

          {/* Mascot Companion Badge */}
          <div className="flex items-center gap-4 bg-[#0c0e2b] border border-[#2e337d] rounded-2xl p-5 shadow-lg">
            <Mascot mood={panelIdx === 5 ? 'celebrate' : 'happy'} size="md" />
            <span className="text-base md:text-lg font-extrabold text-amber-300 flex-1 font-fredoka">
              Panel {panelIdx + 1} of 6 — {currentPanel.character} ({currentPanel.location})
            </span>
          </div>

          {/* Bottom Navigation Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2e337d]/60 mt-2">
            {/* Back Button */}
            <button
              onClick={handlePrev}
              disabled={panelIdx === 0}
              className="py-3 px-8 rounded-full bg-[#12143b] hover:bg-[#232766] disabled:opacity-40 font-extrabold text-sm md:text-base border border-[#2e337d] text-slate-300 transition shadow"
            >
              ‹ Back
            </button>

            {/* Dots & Counter */}
            <div className="flex items-center gap-2.5">
              {STORY_PANELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playSFX('click');
                    setPanelIdx(i);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    i === panelIdx ? 'bg-amber-400 scale-125 ring-4 ring-amber-300/40' : 'bg-slate-700'
                  }`}
                />
              ))}
              <span className="text-sm font-mono font-extrabold text-slate-300 ml-2">
                {panelIdx + 1}/{STORY_PANELS.length}
              </span>
            </div>

            {/* Next / Finish Button */}
            <button
              onClick={handleNextPanel}
              className="py-3 px-8 rounded-full btn-journey text-slate-950 font-black font-fredoka text-sm md:text-base shadow-xl hover:scale-105 transition"
            >
              {panelIdx === STORY_PANELS.length - 1 ? 'Start Simulations ➔' : 'Next ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
