"use client";

import { useState } from "react";
import { useJournalStorage } from "@/hooks/useJournalStorage";

type Props = { headingId: string };

const QUESTIONS = [
  { part: 1, title: "What’s one thing I did really well write below?" },
  { part: 2, title: "What’s one thing I could improve next time write below?" },
  { part: 3, title: "If you were in my shoes, what would you have done differently?" },
  { part: 4, title: "“ Do you have any advice for me on how to improve?" },
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

export function SeekingFeedbackSection({ headingId }: Props) {
  const { setSeekingFeedbackText, setSeekingFeedbackSubmitted } = useJournalStorage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => Array(QUESTIONS.length).fill(""));
  const [saved, setSaved] = useState(false);

  const currentAnswer = answers[currentIndex];
  const canContinue = currentAnswer.trim().length > 0;
  const isLastSlide = currentIndex === QUESTIONS.length - 1;

  const setAnswer = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const goNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetSlider = () => {
    setCurrentIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(""));
    setSaved(false);
  };

  const saveToProfile = () => {
    setSaved(true);
    setSeekingFeedbackSubmitted(true);
    setSeekingFeedbackText(answers.filter(Boolean).join("\n\n"));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("seeking_feedback_slide_answers", JSON.stringify(answers));
    }
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
            <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.78rem] text-slate-600 sm:flex">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Est. 2 minutes
            </div>

            <div className="flex w-full transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {QUESTIONS.map((question, index) => (
                <div
                  key={question.part}
                  className="flex-shrink-0 w-full rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-4 text-slate-500">
                    <div className="flex items-center gap-3 text-[0.95rem]">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                        {question.part}
                      </span>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.22em] text-slate-500">
                      {question.part} of {QUESTIONS.length}
                    </span>
                  </div>

                  <h3 className="text-[1.35rem] font-semibold leading-tight text-slate-950">
                    {question.title}
                  </h3>

                  <textarea
                    value={answers[index]}
                    onChange={(e) => setAnswer(index, e.target.value)}
                    placeholder={`Share your thoughts on: ${question.title}`}
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
                            onClick={() => {
                              const current = answers[index];
                              const nextValue = current ? `${current}, ${chip}` : chip;
                              setAnswer(index, nextValue);
                            }}
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
                            onClick={() => {
                              const current = answers[index];
                              const nextValue = current ? `${current} ${emoji}` : emoji;
                              setAnswer(index, nextValue);
                            }}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[1.25rem] transition hover:bg-slate-100"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-slate-500">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentIndex === 0}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.9rem] font-semibold transition ${
                    currentIndex === 0
                      ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-300"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <ChevronIcon className="h-4 w-4 rotate-180" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={resetSlider}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[0.9rem] font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>

              <button
                type="button"
                onClick={isLastSlide ? saveToProfile : goNext}
                disabled={!canContinue}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.95rem] font-semibold transition ${
                  !canContinue
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : isLastSlide
                    ? "bg-bvm-title text-white hover:bg-bvm-title/90"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isLastSlide ? (saved ? "Saved" : "Save to my profile") : "Next"}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-slate-500">
              <div className="flex items-center gap-2">
                {QUESTIONS.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === currentIndex ? "bg-bvm-title" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              {saved ? <p className="text-sm font-medium text-emerald-700">Saved to your profile</p> : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
