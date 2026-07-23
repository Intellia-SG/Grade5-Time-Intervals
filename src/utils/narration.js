import { say, ask, instruct, celebrate } from './audio.js';

export function getWonderNarration() {
  return [
    say("Sarah's flight leaves London at 9:45 a.m. and lands in New York 8 hours and 20 minutes later. What time does Sarah land?"),
    say("Welcome Explorer! Let's discover how TIME INTERVALS help us solve real-world problems around the globe!")
  ];
}

export function getStoryPanelNarration(panelIndex) {
  const panelTexts = [
    "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki form the Global Time Explorers Club — a video-call group of friends from different countries who challenge each other with time puzzles.",
    "Mike in New York starts his homework at 4:15 p.m. He works for 1 hour and 40 minutes. What time does he finish?",
    "Watch the clock move forward! From 4:15 p.m., adding 1 hour gives 5:15 p.m., and 40 minutes more brings us to 5:55 p.m.",
    "Yuki in Tokyo takes the bullet train at 14:30. That is 2:30 p.m. in 12-hour time! Trains in Japan often use 24-hour time.",
    "Aisha checks a timetable: her school bus leaves at 07:45 and arrives at 08:20. How long is the ride? 35 minutes!",
    "Every clock, every country, every trip — TIME INTERVALS help us plan our whole day!"
  ];

  const text = panelTexts[panelIndex] || panelTexts[0];
  return [say(text)];
}

export function getStationInstructionNarration(stationIndex) {
  if (stationIndex === 0) {
    return [instruct("Station A: Drag duration blocks onto the clock to build the journey and reach the target end time!")];
  } else if (stationIndex === 1) {
    return [instruct("Station B: Tap the cards where the claimed duration matches the before and after clocks!")];
  } else {
    return [instruct("Station C: Fill in the missing time value in the Time Sentence to complete the equation!")];
  }
}

export function getReflectNarration() {
  return [
    ask("If you could plan a journey anywhere in the world, what start time and end time would you choose? Tell Chrono!")
  ];
}

export function getCorrectFeedbackNarration() {
  return [celebrate("Amazing! You calculated the time perfectly! 🎉")];
}

export function getIncorrectFeedbackNarration(attempt = 1) {
  if (attempt === 1) {
    return [say("Not quite! Let's look at the clock again ⏰")];
  } else if (attempt === 2) {
    return [say("Almost! Take another look at the hours and minutes.")];
  } else {
    return [say("Here is how we solve this step by step!")];
  }
}
