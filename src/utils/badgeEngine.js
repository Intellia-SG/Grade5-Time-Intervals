/**
 * Badge Definitions & Evaluation Engine
 */

export const ALL_BADGES = [
  {
    id: 'time_traveler',
    title: 'Time Traveler',
    icon: '🏅',
    description: 'Complete the Wonder and Story phases',
    rarity: 'Common'
  },
  {
    id: 'clock_builder',
    title: 'Clock Builder',
    icon: '🥈',
    description: 'Master all 3 Simulation stations',
    rarity: 'Uncommon'
  },
  {
    id: 'interval_champion',
    title: 'Interval Champion',
    icon: '🥇',
    description: 'Achieve an 80%+ total score in the Play challenge',
    rarity: 'Rare'
  },
  {
    id: 'perfect_schedule',
    title: 'Perfect Schedule',
    icon: '💎',
    description: 'Score 10/10 in any world',
    rarity: 'Epic'
  },
  {
    id: 'streak_star',
    title: 'Streak Star',
    icon: '🔥',
    description: 'Reach a streak of 10 consecutive correct answers',
    rarity: 'Epic'
  },
  {
    id: 'sharp_eye',
    title: 'Sharp Eye',
    icon: '🎯',
    description: 'Complete Station B duration matching perfectly',
    rarity: 'Uncommon'
  },
  {
    id: 'midnight_master',
    title: 'Midnight Master',
    icon: '🕰️',
    description: 'Solve 5 tricky midnight or AM/PM boundary questions',
    rarity: 'Legendary'
  },
  {
    id: 'global_explorer',
    title: 'Global Explorer',
    icon: '🌍',
    description: 'Complete all 6 phases of the lesson journey',
    rarity: 'Legendary'
  }
];

export function checkNewBadges(gameState) {
  const newUnlocked = [];
  const currentBadges = new Set(gameState.badges || []);

  const unlock = (badgeId) => {
    if (!currentBadges.has(badgeId)) {
      newUnlocked.push(badgeId);
    }
  };

  // 1. Time Traveler: Wonder + Story phase complete
  if (gameState.phaseComplete?.wonder && gameState.phaseComplete?.story) {
    unlock('time_traveler');
  }

  // 2. Clock Builder: All 3 simulation stations complete
  if (gameState.simStationsComplete && gameState.simStationsComplete.every(Boolean)) {
    unlock('clock_builder');
  }

  // 3. Streak Star: maxStreak >= 10
  if (gameState.maxStreak >= 10) {
    unlock('streak_star');
  }

  // 4. Perfect Schedule: Any world score = 10
  if (gameState.worldScores && gameState.worldScores.some(score => score === 10)) {
    unlock('perfect_schedule');
  }

  // 5. Midnight Master: midnightCorrect >= 5
  if ((gameState.midnightCorrect || 0) >= 5) {
    unlock('midnight_master');
  }

  // 6. Sharp Eye: Station B perfect
  if (gameState.stationBPerfect) {
    unlock('sharp_eye');
  }

  // 7. Interval Champion: Total play score >= 80%
  const totalAttempted = gameState.worldScores?.filter(s => s !== null).length || 0;
  if (totalAttempted >= 5) {
    const totalScore = gameState.worldScores.reduce((a, b) => (a || 0) + (b || 0), 0);
    const maxPossible = totalAttempted * 10;
    if (totalScore / maxPossible >= 0.8) {
      unlock('interval_champion');
    }
  }

  // 8. Global Explorer: All phases complete
  if (
    gameState.phaseComplete?.wonder &&
    gameState.phaseComplete?.story &&
    gameState.phaseComplete?.simulate &&
    gameState.phaseComplete?.play &&
    gameState.phaseComplete?.reflect
  ) {
    unlock('global_explorer');
  }

  return newUnlocked;
}
