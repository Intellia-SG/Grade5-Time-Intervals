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

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 py-4 px-4">
      {/* Story Card Container */}
      <div className="w-full bg-[#191c4d] border border-[#2e337d] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Artwork Scene Image */}
        <div className="w-full h-64 md:h-72 relative border-b border-[#2e337d]">
          <StoryIllustration panelId={currentPanel.id} />
        </div>

        {/* Bottom Content Area */}
        <div className="p-6 flex flex-col gap-4 text-left">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold font-fredoka text-white flex items-center gap-2">
            <span>{currentPanel.title}</span>
            <span className="text-3xl">{currentPanel.flag}</span>
          </h2>

          {/* Prominent High-Visibility Narrative Box */}
          <div className="bg-[#12143b] border-2 border-cyan-500/40 rounded-2xl p-5 shadow-xl">
            <p className="text-base md:text-lg lg:text-xl font-bold text-white leading-relaxed tracking-wide font-nunito">
              "{currentPanel.text}"
            </p>
          </div>

          {/* Mascot Companion Badge */}
          <div className="flex items-center gap-3 bg-[#12143b] border border-[#2e337d] rounded-2xl p-3">
            <Mascot mood={panelIdx === 5 ? 'celebrate' : 'happy'} size="sm" />
            <span className="text-xs md:text-sm font-bold text-amber-300 flex-1">
              Panel {panelIdx + 1} of 6 — {currentPanel.character} ({currentPanel.location})
            </span>
          </div>

          {/* Bottom Navigation Row */}
          <div className="flex items-center justify-between pt-3 border-t border-[#2e337d]/60 mt-1">
            {/* Back Button */}
            <button
              onClick={handlePrev}
              disabled={panelIdx === 0}
              className="py-2.5 px-6 rounded-full bg-[#12143b] hover:bg-[#232766] disabled:opacity-40 font-bold text-xs md:text-sm border border-[#2e337d] text-slate-300 transition"
            >
              ‹ Back
            </button>

            {/* Dots & Counter */}
            <div className="flex items-center gap-2">
              {STORY_PANELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playSFX('click');
                    setPanelIdx(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === panelIdx ? 'bg-amber-400 scale-125 ring-2 ring-amber-300/50' : 'bg-slate-700'
                  }`}
                />
              ))}
              <span className="text-xs font-mono font-bold text-slate-300 ml-1">
                {panelIdx + 1}/{STORY_PANELS.length}
              </span>
            </div>

            {/* Next / Finish Button */}
            <button
              onClick={handleNextPanel}
              className="py-2.5 px-6 rounded-full btn-journey text-slate-950 font-black font-fredoka text-xs md:text-sm shadow-lg hover:scale-105 transition"
            >
              {panelIdx === STORY_PANELS.length - 1 ? 'Start Simulations ➔' : 'Next ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
