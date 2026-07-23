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
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 py-6 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
          <Sparkles className="w-4 h-4 text-amber-400" /> Phase 3 — SIMULATION LAB
        </span>
        <h2 className="text-2xl md:text-3xl font-bold font-fredoka text-white">
          Hands-on Time Interval Explorations
        </h2>
      </div>

      {/* Station Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-xl overflow-x-auto">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg scale-102 font-fredoka'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{st.title}</span>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Active Station Display */}
      <div className="w-full glass-panel rounded-3xl p-4 md:p-6 border border-slate-800 shadow-2xl">
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
          <span>Unlock Play Phase (Global Challenges)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
