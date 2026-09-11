import React, { useState } from 'react';
import { WORLDS, getQuestionsForWorld } from '../../data/questionBank.js';
import { WorldMap } from '../gamification/WorldMap.jsx';
import { QuestionRenderer } from '../quiz/QuestionRenderer.jsx';
import { HintOverlay } from '../quiz/HintOverlay.jsx';
import { Mascot } from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { say, playSFX } from '../../utils/audio.js';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, MapPin, Award, Star } from 'lucide-react';

export function PlayPhase({
  onAnswerQuestion,
  worldScores = [],
  currentWorld = 0,
  onSelectWorld,
  audioEnabled = true,
  format = '12h'
}) {
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'quiz'
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const worldQuestions = getQuestionsForWorld(currentWorld);
  const currentQ = worldQuestions[qIndex] || worldQuestions[0];
  const activeWorldObj = WORLDS[currentWorld];

  useAudio(
    viewMode === 'quiz' && currentQ?.questionText ? [say(currentQ.questionText)] : [],
    audioEnabled,
    [viewMode, currentQ?.id]
  );

  const handleSelectWorldFromMap = (idx) => {
    onSelectWorld(idx);
    setQIndex(0);
    setSelectedOption(null);
    setAttemptCount(0);
    setFeedback(null);
    setViewMode('quiz');
  };

  const handleSelectOption = (opt) => {
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const isCorrect = String(selectedOption).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();

    if (isCorrect) {
      playSFX('correct');
      setFeedback({ type: 'success', text: 'Correct! Excellent calculation! 🎉' });
      onAnswerQuestion(currentQ, true, attemptCount + 1);

      setTimeout(() => {
        if (qIndex < worldQuestions.length - 1) {
          setQIndex(q => q + 1);
          setSelectedOption(null);
          setAttemptCount(0);
          setFeedback(null);
        } else {
          // World completed!
          setFeedback({ type: 'world_complete', text: `World ${currentWorld + 1} (${activeWorldObj.name}) Completed!` });
        }
      }, 1500);
    } else {
      playSFX('incorrect');
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      onAnswerQuestion(currentQ, false, nextAttempt);

      if (nextAttempt >= 3) {
        setFeedback({ type: 'error', text: `Here is the solution! The correct answer is ${currentQ.correctAnswer}.` });
      } else {
        setFeedback({ type: 'retry', text: `Not quite! Attempt ${nextAttempt} of 3. Check the hint!` });
      }
    }
  };

  const handleNextQAfterFail = () => {
    if (qIndex < worldQuestions.length - 1) {
      setQIndex(q => q + 1);
      setSelectedOption(null);
      setAttemptCount(0);
      setFeedback(null);
    }
  };

  const handleGoToNextWorld = () => {
    if (currentWorld < WORLDS.length - 1) {
      playSFX('click');
      handleSelectWorldFromMap(currentWorld + 1);
    } else {
      setViewMode('map');
    }
  };

  return (
    <div className="w-full max-w-[1350px] mx-auto flex flex-col items-center gap-6 py-4 px-2 md:px-4">
      {/* MAP VIEW MODE */}
      {viewMode === 'map' && (
        <div className="w-full flex flex-col items-center gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-2.5 text-center">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-5 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2 shadow">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Phase 4 — PRACTICE PHASE (INTELLIPLAY™)
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-fredoka text-white tracking-tight">
              Global Challenge World Map
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl">
              Choose an unlocked world below to launch its dedicated 10-question practice page!
            </p>
          </div>

          {/* Interactive World Map Selector */}
          <WorldMap
            worldScores={worldScores}
            selectedWorld={currentWorld}
            onSelectWorld={handleSelectWorldFromMap}
          />
        </div>
      )}

      {/* QUIZ VIEW MODE (Dedicated Question Page) */}
      {viewMode === 'quiz' && (
        <div className="w-full flex flex-col items-center gap-4 max-w-4xl">
          {/* Quiz Top Action Bar */}
          <div className="w-full flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 px-5 rounded-2xl shadow-xl flex-wrap">
            <button
              onClick={() => {
                playSFX('click');
                setViewMode('map');
              }}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs md:text-sm border border-slate-700 flex items-center gap-1.5 transition shadow"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>‹ Back to World Map</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-700 text-cyan-300 font-fredoka font-bold text-sm md:text-base shadow">
              <span>{activeWorldObj.flag}</span>
              <span>World {currentWorld + 1}: {activeWorldObj.name} ({activeWorldObj.landmark})</span>
            </div>
          </div>

          {/* World Completed Summary Modal/Card */}
          {feedback?.type === 'world_complete' ? (
            <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border-2 border-emerald-400/60 shadow-2xl flex flex-col items-center text-center gap-6 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl shadow-xl">
                🏆
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black font-fredoka text-white">
                  World {currentWorld + 1} Completed!
                </h3>
                <p className="text-slate-300 font-medium mt-1 text-sm md:text-base">
                  You conquered {activeWorldObj.name} ({activeWorldObj.landmark})!
                </p>
              </div>

              <Mascot
                mood="celebrate"
                message="Outstanding time calculation skills! Ready for the next global landmark?"
                size="md"
              />

              <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
                <button
                  onClick={() => {
                    playSFX('click');
                    setViewMode('map');
                  }}
                  className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-sm border border-slate-700 flex items-center gap-2 transition shadow"
                >
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Back to World Map</span>
                </button>

                {currentWorld < WORLDS.length - 1 && (
                  <button
                    onClick={handleGoToNextWorld}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black font-fredoka text-sm md:text-base shadow-xl flex items-center gap-2 transition transform hover:scale-105"
                  >
                    <span>Play Next World (World {currentWorld + 2})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Question Card */
            currentQ && (
              <div className="w-full glass-panel rounded-3xl p-5 md:p-6 border border-slate-800 shadow-2xl flex flex-col items-center gap-4">
                {/* Question Index Progress */}
                <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    Question {qIndex + 1} of {worldQuestions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    {worldQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${
                          i === qIndex ? 'bg-cyan-400 scale-125' : i < qIndex ? 'bg-emerald-500' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Prompt */}
                <h3 className="text-base md:text-lg lg:text-xl font-bold font-fredoka text-white text-center leading-snug max-w-2xl">
                  "{currentQ.questionText}"
                </h3>

                <Mascot
                  mood={feedback?.type === 'success' ? 'happy' : feedback?.type === 'error' || feedback?.type === 'retry' ? 'thinking' : 'encouraging'}
                  message={feedback?.text || `Select the correct answer choice below.`}
                  size="sm"
                />

                {/* Polymorphic Question Renderer */}
                <QuestionRenderer
                  question={currentQ}
                  onSelectAnswer={handleSelectOption}
                  selectedOption={selectedOption}
                  disabled={feedback?.type === 'success'}
                  format={format}
                />

                {/* Progressive Hint Overlay */}
                <HintOverlay
                  question={currentQ}
                  attemptCount={attemptCount}
                  format={format}
                />

                {/* Submit or Next Button */}
                {attemptCount >= 3 ? (
                  <button
                    onClick={handleNextQAfterFail}
                    className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption || feedback?.type === 'success'}
                    className="py-3 px-8 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black font-fredoka text-sm md:text-base shadow-xl border border-teal-300 flex items-center gap-2 transition transform hover:scale-102 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Confirm Answer
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PlayPhase;
