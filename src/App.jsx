import React, { useReducer, useEffect, useState } from 'react';
import { ProgressMap } from './components/ProgressMap.jsx';
import { BottomNavBar } from './components/BottomNavBar.jsx';
import { IntroScreen } from './components/IntroScreen.jsx';
import { WonderPhase } from './components/phases/WonderPhase.jsx';
import { StoryPhase } from './components/phases/StoryPhase.jsx';
import { SimulatePhase } from './components/phases/SimulatePhase.jsx';
import { PlayPhase } from './components/phases/PlayPhase.jsx';
import { ReflectPhase } from './components/phases/ReflectPhase.jsx';
import { FeedbackOverlay } from './components/shared/FeedbackOverlay.jsx';
import { BadgePanel } from './components/gamification/BadgePanel.jsx';
import { FloatingNumbersBackground } from './components/shared/FloatingNumbersBackground.jsx';

import { calcXP, calcTotalStars } from './utils/scoring.js';
import { checkNewBadges } from './utils/badgeEngine.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const LOCAL_STORAGE_KEY = 'intellia_time_intervals_session';

const initialState = {
  phase: 'intro',
  simStationsComplete: [false, false, false],
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  midnightCorrect: 0,
  phaseComplete: {
    intro: true,
    wonder: false,
    story: false,
    simulate: false,
    play: false,
    reflect: false,
  },
  audioEnabled: true,
  clockFormat: '12h',
  unlockedBadgeToast: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return {
        ...state,
        phase: action.payload,
        phaseComplete: { ...state.phaseComplete, [action.payload]: true }
      };

    case 'UPDATE_SIM_STATIONS':
      const simDone = action.payload.every(Boolean);
      return {
        ...state,
        simStationsComplete: action.payload,
        phaseComplete: {
          ...state.phaseComplete,
          simulate: simDone ? true : state.phaseComplete.simulate
        }
      };

    case 'SET_WORLD':
      return {
        ...state,
        currentWorld: action.payload
      };

    case 'ANSWER_QUESTION': {
      const { question, isCorrect, attempt } = action.payload;
      if (!isCorrect) {
        return {
          ...state,
          streak: 0
        };
      }

      // Calculate XP
      const xpEarned = calcXP(attempt, 0, state.streak);
      const newStreak = state.streak + 1;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);

      const currentScore = state.worldScores[state.currentWorld] || 0;
      const newWorldScores = [...state.worldScores];
      newWorldScores[state.currentWorld] = currentScore + 1;

      // Midnight master progress
      const isMidnight = question.startMinutes + (question.durationMinutes || 0) >= 1440;
      const newMidnightCorrect = isMidnight ? state.midnightCorrect + 1 : state.midnightCorrect;

      const newState = {
        ...state,
        xp: state.xp + xpEarned,
        streak: newStreak,
        maxStreak: newMaxStreak,
        worldScores: newWorldScores,
        totalStars: calcTotalStars(newWorldScores),
        midnightCorrect: newMidnightCorrect
      };

      // Check badges
      const newBadges = checkNewBadges(newState);
      if (newBadges.length > 0) {
        newState.badges = [...newState.badges, ...newBadges];
        newState.unlockedBadgeToast = newBadges[0];
      }

      return newState;
    }

    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };

    case 'TOGGLE_CLOCK_FORMAT':
      return { ...state, clockFormat: state.clockFormat === '12h' ? '24h' : '12h' };

    case 'CLEAR_BADGE_TOAST':
      return { ...state, unlockedBadgeToast: null };

    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function App() {
  const [savedSession, setSavedSession] = useLocalStorage(LOCAL_STORAGE_KEY, null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showBadgePanel, setShowBadgePanel] = useState(false);

  // Resume saved session if exists
  useEffect(() => {
    if (savedSession) {
      dispatch({ type: 'LOAD_SAVED_STATE', payload: savedSession });
    }
  }, []);

  // Save session updates
  useEffect(() => {
    setSavedSession(state);
  }, [state, setSavedSession]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-nunito selection:bg-cyan-500 selection:text-white pb-16 overflow-hidden">
      {/* Background Floating Math & Time Numbers */}
      <FloatingNumbersBackground />

      {/* Top Navigation Bar */}
      <ProgressMap
        currentPhase={state.phase}
        onSelectPhase={(phase) => dispatch({ type: 'SET_PHASE', payload: phase })}
        phaseComplete={state.phaseComplete}
        audioEnabled={state.audioEnabled}
        onToggleAudio={() => dispatch({ type: 'TOGGLE_AUDIO' })}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 lg:p-10 flex flex-col items-center">
        {state.phase === 'intro' && (
          <IntroScreen
            onStart={() => dispatch({ type: 'SET_PHASE', payload: 'wonder' })}
            phaseComplete={state.phaseComplete}
          />
        )}

        {state.phase === 'wonder' && (
          <WonderPhase
            onNext={() => dispatch({ type: 'SET_PHASE', payload: 'story' })}
            audioEnabled={state.audioEnabled}
            format={state.clockFormat}
          />
        )}

        {state.phase === 'story' && (
          <StoryPhase
            onNext={() => dispatch({ type: 'SET_PHASE', payload: 'simulate' })}
            audioEnabled={state.audioEnabled}
            format={state.clockFormat}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulatePhase
            onNext={() => dispatch({ type: 'SET_PHASE', payload: 'play' })}
            completedStations={state.simStationsComplete}
            onUpdateStations={(stations) => dispatch({ type: 'UPDATE_SIM_STATIONS', payload: stations })}
            audioEnabled={state.audioEnabled}
            format={state.clockFormat}
          />
        )}

        {state.phase === 'play' && (
          <PlayPhase
            worldScores={state.worldScores}
            currentWorld={state.currentWorld}
            onSelectWorld={(worldIdx) => dispatch({ type: 'SET_WORLD', payload: worldIdx })}
            onAnswerQuestion={(question, isCorrect, attempt) =>
              dispatch({ type: 'ANSWER_QUESTION', payload: { question, isCorrect, attempt } })
            }
            audioEnabled={state.audioEnabled}
            format={state.clockFormat}
          />
        )}

        {state.phase === 'reflect' && (
          <ReflectPhase
            xp={state.xp}
            totalStars={state.totalStars}
            unlockedBadges={state.badges}
            audioEnabled={state.audioEnabled}
          />
        )}
      </main>

      {/* Fixed Bottom Gamification Bar */}
      <BottomNavBar
        xp={state.xp}
        streak={state.streak}
        totalStars={state.totalStars}
        unlockedBadges={state.badges}
        clockFormat={state.clockFormat}
        onToggleClockFormat={() => dispatch({ type: 'TOGGLE_CLOCK_FORMAT' })}
        onOpenBadges={() => setShowBadgePanel(true)}
      />

      {/* Toast Feedback & Badge Unlocks */}
      <FeedbackOverlay
        unlockedBadgeId={state.unlockedBadgeToast}
        onClose={() => dispatch({ type: 'CLEAR_BADGE_TOAST' })}
      />

      {/* Badge List Overlay */}
      <BadgePanel
        unlockedBadges={state.badges}
        isOpen={showBadgePanel}
        onClose={() => setShowBadgePanel(false)}
      />
    </div>
  );
}

export default App;
