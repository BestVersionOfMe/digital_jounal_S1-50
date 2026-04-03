"use client";

import { useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY,
  defaultJournalState,
  type JournalState,
  type ReflectionWordChoice,
  type SelfReflectionMeasure,
  type SelfReflectionScale,
} from "@/lib/self-awareness";

function isWordChoice(v: unknown): v is ReflectionWordChoice {
  return v === "rarely" || v === "sometimes" || v === "often" || v === "always";
}

function isScale(v: unknown): v is SelfReflectionScale {
  return v === "numbers" || v === "words" || v === "emojis";
}

/** Legacy single-entry shape */
function parseLegacyJournal(raw: unknown): { area: string; scale: SelfReflectionScale } | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.area !== "string" || !isScale(o.scale)) return null;
  return { area: o.area, scale: o.scale };
}

function parseMeasure(raw: unknown): SelfReflectionMeasure | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.area !== "string" || !isScale(o.scale)) return null;
  const numberValue =
    typeof o.numberValue === "number" ? Math.min(10, Math.max(1, Math.round(o.numberValue))) : 6;
  let wordChoice: ReflectionWordChoice | null = null;
  if (o.wordChoice === null) wordChoice = null;
  else if (isWordChoice(o.wordChoice)) wordChoice = o.wordChoice;
  const emojiIndex =
    typeof o.emojiIndex === "number" ? Math.max(0, Math.min(3, Math.round(o.emojiIndex))) : 1;
  return {
    id: o.id,
    area: o.area,
    scale: o.scale,
    numberValue,
    wordChoice,
    emojiIndex,
  };
}

function parseStored(raw: string | null): JournalState {
  const base = defaultJournalState();
  if (!raw) return base;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const ratings = { ...base.ratings, ...(data.ratings as JournalState["ratings"]) };
    const compassion = { ...base.compassion, ...(data.compassion as JournalState["compassion"]) };

    let reflectionArea = base.reflectionArea;
    if (typeof data.reflectionArea === "string") reflectionArea = data.reflectionArea;
    else if (Array.isArray(data.reflectionAreas)) {
      const arr = data.reflectionAreas as unknown[];
      reflectionArea = typeof arr[0] === "string" ? arr[0] : "";
    }

    let reflectionScale = base.reflectionScale;
    if (isScale(data.reflectionScale)) reflectionScale = data.reflectionScale;

    let reflectionNumberValue = base.reflectionNumberValue;
    if (typeof data.reflectionNumberValue === "number") reflectionNumberValue = data.reflectionNumberValue;
    else if (typeof data.reflectionPreviewValue === "number")
      reflectionNumberValue = data.reflectionPreviewValue;

    let reflectionWordChoice = base.reflectionWordChoice;
    if (data.reflectionWordChoice === null) reflectionWordChoice = null;
    else if (isWordChoice(data.reflectionWordChoice)) reflectionWordChoice = data.reflectionWordChoice;

    let reflectionEmojiIndex = base.reflectionEmojiIndex;
    if (typeof data.reflectionEmojiIndex === "number" && data.reflectionEmojiIndex >= 0 && data.reflectionEmojiIndex <= 3) {
      reflectionEmojiIndex = data.reflectionEmojiIndex;
    }

    let reflectionMeasures = base.reflectionMeasures;
    if (Array.isArray(data.reflectionMeasures)) {
      const parsed = data.reflectionMeasures.map(parseMeasure).filter((m): m is SelfReflectionMeasure => m != null);
      reflectionMeasures = parsed;
    } else {
      const legacy = parseLegacyJournal(data.reflectionJournal);
      if (legacy) {
        reflectionMeasures = [
          {
            id: `migrated_${Date.now()}`,
            area: legacy.area,
            scale: legacy.scale,
            numberValue: 6,
            wordChoice: "sometimes",
            emojiIndex: 1,
          },
        ];
      }
    }

    let seekingFeedbackText = base.seekingFeedbackText;
    if (typeof data.seekingFeedbackText === "string") seekingFeedbackText = data.seekingFeedbackText;

    let honestyGivingFeedbackText = base.honestyGivingFeedbackText;
    if (typeof data.honestyGivingFeedbackText === "string")
      honestyGivingFeedbackText = data.honestyGivingFeedbackText;

    return {
      ratings,
      compassion,
      reflectionArea,
      reflectionScale,
      reflectionNumberValue,
      reflectionWordChoice,
      reflectionEmojiIndex,
      reflectionMeasures,
      seekingFeedbackText,
      honestyGivingFeedbackText,
    };
  } catch {
    return base;
  }
}

export function useJournalStorage() {
  const [state, setState] = useState<JournalState>(() => defaultJournalState());

  useEffect(() => {
    setState(parseStored(localStorage.getItem(STORAGE_KEY)));
  }, []);

  const commit = useCallback((next: JournalState) => {
    setState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const setRatings = useCallback(
    (updater: (r: Record<string, string | null>) => Record<string, string | null>) => {
      setState((prev) => {
        const next = { ...prev, ratings: updater(prev.ratings) };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    [],
  );

  const setCompassion = useCallback(
    (updater: (c: Record<string, string>) => Record<string, string>) => {
      setState((prev) => {
        const next = { ...prev, compassion: updater(prev.compassion) };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    [],
  );

  const setReflectionArea = useCallback((next: string) => {
    setState((prev) => {
      const updated = { ...prev, reflectionArea: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setReflectionScale = useCallback((next: JournalState["reflectionScale"]) => {
    setState((prev) => {
      const updated = { ...prev, reflectionScale: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setReflectionNumberValue = useCallback((next: number) => {
    setState((prev) => {
      const updated = { ...prev, reflectionNumberValue: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setReflectionWordChoice = useCallback((next: ReflectionWordChoice | null) => {
    setState((prev) => {
      const updated = { ...prev, reflectionWordChoice: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setReflectionEmojiIndex = useCallback((next: number) => {
    setState((prev) => {
      const clamped = Math.max(0, Math.min(3, next));
      const updated = { ...prev, reflectionEmojiIndex: clamped };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const addReflectionMeasure = useCallback((measure: SelfReflectionMeasure) => {
    setState((prev) => {
      const next = { ...prev, reflectionMeasures: [...prev.reflectionMeasures, measure] };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const removeReflectionMeasure = useCallback((id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        reflectionMeasures: prev.reflectionMeasures.filter((m) => m.id !== id),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const updateReflectionMeasure = useCallback(
    (id: string, patch: Partial<Pick<SelfReflectionMeasure, "numberValue" | "wordChoice" | "emojiIndex">>) => {
      setState((prev) => {
        const next = {
          ...prev,
          reflectionMeasures: prev.reflectionMeasures.map((m) =>
            m.id === id ? { ...m, ...patch } : m,
          ),
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    [],
  );

  const setSeekingFeedbackText = useCallback((next: string) => {
    setState((prev) => {
      const updated = { ...prev, seekingFeedbackText: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setHonestyGivingFeedbackText = useCallback((next: string) => {
    setState((prev) => {
      const updated = { ...prev, honestyGivingFeedbackText: next };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  return {
    state,
    commit,
    setRatings,
    setCompassion,
    setReflectionArea,
    setReflectionScale,
    setReflectionNumberValue,
    setReflectionWordChoice,
    setReflectionEmojiIndex,
    addReflectionMeasure,
    removeReflectionMeasure,
    updateReflectionMeasure,
    setSeekingFeedbackText,
    setHonestyGivingFeedbackText,
  };
}
