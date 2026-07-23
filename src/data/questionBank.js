/**
 * 100 Grade 5 Time Interval Questions across 10 Global Landmark Worlds
 */

export const WORLDS = [
  { id: 0, name: "London Fog Station", landmark: "Big Ben & Paddington Station", flag: "🇬🇧", themeColor: "#3b82f6" },
  { id: 1, name: "New York Sunrise Yard", landmark: "Grand Central Terminal", flag: "🇺🇸", themeColor: "#06b6d4" },
  { id: 2, name: "Paris Café Clock", landmark: "Eiffel Tower & Gare de Lyon", flag: "🇫🇷", themeColor: "#14b8a6" },
  { id: 3, name: "Tokyo Bullet Train", landmark: "Shinkansen Station & Mt. Fuji", flag: "🇯🇵", themeColor: "#a855f7" },
  { id: 4, name: "Sydney Harbour Ferry", landmark: "Opera House & Circular Quay", flag: "🇦🇺", themeColor: "#f59e0b" },
  { id: 5, name: "Cairo Desert Caravan", landmark: "Pyramids of Giza", flag: "🇪🇬", themeColor: "#eab308" },
  { id: 6, name: "Rio Carnival Route", landmark: "Christ the Redeemer & Sambadrome", flag: "🇧🇷", themeColor: "#10b981" },
  { id: 7, name: "Cape Town Safari Trail", landmark: "Table Mountain Express", flag: "🇿🇦", themeColor: "#ec4899" },
  { id: 8, name: "Mumbai Local Express", landmark: "Chhatrapati Shivaji Terminus", flag: "🇮🇳", themeColor: "#6366f1" },
  { id: 9, name: "Reykjavik Midnight Sun", landmark: "Harpa & Northern Lights", flag: "🇮🇸", themeColor: "#38bdf8" }
];

export const RAW_QUESTION_BANK = [
  // --- WORLD 1: London Fog Station (Q1-Q10) ---
  {
    id: "Q1_001",
    type: "find_end_time",
    world: 0,
    difficulty: 1,
    startMinutes: 540, // 9:00 a.m.
    durationMinutes: 120, // 2 hr
    questionText: "John boards a double-decker bus in London at 9:00 a.m. The tour lasts 2 hours. What time does the tour finish?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["10:00 a.m.", "11:00 a.m.", "11:30 a.m.", "12:00 p.m."],
    correctAnswer: "11:00 a.m.",
    hint1: "Start at 9:00 a.m. Count forward 2 full hours.",
    hint2: "9:00 + 1 hr = 10:00. 10:00 + 1 hr = 11:00 a.m.",
    explanation: "9:00 a.m. plus 2 hours is 11:00 a.m."
  },
  {
    id: "Q2_002",
    type: "find_duration",
    world: 0,
    difficulty: 1,
    startMinutes: 600, // 10:00 a.m.
    endMinutes: 780, // 1:00 p.m.
    questionText: "Sarah visits the British Museum from 10:00 a.m. until 1:00 p.m. How long is her visit?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["2 hours", "3 hours", "4 hours", "2 hours 30 min"],
    correctAnswer: "3 hours",
    hint1: "Count from 10:00 a.m. to 12:00 p.m. (2 hrs), then to 1:00 p.m. (1 hr).",
    hint2: "10:00 -> 11:00 (1hr) -> 12:00 (2hr) -> 1:00 (3hr).",
    explanation: "From 10:00 a.m. to 1:00 p.m. is exactly 3 hours."
  },
  {
    id: "Q3_003",
    type: "find_start_time",
    world: 0,
    difficulty: 1,
    endMinutes: 840, // 2:00 p.m.
    durationMinutes: 60, // 1 hr
    questionText: "Emma finishes her London tea at 2:00 p.m. If tea lasted 1 hour, what time did she start?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["12:00 p.m.", "1:00 p.m.", "1:30 p.m.", "3:00 p.m."],
    correctAnswer: "1:00 p.m.",
    hint1: "Work backwards from 2:00 p.m. by subtracting 1 hour.",
    hint2: "2:00 p.m. minus 1 hour = 1:00 p.m.",
    explanation: "2:00 p.m. minus 1 hour is 1:00 p.m."
  },
  {
    id: "Q4_004",
    type: "convert_12_to_24",
    world: 0,
    difficulty: 1,
    questionText: "Convert 3:00 p.m. London train departure time to 24-hour time.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["03:00", "13:00", "15:00", "17:00"],
    correctAnswer: "15:00",
    hint1: "For p.m. times after noon, add 12 to the hour.",
    hint2: "3 + 12 = 15. So 3:00 p.m. becomes 15:00.",
    explanation: "3:00 p.m. in 24-hour time is 15:00 (3 + 12 = 15)."
  },
  {
    id: "Q5_005",
    type: "convert_24_to_12",
    world: 0,
    difficulty: 1,
    questionText: "The departure board lists the train to Oxford at 18:00. What is this in 12-hour time?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["6:00 a.m.", "6:00 p.m.", "8:00 p.m.", "4:00 p.m."],
    correctAnswer: "6:00 p.m.",
    hint1: "Subtract 12 from 18 to find the hour in p.m.",
    hint2: "18 - 12 = 6 p.m.",
    explanation: "18:00 minus 12 hours is 6:00 p.m."
  },
  {
    id: "Q6_006",
    type: "journey_word_problem",
    world: 0,
    difficulty: 1,
    startMinutes: 480, // 8:00 a.m.
    endMinutes: 660, // 11:00 a.m.
    questionText: "Liam's train leaves London Euston at 8:00 a.m. and arrives in Manchester at 11:00 a.m. How long is the journey?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["2 hours", "3 hours", "4 hours", "3 hours 30 min"],
    correctAnswer: "3 hours",
    hint1: "Count from 8:00 a.m. to 11:00 a.m.",
    hint2: "11:00 - 8:00 = 3 hours.",
    explanation: "From 8:00 a.m. to 11:00 a.m. is 3 hours."
  },
  {
    id: "Q7_007",
    type: "schedule_word_problem",
    world: 0,
    difficulty: 1,
    questionText: "Sofia's theatre show in West End starts at 7:00 p.m. and lasts 2 hours. Will she be out by 9:30 p.m.?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["Yes, she finishes at 9:00 p.m.", "No, she finishes at 9:45 p.m.", "No, she finishes at 10:00 p.m.", "Yes, she finishes at 8:30 p.m."],
    correctAnswer: "Yes, she finishes at 9:00 p.m.",
    hint1: "Add 2 hours to 7:00 p.m. to find when the show ends.",
    hint2: "7:00 p.m. + 2 hours = 9:00 p.m., which is before 9:30 p.m.",
    explanation: "The show ends at 9:00 p.m., so yes, she is out before 9:30 p.m."
  },
  {
    id: "Q8_008",
    type: "true_false_duration",
    world: 0,
    difficulty: 1,
    questionText: "True or False: From 10:00 a.m. to 12:30 p.m. is a time interval of 2 hours and 30 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "10:00 to 12:00 is 2 hours. 12:00 to 12:30 is 30 minutes.",
    hint2: "Total elapsed time = 2 hours + 30 minutes.",
    explanation: "10:00 a.m. to 12:30 p.m. is indeed 2 hours 30 minutes (True)."
  },
  {
    id: "Q9_009",
    type: "timetable_mcq",
    world: 0,
    difficulty: 1,
    timetableRows: [
      { label: "Express Bus A", departure: "08:00 a.m.", arrival: "09:15 a.m." },
      { label: "Express Bus B", departure: "08:30 a.m.", arrival: "09:45 a.m." },
      { label: "Express Bus C", departure: "09:00 a.m.", arrival: "10:20 a.m." }
    ],
    questionText: "According to the bus timetable, which bus arrives before 09:30 a.m.?",
    visual: "timetable",
    clockFormatUsed: "12h",
    options: ["Express Bus A", "Express Bus B", "Express Bus C", "None of them"],
    correctAnswer: "Express Bus A",
    hint1: "Check the 'Arrival' column for each bus.",
    hint2: "Bus A arrives at 09:15 a.m., which is earlier than 09:30 a.m.",
    explanation: "Express Bus A arrives at 09:15 a.m., which is before 09:30 a.m."
  },
  {
    id: "Q10_010",
    type: "unit_conversion",
    world: 0,
    difficulty: 1,
    questionText: "How many minutes are in 1 hour and 45 minutes?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["95 minutes", "105 minutes", "115 minutes", "145 minutes"],
    correctAnswer: "105 minutes",
    hint1: "1 hour = 60 minutes.",
    hint2: "60 + 45 = 105 minutes.",
    explanation: "1 hour (60 min) + 45 min = 105 minutes."
  },

  // --- WORLD 2: New York Sunrise Yard (Q11-Q20) ---
  {
    id: "Q1_011",
    type: "find_end_time",
    world: 1,
    difficulty: 1,
    startMinutes: 255, // 4:15 a.m.
    durationMinutes: 90, // 1 hr 30 min
    questionText: "Mike starts his morning run in Central Park at 4:15 a.m. He runs for 1 hour 30 minutes. What time does he finish?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["5:15 a.m.", "5:45 a.m.", "6:00 a.m.", "6:15 a.m."],
    correctAnswer: "5:45 a.m.",
    hint1: "4:15 + 1 hour = 5:15. Now add 30 minutes.",
    hint2: "5:15 + 30 minutes = 5:45 a.m.",
    explanation: "4:15 a.m. plus 1 hour 30 minutes equals 5:45 a.m."
  },
  {
    id: "Q2_012",
    type: "find_duration",
    world: 1,
    difficulty: 1,
    startMinutes: 450, // 7:30 a.m.
    endMinutes: 540, // 9:00 a.m.
    questionText: "Noah's subway commute from Brooklyn to Manhattan starts at 7:30 a.m. and ends at 9:00 a.m. How long is the ride?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["1 hour", "1 hour 30 min", "2 hours", "45 minutes"],
    correctAnswer: "1 hour 30 min",
    hint1: "From 7:30 to 8:30 is 1 hour. From 8:30 to 9:00 is 30 minutes.",
    hint2: "1 hour + 30 minutes = 1 hour 30 minutes.",
    explanation: "7:30 a.m. to 9:00 a.m. is 1 hour and 30 minutes."
  },
  {
    id: "Q3_013",
    type: "find_start_time",
    world: 1,
    difficulty: 1,
    endMinutes: 630, // 10:30 a.m.
    durationMinutes: 45, // 45 min
    questionText: "Carlos lands at JFK airport at 10:30 a.m. after a 45-minute flight from Boston. What time did the plane take off?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["9:30 a.m.", "9:45 a.m.", "10:00 a.m.", "9:15 a.m."],
    correctAnswer: "9:45 a.m.",
    hint1: "Subtract 45 minutes from 10:30 a.m.",
    hint2: "10:30 - 30 min = 10:00. 10:00 - 15 min = 9:45 a.m.",
    explanation: "10:30 a.m. minus 45 minutes is 9:45 a.m."
  },
  {
    id: "Q4_014",
    type: "convert_12_to_24",
    world: 1,
    difficulty: 1,
    questionText: "Convert 8:15 a.m. to 24-hour notation.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["08:15", "18:15", "20:15", "08:50"],
    correctAnswer: "08:15",
    hint1: "a.m. times before noon keep the same hour number with a leading zero.",
    hint2: "8:15 a.m. = 08:15.",
    explanation: "8:15 a.m. in 24-hour time is 08:15."
  },
  {
    id: "Q5_015",
    type: "convert_24_to_12",
    world: 1,
    difficulty: 1,
    questionText: "Convert 13:45 to 12-hour time with a.m./p.m.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1:45 a.m.", "1:45 p.m.", "3:45 p.m.", "11:45 a.m."],
    correctAnswer: "1:45 p.m.",
    hint1: "13 is greater than 12. Subtract 12 from 13.",
    hint2: "13 - 12 = 1 p.m., so 13:45 = 1:45 p.m.",
    explanation: "13:45 is 1:45 p.m."
  },
  {
    id: "Q6_016",
    type: "journey_word_problem",
    world: 1,
    difficulty: 1,
    startMinutes: 720, // 12:00 p.m.
    endMinutes: 870, // 2:30 p.m.
    questionText: "A ferry boat tour around Manhattan leaves at 12:00 p.m. and returns at 2:30 p.m. What is the total duration?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["2 hours", "2 hours 30 min", "3 hours", "1 hour 30 min"],
    correctAnswer: "2 hours 30 min",
    hint1: "12:00 p.m. to 2:00 p.m. is 2 hours. Plus 30 minutes.",
    hint2: "Total time = 2 hours 30 minutes.",
    explanation: "12:00 p.m. to 2:30 p.m. is 2 hours 30 minutes."
  },
  {
    id: "Q7_017",
    type: "schedule_word_problem",
    world: 1,
    difficulty: 1,
    questionText: "A Broadway rehearsal starts at 3:15 p.m. and lasts 1 hour 45 minutes. What time does it end?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["4:45 p.m.", "5:00 p.m.", "5:15 p.m.", "5:30 p.m."],
    correctAnswer: "5:00 p.m.",
    hint1: "3:15 + 1 hour = 4:15. Now add 45 minutes.",
    hint2: "4:15 + 45 minutes = 5:00 p.m. (since 15 + 45 = 60 minutes = 1 hour).",
    explanation: "3:15 p.m. + 1 hr 45 min = 5:00 p.m."
  },
  {
    id: "Q8_018",
    type: "true_false_duration",
    world: 1,
    difficulty: 1,
    questionText: "True or False: A movie starting at 4:30 p.m. and ending at 6:15 p.m. has a duration of 1 hour 45 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "4:30 to 5:30 is 1 hour. 5:30 to 6:15 is 45 minutes.",
    hint2: "1 hour + 45 minutes = 1 hour 45 minutes.",
    explanation: "4:30 p.m. to 6:15 p.m. is indeed 1 hr 45 min (True)."
  },
  {
    id: "Q9_019",
    type: "timetable_mcq",
    world: 1,
    difficulty: 1,
    timetableRows: [
      { label: "Train 101", departure: "06:15 a.m.", arrival: "07:45 a.m." },
      { label: "Train 103", departure: "07:00 a.m.", arrival: "08:20 a.m." },
      { label: "Train 105", departure: "07:45 a.m.", arrival: "09:10 a.m." }
    ],
    questionText: "Which train takes 1 hour and 30 minutes for its trip?",
    visual: "timetable",
    clockFormatUsed: "12h",
    options: ["Train 101", "Train 103", "Train 105", "All of them"],
    correctAnswer: "Train 101",
    hint1: "Calculate duration for each train: Arrival minus Departure.",
    hint2: "Train 101: 06:15 to 07:45 is 1 hr 30 min.",
    explanation: "Train 101 leaves at 06:15 and arrives at 07:45 (1 hr 30 min)."
  },
  {
    id: "Q10_020",
    type: "unit_conversion",
    world: 1,
    difficulty: 1,
    questionText: "How many seconds are in 3 minutes and 20 seconds?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["180 seconds", "200 seconds", "220 seconds", "320 seconds"],
    correctAnswer: "200 seconds",
    hint1: "1 minute = 60 seconds. 3 minutes = 180 seconds.",
    hint2: "180 + 20 = 200 seconds.",
    explanation: "3 min (180 s) + 20 s = 200 seconds."
  },

  // --- WORLD 3: Paris Café Clock (Q21-Q30) ---
  {
    id: "Q1_021",
    type: "find_end_time",
    world: 2,
    difficulty: 2,
    startMinutes: 855, // 2:15 p.m.
    durationMinutes: 105, // 1 hr 45 min
    questionText: "Sarah sits at a sidewalk café in Paris at 2:15 p.m. She stays for 1 hour 45 minutes. What time does she leave?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["3:45 p.m.", "4:00 p.m.", "4:15 p.m.", "4:30 p.m."],
    correctAnswer: "4:00 p.m.",
    hint1: "2:15 + 1 hour = 3:15. Now add 45 minutes.",
    hint2: "3:15 + 45 min = 4:00 p.m.",
    explanation: "2:15 p.m. plus 1 hour 45 minutes is 4:00 p.m."
  },
  {
    id: "Q2_022",
    type: "find_duration",
    world: 2,
    difficulty: 2,
    startMinutes: 585, // 9:45 a.m.
    endMinutes: 705, // 11:45 a.m.
    questionText: "A guided tour of the Louvre museum starts at 9:45 a.m. and ends at 11:45 a.m. What is the duration?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["1 hour 30 min", "2 hours", "2 hours 15 min", "1 hour 45 min"],
    correctAnswer: "2 hours",
    hint1: "Notice the minutes stay the same (45).",
    hint2: "Subtract hours: 11 - 9 = 2 hours.",
    explanation: "From 9:45 a.m. to 11:45 a.m. is 2 hours."
  },
  {
    id: "Q3_023",
    type: "find_start_time",
    world: 2,
    difficulty: 2,
    endMinutes: 1020, // 5:00 p.m.
    durationMinutes: 135, // 2 hr 15 min
    questionText: "A pastry baking workshop ends at 5:00 p.m. If it lasted 2 hours 15 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["2:30 p.m.", "2:45 p.m.", "3:00 p.m.", "3:15 p.m."],
    correctAnswer: "2:45 p.m.",
    hint1: "5:00 p.m. minus 2 hours = 3:00 p.m.",
    hint2: "3:00 p.m. minus 15 minutes = 2:45 p.m.",
    explanation: "5:00 p.m. minus 2 hr 15 min is 2:45 p.m."
  },
  {
    id: "Q4_024",
    type: "convert_12_to_24",
    world: 2,
    difficulty: 2,
    questionText: "Convert 9:45 p.m. (Eiffel Tower light show) to 24-hour format.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["09:45", "19:45", "21:45", "23:45"],
    correctAnswer: "21:45",
    hint1: "Add 12 to 9 for p.m. time.",
    hint2: "9 + 12 = 21. So 9:45 p.m. is 21:45.",
    explanation: "9:45 p.m. in 24-hour notation is 21:45."
  },
  {
    id: "Q5_025",
    type: "convert_24_to_12",
    world: 2,
    difficulty: 2,
    questionText: "Convert 22:15 to 12-hour time format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["8:15 p.m.", "9:15 p.m.", "10:15 p.m.", "11:15 p.m."],
    correctAnswer: "10:15 p.m.",
    hint1: "Subtract 12 from 22.",
    hint2: "22 - 12 = 10. So 22:15 = 10:15 p.m.",
    explanation: "22:15 is 10:15 p.m."
  },
  {
    id: "Q6_026",
    type: "journey_word_problem",
    world: 2,
    difficulty: 2,
    startMinutes: 440, // 07:20
    endMinutes: 535, // 08:55
    questionText: "Chloe's train from Paris to Lyon departs at 07:20 and arrives at 08:55. How long was her journey?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["1 hour 15 min", "1 hour 25 min", "1 hour 35 min", "1 hour 45 min"],
    correctAnswer: "1 hour 35 min",
    hint1: "07:20 to 08:20 is 1 hour. 08:20 to 08:55 is 35 minutes.",
    hint2: "1 hour + 35 minutes = 1 hour 35 minutes.",
    explanation: "From 07:20 to 08:55 is 1 hour 35 minutes."
  },
  {
    id: "Q7_027",
    type: "schedule_word_problem",
    world: 2,
    difficulty: 2,
    questionText: "Diego starts his Seine river cruise at 11:40 a.m. The cruise takes 1 hour 30 minutes. What time will he return?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1:00 p.m.", "1:10 p.m.", "1:20 p.m.", "12:50 p.m."],
    correctAnswer: "1:10 p.m.",
    hint1: "11:40 a.m. + 1 hour = 12:40 p.m. (crosses noon boundary!).",
    hint2: "12:40 p.m. + 30 minutes = 1:10 p.m.",
    explanation: "11:40 a.m. plus 1 hr 30 min crosses noon to reach 1:10 p.m."
  },
  {
    id: "Q8_028",
    type: "true_false_duration",
    world: 2,
    difficulty: 2,
    questionText: "True or False: An interval from 11:15 a.m. to 1:45 p.m. is equal to 2 hours and 30 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "11:15 a.m. to 1:15 p.m. is 2 hours. 1:15 p.m. to 1:45 p.m. is 30 min.",
    hint2: "Total = 2 hr 30 min.",
    explanation: "11:15 a.m. to 1:45 p.m. is 2 hours 30 minutes (True)."
  },
  {
    id: "Q9_029",
    type: "timetable_mcq",
    world: 2,
    difficulty: 2,
    timetableRows: [
      { label: "Flight AF10", departure: "10:15 a.m.", arrival: "11:50 a.m." },
      { label: "Flight AF20", departure: "11:30 a.m.", arrival: "01:10 p.m." },
      { label: "Flight AF30", departure: "02:00 p.m.", arrival: "03:40 p.m." }
    ],
    questionText: "Which flight has a duration of 1 hour and 35 minutes?",
    visual: "timetable",
    clockFormatUsed: "12h",
    options: ["Flight AF10", "Flight AF20", "Flight AF30", "Flight AF10 & AF30"],
    correctAnswer: "Flight AF10",
    hint1: "Flight AF10: 10:15 to 11:50 = 1 hr 35 min.",
    hint2: "Flight AF20: 11:30 to 1:10 = 1 hr 40 min.",
    explanation: "Flight AF10 departs at 10:15 and lands at 11:50 (1 hour 35 minutes)."
  },
  {
    id: "Q10_030",
    type: "unit_conversion",
    world: 2,
    difficulty: 2,
    questionText: "How many hours and minutes is 215 minutes?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["3 hr 15 min", "3 hr 35 min", "3 hr 45 min", "4 hr 15 min"],
    correctAnswer: "3 hr 35 min",
    hint1: "Divide 215 by 60. 60 x 3 = 180.",
    hint2: "215 - 180 = 35 minutes. So 3 hours 35 minutes.",
    explanation: "215 minutes = 3 hours (180 min) + 35 minutes."
  },

  // --- WORLD 4: Tokyo Bullet Train (Q31-Q40) ---
  {
    id: "Q1_031",
    type: "find_end_time",
    world: 3,
    difficulty: 2,
    startMinutes: 870, // 14:30
    durationMinutes: 140, // 2 hr 20 min
    questionText: "Yuki boards the Shinkansen bullet train in Tokyo at 14:30. The journey takes 2 hours 20 minutes. What time does he arrive?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["16:30", "16:50", "17:10", "17:30"],
    correctAnswer: "16:50",
    hint1: "14:30 + 2 hours = 16:30.",
    hint2: "16:30 + 20 minutes = 16:50.",
    explanation: "14:30 plus 2 hours 20 minutes is 16:50 (4:50 p.m.)."
  },
  {
    id: "Q2_032",
    type: "find_duration",
    world: 3,
    difficulty: 2,
    startMinutes: 510, // 08:30
    endMinutes: 700, // 11:40
    questionText: "A robocompetition in Tokyo runs from 08:30 to 11:40. How long did the event last?",
    visual: "clockPair",
    clockFormatUsed: "24h",
    options: ["3 hours 10 min", "3 hours 20 min", "2 hours 50 min", "3 hours 30 min"],
    correctAnswer: "3 hours 10 min",
    hint1: "08:30 to 11:30 is 3 hours. 11:30 to 11:40 is 10 minutes.",
    hint2: "Total = 3 hours 10 minutes.",
    explanation: "From 08:30 to 11:40 is 3 hours 10 minutes."
  },
  {
    id: "Q3_033",
    type: "find_start_time",
    world: 3,
    difficulty: 2,
    endMinutes: 1110, // 18:30
    durationMinutes: 165, // 2 hr 45 min
    questionText: "A tea ceremony in Kyoto finishes at 18:30. If it lasted 2 hours 45 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["15:15", "15:45", "16:00", "15:30"],
    correctAnswer: "15:45",
    hint1: "18:30 minus 2 hours = 16:30.",
    hint2: "16:30 minus 45 minutes = 15:45.",
    explanation: "18:30 minus 2 hours 45 minutes is 15:45 (3:45 p.m.)."
  },
  {
    id: "Q4_034",
    type: "convert_12_to_24",
    world: 3,
    difficulty: 2,
    questionText: "Convert 11:55 p.m. to 24-hour time.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["11:55", "22:55", "23:55", "00:55"],
    correctAnswer: "23:55",
    hint1: "11 p.m. + 12 = 23.",
    hint2: "11:55 p.m. = 23:55.",
    explanation: "11:55 p.m. in 24-hour format is 23:55."
  },
  {
    id: "Q5_035",
    type: "convert_24_to_12",
    world: 3,
    difficulty: 2,
    questionText: "Convert 00:30 (half an hour after midnight) to 12-hour time.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["12:30 a.m.", "12:30 p.m.", "0:30 a.m.", "1:30 a.m."],
    correctAnswer: "12:30 a.m.",
    hint1: "00:XX represents the hour after midnight.",
    hint2: "00:30 is 12:30 a.m.",
    explanation: "00:30 in 24-hour time corresponds to 12:30 a.m."
  },
  {
    id: "Q6_036",
    type: "journey_word_problem",
    world: 3,
    difficulty: 2,
    startMinutes: 490, // 08:10
    endMinutes: 695, // 11:35
    questionText: "Ravi takes a bus from Shinagawa at 08:10 and reaches Hakone at 11:35. How long was the ride?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["3 hours 15 min", "3 hours 25 min", "3 hours 35 min", "2 hours 55 min"],
    correctAnswer: "3 hours 25 min",
    hint1: "08:10 to 11:10 is 3 hours. 11:10 to 11:35 is 25 minutes.",
    hint2: "3 hours + 25 minutes = 3 hours 25 minutes.",
    explanation: "08:10 to 11:35 is 3 hours 25 minutes."
  },
  {
    id: "Q7_037",
    type: "schedule_word_problem",
    world: 3,
    difficulty: 2,
    questionText: "Akira's anime studio tour begins at 13:15 and lasts 2 hours 50 minutes. Will it end before 16:15?",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["No, it ends at 16:05", "No, it ends at 16:05", "No, it ends at 16:05", "No, it ends at 16:05"],
    options: ["No, it ends at 16:05", "Yes, it ends at 16:05", "No, it ends at 16:25", "Yes, it ends at 15:55"],
    correctAnswer: "Yes, it ends at 16:05",
    hint1: "13:15 + 2 hours = 15:15.",
    hint2: "15:15 + 50 minutes = 16:05, which is before 16:15!",
    explanation: "13:15 + 2 hr 50 min = 16:05, which is before 16:15."
  },
  {
    id: "Q8_038",
    type: "true_false_duration",
    world: 3,
    difficulty: 2,
    questionText: "True or False: From 15:45 to 19:15 is a time interval of 3 hours 30 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "24h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "15:45 to 18:45 is 3 hours. 18:45 to 19:15 is 30 minutes.",
    hint2: "3 hr + 30 min = 3 hr 30 min.",
    explanation: "15:45 to 19:15 is 3 hours 30 minutes (True)."
  },
  {
    id: "Q9_039",
    type: "timetable_mcq",
    world: 3,
    difficulty: 2,
    timetableRows: [
      { label: "Nozomi 1", departure: "09:00", arrival: "11:15" },
      { label: "Hikari 5", departure: "09:30", arrival: "12:00" },
      { label: "Kodama 9", departure: "10:00", arrival: "13:10" }
    ],
    questionText: "Which train has a journey duration of 2 hours and 30 minutes?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Nozomi 1", "Hikari 5", "Kodama 9", "None of them"],
    correctAnswer: "Hikari 5",
    hint1: "Hikari 5: 09:30 to 12:00.",
    hint2: "09:30 to 11:30 (2hr) + 30 min = 12:00 (2 hr 30 min).",
    explanation: "Hikari 5 departs at 09:30 and arrives at 12:00 (2 hours 30 minutes)."
  },
  {
    id: "Q10_040",
    type: "unit_conversion",
    world: 3,
    difficulty: 2,
    questionText: "How many total seconds are in 5 minutes and 15 seconds?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["300 seconds", "315 seconds", "325 seconds", "515 seconds"],
    correctAnswer: "315 seconds",
    hint1: "5 x 60 = 300 seconds.",
    hint2: "300 + 15 = 315 seconds.",
    explanation: "5 min (300 s) + 15 s = 315 seconds."
  },

  // --- WORLD 5: Sydney Harbour Ferry (Q41-Q50) ---
  {
    id: "Q1_041",
    type: "find_end_time",
    world: 4,
    difficulty: 2,
    startMinutes: 675, // 11:15 a.m.
    durationMinutes: 110, // 1 hr 50 min
    questionText: "Liam boards a harbour ferry in Sydney at 11:15 a.m. The scenic ride lasts 1 hour 50 minutes. What time does he step off?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["1:05 p.m.", "12:55 p.m.", "1:15 p.m.", "1:25 p.m."],
    correctAnswer: "1:05 p.m.",
    hint1: "11:15 + 1 hour = 12:15 p.m.",
    hint2: "12:15 p.m. + 50 minutes = 1:05 p.m. (crosses p.m.!).",
    explanation: "11:15 a.m. plus 1 hr 50 min crosses noon to 1:05 p.m."
  },
  {
    id: "Q2_042",
    type: "find_duration",
    world: 4,
    difficulty: 2,
    startMinutes: 645, // 10:45 a.m.
    endMinutes: 855, // 2:15 p.m.
    questionText: "Sofia attends a surf lesson at Bondi Beach from 10:45 a.m. to 2:15 p.m. How long is the lesson?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["3 hours 15 min", "3 hours 30 min", "3 hours 45 min", "4 hours"],
    correctAnswer: "3 hours 30 min",
    hint1: "10:45 a.m. to 1:45 p.m. is 3 hours. 1:45 to 2:15 is 30 minutes.",
    hint2: "3 hr + 30 min = 3 hr 30 min.",
    explanation: "10:45 a.m. to 2:15 p.m. is 3 hours 30 minutes."
  },
  {
    id: "Q3_043",
    type: "find_start_time",
    world: 4,
    difficulty: 2,
    endMinutes: 810, // 1:30 p.m.
    durationMinutes: 160, // 2 hr 40 min
    questionText: "A koala sanctuary tour finishes at 1:30 p.m. If the tour took 2 hours 40 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["10:40 a.m.", "10:50 a.m.", "11:00 a.m.", "10:30 a.m."],
    correctAnswer: "10:50 a.m.",
    hint1: "1:30 p.m. minus 2 hours = 11:30 a.m.",
    hint2: "11:30 a.m. minus 40 minutes = 10:50 a.m.",
    explanation: "1:30 p.m. minus 2 hr 40 min is 10:50 a.m."
  },
  {
    id: "Q4_044",
    type: "convert_12_to_24",
    world: 4,
    difficulty: 2,
    questionText: "Convert 12:05 a.m. (5 minutes past midnight) to 24-hour time.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["00:05", "12:05", "24:05", "01:05"],
    correctAnswer: "00:05",
    hint1: "Midnight hour (12 a.m.) is written as 00 in 24-hour time.",
    hint2: "12:05 a.m. = 00:05.",
    explanation: "12:05 a.m. in 24-hour time is 00:05."
  },
  {
    id: "Q5_045",
    type: "convert_24_to_12",
    world: 4,
    difficulty: 2,
    questionText: "Convert 12:45 (quarter to one in the afternoon) to 12-hour time format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["12:45 a.m.", "12:45 p.m.", "1:45 p.m.", "0:45 p.m."],
    correctAnswer: "12:45 p.m.",
    hint1: "12:XX hours during daytime remain 12:XX p.m.",
    hint2: "12:45 = 12:45 p.m.",
    explanation: "12:45 is 12:45 p.m."
  },
  {
    id: "Q6_046",
    type: "journey_word_problem",
    world: 4,
    difficulty: 2,
    startMinutes: 705, // 11:45 a.m.
    endMinutes: 935, // 3:35 p.m.
    questionText: "A whale watching boat leaves Sydney Quay at 11:45 a.m. and returns at 3:35 p.m. How long was the boat out at sea?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["3 hours 40 min", "3 hours 50 min", "4 hours 10 min", "3 hours 30 min"],
    correctAnswer: "3 hours 50 min",
    hint1: "11:45 a.m. to 2:45 p.m. is 3 hours. 2:45 to 3:35 is 50 minutes.",
    hint2: "Total = 3 hours 50 minutes.",
    explanation: "11:45 a.m. to 3:35 p.m. is 3 hours 50 minutes."
  },
  {
    id: "Q7_047",
    type: "schedule_word_problem",
    world: 4,
    difficulty: 2,
    questionText: "Priya's flight to Melbourne departs at 2:50 p.m. The flight duration is 1 hour 35 minutes. What time does she land?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["4:15 p.m.", "4:25 p.m.", "4:35 p.m.", "4:45 p.m."],
    correctAnswer: "4:25 p.m.",
    hint1: "2:50 + 1 hour = 3:50 p.m.",
    hint2: "3:50 + 35 minutes = 4:25 p.m. (50 + 35 = 85 min = 1 hr 25 min).",
    explanation: "2:50 p.m. plus 1 hour 35 minutes is 4:25 p.m."
  },
  {
    id: "Q8_048",
    type: "true_false_duration",
    world: 4,
    difficulty: 2,
    questionText: "True or False: From 9:50 a.m. to 1:10 p.m. is a duration of 3 hours 20 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "9:50 a.m. to 12:50 p.m. is 3 hours. 12:50 to 1:10 p.m. is 20 minutes.",
    hint2: "Total = 3 hours 20 minutes.",
    explanation: "9:50 a.m. to 1:10 p.m. is 3 hours 20 minutes (True)."
  },
  {
    id: "Q9_049",
    type: "timetable_mcq",
    world: 4,
    difficulty: 2,
    timetableRows: [
      { label: "Ferry F1", departure: "10:10 a.m.", arrival: "11:25 a.m." },
      { label: "Ferry F2", departure: "11:00 a.m.", arrival: "12:20 p.m." },
      { label: "Ferry F3", departure: "11:45 a.m.", arrival: "01:05 p.m." }
    ],
    questionText: "Which ferry trip lasts 1 hour and 20 minutes?",
    visual: "timetable",
    clockFormatUsed: "12h",
    options: ["Ferry F1", "Ferry F2", "Ferry F3", "None of them"],
    correctAnswer: "Ferry F2",
    hint1: "Calculate duration: F1 is 1hr 15m; F2 is 1hr 20m; F3 is 1hr 20m.",
    hint2: "Ferry F2: 11:00 to 12:20 is 1 hour 20 minutes.",
    explanation: "Ferry F2 departs at 11:00 a.m. and arrives at 12:20 p.m. (1 hr 20 min)."
  },
  {
    id: "Q10_050",
    type: "unit_conversion",
    world: 4,
    difficulty: 2,
    questionText: "How many total minutes are in 4 hours and 12 minutes?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["242 minutes", "252 minutes", "262 minutes", "272 minutes"],
    correctAnswer: "252 minutes",
    hint1: "4 hours = 4 x 60 = 240 minutes.",
    hint2: "240 + 12 = 252 minutes.",
    explanation: "4 hours (240 min) + 12 min = 252 minutes."
  },

  // --- WORLD 6: Cairo Desert Caravan (Q51-Q60) ---
  {
    id: "Q1_051",
    type: "find_end_time",
    world: 5,
    difficulty: 3,
    startMinutes: 390, // 06:30
    durationMinutes: 285, // 4 hr 45 min
    questionText: "A camel caravan leaves Cairo oasis at 06:30. The trek to the pyramids takes 4 hours 45 minutes. What time does it reach the destination?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["10:45", "11:15", "11:30", "11:45"],
    correctAnswer: "11:15",
    hint1: "06:30 + 4 hours = 10:30.",
    hint2: "10:30 + 45 minutes = 11:15.",
    explanation: "06:30 plus 4 hr 45 min is 11:15."
  },
  {
    id: "Q2_052",
    type: "find_duration",
    world: 5,
    difficulty: 3,
    startMinutes: 440, // 07:20
    endMinutes: 775, // 12:55
    questionText: "A Nile river expedition runs from 07:20 to 12:55. What is the total elapsed time of the trip?",
    visual: "clockPair",
    clockFormatUsed: "24h",
    options: ["5 hours 15 min", "5 hours 25 min", "5 hours 35 min", "5 hours 45 min"],
    correctAnswer: "5 hours 35 min",
    hint1: "07:20 to 12:20 is 5 hours. 12:20 to 12:55 is 35 minutes.",
    hint2: "Total = 5 hours 35 minutes.",
    explanation: "From 07:20 to 12:55 is 5 hours 35 minutes."
  },
  {
    id: "Q3_053",
    type: "find_start_time",
    world: 5,
    difficulty: 3,
    endMinutes: 1040, // 17:20
    durationMinutes: 215, // 3 hr 35 min
    questionText: "A desert astronomy session ends at 17:20. If it lasted 3 hours 35 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["13:35", "13:45", "14:00", "13:50"],
    correctAnswer: "13:45",
    hint1: "17:20 minus 3 hours = 14:20.",
    hint2: "14:20 minus 35 minutes = 13:45.",
    explanation: "17:20 minus 3 hours 35 minutes is 13:45 (1:45 p.m.)."
  },
  {
    id: "Q4_054",
    type: "convert_12_to_24",
    world: 5,
    difficulty: 3,
    questionText: "Convert 12:30 a.m. (30 minutes past midnight) to 24-hour format.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["00:30", "12:30", "24:30", "01:30"],
    correctAnswer: "00:30",
    hint1: "12 a.m. hour becomes 00.",
    hint2: "12:30 a.m. = 00:30.",
    explanation: "12:30 a.m. is 00:30 in 24-hour notation."
  },
  {
    id: "Q5_055",
    type: "convert_24_to_12",
    world: 5,
    difficulty: 3,
    questionText: "Convert 00:15 to 12-hour time with a.m./p.m.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["12:15 a.m.", "12:15 p.m.", "0:15 a.m.", "1:15 a.m."],
    correctAnswer: "12:15 a.m.",
    hint1: "00:15 is 15 minutes after midnight.",
    hint2: "So 00:15 = 12:15 a.m.",
    explanation: "00:15 is 12:15 a.m."
  },
  {
    id: "Q6_056",
    type: "journey_word_problem",
    world: 5,
    difficulty: 3,
    startMinutes: 505, // 08:25
    endMinutes: 890, // 14:50
    questionText: "A train from Cairo to Alexandria leaves at 08:25 and arrives at 14:50. How long is the journey?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["6 hours 15 min", "6 hours 25 min", "6 hours 35 min", "5 hours 55 min"],
    correctAnswer: "6 hours 25 min",
    hint1: "08:25 to 14:25 is 6 hours. 14:25 to 14:50 is 25 minutes.",
    hint2: "Total = 6 hours 25 minutes.",
    explanation: "08:25 to 14:50 is 6 hours 25 minutes."
  },
  {
    id: "Q7_057",
    type: "schedule_word_problem",
    world: 5,
    difficulty: 3,
    questionText: "Fatima's museum visit starts at 10:40 a.m. She spends 2 hours 45 minutes inside, then takes 30 minutes for lunch. What time does she finish lunch?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1:45 p.m.", "1:55 p.m.", "2:05 p.m.", "1:35 p.m."],
    correctAnswer: "1:55 p.m.",
    hint1: "Add total time: 2 hr 45 min + 30 min = 3 hr 15 min.",
    hint2: "10:40 a.m. + 3 hr 15 min = 1:55 p.m.",
    explanation: "10:40 a.m. plus 3 hours 15 minutes total is 1:55 p.m."
  },
  {
    id: "Q8_058",
    type: "true_false_duration",
    world: 5,
    difficulty: 3,
    questionText: "True or False: From 09:35 to 15:10 is an elapsed duration of 5 hours 35 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "24h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "09:35 to 14:35 is 5 hours. 14:35 to 15:10 is 35 minutes.",
    hint2: "Total = 5 hours 35 minutes.",
    explanation: "09:35 to 15:10 is 5 hours 35 minutes (True)."
  },
  {
    id: "Q9_059",
    type: "timetable_mcq",
    world: 5,
    difficulty: 3,
    timetableRows: [
      { label: "Caravan A", departure: "06:15", arrival: "11:40" },
      { label: "Caravan B", departure: "07:30", arrival: "12:45" },
      { label: "Caravan C", departure: "08:00", arrival: "13:30" }
    ],
    questionText: "Which caravan trek takes exactly 5 hours and 25 minutes?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Caravan A", "Caravan B", "Caravan C", "None of them"],
    correctAnswer: "Caravan A",
    hint1: "Caravan A: 06:15 to 11:40 = 5 hr 25 min.",
    hint2: "Caravan B: 07:30 to 12:45 = 5 hr 15 min.",
    explanation: "Caravan A departs at 06:15 and arrives at 11:40 (5 hours 25 minutes)."
  },
  {
    id: "Q10_060",
    type: "unit_conversion",
    world: 5,
    difficulty: 3,
    questionText: "Convert 380 minutes into hours and minutes.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["6 hr 10 min", "6 hr 20 min", "6 hr 30 min", "5 hr 40 min"],
    correctAnswer: "6 hr 20 min",
    hint1: "60 x 6 = 360 minutes = 6 hours.",
    hint2: "380 - 360 = 20 minutes.",
    explanation: "380 minutes = 6 hours (360 min) + 20 minutes."
  },

  // --- WORLD 7: Rio Carnival Route (Q61-Q70) ---
  {
    id: "Q1_061",
    type: "find_end_time",
    world: 6,
    difficulty: 3,
    startMinutes: 1290, // 9:30 p.m.
    durationMinutes: 210, // 3 hr 30 min
    questionText: "The main Carnival parade in Rio starts at 9:30 p.m. and goes on for 3 hours 30 minutes. What time does it finish?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["12:30 a.m.", "1:00 a.m.", "1:30 a.m.", "2:00 a.m."],
    correctAnswer: "1:00 a.m.",
    hint1: "9:30 p.m. + 3 hours = 12:30 a.m. (crosses midnight!).",
    hint2: "12:30 a.m. + 30 minutes = 1:00 a.m.",
    explanation: "9:30 p.m. plus 3 hr 30 min crosses midnight to reach 1:00 a.m."
  },
  {
    id: "Q2_062",
    type: "find_duration",
    world: 6,
    difficulty: 3,
    startMinutes: 1350, // 10:30 p.m.
    endMinutes: 135, // 2:15 a.m.
    questionText: "Carlos attends a late-night music festival from 10:30 p.m. to 2:15 a.m. How long did he stay?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["3 hours 30 min", "3 hours 45 min", "4 hours", "4 hours 15 min"],
    correctAnswer: "3 hours 45 min",
    hint1: "10:30 p.m. to 12:00 midnight is 1 hr 30 min.",
    hint2: "12:00 midnight to 2:15 a.m. is 2 hr 15 min. Total = 3 hr 45 min.",
    explanation: "10:30 p.m. to 2:15 a.m. crosses midnight for a duration of 3 hours 45 minutes."
  },
  {
    id: "Q3_063",
    type: "find_start_time",
    world: 6,
    difficulty: 3,
    endMinutes: 90, // 1:30 a.m.
    durationMinutes: 180, // 3 hr
    questionText: "A night cable car ride down Sugarloaf Mountain ended at 1:30 a.m. If it lasted 3 hours, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["10:00 p.m.", "10:30 p.m.", "11:00 p.m.", "11:30 p.m."],
    correctAnswer: "10:30 p.m.",
    hint1: "Work backward from 1:30 a.m. past midnight.",
    hint2: "1:30 a.m. - 1 hr 30 min = 12:00 midnight. - 1 hr 30 min = 10:30 p.m.",
    explanation: "1:30 a.m. minus 3 hours is 10:30 p.m."
  },
  {
    id: "Q4_064",
    type: "convert_12_to_24",
    world: 6,
    difficulty: 3,
    questionText: "Convert 12:00 midnight to 24-hour notation.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["00:00", "12:00", "24:00", "12:00 a.m."],
    correctAnswer: "00:00",
    hint1: "Midnight is the start of the day in 24-hour notation.",
    hint2: "12:00 midnight = 00:00.",
    explanation: "12:00 midnight is represented as 00:00."
  },
  {
    id: "Q5_065",
    type: "convert_24_to_12",
    world: 6,
    difficulty: 3,
    questionText: "Convert 23:45 to 12-hour format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["11:45 a.m.", "11:45 p.m.", "10:45 p.m.", "12:45 a.m."],
    correctAnswer: "11:45 p.m.",
    hint1: "23 - 12 = 11 p.m.",
    hint2: "23:45 = 11:45 p.m.",
    explanation: "23:45 is 11:45 p.m."
  },
  {
    id: "Q6_066",
    type: "journey_word_problem",
    world: 6,
    difficulty: 3,
    startMinutes: 1390, // 23:10
    endMinutes: 140, // 02:20
    questionText: "Diego takes an overnight bus in Brazil departing at 23:10 and arriving at 02:20 the next morning. How long was the trip?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["3 hours 10 min", "3 hours 20 min", "3 hours 30 min", "2 hours 50 min"],
    correctAnswer: "3 hours 10 min",
    hint1: "23:10 to 00:00 (midnight) is 50 minutes.",
    hint2: "00:00 to 02:20 is 2 hours 20 minutes. 50m + 2h 20m = 3 hours 10 minutes.",
    explanation: "From 23:10 to 02:20 across midnight is 3 hours 10 minutes."
  },
  {
    id: "Q7_067",
    type: "schedule_word_problem",
    world: 6,
    difficulty: 3,
    questionText: "A beach soccer match starts at 8:45 p.m. Extra time and penalties add 2 hours 25 minutes. What time does the match end?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["10:55 p.m.", "11:05 p.m.", "11:10 p.m.", "11:15 p.m."],
    correctAnswer: "11:10 p.m.",
    hint1: "8:45 p.m. + 2 hours = 10:45 p.m.",
    hint2: "10:45 p.m. + 25 minutes = 11:10 p.m.",
    explanation: "8:45 p.m. plus 2 hr 25 min is 11:10 p.m."
  },
  {
    id: "Q8_068",
    type: "true_false_duration",
    world: 6,
    difficulty: 3,
    questionText: "True or False: An interval starting at 10:15 p.m. and ending at 1:45 a.m. is 3 hours and 30 minutes long.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "10:15 p.m. to 12:00 midnight is 1 hr 45 min.",
    hint2: "12:00 midnight to 1:45 a.m. is 1 hr 45 min. Total = 3 hr 30 min.",
    explanation: "10:15 p.m. to 1:45 a.m. is indeed 3 hours 30 minutes (True)."
  },
  {
    id: "Q9_069",
    type: "timetable_mcq",
    world: 6,
    difficulty: 3,
    timetableRows: [
      { label: "Samba Line 1", departure: "22:00", arrival: "00:45" },
      { label: "Samba Line 2", departure: "22:30", arrival: "01:30" },
      { label: "Samba Line 3", departure: "23:00", arrival: "02:15" }
    ],
    questionText: "Which bus route takes 3 hours for its overnight journey?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Samba Line 1", "Samba Line 2", "Samba Line 3", "None of them"],
    correctAnswer: "Samba Line 2",
    hint1: "Calculate duration across midnight for each line.",
    hint2: "Samba Line 2: 22:30 to 01:30 is exactly 3 hours.",
    explanation: "Samba Line 2 departs at 22:30 and arrives at 01:30 (3 hours)."
  },
  {
    id: "Q10_070",
    type: "unit_conversion",
    world: 6,
    difficulty: 3,
    questionText: "How many seconds are in 1 hour?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["600 seconds", "1,800 seconds", "3,600 seconds", "6,000 seconds"],
    correctAnswer: "3,600 seconds",
    hint1: "1 hour = 60 minutes. 1 minute = 60 seconds.",
    hint2: "60 x 60 = 3,600 seconds.",
    explanation: "1 hour = 60 min x 60 sec = 3,600 seconds."
  },

  // --- WORLD 8: Cape Town Safari Trail (Q71-Q80) ---
  {
    id: "Q1_071",
    type: "find_end_time",
    world: 7,
    difficulty: 3,
    startMinutes: 330, // 5:30 a.m.
    durationMinutes: 315, // 5 hr 15 min
    questionText: "Noah starts a sunrise safari game drive at 5:30 a.m. The trek lasts 5 hours 15 minutes. What time does it finish?",
    visual: "timeline",
    clockFormatUsed: "12h",
    options: ["10:30 a.m.", "10:45 a.m.", "11:00 a.m.", "11:15 a.m."],
    correctAnswer: "10:45 a.m.",
    hint1: "5:30 + 5 hours = 10:30 a.m.",
    hint2: "10:30 + 15 minutes = 10:45 a.m.",
    explanation: "5:30 a.m. plus 5 hr 15 min is 10:45 a.m."
  },
  {
    id: "Q2_072",
    type: "find_duration",
    world: 7,
    difficulty: 3,
    startMinutes: 375, // 06:15
    endMinutes: 810, // 13:30
    questionText: "A cableway ascent to Table Mountain opens at 06:15 and closes at 13:30. How long is it open?",
    visual: "clockPair",
    clockFormatUsed: "24h",
    options: ["7 hours 15 min", "7 hours 30 min", "7 hours 45 min", "6 hours 45 min"],
    correctAnswer: "7 hours 15 min",
    hint1: "06:15 to 13:15 is 7 hours. 13:15 to 13:30 is 15 minutes.",
    hint2: "Total = 7 hours 15 minutes.",
    explanation: "06:15 to 13:30 is 7 hours 15 minutes."
  },
  {
    id: "Q3_073",
    type: "find_start_time",
    world: 7,
    difficulty: 3,
    endMinutes: 990, // 4:30 p.m.
    durationMinutes: 250, // 4 hr 10 min
    questionText: "A whale watching trip returns to harbor at 4:30 p.m. If it lasted 4 hours 10 minutes, what time did it depart?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["12:10 p.m.", "12:20 p.m.", "12:30 p.m.", "11:50 a.m."],
    correctAnswer: "12:20 p.m.",
    hint1: "4:30 p.m. - 4 hours = 12:30 p.m.",
    hint2: "12:30 p.m. - 10 minutes = 12:20 p.m.",
    explanation: "4:30 p.m. minus 4 hr 10 min is 12:20 p.m."
  },
  {
    id: "Q4_074",
    type: "convert_12_to_24",
    world: 7,
    difficulty: 3,
    questionText: "Convert 6:05 p.m. to 24-hour time.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["06:05", "16:05", "18:05", "20:05"],
    correctAnswer: "18:05",
    hint1: "6 p.m. + 12 = 18.",
    hint2: "6:05 p.m. = 18:05.",
    explanation: "6:05 p.m. in 24-hour notation is 18:05."
  },
  {
    id: "Q5_075",
    type: "convert_24_to_12",
    world: 7,
    difficulty: 3,
    questionText: "Convert 16:40 to 12-hour format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["4:40 a.m.", "4:40 p.m.", "6:40 p.m.", "2:40 p.m."],
    correctAnswer: "4:40 p.m.",
    hint1: "16 - 12 = 4 p.m.",
    hint2: "16:40 = 4:40 p.m.",
    explanation: "16:40 is 4:40 p.m."
  },
  {
    id: "Q6_076",
    type: "journey_word_problem",
    world: 7,
    difficulty: 3,
    startMinutes: 465, // 07:45
    endMinutes: 940, // 15:40
    questionText: "A safari train from Cape Town to Winelands leaves at 07:45 and arrives at 15:40. How long is the travel time?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["7 hours 45 min", "7 hours 55 min", "8 hours 05 min", "7 hours 35 min"],
    correctAnswer: "7 hours 55 min",
    hint1: "07:45 to 14:45 is 7 hours.",
    hint2: "14:45 to 15:40 is 55 minutes. Total = 7 hours 55 minutes.",
    explanation: "07:45 to 15:40 is 7 hours 55 minutes."
  },
  {
    id: "Q7_077",
    type: "schedule_word_problem",
    world: 7,
    difficulty: 3,
    questionText: "Aisha leaves Cape Town at 09:15. She drives 2 hours 40 minutes, stops 45 minutes for lunch, then drives 1 hour 20 minutes. What time does she reach her lodge?",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["13:45", "14:00", "14:15", "13:30"],
    correctAnswer: "14:00",
    hint1: "Total duration = 2h 40m + 45m + 1h 20m = 4 hours 45 minutes.",
    hint2: "09:15 + 4 hours 45 minutes = 14:00.",
    explanation: "09:15 plus 4 hr 45 min total travel time is 14:00 (2:00 p.m.)."
  },
  {
    id: "Q8_078",
    type: "true_false_duration",
    world: 7,
    difficulty: 3,
    questionText: "True or False: 08:40 to 14:15 is a time interval of 5 hours and 35 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "24h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "08:40 to 13:40 is 5 hours. 13:40 to 14:15 is 35 minutes.",
    hint2: "Total = 5 hours 35 minutes.",
    explanation: "08:40 to 14:15 is 5 hours 35 minutes (True)."
  },
  {
    id: "Q9_079",
    type: "timetable_mcq",
    world: 7,
    difficulty: 3,
    timetableRows: [
      { label: "Safari Bus 1", departure: "06:00", arrival: "11:45" },
      { label: "Safari Bus 2", departure: "07:15", arrival: "13:30" },
      { label: "Safari Bus 3", departure: "08:30", arrival: "14:15" }
    ],
    questionText: "Which safari bus journey takes 6 hours and 15 minutes?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Safari Bus 1", "Safari Bus 2", "Safari Bus 3", "None of them"],
    correctAnswer: "Safari Bus 2",
    hint1: "Bus 1: 5h 45m; Bus 2: 07:15 to 13:30 = 6h 15m; Bus 3: 5h 45m.",
    hint2: "Bus 2 takes 6 hours 15 minutes.",
    explanation: "Safari Bus 2 departs at 07:15 and arrives at 13:30 (6 hours 15 minutes)."
  },
  {
    id: "Q10_080",
    type: "unit_conversion",
    world: 7,
    difficulty: 3,
    questionText: "How many seconds are in 2 hours and 30 minutes?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["7,200 seconds", "9,000 seconds", "10,800 seconds", "8,400 seconds"],
    correctAnswer: "9,000 seconds",
    hint1: "2 hours = 7,200 seconds. 30 minutes = 1,800 seconds.",
    hint2: "7,200 + 1,800 = 9,000 seconds.",
    explanation: "2 hr (7200 s) + 30 min (1800 s) = 9,000 seconds."
  },

  // --- WORLD 9: Mumbai Local Express (Q81-Q90) ---
  {
    id: "Q1_081",
    type: "find_end_time",
    world: 8,
    difficulty: 3,
    startMinutes: 440, // 07:20
    durationMinutes: 195, // 3 hr 15 min
    questionText: "A Mumbai Local train departs CSMT at 07:20. The trip to Karjat takes 3 hours 15 minutes. What time does it arrive?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["10:25", "10:35", "10:45", "11:00"],
    correctAnswer: "10:35",
    hint1: "07:20 + 3 hours = 10:20.",
    hint2: "10:20 + 15 minutes = 10:35.",
    explanation: "07:20 plus 3 hours 15 minutes is 10:35."
  },
  {
    id: "Q2_082",
    type: "find_duration",
    world: 8,
    difficulty: 3,
    startMinutes: 525, // 8:45 a.m.
    endMinutes: 865, // 2:25 p.m.
    questionText: "Priya works at her Mumbai software studio from 8:45 a.m. until 2:25 p.m. How long did she work?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["5 hours 30 min", "5 hours 40 min", "5 hours 50 min", "6 hours 10 min"],
    correctAnswer: "5 hours 40 min",
    hint1: "8:45 a.m. to 1:45 p.m. is 5 hours. 1:45 to 2:25 p.m. is 40 minutes.",
    hint2: "Total = 5 hours 40 minutes.",
    explanation: "8:45 a.m. to 2:25 p.m. is 5 hours 40 minutes."
  },
  {
    id: "Q3_083",
    type: "find_start_time",
    world: 8,
    difficulty: 3,
    endMinutes: 1155, // 19:15
    durationMinutes: 260, // 4 hr 20 min
    questionText: "A Bollywood movie shoot wraps up at 19:15. If filming lasted 4 hours 20 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["14:45", "14:55", "15:05", "14:35"],
    correctAnswer: "14:55",
    hint1: "19:15 - 4 hours = 15:15.",
    hint2: "15:15 - 20 minutes = 14:55.",
    explanation: "19:15 minus 4 hours 20 minutes is 14:55 (2:55 p.m.)."
  },
  {
    id: "Q4_084",
    type: "convert_12_to_24",
    world: 8,
    difficulty: 3,
    questionText: "Convert 7:35 p.m. to 24-hour time notation.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["07:35", "17:35", "19:35", "21:35"],
    correctAnswer: "19:35",
    hint1: "7 p.m. + 12 = 19.",
    hint2: "7:35 p.m. = 19:35.",
    explanation: "7:35 p.m. in 24-hour format is 19:35."
  },
  {
    id: "Q5_085",
    type: "convert_24_to_12",
    world: 8,
    difficulty: 3,
    questionText: "Convert 20:50 to 12-hour format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["8:50 p.m.", "9:50 p.m.", "10:50 p.m.", "7:50 p.m."],
    correctAnswer: "8:50 p.m.",
    hint1: "20 - 12 = 8 p.m.",
    hint2: "20:50 = 8:50 p.m.",
    explanation: "20:50 is 8:50 p.m."
  },
  {
    id: "Q6_086",
    type: "journey_word_problem",
    world: 8,
    difficulty: 3,
    startMinutes: 550, // 09:10
    endMinutes: 1065, // 17:45
    questionText: "An express train from Mumbai to Goa departs at 09:10 and arrives at 17:45. What is the total travel duration?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["8 hours 25 min", "8 hours 35 min", "8 hours 45 min", "8 hours 15 min"],
    correctAnswer: "8 hours 35 min",
    hint1: "09:10 to 17:10 is 8 hours. 17:10 to 17:45 is 35 minutes.",
    hint2: "Total = 8 hours 35 minutes.",
    explanation: "09:10 to 17:45 is 8 hours 35 minutes."
  },
  {
    id: "Q7_087",
    type: "schedule_word_problem",
    world: 8,
    difficulty: 3,
    questionText: "Ravi takes a ferry at 10:20 a.m. to Elephanta Caves (1 hour 15 min), spends 2 hours exploring, then returns by ferry (1 hour 15 min). What time does he return?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["2:40 p.m.", "2:50 p.m.", "3:00 p.m.", "2:30 p.m."],
    correctAnswer: "2:50 p.m.",
    hint1: "Total trip time = 1h 15m + 2h + 1h 15m = 4 hours 30 minutes.",
    hint2: "10:20 a.m. + 4 hours 30 minutes = 2:50 p.m.",
    explanation: "10:20 a.m. plus 4 hr 30 min total is 2:50 p.m."
  },
  {
    id: "Q8_088",
    type: "true_false_duration",
    world: 8,
    difficulty: 3,
    questionText: "True or False: From 11:40 a.m. to 4:25 p.m. is a duration of 4 hours 45 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "12h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "11:40 a.m. to 3:40 p.m. is 4 hours. 3:40 to 4:25 p.m. is 45 minutes.",
    hint2: "Total = 4 hours 45 minutes.",
    explanation: "11:40 a.m. to 4:25 p.m. is 4 hours 45 minutes (True)."
  },
  {
    id: "Q9_089",
    type: "timetable_mcq",
    world: 8,
    difficulty: 3,
    timetableRows: [
      { label: "Deccan Queen", departure: "17:10", arrival: "20:25" },
      { label: "Pragati Express", departure: "16:25", arrival: "19:50" },
      { label: "Sinhagad Express", departure: "14:30", arrival: "18:05" }
    ],
    questionText: "Which train journey takes exactly 3 hours and 15 minutes?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Deccan Queen", "Pragati Express", "Sinhagad Express", "None of them"],
    correctAnswer: "Deccan Queen",
    hint1: "Deccan Queen: 17:10 to 20:25 = 3 hr 15 min.",
    hint2: "Pragati: 16:25 to 19:50 = 3 hr 25 min.",
    explanation: "Deccan Queen departs at 17:10 and arrives at 20:25 (3 hours 15 minutes)."
  },
  {
    id: "Q10_090",
    type: "unit_conversion",
    world: 8,
    difficulty: 3,
    questionText: "Convert 500 minutes into hours and minutes.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["8 hr 10 min", "8 hr 20 min", "8 hr 30 min", "7 hr 40 min"],
    correctAnswer: "8 hr 20 min",
    hint1: "60 x 8 = 480 minutes.",
    hint2: "500 - 480 = 20 minutes.",
    explanation: "500 minutes = 8 hours (480 min) + 20 minutes."
  },

  // --- WORLD 10: Reykjavik Midnight Sun (Q91-Q100) ---
  {
    id: "Q1_091",
    type: "find_end_time",
    world: 9,
    difficulty: 3,
    startMinutes: 1395, // 23:15
    durationMinutes: 150, // 2 hr 30 min
    questionText: "A Northern Lights tour in Iceland leaves Reykjavik at 23:15. It runs for 2 hours 30 minutes. What time does it finish?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["01:15", "01:30", "01:45", "02:15"],
    correctAnswer: "01:45",
    hint1: "23:15 + 45 minutes = 24:00 (00:00 midnight).",
    hint2: "1 hour 45 minutes remaining -> 01:45.",
    explanation: "23:15 plus 2 hr 30 min crosses midnight to reach 01:45."
  },
  {
    id: "Q2_092",
    type: "find_duration",
    world: 9,
    difficulty: 3,
    startMinutes: 1365, // 10:45 p.m.
    endMinutes: 165, // 2:45 a.m.
    questionText: "A midnight sun photography trek lasts from 10:45 p.m. to 2:45 a.m. What is the total duration?",
    visual: "clockPair",
    clockFormatUsed: "12h",
    options: ["3 hours 30 min", "4 hours", "4 hours 15 min", "4 hours 30 min"],
    correctAnswer: "4 hours",
    hint1: "10:45 p.m. to 12:00 midnight is 1 hr 15 min.",
    hint2: "12:00 midnight to 2:45 a.m. is 2 hr 45 min. Total = 4 hours.",
    explanation: "From 10:45 p.m. to 2:45 a.m. is exactly 4 hours."
  },
  {
    id: "Q3_093",
    type: "find_start_time",
    world: 9,
    difficulty: 3,
    endMinutes: 180, // 3:00 a.m.
    durationMinutes: 210, // 3 hr 30 min
    questionText: "A glacier hike ends at 3:00 a.m. If it lasted 3 hours 30 minutes, what time did it start?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["11:00 p.m.", "11:30 p.m.", "12:00 midnight", "10:30 p.m."],
    correctAnswer: "11:30 p.m.",
    hint1: "3:00 a.m. - 3 hours = 12:00 midnight.",
    hint2: "12:00 midnight - 30 minutes = 11:30 p.m.",
    explanation: "3:00 a.m. minus 3 hours 30 minutes is 11:30 p.m."
  },
  {
    id: "Q4_094",
    type: "convert_12_to_24",
    world: 9,
    difficulty: 3,
    questionText: "Convert 12:40 a.m. to 24-hour format.",
    visual: "sentence",
    clockFormatUsed: "24h",
    options: ["00:40", "12:40", "24:40", "01:40"],
    correctAnswer: "00:40",
    hint1: "12 a.m. hour translates to 00.",
    hint2: "12:40 a.m. = 00:40.",
    explanation: "12:40 a.m. is 00:40."
  },
  {
    id: "Q5_095",
    type: "convert_24_to_12",
    world: 9,
    difficulty: 3,
    questionText: "Convert 01:15 to 12-hour format.",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1:15 a.m.", "1:15 p.m.", "12:15 a.m.", "11:15 p.m."],
    correctAnswer: "1:15 a.m.",
    hint1: "01:15 is 1 hour 15 min after midnight.",
    hint2: "01:15 = 1:15 a.m.",
    explanation: "01:15 is 1:15 a.m."
  },
  {
    id: "Q6_096",
    type: "journey_word_problem",
    world: 9,
    difficulty: 3,
    startMinutes: 1335, // 22:15
    endMinutes: 195, // 03:15
    questionText: "A volcano geothermal tour bus leaves at 22:15 and returns at 03:15 the next morning. What is the total travel duration?",
    visual: "timeline",
    clockFormatUsed: "24h",
    options: ["4 hours 30 min", "5 hours", "5 hours 15 min", "4 hours 45 min"],
    correctAnswer: "5 hours",
    hint1: "22:15 to 00:00 midnight is 1 hr 45 min.",
    hint2: "00:00 to 03:15 is 3 hr 15 min. 1h 45m + 3h 15m = 5 hours.",
    explanation: "22:15 to 03:15 across midnight is 5 hours."
  },
  {
    id: "Q7_097",
    type: "schedule_word_problem",
    world: 9,
    difficulty: 3,
    questionText: "John enters Blue Lagoon thermal baths at 10:45 p.m. He swims for 2 hours 20 minutes and takes 30 minutes to get changed. What time does he exit?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1:25 a.m.", "1:35 a.m.", "1:45 a.m.", "1:15 a.m."],
    correctAnswer: "1:35 a.m.",
    hint1: "Total duration = 2h 20m + 30m = 2 hours 50 minutes.",
    hint2: "10:45 p.m. + 2 hours 50 minutes = 1:35 a.m. (crosses midnight!).",
    explanation: "10:45 p.m. plus 2 hr 50 min crosses midnight to 1:35 a.m."
  },
  {
    id: "Q8_098",
    type: "true_false_duration",
    world: 9,
    difficulty: 3,
    questionText: "True or False: An interval from 21:50 to 02:20 is an elapsed duration of 4 hours 30 minutes.",
    visual: "trueFalse",
    clockFormatUsed: "24h",
    options: ["True", "False"],
    correctAnswer: "True",
    hint1: "21:50 to 00:00 is 2 hr 10 min. 00:00 to 02:20 is 2 hr 20 min.",
    hint2: "2h 10m + 2h 20m = 4 hours 30 minutes.",
    explanation: "21:50 to 02:20 across midnight is 4 hours 30 minutes (True)."
  },
  {
    id: "Q9_099",
    type: "timetable_mcq",
    world: 9,
    difficulty: 3,
    timetableRows: [
      { label: "Aurora Express 1", departure: "21:30", arrival: "01:45" },
      { label: "Aurora Express 2", departure: "22:15", arrival: "02:45" },
      { label: "Aurora Express 3", departure: "23:00", arrival: "03:15" }
    ],
    questionText: "Which tour bus runs for 4 hours and 30 minutes overnight?",
    visual: "timetable",
    clockFormatUsed: "24h",
    options: ["Aurora Express 1", "Aurora Express 2", "Aurora Express 3", "None of them"],
    correctAnswer: "Aurora Express 2",
    hint1: "Exp 1: 4h 15m; Exp 2: 22:15 to 02:45 = 4h 30m; Exp 3: 4h 15m.",
    hint2: "Aurora Express 2 = 4 hours 30 minutes.",
    explanation: "Aurora Express 2 departs at 22:15 and arrives at 02:45 (4 hours 30 minutes)."
  },
  {
    id: "Q10_100",
    type: "unit_conversion",
    world: 9,
    difficulty: 3,
    questionText: "How many minutes are in 1 full day (24 hours)?",
    visual: "sentence",
    clockFormatUsed: "12h",
    options: ["1,200 minutes", "1,440 minutes", "1,600 minutes", "2,400 minutes"],
    correctAnswer: "1,440 minutes",
    hint1: "24 hours x 60 minutes.",
    hint2: "24 x 60 = 1,440 minutes.",
    explanation: "1 day = 24 hours x 60 minutes = 1,440 minutes."
  }
];

export function getQuestionsForWorld(worldIndex) {
  return RAW_QUESTION_BANK.filter(q => q.world === worldIndex);
}
