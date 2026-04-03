/** Mirrors `bvm_journal/sections/self_awareness.py` — content + export shape. */

export const RATING_TABLE_WIDTH_PCT = 100;
export const SLIDER_TRACK_WIDTH_PCT = 100;
export const PILL_BUTTON_GAP_REM = 1.5;

export const SEGMENTED_SOLID_BG = [
  "#eef5fb",
  "#dbeaf7",
  "#bfd9ee",
  "#8eb8db",
  "#5f94c5",
] as const;

export const RATING_SKILLS: { id: string; label: string }[] = [
  { id: "emotional_awareness", label: "Emotional Awareness" },
  { id: "honesty", label: "Honesty" },
  { id: "seek_feedback", label: "Seek Feedback" },
  { id: "self_compassion_skill", label: "Self Compassion" },
  { id: "mindfulness", label: "Mindfulness" },
  { id: "self_reflection", label: "Self Reflection" },
];

export type RatingVariant =
  | "segmented"
  | "pills"
  | "select_slider"
  | "radio_row"
  | "star_rating"
  | "stepper";

/** All skills use the same five-tone segmented bar as row 1 (Emotional Awareness). */
export const RATING_VARIANT_BY_SKILL: Record<string, RatingVariant> = {};

export const OPTIONS_1_TO_5 = ["1", "2", "3", "4", "5"] as const;
export type Option15 = (typeof OPTIONS_1_TO_5)[number];

export type CompassionPrompt = {
  id: string;
  prompt: string;
  /** Short hint chips shown under “Need help?” */
  suggestions: string[];
};

/** Exact chip labels → first-person sentences (present tense). */
const COMPASSION_CHIP_ANSWERS: Record<string, string> = {
  "Listening to others": "I listen to others",
  "Never giving up": "I never give up",
  "Making people smile": "I make people smile",
};

/** Chip → textarea: fixed phrases above; else “I'm …” unless already I'm / I am. */
export function compassionSuggestionToAnswer(suggestion: string): string {
  const s = suggestion.trim();
  const fixed = COMPASSION_CHIP_ANSWERS[s];
  if (fixed !== undefined) return fixed;
  if (/^(I['']m|I am)\b/i.test(s)) return s;
  const rest = s.length === 0 ? "" : s.charAt(0).toLowerCase() + s.slice(1);
  return `I'm ${rest}`;
}

export const COMPASSION_PROMPTS: CompassionPrompt[] = [
  {
    id: "sc_like_self",
    prompt: "What's something you like about yourself?",
    suggestions: [
      "Listening to others",
      "I am thoughtful",
      "Never giving up",
      "Making people smile",
    ],
  },
  {
    id: "sc_good_at",
    prompt: "What's something you feel you're good at?",
    suggestions: [
      "Problem solving",
      "Creativity",
      "Helping friends",
      "Sports",
      "Music",
    ],
  },
  {
    id: "sc_quality_others",
    prompt: "What's a quality you like about how you treat other people?",
    suggestions: [
      "Kindness",
      "Patience",
      "Honesty",
      "Listening",
      "Encouraging others",
    ],
  },
];

export const STORAGE_KEY = "bvm_journal_v1";

export type SelfReflectionScale = "numbers" | "words" | "emojis";

export type ReflectionWordChoice = "rarely" | "sometimes" | "often" | "always";

/** One saved row in “My self reflection journal” (Week One). */
export type SelfReflectionMeasure = {
  id: string;
  area: string;
  scale: SelfReflectionScale;
  numberValue: number;
  wordChoice: ReflectionWordChoice | null;
  emojiIndex: number;
};

export type JournalState = {
  ratings: Record<string, string | null>;
  compassion: Record<string, string>;
  /** Single measure area (demo) */
  reflectionArea: string;
  reflectionScale: SelfReflectionScale;
  /** Numbers scale: 1–10 */
  reflectionNumberValue: number;
  /** Words scale preview selection */
  reflectionWordChoice: ReflectionWordChoice | null;
  /** Emojis scale: 0–3 (Low → Great) */
  reflectionEmojiIndex: number;
  /** Rows created via Create (Week One table) */
  reflectionMeasures: SelfReflectionMeasure[];
  /** Seeking Feedback — who to ask */
  seekingFeedbackText: string;
  /** Honesty (Giving Feedback) — Glow & Grow plan */
  honestyGivingFeedbackText: string;
};

export function defaultJournalState(): JournalState {
  const ratings: Record<string, string | null> = {};
  for (const { id } of RATING_SKILLS) {
    ratings[id] = id === "seek_feedback" ? "3" : null;
  }
  const compassion: Record<string, string> = {};
  for (const { id } of COMPASSION_PROMPTS) {
    compassion[id] = "";
  }
  return {
    ratings,
    compassion,
    reflectionArea: "",
    reflectionScale: "numbers",
    reflectionNumberValue: 6,
    reflectionWordChoice: "sometimes",
    reflectionEmojiIndex: 1,
    reflectionMeasures: [],
    seekingFeedbackText: "",
    honestyGivingFeedbackText: "",
  };
}

export function exportMarkdown(state: JournalState): string {
  const lines: string[] = ["# Self-Awareness — page 1", ""];
  lines.push("## Self-Awareness skills rating (1 = low, 5 = high)");
  lines.push("");
  for (const { id, label } of RATING_SKILLS) {
    const v = state.ratings[id];
    lines.push(
      `- **${label}:** ${v != null ? v : "_(not selected)_"}`,
    );
  }
  lines.push("");
  lines.push("## Self compassion");
  lines.push("");
  for (const { id, prompt } of COMPASSION_PROMPTS) {
    const body = state.compassion[id]?.trim() ?? "";
    lines.push(`### ${prompt}`);
    lines.push("");
    lines.push(body || "_(empty)_");
    lines.push("");
  }

  lines.push("## Self reflection (demo)");
  lines.push("");
  lines.push(`- Area: ${state.reflectionArea.trim() || "_(empty)_"}`);
  lines.push(`- Scoring scale: ${state.reflectionScale}`);
  if (state.reflectionMeasures.length > 0) {
    lines.push("- Week One measures:");
    for (const m of state.reflectionMeasures) {
      lines.push(`  - **${m.area || "_(empty)_"}** — ${m.scale}`);
    }
  }
  lines.push("");
  lines.push("## Seeking feedback");
  lines.push("");
  lines.push(state.seekingFeedbackText.trim() || "_(empty)_");
  lines.push("");
  lines.push("## Giving feedback (Honesty)");
  lines.push("");
  lines.push(state.honestyGivingFeedbackText.trim() || "_(empty)_");
  lines.push("");
  return lines.join("\n");
}
