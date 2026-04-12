"use client";

import { useState } from "react";
import { useJournalStorage } from "@/hooks/useJournalStorage";
import { JOURNAL_GLASS_BORDER, JOURNAL_GLASS_PANEL_BASE } from "@/lib/self-awareness";

type Props = { headingId: string };

const QUESTIONS = [
  {
    part: 1,
    title: "What's something you've worked hard to get good at?",
  },
  {
    part: 2,
    title: "What's a skill or habit that comes easily to you?",
  },
  {
    part: 3,
    title: "What do your friends, family, or teachers often notice you're good at?",
  },
  {
    part: 4,
    title: "What's something you're proud of, even if it's something small?",
  },
  {
    part: 5,
    title: "When you make a mistake, what do you usually say to yourself?",
  },
  {
    part: 6,
    title: "Would you say that to a friend? What could you say instead?",
  },
  {
    part: 7,
    title: "How can you practice being kinder to yourself in moments of stress?",
  },
];

const PROMPT_CHIPS = [
  "Math/Science",
  "Playing sports",
  "Drawing / Art",
  "Leadership",
];

const EMOJI_ROWS = ["😊", "🙂", "😌", "✨", "🔥"];

function SpeechBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 5.5h14a2 2 0 012 2v7a2 2 0 01-2 2h-5.2L9 20v-3.5H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
    </svg>
  );
}

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
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(""));
  const [saved, setSaved] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
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
    <div className="mx-auto max-w-[80rem] px-5 pb-16 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
      <section
        className={`relative ${JOURNAL_GLASS_PANEL_BASE} ${JOURNAL_GLASS_BORDER.seekingFeedback} overflow-hidden`}
        aria-labelledby={headingId}
      >
        <div className="rounded-[2rem] bg-slate-50/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                <SpeechBubbleIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-slate-900">
                  Seeking Feedback
                </h2>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-7 text-slate-600">
                  Use this flow to capture one answer per prompt. Move through the cards horizontally and save to your profile when done.
                </p>
              </div>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              {isLastSlide ? "Last slide" : `Question ${currentIndex + 1} of ${QUESTIONS.length}`}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-50 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <div className="px-6 py-5 sm:px-8 sm:py-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
                    Part {currentQuestion.part}: Discover Me
                  </p>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                    Answer the prompt in the card below.
                  </p>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                  {currentIndex + 1}/{QUESTIONS.length}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[42rem] overflow-hidden rounded-[2rem] bg-slate-50/70 p-4">
                <div
                  className="flex w-full transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {QUESTIONS.map((question, index) => (
                    <div
                      key={question.part}
                      className={`flex-shrink-0 w-full rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_15px_40px_rgba(15,23,42,0.08)] ${
                        index === currentIndex ? "ring-2 ring-bvm-title/50" : "opacity-80"
                      }`}
                    >
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
                          Part {question.part}: Discover Me
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {index + 1}/{QUESTIONS.length}
                        </span>
                      </div>

                      <h3 className="text-[1.35rem] font-semibold leading-tight text-slate-900">
                        {question.title}
                      </h3>

                      <textarea
                        value={answers[index]}
                        onChange={(e) => setAnswer(index, e.target.value)}
                        placeholder="Type your answer here..."
                        className="mt-6 min-h-[14rem] w-full resize-y rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5 text-[0.98rem] leading-7 text-slate-800 placeholder:text-slate-400 focus:border-bvm-title/80 focus:outline-none focus:ring-2 focus:ring-bvm-title/20"
                      />

                      <div className="mt-7 space-y-6">
                        <div>
                          <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
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
                                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.8rem] font-semibold text-slate-700 transition hover:bg-slate-200"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
                            How does this make you feel?
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {EMOJI_ROWS.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => setAnswer(index, `${answers[index]} ${emoji}`)}
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
        </div>
      </section>
    </div>
  );
}
