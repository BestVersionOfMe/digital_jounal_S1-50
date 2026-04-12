"use client";

import { useJournalStorage } from "@/hooks/useJournalStorage";
import { JOURNAL_GLASS_BORDER, JOURNAL_GLASS_PANEL_BASE } from "@/lib/self-awareness";

type Props = { headingId: string };

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

  return (
    <div className="mx-auto max-w-[40rem] px-5 pb-16 pt-8 text-center sm:max-w-[42rem] sm:px-8 sm:pb-20 sm:pt-10">
      <p className="mb-6 text-[0.95rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
        HONESTY
      </p>

      <section
        className={`relative overflow-hidden rounded-[2.5rem] bg-[#fff1f7] px-5 py-8 shadow-[0_25px_80px_rgba(219,39,119,0.16)] sm:px-8`}
        aria-labelledby={headingId}
      >
        <div className="mb-7 rounded-[2rem] bg-white px-6 py-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)] sm:px-7 sm:py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-pink-100 text-pink-700 shadow-sm">
              <FeedbackIcon className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-pink-500">
                Seeking Feedback
              </p>
              <h2 className="mt-2 text-[1.4rem] font-semibold leading-tight tracking-[-0.03em] text-slate-950">
                Empower others through the 'Glow & Grow' method.
              </h2>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-slate-600">
                Kindness is your most effective tool. Use this structure to give supportive, clear feedback.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-sm">
                <GlowIcon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  The Glow
                </p>
                <p className="mt-2 text-[0.95rem] leading-7 text-slate-900">
                  Start with something positive the person did really well.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                <GrowIcon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  The Grow
                </p>
                <p className="mt-2 text-[0.95rem] leading-7 text-slate-900">
                  Suggest one constructive area for development or future focus.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-left text-[0.95rem] font-semibold text-slate-900">
              Your personal reflection
            </p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              DRAFT
            </span>
          </div>

          <textarea
            id="honesty-glow-grow"
            name="honestyGivingFeedback"
            rows={5}
            value={text}
            onChange={(e) => setHonestyGivingFeedbackText(e.target.value)}
            placeholder="Capture your thoughts..."
            className="mt-4 min-h-[13rem] w-full resize-none rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 text-[0.98rem] leading-7 text-slate-900 placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
          />

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.78rem] font-semibold text-slate-700">
              + Feeling clear
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.78rem] font-semibold text-slate-700">
              + Need more info
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-[0.78rem] font-semibold text-slate-700">
              + Helpful insight
            </span>
          </div>

          <button
            type="button"
            disabled={!trimmed}
            onClick={() => setHonestyGivingFeedbackSubmitted(true)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(219,39,119,0.25)] transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save reflection
          </button>
        </div>
      </section>
    </div>
  );
}
