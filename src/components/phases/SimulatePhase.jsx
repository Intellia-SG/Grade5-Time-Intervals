import React, { useState } from 'react';
import { ClockJourneyStation } from '../simulations/ClockJourneyStation.jsx';
import { SpotDurationStation } from '../simulations/SpotDurationStation.jsx';
import { TimeSentenceStation } from '../simulations/TimeSentenceStation.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { getStationInstructionNarration } from '../../utils/narration.js';
import { playSFX } from '../../utils/audio.js';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export function SimulatePhase({ onNext, onUpdateStations, completedStations = [false, false, false], audioEnabled = true, format = '12h' }) {
  const [activeStation, setActiveStation] = useState(0);

  useAudio(getStationInstructionNarration(activeStation), audioEnabled, [activeStation]);

  const handleStationComplete = (idx) => {
    const nextCompleted = [...completedStations];
    nextCompleted[idx] = true;
    onUpdateStations(nextCompleted);

    if (idx < 2) {
      setActiveStation(idx + 1);
    }
  };

  const allComplete = completedStations.every(Boolean);

  return (
    <div className="w-full max-w-[1350px] mx-auto flex flex-col items-center gap-6 py-4 px-2 md:px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-2.5 text-center">
        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-5 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2 shadow">
          <Sparkles className="w-4 h-4 text-amber-400" /> Phase 3 — SIMULATION LAB
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-fredoka text-white tracking-tight">
          Hands-on Time Interval Explorations
        </h2>
      </div>

      {/* Station Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-2xl overflow-x-auto max-w-full">
        {[
          { id: 0, title: 'Station A: Clock Journey', mode: 'Concrete' },
          { id: 1, title: 'Station B: Spot Duration', mode: 'Pictorial' },
          { id: 2, title: 'Station C: Time Sentence', mode: 'Abstract' }
        ].map((st) => {
          const isActive = activeStation === st.id;
          const isDone = completedStations[st.id];

          return (
            <button
              key={st.id}
              onClick={() => {
                playSFX('click');
                setActiveStation(st.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm md:text-base font-extrabold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg scale-102 font-fredoka'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{st.title}</span>
              {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Active Station Display */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-8 lg:p-10 border border-slate-800 shadow-2xl">
        {activeStation === 0 && (
          <ClockJourneyStation
            onCompleteStation={() => handleStationComplete(0)}
            format={format}
          />
        )}
        {activeStation === 1 && (
          <SpotDurationStation
            onCompleteStation={() => handleStationComplete(1)}
            format={format}
          />
        )}
        {activeStation === 2 && (
          <TimeSentenceStation
            onCompleteStation={() => handleStationComplete(2)}
            format={format}
          />
        )}
      </div>

      {/* Completion Next Phase Trigger */}
      {allComplete && (
        <button
          onClick={() => {
            playSFX('click');
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-slate-950 font-black font-fredoka text-base shadow-2xl animate-bounce-short flex items-center gap-2"
        >
          <span>Unlock Practice Phase (Global Challenges)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
