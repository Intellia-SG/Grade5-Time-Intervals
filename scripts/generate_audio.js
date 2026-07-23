import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY || '';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice

const phrases = [
  {
    key: "audio_wonder_hook_0",
    text: "Sarah's flight leaves London at 9:45 a.m. and lands in New York 8 hours and 20 minutes later. What time does Sarah land?",
    style: "statement"
  },
  {
    key: "audio_wonder_intro_0",
    text: "Welcome Explorer! Let's discover how TIME INTERVALS help us solve real-world problems around the globe!",
    style: "encouragement"
  },
  {
    key: "audio_story_panel1_0",
    text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki form the Global Time Explorers Club — a video-call group of friends from different countries who challenge each other with time puzzles.",
    style: "statement"
  },
  {
    key: "audio_story_panel2_0",
    text: "Mike in New York starts his homework at 4:15 p.m. He works for 1 hour and 40 minutes. What time does he finish?",
    style: "question"
  },
  {
    key: "audio_story_panel3_0",
    text: "Watch the clock move forward! From 4:15 p.m., adding 1 hour gives 5:15 p.m., and 40 minutes more brings us to 5:55 p.m.",
    style: "emphasis"
  },
  {
    key: "audio_story_panel4_0",
    text: "Yuki in Tokyo takes the bullet train at 14:30. That is 2:30 p.m. in 12-hour time! Trains in Japan often use 24-hour time.",
    style: "statement"
  },
  {
    key: "audio_story_panel5_0",
    text: "Aisha checks a timetable: her school bus leaves at 07:45 and arrives at 08:20. How long is the ride? 35 minutes!",
    style: "statement"
  },
  {
    key: "audio_story_panel6_0",
    text: "Every clock, every country, every trip — TIME INTERVALS help us plan our whole day!",
    style: "encouragement"
  },
  {
    key: "audio_station_a_instruction_0",
    text: "Station A: Drag duration blocks onto the clock to build the journey and reach the target end time!",
    style: "instruction"
  },
  {
    key: "audio_station_b_instruction_0",
    text: "Station B: Tap the cards where the claimed duration matches the before and after clocks!",
    style: "instruction"
  },
  {
    key: "audio_station_c_instruction_0",
    text: "Station C: Fill in the missing time value in the Time Sentence to complete the equation!",
    style: "instruction"
  },
  {
    key: "audio_reflect_prompt_0",
    text: "If you could plan a journey anywhere in the world, what start time and end time would you choose? Tell Chrono!",
    style: "question"
  },
  {
    key: "audio_correct_0",
    text: "Amazing! You calculated the time perfectly! 🎉",
    style: "celebration"
  },
  {
    key: "audio_incorrect_1_0",
    text: "Not quite! Let's look at the clock again ⏰",
    style: "encouragement"
  }
];

const styleSettings = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true }
};

async function generateAudio() {
  const outputDir = path.join(__dirname, '../public/assets/audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const mapResult = {};

  console.log(`Starting audio generation using ElevenLabs Voice ID: ${VOICE_ID}...`);

  for (let i = 0; i < phrases.length; i++) {
    const p = phrases[i];
    const fileName = `${p.key}.mp3`;
    const filePath = path.join(outputDir, fileName);
    const relativePath = `/assets/audio/${fileName}`;

    console.log(`[${i + 1}/${phrases.length}] Generating "${p.key}"...`);

    const voiceConfig = styleSettings[p.style] || styleSettings.statement;

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: p.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: voiceConfig
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Error generating ${p.key}: ${response.status} - ${errText}`);
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      mapResult[p.text] = relativePath;
      console.log(` Saved ${fileName} (${buffer.length} bytes)`);

      // Rate limit delay (500ms)
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`Failed to generate ${p.key}:`, err);
    }
  }

  // Update src/utils/audioMap.js
  const mapCode = `/**
 * Pre-generated offline audio asset map.
 * Key: Exact narrated text.
 * Value: Path to pre-generated static .mp3 asset.
 */
export const audioMap = ${JSON.stringify(mapResult, null, 2)};
`;

  const mapFilePath = path.join(__dirname, '../src/utils/audioMap.js');
  fs.writeFileSync(mapFilePath, mapCode);
  console.log(`\nUpdated ${mapFilePath} with ${Object.keys(mapResult).length} pre-generated offline audio entries.`);
}

generateAudio();
