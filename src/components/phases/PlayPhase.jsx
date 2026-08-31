import React, { useState } from 'react';
import { WORLDS, getQuestionsForWorld } from '../../data/questionBank.js';
import { WorldMap } from '../gamification/WorldMap.jsx';
import { QuestionRenderer } from '../quiz/QuestionRenderer.jsx';
import { HintOverlay } from '../quiz/HintOverlay.jsx';
import { Mascot } from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { say, playSFX } from '../../utils/audio.js';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

export function PlayPhase({
  onAnswerQuestion,
  worldScores = [],
  currentWorld = 0,
  onSelectWorld,
  audioEnabled = true,
  format = '12h'
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const worldQuestions = getQuestionsForWorld(currentWorld);
  const currentQ = worldQuestions[qIndex] || worldQuestions[0];
  const activeWorldObj = WORLDS[currentWorld];

  useAudio(
    currentQ?.questionText ? [say(currentQ.questionText)] : [],
    audioEnabled,
    [currentQ?.id]
  );

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
          setFeedback({ type: 'world_complete', text: `World ${currentWorld + 1} Completed!` });
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

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 py-6 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Phase 4 — PRACTICE PHASE (INTELLIPLAY™)
        </span>
        <h2 className="text-2xl md:text-3xl font-bold font-fredoka text-white flex items-center gap-2">
          <span>{activeWorldObj.flag}</span>
          <span>World {currentWorld + 1}: {activeWorldObj.name}</span>
        </h2>
      </div>

      {/* World Map Selector Accordion */}
      <WorldMap
        worldScores={worldScores}
        selectedWorld={currentWorld}
        onSelectWorld={(idx) => {
          onSelectWorld(idx);
          setQIndex(0);
          setSelectedOption(null);
          setAttemptCount(0);
          setFeedback(null);
        }}
      />

      {/* Question Card */}
      {currentQ && (
        <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl flex flex-col items-center gap-6">
          {/* Question Index Progress */}
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
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
          <h3 className="text-lg md:text-2xl font-bold font-fredoka text-white text-center leading-relaxed">
            "{currentQ.questionText}"
          </h3>

          <Mascot
            mood={feedback?.type === 'success' ? 'happy' : feedback?.type === 'error' || feedback?.type === 'retry' ? 'thinking' : 'encouraging'}
            message={feedback?.text || `Select the correct answer choice below.`}
            size="md"
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
              className="py-3 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-lg flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption || feedback?.type === 'success'}
              className="py-3.5 px-10 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black font-fredoka text-base shadow-xl border border-teal-300 flex items-center gap-2 transition transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
            >
              <CheckCircle2 className="w-5 h-5" /> Confirm Answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
