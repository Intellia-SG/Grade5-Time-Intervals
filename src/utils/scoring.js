/**
 * Scoring & Gamification utilities for Grade 5 Time Intervals
 */

// Calculate XP earned per question attempt
export function calcXP(attempts, hintsUsed, currentStreak) {
  let base = 10;
  if (attempts === 2) base = 7;
  if (attempts >= 3) base = 5;

  if (hintsUsed > 0 && base > 5) {
    base = Math.max(5, base - hintsUsed * 2);
  }

  const streakBonus = currentStreak >= 5 ? 5 : 0;
  return base + streakBonus;
}

// Calculate 1-3 star rating based on world score out of 10
export function calcWorldStars(scoreOutOf10) {
  if (scoreOutOf10 >= 9) return 3;
  if (scoreOutOf10 >= 7) return 2;
  if (scoreOutOf10 >= 6) return 1;
  return 0;
}

// Calculate total stars accumulated across all worlds
export function calcTotalStars(worldScores) {
  return worldScores.reduce((acc, score) => {
    if (score === null || score === undefined) return acc;
    return acc + calcWorldStars(score);
  }, 0);
}
