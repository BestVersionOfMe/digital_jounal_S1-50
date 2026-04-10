"use client";

import { useJournalStorage } from "@/hooks/useJournalStorage";
import { JOURNAL_GLASS_BORDER, JOURNAL_GLASS_PANEL_BASE } from "@/lib/self-awareness";

type Props = { headingId: string };

const SUGGESTED_QUESTIONS = [
  "What's one thing I did really well?",
  "What's one thing I could improve next time?",
  "If you were in my shoes, what would you have done differently?",
];

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

export function SeekingFeedbackSection({ headingId }: Props) {
  const { state, setSeekingFeedbackText } = useJournalStorage();

  return (
    <div className="mx-auto max-w-[40rem] px-5 pb-16 pt-8 sm:max-w-[42rem] sm:px-8 sm:pb-20 sm:pt-10">
      <section className={`${JOURNAL_GLASS_PANEL_BASE} ${JOURNAL_GLASS_BORDER.seekingFeedback}`}>
        <p className="mt-3 text-[0.9375rem] leading-[1.75] text-slate-600 sm:text-[1rem]">
          When you&apos;re asking someone for feedback, you can help them by being specific. Try questions like:
        </p>

        <ul className="mt-5 space-y-3.5">
          {SUGGESTED_QUESTIONS.map((q) => (
            <li key={q} className="flex gap-3">
              <SpeechBubbleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#7b9bd4]" />
              <span className="text-[0.9375rem] italic leading-relaxed text-slate-700 sm:text-[1rem]">{q}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <label htmlFor="seeking-feedback-who" className="block text-[0.95rem] font-bold text-slate-800">
            Who could you ask for feedback this week?
          </label>
          <textarea
            id="seeking-feedback-who"
            name="seekingFeedback"
            rows={4}
            value={state.seekingFeedbackText}
            onChange={(e) => setSeekingFeedbackText(e.target.value)}
            placeholder="Enter name and specific topic..."
            className="mt-3 w-full resize-y rounded-xl border border-slate-200/80 bg-[#e8e4f2]/35 px-4 py-3 text-[0.9375rem] leading-relaxed text-slate-800 placeholder:italic placeholder:text-slate-400 focus:border-[#7b8fd4]/80 focus:outline-none focus:ring-2 focus:ring-[#7b8fd4]/25"
          />
        </div>
      </section>
    </div>
  );
}
