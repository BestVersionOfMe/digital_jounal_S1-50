"use client";

import { useState } from "react";
import { useJournalStorage } from "@/hooks/useJournalStorage";

type Props = { headingId: string };

const QUESTIONS = [
  { part: 1, title: "What’s one thing I did really well write below?" },
  { part: 2, title: "What’s one thing I could improve next time write below?" },
  { part: 3, title: "If you were in my shoes, what would you have done differently?" },
  { part: 4, title: "Do you have any advice for me on how to improve?" },
  { part: 5, title: "Who could you ask for feedback this week?" },
];

const PROMPT_CHIPS = [
  "Being a good listener",
  "Positive attitude",
  "Creativity",
  "Honest",
  "Never giving up",
  "Sense of humor",
];

const EMOJI_ROWS = ["😊", "🙂", "😌", "✨", "🔥"];

function ChevronIcon({ className }: { className?: string }) {
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
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export function SeekingFeedbackSection({ headingId }: Props) {
  const { setSeekingFeedbackText, setSeekingFeedbackSubmitted } = useJournalStorage();
  const [weekAnswers, setWeekAnswers] = useState<string[]>(() => Array(10).fill(""));
  const [savedWeeks, setSavedWeeks] = useState<boolean[]>(() => Array(10).fill(false));
  const [currentWeek, setCurrentWeek] = useState(0);

  const answer = weekAnswers[currentWeek];
  const canContinue = answer.trim().length > 0;
  const weekNumber = currentWeek + 1;
  const weekDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());

  const updateAnswer = (value: string) => {
    setWeekAnswers((prev) => {
      const next = [...prev];
      next[currentWeek] = value;
      return next;
    });
  };

  const saveThisWeek = () => {
    setSavedWeeks((prev) => {
      const next = [...prev];
      next[currentWeek] = true;
      return next;
    });
    setSeekingFeedbackSubmitted(true);
    setSeekingFeedbackText(answer.trim());
    if (typeof window !== "undefined") {
      window.localStorage.setItem("seeking_feedback_answers", JSON.stringify(weekAnswers));
    }
  };

  const goNextWeek = () => {
    if (currentWeek < 9) {
      setCurrentWeek((prev) => prev + 1);
    }
  };

  const clearWeek = () => {
    setWeekAnswers((prev) => {
      const next = [...prev];
      next[currentWeek] = "";
      return next;
    });
    setSavedWeeks((prev) => {
      const next = [...prev];
      next[currentWeek] = false;
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-[78rem] px-5 pb-16 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
      <section className="relative" aria-labelledby={headingId}>
        <div className="mx-auto max-w-[68rem] rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
          <div className="mb-8 rounded-[1.75rem] bg-white px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-slate-500">
                Growth Mindset
              </span>
              <h2 className="text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-[2.5rem]">
                Seeking <span className="text-sky-600">Feedback</span>
              </h2>
              <p className="max-w-3xl text-[1rem] leading-8 text-slate-600 sm:text-[1.02rem]">
                When you’re asking someone for feedback, you can help them by being specific. Try using the questions below to guide your conversation.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[62rem] overflow-hidden rounded-[2rem]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-6">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-6 shadow-sm text-center">
                  <h3 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-slate-950 m-0">
                    Weekly feedback check-in
                  </h3>
                </div>
              </div>

              <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-600 transition-all duration-300"
                  style={{ width: `${weekNumber * 10}%` }}
                />
              </div>

              <div className="mb-8 space-y-3">
                {QUESTIONS.slice(0, 4).map((question) => (
                  <div key={question.part} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 shadow-sm">
                    <p className="text-sm font-medium text-slate-900">{question.title}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-slate-500">
                <div className="flex flex-col gap-2">
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Week {weekNumber}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{weekDate}</span>
                </div>
                <button
                  type="button"
                  onClick={clearWeek}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                  aria-label="Delete week"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-[1.35rem] font-semibold leading-tight text-slate-950">
                {QUESTIONS[4].title}
              </h3>
                <textarea
                  value={answer}
                  onChange={(e) => updateAnswer(e.target.value)}
                  placeholder="Enter name and specific topic..."
                  className="mt-6 min-h-[14rem] w-full resize-none rounded-[1.75rem] border border-slate-200 bg-slate-50 px-6 py-5 text-[1rem] leading-7 text-slate-800 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />

                <div className="mt-7 space-y-5">
                  <div>
                    <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Need some inspiration?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PROMPT_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => updateAnswer(answer ? `${answer}, ${chip}` : chip)}
                          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.85rem] font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      How does this make you feel?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {EMOJI_ROWS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => updateAnswer(answer ? `${answer} ${emoji}` : emoji)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[1.25rem] transition hover:bg-slate-100"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={saveThisWeek}
                    disabled={!canContinue}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.95rem] font-semibold transition ${
                      !canContinue
                        ? "cursor-not-allowed bg-slate-200 text-slate-400"
                        : "bg-bvm-title text-white hover:bg-bvm-title/90"
                    }`}
                  >
                    Save this week
                  </button>
                  <button
                    type="button"
                    onClick={goNextWeek}
                    disabled={currentWeek === 9}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.95rem] font-semibold transition ${
                      currentWeek === 9
                        ? "cursor-not-allowed bg-slate-200 text-slate-400"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Next week
                  </button>
                </div>

                {savedWeeks[currentWeek] ? (
                  <p className="mt-4 text-sm font-medium text-emerald-700">Saved this week</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
