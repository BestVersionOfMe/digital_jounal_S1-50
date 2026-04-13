"use client";

import { useState } from "react";
import { useJournalStorage } from "@/hooks/useJournalStorage";
import { JOURNAL_GLASS_BORDER, JOURNAL_GLASS_PANEL_BASE } from "@/lib/self-awareness";

type Props = { headingId: string };

const CATEGORY_OPTIONS = ["Glow", "Grow"];
const CONFIDENCE_OPTIONS = [
  { label: "Very unhappy", emoji: "😞" },
  { label: "Unhappy", emoji: "😕" },
  { label: "Neutral", emoji: "😐" },
  { label: "Happy", emoji: "🙂" },
  { label: "Very happy", emoji: "😄" },
];

function FeedbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5c-4.142 0-7.5 3.358-7.5 7.5 0 3.75 2.75 6.85 6.336 7.358a1.737 1.737 0 01.238.06l2.837 1.01a.75.75 0 00.96-.87l-.406-2.035a1.75 1.75 0 01.518-1.474c3.017-2.77 3.735-7.01 1.698-10.46A7.424 7.424 0 0012 3.5z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function GlowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5.5l1.545 3.13 3.454.503-2.5 2.436.59 3.438L12 13.86l-3.09 1.627.59-3.438-2.5-2.436 3.454-.503L12 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function GrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21V11m0 0C9.238 9.5 7 7.119 7 4.5 7 3.12 8.12 2 9.5 2S12 3.12 12 4.5 10.88 7 9.5 7c1.38 0 2.5 1.12 2.5 2.5S10.88 12 9.5 12H12zm0 0c2.762-1.5 5-3.881 5-6.5 0-1.38-1.12-2.5-2.5-2.5S12 3.12 12 4.5 13.12 7 14.5 7c-1.38 0-2.5 1.12-2.5 2.5S12 12 14.5 12H12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

export function HonestySection({ headingId }: Props) {
  const {
    state,
    setHonestyGivingFeedbackText,
    setHonestyGivingFeedbackSubmitted,
  } = useJournalStorage();

  const text = state.honestyGivingFeedbackText;
  const trimmed = text.trim();
  const locked = state.honestyGivingFeedbackSubmitted && trimmed.length > 0;
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [actionText, setActionText] = useState("");
  const [confidence, setConfidence] = useState(CONFIDENCE_OPTIONS[2].label);

  return (
    <div className="mx-auto max-w-[76rem] px-5 pb-16 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
      <div className="mb-10 text-center">
        <h1 className="mx-auto max-w-2xl text-[2.4rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[3rem]">
          Giving <span className="text-sky-600">Feedback</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-[1.02rem]">
          Giving feedback to someone else is just as important as receiving it and it's a skill you can practise! Good feedback helps someone grow and feel supported rather than criticised. One easy way to do this is using the Grow & Glow method.
        </p>
      </div>

      <section
        className="rounded-[3rem] bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-8"
        aria-labelledby={headingId}
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-sky-700 shadow-sm">
                <GlowIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Glow
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-900">
                  Start with something positive the person did really well.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                <GrowIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Grow
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-900">
                  Suggest one thing they could improve or work on next time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === option
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="flex-1 text-left sm:text-right">
            <span className="sr-only">Action suggestion</span>
            <input
              type="text"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="One-line action suggestion..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 sm:max-w-md"
            />
          </label>
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">When appropriate, use this space to plan what feedback you will give.</p>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.75rem] uppercase tracking-[0.2em] text-slate-500">
              Est. 3 minutes
            </span>
          </div>

          <textarea
            id="honesty-glow-grow"
            name="honestyGivingFeedback"
            rows={6}
            value={text}
            onChange={(e) => setHonestyGivingFeedbackText(e.target.value)}
            placeholder="Type your glow notes here..."
            className="mt-5 min-h-[16rem] w-full resize-none rounded-[2rem] border border-slate-200 bg-white px-5 py-5 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            How confident do you feel delivering this feedback?
          </p>
          <div className="grid gap-3 sm:grid-cols-5">
            {CONFIDENCE_OPTIONS.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setConfidence(option.label)}
                className={`flex flex-col items-center justify-center gap-2 rounded-[1.75rem] border px-3 py-4 text-sm transition ${
                  confidence === option.label
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-[1.5rem]">{option.emoji}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setCategory(CATEGORY_OPTIONS[0]);
              setActionText("");
              setHonestyGivingFeedbackText("");
              setConfidence(CONFIDENCE_OPTIONS[2].label);
            }}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
          <div className="flex flex-1 justify-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => setHonestyGivingFeedbackSubmitted(true)}
              disabled={!trimmed}
              className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit to my profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
