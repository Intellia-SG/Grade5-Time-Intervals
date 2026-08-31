# Technical Requirements Document (TRD)
## Time Intervals — Calculating Time, Duration & Schedules | Grade 5 Math
### Intellia | Global Grade 5 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, simulation logic, gamification implementation, audio pipeline, and quality standards for the **"Global Time Explorers — Time Intervals"** interactive lesson module for Grade 5 Math.

The module is a **React 18 application (Vite + JSX)**, structured identically to the reference repository **https://github.com/dsamyak/equal**, and styled to strictly match **https://equal-tau.vercel.app/**. It will be embedded at:

```
https://intelliasg.com/courses/grade-5-math/lessons/time-intervals/
```

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API fallback), directly implementing the pipeline documented in `audio_generation_pipeline.md`, adapted for this lesson's scripts.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches `equal` repo structure |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches existing repo CSS approach |
| Icons | Lucide React | Available in artifact environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| SVG Diagrams | Inline SVG (React) | Analog clock faces + timeline bars |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Time Math | Vanilla JS (`Date`-free minute-based arithmetic) | Avoids timezone/DST pitfalls |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

---

## 3. Project Structure (mirrors `equal` repo)

```
time-intervals/
├── public/
│   ├── assets/
│   │   ├── audio/                       # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ... (all phase phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                         # React entry point
│   ├── App.jsx                          # Root component, global state (useReducer)
│   ├── App.css                          # Global styles (mirrors equal-tau CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx              # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx              # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx          # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx           # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx        # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx            # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx         # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── ClockJourneyStation.jsx  # Station A: Drag duration blocks onto a clock
│   │   │   ├── SpotDurationStation.jsx  # Station B: Visual duration matching
│   │   │   └── TimeSentenceStation.jsx  # Station C: Fill "Start + Duration = End"
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx     # Polymorphic dispatcher → type-specific component
│   │   │   ├── FindEndTimeQ.jsx         # Q1: Find end time given start + duration
│   │   │   ├── FindDurationQ.jsx        # Q2: Find elapsed duration
│   │   │   ├── FindStartTimeQ.jsx       # Q3: Find start time given end - duration
│   │   │   ├── Convert12to24Q.jsx       # Q4: Convert 12-hour to 24-hour
│   │   │   ├── Convert24to12Q.jsx       # Q5: Convert 24-hour to 12-hour
│   │   │   ├── JourneyWordProbQ.jsx     # Q6: Word problem — journey duration
│   │   │   ├── ScheduleWordProbQ.jsx    # Q7: Word problem — schedule reasoning
│   │   │   ├── TrueFalseDurationQ.jsx   # Q8: True/False — is this duration correct?
│   │   │   ├── TimetableMCQ.jsx         # Q9: Read timetable → pick correct answer
│   │   │   ├── UnitConversionQ.jsx      # Q10: Minutes/hours/seconds conversion
│   │   │   └── HintOverlay.jsx          # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx            # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx           # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx           # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx        # Fire streak counter
│   │   │   └── WorldMap.jsx             # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx               # "Chrono" clock-robot with mood states
│   │       ├── ClockFace.jsx            # Reusable SVG: analog clock with animated hands
│   │       ├── TimelineBar.jsx          # Reusable SVG/HTML: start–duration–end bar
│   │       ├── DurationBlockTray.jsx    # Draggable duration-chip source tray
│   │       ├── TimePad.jsx              # Large tap-friendly hour/minute/AM-PM input
│   │       └── FeedbackOverlay.jsx      # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js              # 100 question objects (all types)
│   │   └── storyContent.js              # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                  # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js              # Gamification state hook
│   │   └── useLocalStorage.js           # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                  # AUTO-GENERATED: text → .mp3 path map
│       ├── timeMath.js                  # Minute-based time arithmetic (core engine)
│       ├── shuffle.js                   # Fisher-Yates randomization
│       ├── scoring.js                   # XP + star calculation + distractor gen
│       └── badgeEngine.js               # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                # Offline ElevenLabs audio pre-generation
│   └── clean_audio.js                   # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                    # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro',            // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,              // 0–5 (6 story panels)
  currentSimStation: 0,       // 0=ClockJourney, 1=SpotDuration, 2=TimeSentence
  simStationsComplete: [false, false, false],
  simRound: 0,                 // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],             // 100 shuffled Question objects
  currentQuestion: 0,          // 0–99
  currentWorld: 0,             // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,             // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],                  // Array of unlocked badge IDs
  midnightCorrect: 0,           // Tracks "Midnight Master" badge progress

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,          // ElevenLabs narration on/off
  musicEnabled: false,         // Background ambient music (off by default)
  clockFormat: '12h',          // '12h' | '24h' — display preference toggle
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  TOGGLE_CLOCK_FORMAT: 'TOGGLE_CLOCK_FORMAT',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

---

## 5. Time Math Engine (`utils/timeMath.js`)

All time arithmetic is performed in **minutes-since-midnight** (0–1439) to avoid `Date`/timezone/DST pitfalls entirely.

```javascript
// Convert "HH:MM" (24h) or {hour, minute, period} (12h) to minutes-since-midnight
export function to24hMinutes({ hour, minute, period }) {
  let h = hour % 12;
  if (period === 'PM') h += 12;
  return h * 60 + minute;
}

// Add a duration (in minutes) to a start time, wrapping past midnight if needed
export function addDuration(startMinutes, durationMinutes) {
  return (startMinutes + durationMinutes) % 1440;
}

// Elapsed time between two clock times, always non-negative,
// wraps forward across midnight (end assumed to be same or next day)
export function elapsedMinutes(startMinutes, endMinutes) {
  return (endMinutes - startMinutes + 1440) % 1440;
}

// Format minutes-since-midnight into 12-hour {hour, minute, period}
export function formatTo12h(totalMinutes) {
  const h24 = Math.floor(totalMinutes / 1440 !== 0 ? totalMinutes % 1440 / 60 : totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return { hour: h12, minute: m, period };
}

// Format minutes-since-midnight into 24-hour "HH:MM" string
export function formatTo24h(totalMinutes) {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Human-readable duration string, e.g. "2 hr 15 min"
export function formatDuration(durationMinutes) {
  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

// Detects whether an interval crosses the midnight boundary
export function crossesMidnight(startMinutes, durationMinutes) {
  return startMinutes + durationMinutes >= 1440;
}

// Detects whether an interval crosses the AM/PM boundary (without crossing midnight)
export function crossesAmPm(startMinutes, durationMinutes) {
  const end = startMinutes + durationMinutes;
  return Math.floor(startMinutes / 720) !== Math.floor(end / 720) && end < 1440;
}
```

All clock UI components (`ClockFace.jsx`, `TimelineBar.jsx`, `TimePad.jsx`) consume and emit **minutes-since-midnight integers only** — no native `Date` objects are used anywhere in the simulation or quiz engine, eliminating timezone bugs entirely.

---

## 6. Question Data Model

### 6.1 Question Schema

```typescript
interface Question {
  id: string;                    // e.g. "Q1_003", "Q7_008"
  type: QuestionType;            // One of 10 enum values (see below)
  world: number;                 // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;         // 1=easy, 2=medium, 3=hard

  // Core time values (all in minutes-since-midnight or minutes duration)
  startMinutes?: number;
  endMinutes?: number;
  durationMinutes?: number;
  missingSlot: 'start' | 'end' | 'duration';

  // Rendering
  questionText: string;         // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;           // 'clockPair' | 'timeline' | 'sentence' | 'timetable' | 'trueFalse'
  clockFormatUsed: '12h' | '24h';

  // MCQ
  options?: (string|number)[];  // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;                 // Shown after 1 wrong attempt
  hint2: string;                 // Shown after 2 wrong attempts (animation trigger)
  explanation: string;           // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  cityFrom?: string;
  cityTo?: string;
  contextObject?: string;        // 'train', 'flight', 'bus', 'movie', 'homework'

  // True/False only
  isTrue?: boolean;

  // Timetable questions only
  timetableRows?: { label: string; departure: string; arrival: string }[];

  // Answer
  correctAnswer: number | string;
}

type QuestionType =
  | 'find_end_time'        // Q1
  | 'find_duration'        // Q2
  | 'find_start_time'      // Q3
  | 'convert_12_to_24'      // Q4
  | 'convert_24_to_12'      // Q5
  | 'journey_word_problem'  // Q6
  | 'schedule_word_problem' // Q7
  | 'true_false_duration'   // Q8
  | 'timetable_mcq'         // Q9
  | 'unit_conversion';      // Q10

type VisualType =
  | 'clockPair'    // Before/after ClockFace pair
  | 'timeline'     // TimelineBar diagram
  | 'sentence'     // "Start ___ + Duration ___ = End ___" with highlighted blank
  | 'timetable'    // Table of departure/arrival rows
  | 'trueFalse';   // Statement + True/False buttons
```

### 6.2 Sample Question Objects

```javascript
// Q1 — Find End Time
{
  id: "Q1_001",
  type: "find_end_time",
  world: 0,
  difficulty: 1,
  startMinutes: 585,      // 9:45 a.m.
  durationMinutes: 135,    // 2 hr 15 min
  missingSlot: "end",
  questionText: "Sarah's flight leaves London at 9:45 a.m. It takes 2 hours and 15 minutes. What time does it land?",
  visual: "timeline",
  clockFormatUsed: "12h",
  characterName: "Sarah",
  cityFrom: "London",
  cityTo: "New York",
  contextObject: "flight",
  hint1: "Start with 9:45. Add 2 hours first: what time is it then?",
  hint2: "9:45 + 2 hours = 11:45. Now add 15 more minutes!",
  explanation: "9:45 a.m. plus 2 hours is 11:45 a.m. Adding 15 more minutes gives 12:00 p.m.",
  options: ["11:45 a.m.", "12:00 p.m.", "12:15 p.m.", "1:00 p.m."],
  correctAnswer: "12:00 p.m.",
}

// Q6 — Journey Word Problem
{
  id: "Q6_004",
  type: "journey_word_problem",
  world: 3,
  difficulty: 2,
  startMinutes: 490,    // 08:10 (24h)
  endMinutes: 695,       // 11:35 (24h)
  durationMinutes: 205,  // 3 hr 25 min
  missingSlot: "duration",
  questionText: "John's train leaves Tokyo at 08:10 and arrives at 11:35. How long is the journey?",
  visual: "timeline",
  clockFormatUsed: "24h",
  characterName: "John",
  cityFrom: "Tokyo",
  cityTo: "Kyoto",
  contextObject: "train",
  hint1: "Count the hours first: from 08:10 to 11:10 is how many hours?",
  hint2: "That's 3 hours. Now add the extra 25 minutes from 11:10 to 11:35!",
  explanation: "From 08:10 to 11:35 is 3 hours and 25 minutes.",
  options: ["3 hr 15 min", "3 hr 25 min", "3 hr 35 min", "4 hr 25 min"],
  correctAnswer: "3 hr 25 min",
}

// Q7 — Schedule Reasoning Word Problem
{
  id: "Q7_002",
  type: "schedule_word_problem",
  world: 2,
  difficulty: 2,
  startMinutes: 1110,   // 6:30 p.m.
  durationMinutes: 130,  // 2 hr 10 min
  missingSlot: "end",
  questionText: "Emma's movie starts at 6:30 p.m. and lasts 2 hours and 10 minutes. Will she be home by 9:00 p.m.?",
  visual: "clockPair",
  clockFormatUsed: "12h",
  characterName: "Emma",
  contextObject: "movie",
  hint1: "First work out what time the movie ends.",
  hint2: "6:30 p.m. + 2 hr 10 min = 8:40 p.m. Is that before or after 9:00 p.m.?",
  explanation: "The movie ends at 8:40 p.m., which is before 9:00 p.m. — yes, she'll be home in time!",
  options: ["Yes, at 8:40 p.m.", "No, at 9:10 p.m.", "Yes, at 9:00 p.m. exactly", "No, at 8:20 p.m."],
  correctAnswer: "Yes, at 8:40 p.m.",
}

// Q10 — Unit Conversion
{
  id: "Q10_005",
  type: "unit_conversion",
  world: 5,
  difficulty: 1,
  durationMinutes: 140,   // 2 hr 20 min
  missingSlot: "duration",
  questionText: "How many minutes are in 2 hours and 20 minutes?",
  visual: "sentence",
  clockFormatUsed: "24h",
  hint1: "How many minutes are in 2 full hours?",
  hint2: "2 hours = 120 minutes. Now add the extra 20 minutes!",
  explanation: "2 hours = 120 minutes. 120 + 20 = 140 minutes.",
  options: [120, 130, 140, 160],
  correctAnswer: 140,
}
```

---

## 7. Clock & Timeline SVG Components

### 7.1 `ClockFace.jsx` — Reusable Analog Clock

```javascript
// ClockFace.jsx — animatable analog clock rendered from minutes-since-midnight
const ClockFace = ({
  totalMinutes,        // 0–1439
  size = 'medium',      // 'small' | 'medium' | 'large'
  animated = false,
  showDigital = true,
  format = '12h',       // '12h' | '24h' for the digital readout
}) => {
  const radius = size === 'large' ? 90 : size === 'medium' ? 70 : 50;
  const hours = Math.floor(totalMinutes / 60) % 12;
  const minutes = totalMinutes % 60;

  const minuteAngle = (minutes / 60) * 360;
  const hourAngle = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="clock-wrapper">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
           style={{ width: radius * 2, height: radius * 2 }}>
        <circle cx="100" cy="100" r="95" fill="#fff" stroke="#4A90D9" strokeWidth="4" />
        {Array(12).fill(0).map((_, i) => (
          <line key={i}
            x1="100" y1="12" x2="100" y2="24"
            stroke="#4A90D9" strokeWidth="3"
            transform={`rotate(${i * 30}, 100, 100)`} />
        ))}
        {/* Hour hand */}
        <line x1="100" y1="100" x2="100" y2="55" stroke="#333" strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 100, 100)`}
          className={animated ? 'clock-hand-animated' : ''} />
        {/* Minute hand */}
        <line x1="100" y1="100" x2="100" y2="30" stroke="#4A90D9" strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 100, 100)`}
          className={animated ? 'clock-hand-animated' : ''} />
        <circle cx="100" cy="100" r="6" fill="#333" />
      </svg>
      {showDigital && (
        <div className="clock-digital-readout">
          {format === '24h' ? formatTo24h(totalMinutes)
            : `${formatTo12h(totalMinutes).hour}:${String(formatTo12h(totalMinutes).minute).padStart(2, '0')} ${formatTo12h(totalMinutes).period}`}
        </div>
      )}
    </div>
  );
};
```

Animation variants:
- `animated=true` → CSS transition on the `transform: rotate(...)` of both hands (600ms ease-in-out) whenever `totalMinutes` changes
- `shake` variant → CSS `shake` keyframe applied to `.clock-wrapper` on wrong answer
- `bounce` variant → CSS `bounceIn` keyframe applied to `.clock-wrapper` on correct answer

### 7.2 `TimelineBar.jsx` — Start → Duration → End Visual

```javascript
// TimelineBar.jsx — horizontal bar showing start point, duration segment, end point
const TimelineBar = ({ startMinutes, durationMinutes, missingSlot, format = '12h' }) => {
  const endMinutes = addDuration(startMinutes, durationMinutes);
  return (
    <div className="timeline-bar">
      <div className="timeline-point start">
        {missingSlot === 'start' ? '?' : formatLabel(startMinutes, format)}
      </div>
      <div className="timeline-segment">
        <span className="timeline-duration-label">
          {missingSlot === 'duration' ? '?' : formatDuration(durationMinutes)}
        </span>
      </div>
      <div className="timeline-point end">
        {missingSlot === 'end' ? '?' : formatLabel(endMinutes, format)}
      </div>
    </div>
  );
};
```

---

## 8. Simulation Station Component Specs

### 8.1 `ClockJourneyStation.jsx` — Station A (Concrete)

```javascript
const [round, setRound] = useState(getStationARound(state.simRound));
// round: { startMinutes: 480, targetDurationMinutes: 90, format: '12h' }
const [blocksPlaced, setBlocksPlaced] = useState([]);   // Array of block values used
const [currentMinutes, setCurrentMinutes] = useState(round.startMinutes);
```

**Interaction (Drag):**
- `DurationBlockTray` renders draggable chips: `+15 min`, `+30 min`, `+1 hr`, `+2 hr`
- `onDrop`: `currentMinutes = addDuration(currentMinutes, blockValue)`; `ClockFace` animates to new position
- Running total shown as a growing segment on `TimelineBar`

**Interaction (Tap fallback):**
- Tap a block in the tray → block glows (selected) → tap the clock to apply it

**Completion Check:**
- `currentMinutes === addDuration(round.startMinutes, round.targetDurationMinutes)` → correct
- Submit button appears once at least one block has been placed
- On correct submit: mascot celebrates, ElevenLabs plays celebration audio
- On incorrect submit: shake + narration "Not quite there yet — check your blocks!"

**Station A Rounds (4 rounds, randomized order):**
```javascript
{ startMinutes: 480, targetDurationMinutes: 90,  format: '12h' }  // 8:00am +1hr30
{ startMinutes: 975, targetDurationMinutes: 105, format: '12h' }  // 4:15pm +1hr45
{ startMinutes: 650, targetDurationMinutes: 40,  format: '12h' }  // 10:50am +40min (crosses AM/PM)
{ startMinutes: 1395, targetDurationMinutes: 150, format: '24h' } // 23:15 +2hr30 (crosses midnight)
```

### 8.2 `SpotDurationStation.jsx` — Station B (Pictorial)

```javascript
const [cards, setCards] = useState(generateDurationCards(round));
const [selected, setSelected] = useState([]);   // Indices of tapped cards
const [submitted, setSubmitted] = useState(false);
```

**Card Generation (`generateDurationCards`):**
- Creates 4 cards, each with a `startMinutes`, `endMinutes`, and a printed `claimedDuration`
- 2–3 cards state the correct duration; 1–2 are mismatched by a plausible offset (±15/±30 min or AM/PM flip)
- Each card renders a before/after `ClockFace` pair plus the printed duration text

**Interaction:**
- Tap a card → border highlights (selected state)
- Multi-select allowed (student picks all cards where the label is correct)
- "Check" button submits selection
- On submit: correct cards glow green, wrong cards glow red (1.5s), then advance

**Rounds (3 rounds per station):**
- Round 1: Whole-hour durations (easy visual comparison)
- Round 2: Half/quarter-hour durations (medium)
- Round 3: Mixed hour+minute durations crossing AM/PM (hard)

### 8.3 `TimeSentenceStation.jsx` — Station C (Abstract)

```javascript
const [problem, setProblem] = useState(getSentenceProblem(state.simRound));
// problem: { startMinutes, durationMinutes, endMinutes, missingSlot, format }
const [inputValue, setInputValue] = useState(null);
const [showTimeline, setShowTimeline] = useState(false);
```

**Layout:**
```jsx
<div className="time-sentence-row">
  {missingSlot === 'start'
    ? <TimeBlankInput value={inputValue} format={problem.format} />
    : <span className="given-value">{formatLabel(problem.startMinutes, problem.format)}</span>}
  <span className="label">+</span>
  {missingSlot === 'duration'
    ? <TimeBlankInput value={inputValue} isDuration />
    : <span className="given-value">{formatDuration(problem.durationMinutes)}</span>}
  <span className="equals">=</span>
  {missingSlot === 'end'
    ? <TimeBlankInput value={inputValue} format={problem.format} />
    : <span className="given-value">{formatLabel(problem.endMinutes, problem.format)}</span>}
</div>
<TimePad value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
<button onClick={() => setShowTimeline(!showTimeline)}>Show me the timeline ⏱️</button>
{showTimeline && <TimelineBar {...problem} />}
```

**Variants (rotated across 3 rounds):**
- Round 1: Find end time → `9:45 a.m. + 2 hr 15 min = ___`
- Round 2: Find duration → `07:20 → 08:55 = ___`
- Round 3: Find start time → `___ + 1 hr 30 min = 6:10 p.m.`

ElevenLabs reads the full sentence aloud when displayed.

---

## 9. Audio Pipeline (ElevenLabs — Matching `audio_generation_pipeline.md`)

### 9.1 Voice Configuration

- **Voice Name:** Alice
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Var:** `VITE_ELEVENLABS_API_KEY` (in `.env.local`)

### 9.2 Speech Style Settings (per style type)

| Style | Stability | Similarity Boost | Style | Speaker Boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ |
| `question` | 0.20 | 0.55 | 0.55 | ✅ |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ |

### 9.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "Sarah's flight leaves London at nine forty-five in the morning.", style: 'thinking' },
  { text: "It lands in New York eight hours and twenty minutes later. What time does she land?", style: 'question' },
  { text: "Let's discover how time intervals help us solve this!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki form the Global Time Explorers Club.", style: 'statement' },
  { text: "Mike in New York starts his homework at four fifteen in the afternoon.", style: 'statement' },
  { text: "He works for one hour and forty minutes. What time does he finish?", style: 'question' },
  { text: "Yuki in Tokyo takes the bullet train at fourteen thirty. That's two thirty in the afternoon!", style: 'emphasis' },
  { text: "Aisha checks a timetable. Her school bus leaves at seven forty-five and arrives at eight twenty.", style: 'statement' },
  { text: "Every clock, every country, every trip — time intervals help us plan our whole day!", style: 'emphasis' },

  // Phase 3 — Simulation Instructions
  { text: "Drag the time blocks onto the clock. Add up the minutes and hours!", style: 'instruction' },
  { text: "Watch the clock hands move. Can you reach the right end time?", style: 'question' },
  { text: "Look at these clocks. Which durations are correct? Tap to choose!", style: 'instruction' },
  { text: "Now fill in the missing time. What time will it be?", style: 'question' },

  // Phase 4 — Feedback
  { text: "Amazing! You calculated the time perfectly! You are a Time Explorer superstar!", style: 'celebration' },
  { text: "Not quite! Let's look at the clock again.", style: 'encouragement' },
  { text: "Watch the clock move! Can you count the minutes with me?", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What an adventure today! Can you tell me one thing you learned about time intervals?", style: 'thinking' },
  { text: "Lesson complete! You are a Global Time Explorer Champion!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are a Time Traveler!", style: 'celebration' },
  { text: "Badge unlocked! Clock Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Interval Champion! You scored over eighty percent!", style: 'celebration' },
];

// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
// Rate-limits at 500ms between API calls (per audio_generation_pipeline.md)
```

### 9.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
// Step 1: Check audioMap for pre-generated static asset
// Step 2: If not found + API key present → fetch from ElevenLabs dynamically
// Step 3: Cache dynamic result in elevenLabsCache (in-memory Map)
// Step 4: Play via HTML5 Audio API (new Audio(url))
// Step 5: While segment i plays → preload segment i+1 (eager preload)

const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key)
  if (!apiKey) return null; // Silent skip — no fallback

  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available

    // Eager preload next segment
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url); // Resolves on 'ended' event
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 9.5 Audio Cleanup (`scripts/clean_audio.js`)

- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 9.6 Narration Synchronization Rules (1:1 Parity)

> **CRITICAL:** Every on-screen text string that is narrated must match `narration.js` **exactly** (same words, same punctuation, same capitalization). Titles, headings, and world names are **never** narrated.

Any UI text change requires:
1. Update `generate_audio.js` `phrases` array
2. Re-run: `node scripts/generate_audio.js`
3. Update corresponding text in the React UI component
4. Optionally run: `node scripts/clean_audio.js`

---

## 10. Randomization Engine

### 10.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank) {
  const byType = {};
  bank.forEach(q => {
    if (!byType[q.type]) byType[q.type] = [];
    byType[q.type].push(q);
  });

  // Pick 10 from each type (shuffled), then shuffle the combined 100
  const selected = Object.values(byType)
    .flatMap(qs => shuffleArray(qs).slice(0, 10));

  return shuffleArray(selected);
}
```

### 10.2 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generateTimeDistractors(correctMinutes, format = '12h', count = 3) {
  const distractors = new Set();
  // Strategy: offsets of ±15, ±30, ±60 minutes, or an AM/PM flip — plausible wrong times
  const offsets = [-60, -30, -15, 15, 30, 60];
  shuffleArray(offsets).forEach(offset => {
    const d = (correctMinutes + offset + 1440) % 1440;
    if (d !== correctMinutes && distractors.size < count) distractors.add(d);
  });
  while (distractors.size < count) {
    const d = (correctMinutes + (distractors.size + 1) * 10) % 1440;
    if (d !== correctMinutes) distractors.add(d);
  }
  return shuffleArray([correctMinutes, ...distractors]).map(m => formatLabel(m, format));
}
```

### 10.3 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_time_intervals_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

---

## 11. Gamification Implementation

### 11.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 11.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0; // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 11.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'time_traveler',
    label: '🏅 Time Traveler',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'clock_builder',
    label: '🥈 Clock Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'interval_champion',
    label: '🥇 Interval Champion',
    description: 'Score 80%+ in Practice phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_schedule',
    label: '💎 Perfect Schedule',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'global_explorer',
    label: '🌍 Global Explorer',
    description: 'Complete all 6 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_eye',
    label: '🎯 Sharp Eye',
    description: 'Complete Station B without any wrong selection',
    condition: (s) => s.stationBPerfect === true,
  },
  {
    id: 'midnight_master',
    label: '🕰️ Midnight Master',
    description: 'Correctly solve 5 questions crossing midnight or the AM/PM boundary',
    condition: (s) => (s.midnightCorrect || 0) >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([{ text: badge.description, style: 'celebration' }], apiKey);
  });
}
```

---

## 12. CSS Animation Keyframes (matching `equal-tau.vercel.app` style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes clockHandSweep {
  /* Applied via inline transform transition, not keyframes — see ClockFace.jsx */
  from { transform: rotate(var(--from-angle)); }
  to   { transform: rotate(var(--to-angle)); }
}

@keyframes timelineFill {
  from { width: 0%; }
  to   { width: var(--fill-percent); }
}

/* Stagger: each timeline segment/clock hand gets animation-delay: (index * 120ms) */
```

---

## 13. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `ClockFace` | `{ totalMinutes, size?, animated?, showDigital?, format? }` | SVG + digital readout element (inline, responsive) |
| `TimelineBar` | `{ startMinutes, durationMinutes, missingSlot?, format? }` | Horizontal timeline element |
| `DurationBlockTray` | `{ blocks, onDragStart, onTap }` | Flex row of draggable/tappable duration chips |
| `TimePad` | `{ value, format, onChange, onSubmit }` | Hour/minute wheels + AM/PM toggle or 24h entry (min 44×44px targets) |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: Question, onAnswer: (answer) => void, hints: number }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores: (number\|null)[], currentWorld: number, onSelectWorld: (i) => void }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges: string[], newBadgeId?: string }` | Badge grid with unlock toast animation for `newBadgeId` |

---

## 14. Performance Requirements

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG/clock animation frame rate | 60 fps |
| Memory usage | < 60 MB |
| Bundle size (gzipped) | < 600 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0ms (static .mp3 assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency) |

---

## 15. Browser & Device Support

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad/Mac) | Full |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test device: Desktop Chrome (1280px+) and tablet (768px, touch) — classroom use context.

---

## 16. Quality & Testing Standards

- **Unit tests** for `timeMath.js` covering: same-day intervals, AM/PM boundary crossings, midnight crossings, 12h↔24h conversions, and minute regrouping
- **Snapshot tests** for `ClockFace`, `TimelineBar`, and `EqualGroupDiagram`-style SVG components at each size variant
- **Randomization integrity test:** run `generateSessionQuestions()` 1,000 times and assert no two runs produce an identical question order
- **Accessibility audit:** automated Lighthouse + manual keyboard-navigation pass on all 6 phases
- **Audio parity check:** automated script diffs all narrated strings in `narration.js` against `generate_audio.js`'s `phrases` array to catch drift

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia — Grade 5 Math, Time Intervals Using Time
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
