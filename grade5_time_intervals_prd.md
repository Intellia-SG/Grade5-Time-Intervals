# Product Requirements Document (PRD)
## Time Intervals — Calculating Time, Duration & Schedules | Grade 5 Math
### Intellia SG | Global Grade 5 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Time Explorers — Time Intervals"**, an interactive, gamified, simulation-based lesson module for **Grade 5 students (age 10–11)**, teaching the concept of **Time Intervals Using Time** (elapsed time, start/end time, 12-hour & 24-hour time, and schedule/timetable reasoning).

The module is built as a standalone **React (Vite + JSX)** web application and is designed to **strictly mirror the visual language, UX structure, and interaction patterns** of the reference product:

- Reference site: **https://equal-tau.vercel.app/**
- Reference repository: **https://github.com/dsamyak/equal**

The module will be hosted within the Intellia course catalogue (the same family of URLs as `https://intelliasg.com/courses/grade-3-math`, restructured for Grade 5), e.g.:

```
https://intelliasg.com/courses/grade-5-math/lessons/time-intervals/
```

Audio narration follows the **ElevenLabs pipeline** documented in `audio_generation_pipeline.md` (Voice: **Alice**, Voice ID: `Xb7hH8MSUJpSbSDYk0k2`, Model: `eleven_multilingual_v2`), using the same hybrid pre-generation + dynamic fallback architecture, the same per-style voice settings table, and the same strict rule that **only paragraph text and questions are narrated — never titles or headings**.

The lesson follows a global, multicultural narrative featuring students from around the world (John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego) as they travel between famous world landmarks, using clocks, timetables, and schedules to solve real travel and school-life problems — reinforcing that time intervals matter everywhere on Earth.

The module follows Intellia's proven **6-phase learner journey**: INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT.

---

## 2. Product Vision & Goals

**Vision**
To make elapsed time and time-interval reasoning feel like a real adventure — helping 10–11 year old learners confidently read clocks, calculate durations, and interpret schedules through a fully simulation-first, story-driven, and randomized gamified experience.

**Goals**

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 6 phases |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥18 minutes per session |
| Curriculum Alignment | 100% aligned to global Grade 5 measurement & time standards |
| Phase Progression | ≥80% reach Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Randomization Integrity | 0% repeated question order across sessions |

---

## 3. Target Users

**Primary: Grade 5 Students (Age 10–11)**
- Comfortable readers; ready for abstract reasoning layered on visual/concrete supports
- Learn best through simulation-first exploration before formal practice
- Motivated by streaks, badges, world maps, and a strong story arc
- International/global classroom context — familiar with travel, time zones (conceptually), airports, trains, and daily schedules

**Secondary: Parents & Teachers**
- Assign as classwork, homework, or enrichment
- Expect alignment to recognized global standards (see Section 4)
- Monitor completion via in-lesson phase indicators

---

## 4. Curriculum Alignment — Global Grade 5 Mathematics

**Topic:** Time Intervals Using Time
**Programme:** Intellia Grade 5 Math — Measurement & Data: Time
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/time-intervals/`

**Source References (cross-referenced against major global frameworks):**
- U.S. Common Core Math Standards — Grade 4/5 Measurement & Data (elapsed time problems, e.g. 4.MD.A.2)
- Singapore MOE Primary 5 Mathematics Syllabus — Measurement: Time (24-hour clock, duration)
- UK National Curriculum — Key Stage 2, Year 5 Measurement (convert between units of time; solve problems involving time)
- CBSE/NCERT Class 5 Mathematics — "Can You See the Pattern?" / Time chapter (24-hour clock, duration, timetables)
- Australian Curriculum — Year 5 Measurement and Geometry (compare 12- and 24-hour time systems)

**Learning Objectives Covered:**

| LO | Description |
|---|---|
| LO1 | Read and interpret time on analog and digital clocks (12-hour format) |
| LO2 | Convert between 12-hour (AM/PM) and 24-hour (military) time notation |
| LO3 | Calculate elapsed time (duration) given a start and end time |
| LO4 | Calculate an end time given a start time and a duration |
| LO5 | Calculate a start time given an end time and a duration |
| LO6 | Add and subtract time with regrouping (60 minutes = 1 hour) |
| LO7 | Convert between seconds, minutes, and hours |
| LO8 | Read and interpret timetables/schedules (train, flight, bus, school) |
| LO9 | Solve multi-step real-world word problems involving time intervals |
| LO10 | Reason about time intervals that cross AM/PM or midnight boundaries |

**Concrete → Pictorial → Abstract (CPA) Progression:**
- **Concrete:** Interactive analog clock hands physically moved/animated to show elapsed time
- **Pictorial:** Timeline bars and paired clock-face diagrams showing "before" and "after"
- **Abstract:** Time-sentence equations — `Start Time + Duration = End Time`

**Number/Time Ranges:**
- Easy: Whole-hour and half-hour intervals, no regrouping, within same AM/PM period
- Medium: Minute-level intervals requiring regrouping, may cross AM↔PM
- Hard: 24-hour time, multi-step journeys, intervals crossing midnight, timetable cross-referencing

**Vocabulary Focus:**
"elapsed time", "duration", "start time", "end time", "a.m.", "p.m.", "24-hour clock", "timetable", "departure", "arrival", "quarter past/to", "regroup", "altogether"

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hello, Explorer! Ready to master Time Intervals? 🌍⏰"           │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│                                                                             │
│ Hook: "Sarah's flight leaves London at 9:45 a.m. and lands in New York     │
│ 8 hours and 20 minutes later. What time does Sarah land?"                 │
│                                                                             │
│ Visual: Animated airplane icon flying across a world map, clock ticking   │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                 │
│ → Mascot "Chrono" (a friendly clock-robot) appears, puzzled               │
│ → "Let's discover how TIME INTERVALS help us solve this!"                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈2–3 min) — "The Global Time Explorers Club"             │
│                                                                             │
│ Panel 1: John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and    │
│          Yuki form the Global Time Explorers Club — a video-call group    │
│          of friends from different countries who challenge each other    │
│          with time puzzles from their cities.                            │
│ Panel 2: "Mike in New York starts his homework at 4:15 p.m. He works for │
│          1 hour and 40 minutes. What time does he finish?"               │
│ Panel 3: Clock diagram animates hands moving forward — 4:15 → 5:55 p.m.  │
│ Panel 4: "Yuki in Tokyo takes the bullet train at 14:30 (24-hour time).  │
│          That's 2:30 p.m.! Trains in Japan often use 24-hour time."      │
│ Panel 5: "Aisha checks a timetable: her school bus leaves at 07:45 and   │
│          arrives at 08:20. How long is the ride? 35 minutes!"            │
│ Panel 6: "Every clock, every country, every trip — TIME INTERVALS help   │
│          us plan our whole day!"                                         │
│                                                                             │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration      │
│ → Key vocabulary highlighted: "elapsed time", "24-hour clock", "duration" │
│ → World map background with pins on each character's city                │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈5–7 min)                                              │
│                                                                             │
│ 3 Interactive Stations — student must complete all 3 to advance           │
│                                                                             │
│ Station A — "Clock Journey Builder" (Concrete)                            │
│ Drag duration blocks (+1 hr, +30 min, +15 min) onto a start-time clock;   │
│ watch the clock hands animate forward to reveal the end time.            │
│                                                                             │
│ Station B — "Spot the Right Duration" (Pictorial)                         │
│ 4 paired before/after clock cards shown with timetable captions. Student  │
│ taps the card(s) where the labeled duration correctly matches the clocks. │
│                                                                             │
│ Station C — "Fill the Time Sentence" (Abstract)                           │
│ "Start ___ + Duration ___ = End ___" — fill one blank using a time-pad    │
│ (hour/minute number pad). Diagram + timeline shown as a scaffold.         │
│                                                                             │
│ → Mascot Chrono reacts to each completed station                         │
│ → ElevenLabs narrates each station instruction and feedback              │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈7–9 min)                                                  │
│                                                                             │
│ IntelliPlay™ Level: 100 randomized questions across 10 worlds             │
│ (each world = a real-world global landmark)                              │
│ 10 questions per world, world unlocks at ≥6/10 correct                   │
│ Stars (1–3), XP, badges, and streak fire counter active                  │
│ → Mastery gates the world map; encouragement-first feedback              │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈1–2 min)                                               │
│                                                                             │
│ Journal prompt: "If you could plan a trip anywhere, what start and end    │
│ time would your journey have? Tell Chrono!"                               │
│ Or: LearnFlow AI chat — type/speak your understanding                    │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.        │
│ → "Share with your teacher!" button (screenshot / export)                │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 3 — Simulation Design (Detailed)

### 6.1 Station A — "Clock Journey Builder" (Concrete)

**Visual:**
- A large analog clock face (with a small digital readout beneath it) shows the **start time**
- A tray of draggable **duration blocks**: `+15 min`, `+30 min`, `+1 hr`, `+2 hr`
- "Add up the time blocks to reach [Mike's finish time / the train's arrival / etc.]!" narrated by Alice

**Interaction:**
- Student drags duration blocks onto the clock one at a time (or taps block → taps clock for accessibility mode)
- Clock hands **animate smoothly** to the new position after each block is added
- A running digital readout and a horizontal **timeline bar** update in real time
- Submit button appears once the target duration has been fully assembled

**Feedback:**
- Correct total → mascot Chrono spins happily, "Perfect! You built the right journey in time!" 🎉
- Incorrect total on submit → gentle shake + "Not quite there yet — check your blocks!"

**Variants per round (randomized):**
- Round 1: Start 8:00 a.m. + 1 hr 30 min (no regrouping across AM/PM)
- Round 2: Start 4:15 p.m. + 1 hr 45 min (crosses the hour, regrouping needed)
- Round 3: Start 10:50 a.m. + 40 min (crosses AM → PM boundary)
- Round 4: Start 23:15 (24-hour) + 2 hr 30 min (crosses midnight)

### 6.2 Station B — "Spot the Right Duration" (Pictorial)

**Visual:**
- 4 cards displayed in a 2×2 grid; each card shows a **before clock**, an **after clock**, and a printed **claimed duration** (e.g. "Duration: 2 hours 15 minutes")
- Some cards state the correct duration; some are deliberately mismatched

**Interaction:**
- Student taps the card(s) where the printed duration correctly matches the before/after clocks
- Multi-select allowed; correct cards glow green, incorrect glow red on submit

**Teaching goal:**
- Reinforces visual estimation of elapsed time and cross-checking against a computed answer

**Distractor design:**
- Mismatched cards are off by a plausible amount (±15 or ±30 minutes, or an AM/PM mix-up)
- One card always uses correct minutes but wrong hour (catches skimmers)

**3 rounds with increasing complexity:**
- Round 1: Whole-hour durations (easy visual comparison)
- Round 2: Half-hour/quarter-hour durations (medium)
- Round 3: Mixed hour+minute durations crossing AM/PM (hard — tests careful reading)

### 6.3 Station C — "Fill the Time Sentence" (Abstract)

**Visual:**
```
Start: ___      +   Duration: ___   =   End: ___
```
(one blank highlighted for input; the other two values are given)

**Interaction:**
- Time-pad input (large tap-friendly hour/minute wheels + AM/PM toggle, or 24-hour entry)
- Timeline diagram shown above as a visual scaffold
- "Show me the timeline" hint button always visible
- On submit: correct → bounce animation; incorrect → shake + hint

**Variants (which blank is missing, rotated per round):**
- Find end time: `9:45 a.m. + 2 hr 15 min = ___`
- Find duration: `07:20 → 08:55 = ___`
- Find start time: `___ + 1 hr 30 min = 6:10 p.m.`

ElevenLabs narrates each sentence aloud when displayed.

---

## 7. Phase 4 — Question Bank (100 Randomized Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | Find end time given start + duration | Start 9:45 a.m., duration 2 hr 15 min. What is the end time? |
| Q2 | Find elapsed duration given start & end time | Start 07:20, end 08:55. How long did it take? |
| Q3 | Find start time given end time − duration | End time 6:10 p.m., duration 1 hr 30 min. What was the start time? |
| Q4 | Convert 12-hour to 24-hour time | Convert 3:45 p.m. to 24-hour time. |
| Q5 | Convert 24-hour to 12-hour time | Convert 19:20 to 12-hour time with a.m./p.m. |
| Q6 | Word problem — journey duration (train/flight) | John's train leaves at 08:10 and arrives at 11:35. How long is the journey? |
| Q7 | Word problem — schedule reasoning | Emma's movie starts at 6:30 p.m. and lasts 2 hr 10 min. Will she be home by 9:00 p.m.? |
| Q8 | True or False — is this duration correct? | "From 5:15 p.m. to 6:00 p.m. is 45 minutes." True or False? |
| Q9 | Read a timetable — pick correct departure/arrival | Using the timetable, which bus arrives before 9:00 a.m.? |
| Q10 | Unit conversion — minutes/hours/seconds | How many minutes are in 2 hours and 20 minutes? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy | Medium | Hard |
|---|---|---|---|---|
| Q1 | 10 | 4 | 4 | 2 |
| Q2 | 10 | 4 | 4 | 2 |
| Q3 | 10 | 3 | 4 | 3 |
| Q4 | 10 | 4 | 4 | 2 |
| Q5 | 10 | 4 | 4 | 2 |
| Q6 | 10 | 3 | 4 | 3 |
| Q7 | 10 | 3 | 4 | 3 |
| Q8 | 10 | 4 | 3 | 3 |
| Q9 | 10 | 3 | 4 | 3 |
| Q10 | 10 | 5 | 3 | 2 |
| **TOTAL** | **100** | **37** | **38** | **25** |

### 7.3 Time Ranges by Difficulty

- **Easy:** Whole-hour or half-hour durations; no regrouping; stays within same AM/PM period
- **Medium:** Minute-level durations requiring regrouping; may cross the AM/PM boundary
- **Hard:** 24-hour time; multi-step reasoning; intervals crossing midnight; timetable cross-referencing

### 7.4 Global Context — Names, Places & Objects Used in Word Problems

**Names (global set):** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi

**Cities/Landmarks:** London, New York, Tokyo, Sydney, Paris, Cairo, Rio de Janeiro, Cape Town, Mumbai, Reykjavik

**Contexts:** airport departures/arrivals, train and bus timetables, school schedules, sports practice, movie showtimes, video-call meetups across the Global Time Explorers Club

### 7.5 Language & Notation Requirements

All questions use globally recognized time-interval vocabulary and notation:
- 12-hour format with **a.m./p.m.**
- 24-hour format written as **HH:MM** (e.g., `14:30`)
- "elapsed time", "duration", "how long", "what time will it be", "how many minutes/hours"
- Timetable columns labeled **Departure** / **Arrival**

---

## 8. Gamification Design

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)

- 🏅 **"Time Traveler"** — Complete Wonder + Story phases
- 🥈 **"Clock Builder"** — Complete all 3 Simulation stations
- 🥇 **"Interval Champion"** — Score ≥80% on Play phase
- 💎 **"Perfect Schedule"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌍 **"Global Explorer"** — Complete all 6 phases (lesson complete badge)
- 🎯 **"Sharp Eye"** — Get 5 correct in Station B without any wrong pick
- 🕰️ **"Midnight Master"** — Correctly solve 5 questions that cross midnight or the AM/PM boundary

### 8.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Amazing! You calculated the time perfectly! 🎉"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation + ElevenLabs: "Not quite! Let's look at the clock again ⏰"
- Hint 1 activates: timeline diagram highlighted with the given values labeled

**❌ Incorrect (Attempt 2):**
- Stronger shake + Hint 2: animated clock hands show the movement step by step
- ElevenLabs: "Watch the clock move! Can you count the minutes with me?"

**❌ Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot explains)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression — Global Landmarks)

1. **World 1 — "London Fog Station"** (Q1–10, whole-hour, easy, same AM/PM)
2. **World 2 — "New York Sunrise Yard"** (Q11–20, half-hour, easy-medium)
3. **World 3 — "Paris Café Clock"** (Q21–30, quarter-hour, medium)
4. **World 4 — "Tokyo Bullet Train"** (Q31–40, medium, introduces 24-hour time)
5. **World 5 — "Sydney Harbour Ferry"** (Q41–50, medium-hard, crosses AM/PM)
6. **World 6 — "Cairo Desert Caravan"** (Q51–60, hard, multi-step word problems)
7. **World 7 — "Rio Carnival Route"** (Q61–70, hard, timetable reading)
8. **World 8 — "Cape Town Safari Trail"** (Q71–80, hard, mixed conversions)
9. **World 9 — "Mumbai Local Express"** (Q81–90, hard, mixed all types)
10. **World 10 — "Reykjavik Midnight Sun"** (Q91–100, hardest, intervals crossing midnight)

**Unlock gate:** ≥6/10 correct (1-star minimum) required to advance to the next world.
3 stars in a world unlocks a hidden "Bonus Challenge" (3 extra questions).

### 8.5 Mascot (Chrono — Time Explorer Companion)

- **Character:** A friendly clock-faced robot compass named **"Chrono"**
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice (pre-generated .mp3)

---

## 9. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 9.1 Pipeline Summary

- **Voice Provider:** ElevenLabs (only — no browser Web Speech API fallback)
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Env Var:** `VITE_ELEVENLABS_API_KEY`
- **Pre-generation:** `scripts/generate_audio.js` → static `.mp3` in `public/assets/audio/`
- **Dynamic fallback:** Practice questions not yet cached are generated on-the-fly
- **Mapping:** Auto-generated `src/utils/audioMap.js` (exact text → file path)
- **Cleanup:** `scripts/clean_audio.js` removes orphaned audio files

### 9.2 Content Policy — Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated ONLY for paragraph/story text and question text. Titles, headings, world names, and section labels are **never** narrated.

### 9.3 Speech Styles Mapped to ElevenLabs Settings

| Style | Stability | Similarity Boost | Style | Speaker Boost | Use case |
|---|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ | Badge unlock, world complete |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ | Correct answer feedback |
| `question` | 0.20 | 0.55 | 0.55 | ✅ | Practice question read-aloud |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ | Key vocabulary highlight |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ | Mascot thinking moments |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ | Story narration, instructions |

### 9.4 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "Sarah's flight leaves London at nine forty-five in the morning."
> "It lands in New York eight hours and twenty minutes later. What time does she land?"
> "Let's discover how time intervals help us solve this!"

**Phase 2 (Story, Panel 2) — style: statement**
> "Mike in New York starts his homework at four fifteen in the afternoon."
> "He works for one hour and forty minutes. What time does he finish?"

**Phase 3 (Station A) — style: instruction**
> "Drag the time blocks onto the clock. Add up the minutes and hours!"
> "Watch the clock hands move. Can you reach the right end time?"

**Phase 4 (Correct feedback) — style: celebration**
> "Amazing! You calculated the time perfectly! You are a Time Explorer superstar!"

**Phase 5 (Reflect) — style: thinking**
> "What an adventure today! Can you tell me one thing you learned about time intervals?"

### 9.5 Strict 1:1 Parity Rule

Every on-screen narrated string in `narration.js` must match the UI text **exactly** (same words, punctuation, capitalization). Any UI text change requires updating both `generate_audio.js`'s `phrases` array and `narration.js`.

---

## 10. UX & Visual Design Requirements

### 10.1 Visual Theme

- **Brand:** Intellia — Think. Explore. Become.
- **Reference UI (strict match):** `https://equal-tau.vercel.app/`
- **Reference Repo (strict match):** `https://github.com/dsamyak/equal`
- **Colours:** Match `equal-tau.vercel.app` exactly — primary brand blue, accent gold/yellow for rewards, soft coral/red for wrong-answer states, white card backgrounds, soft drop shadows, distinct phase-band colours
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Cartoon-style, globally inclusive character designs and landmark backdrops (Big Ben, Statue of Liberty, Eiffel Tower, Sydney Opera House, Tokyo skyline, etc.)
- **Clock Components:** Large, clean analog clock faces (SVG) paired with digital readouts; distinct colour per world/landmark

### 10.2 Layout Structure (mirrors equal-tau.vercel.app)

- **Top Bar:** Intellia logo | Lesson title "Time Intervals" | 6-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 Clock & Timeline Diagram Visual Component (Primary Visual)

Used throughout all phases:
- Large analog clock face with animatable hour/minute hands (SVG)
- Digital readout beneath (12-hour with a.m./p.m., or 24-hour depending on question)
- Horizontal timeline bar showing start point, duration segment, and end point
- Missing value shown as a dashed-outline clock or "?" marker
- Hands/timeline animate (smooth transition) when the diagram first renders or updates

### 10.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design

- Primary: Desktop browser (1024px+) and tablet (768px+) — classroom context
- Secondary: iPad/tablet
- Tertiary: Mobile (375px+) — stacked single-column layout

---

## 11. Content Requirements

### 11.1 Simulation Visuals

- Clock diagrams: SVG-rendered analog clocks with animated hands + digital readout
- Duration block tray: colourful draggable chips (`+15 min`, `+30 min`, `+1 hr`, `+2 hr`)
- Station B cards: before/after clock pairs with printed duration captions
- Abstract sentences: large bold typography, one highlighted blank per round

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question objects in `questionBank.js`
- Questions randomized per session using Fisher-Yates shuffle
- No two sessions present the same question order
- MCQ distractors always plausible (off by ±15/±30 minutes or an AM/PM mix-up)

### 11.3 Word Problem Formats

**Duration/journey sense:**
> "[Name]'s [train/flight/bus] leaves [City A] at [start time]. It arrives in [City B] at [end time]. How long is the journey?"

**Schedule reasoning sense:**
> "[Name]'s [event] starts at [start time] and lasts [duration]. Will [he/she] finish by [target time]?"

**Extended "Let's Think Along" style:**
> "[Name] leaves home at ___. The trip takes ___ . What time does [he/she] arrive? Draw the timeline and check!"

### 11.4 Audio Script Parity (Strict 1:1 Rule)

Every on-screen text string that is narrated must match `narration.js` exactly — same words, same punctuation. Any UI text change requires updating both the `generate_audio.js` phrases array and `narration.js`.

---

## 12. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| All 100 questions randomized correctly | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet/desktop responsive layout | ✅ Required |
| Global Grade 5 syllabus coverage confirmed | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at Intellia Grade 5 lesson URL | ✅ Required |

---

## 13. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- True time-zone conversion (UTC offsets) — reserved for a future advanced module
- Assessment against the full curriculum (broader test engine)

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia — Grade 5 Math, Time Intervals Using Time
**Lesson Title:** Global Time Explorers — Time Intervals
**Curriculum:** Global Grade 5 Mathematics (Common Core, Singapore MOE, UK NC, CBSE, Australian Curriculum cross-aligned)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Parent Course Page:** https://intelliasg.com/courses/grade-5-math/
**Lesson URL:** https://intelliasg.com/courses/grade-5-math/lessons/time-intervals/
