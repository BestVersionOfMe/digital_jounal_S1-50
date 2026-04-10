/**
 * Persist Self Compassion workshop flow (local only). Cleared when user clicks Reset.
 */
export const SELF_COMPASSION_WORKSHOP_KEY = "bvm_self_compassion_workshop_v1";

export type SelfCompassionWorkshopSnapshot = {
  step: number;
  isCompleted: boolean;
  showReview: boolean;
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  q4Answer: string;
  q5Answer: string;
  blankAnswers: Record<string, string>;
  customModes: Record<string, boolean>;
  q8Choice: string | null;
  q9Choice: string | null;
  reallyChoice: string | null;
  q10Answer: string;
};

export function defaultSelfCompassionWorkshop(): SelfCompassionWorkshopSnapshot {
  return {
    step: 1,
    isCompleted: false,
    showReview: false,
    q1Answer: "",
    q2Answer: "",
    q3Answer: "",
    q4Answer: "",
    q5Answer: "",
    blankAnswers: {},
    customModes: {},
    q8Choice: null,
    q9Choice: null,
    reallyChoice: null,
    q10Answer: "",
  };
}

function clampStep(n: unknown): number {
  if (typeof n !== "number" || !Number.isFinite(n)) return 1;
  return Math.min(8, Math.max(1, Math.round(n)));
}

function asRecordString(v: unknown): Record<string, string> {
  if (!v || typeof v !== "object") return {};
  const o = v as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(o)) {
    if (typeof val === "string") out[k] = val;
  }
  return out;
}

function asRecordBool(v: unknown): Record<string, boolean> {
  if (!v || typeof v !== "object") return {};
  const o = v as Record<string, unknown>;
  const out: Record<string, boolean> = {};
  for (const [k, val] of Object.entries(o)) {
    if (typeof val === "boolean") out[k] = val;
  }
  return out;
}

export function parseSelfCompassionWorkshop(raw: string | null): SelfCompassionWorkshopSnapshot | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const d = defaultSelfCompassionWorkshop();
    if (typeof data.step === "number") d.step = clampStep(data.step);
    if (data.isCompleted === true) d.isCompleted = true;
    if (data.showReview === true) d.showReview = true;
    for (const key of ["q1Answer", "q2Answer", "q3Answer", "q4Answer", "q5Answer", "q10Answer"] as const) {
      if (typeof data[key] === "string") d[key] = data[key] as string;
    }
    d.blankAnswers = asRecordString(data.blankAnswers);
    d.customModes = asRecordBool(data.customModes);
    if (data.q8Choice === null || typeof data.q8Choice === "string") d.q8Choice = data.q8Choice;
    if (data.q9Choice === null || typeof data.q9Choice === "string") d.q9Choice = data.q9Choice;
    if (data.reallyChoice === null || typeof data.reallyChoice === "string") d.reallyChoice = data.reallyChoice;
    return d;
  } catch {
    return null;
  }
}

export function loadSelfCompassionWorkshop(): SelfCompassionWorkshopSnapshot | null {
  if (typeof window === "undefined") return null;
  return parseSelfCompassionWorkshop(localStorage.getItem(SELF_COMPASSION_WORKSHOP_KEY));
}

export function saveSelfCompassionWorkshop(snapshot: SelfCompassionWorkshopSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SELF_COMPASSION_WORKSHOP_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota / private mode */
  }
}

export function clearSelfCompassionWorkshop(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SELF_COMPASSION_WORKSHOP_KEY);
  } catch {
    /* ignore */
  }
}
