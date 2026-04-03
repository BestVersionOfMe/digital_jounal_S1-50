"use client";

import { useJournalStorage } from "@/hooks/useJournalStorage";

type Props = { headingId: string };

function SunGlowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="2"
          x2="12"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

function SproutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20v-4M5 12c2-4 6-5 7-8 1 3 5 4 7 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14c2-2 5-2 8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HonestySection({ headingId }: Props) {
  const { state, setHonestyGivingFeedbackText } = useJournalStorage();

  return (
    <div className="mx-auto max-w-[40rem] px-5 pb-16 pt-8 sm:max-w-[42rem] sm:px-8 sm:pb-20 sm:pt-10">
      <section
        className="rounded-[1.25rem] border-2 border-pink-300/90 bg-white px-5 py-7 shadow-[0_4px_24px_rgba(219,100,140,0.1)] sm:px-7 sm:py-8"
        aria-labelledby={headingId}
      >
        <h2
          id={headingId}
          className="font-display text-left text-[1.15rem] font-bold uppercase tracking-[0.06em] text-pink-500 sm:text-[1.25rem]"
        >
          GIVING FEEDBACK
        </h2>

        <p className="mt-5 text-[0.9375rem] leading-[1.75] text-slate-600 sm:text-[1rem]">
          Giving feedback is just as important as receiving it. Use the{" "}
          <strong className="font-semibold text-slate-800">Glow &amp; Grow</strong> method:
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex gap-3 rounded-xl bg-slate-100/90 px-4 py-3.5">
            <SunGlowIcon className="mt-0.5 h-7 w-7 shrink-0 text-pink-400" />
            <div>
              <p className="font-display text-[0.8rem] font-bold uppercase tracking-wide text-pink-500">Glow</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-slate-700">
                Start with something positive the person did really well.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl bg-slate-100/90 px-4 py-3.5">
            <SproutIcon className="mt-0.5 h-7 w-7 shrink-0 text-teal-500" />
            <div>
              <p className="font-display text-[0.8rem] font-bold uppercase tracking-wide text-teal-600">Grow</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-slate-700">
                Suggest one thing they could improve or work on next time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="honesty-glow-grow" className="block text-[0.95rem] font-medium text-slate-800">
            Plan a Glow &amp; Grow for someone:
          </label>
          <textarea
            id="honesty-glow-grow"
            name="honestyGivingFeedback"
            rows={5}
            value={state.honestyGivingFeedbackText}
            onChange={(e) => setHonestyGivingFeedbackText(e.target.value)}
            placeholder="What will you say?"
            className="mt-3 w-full resize-y rounded-2xl border border-pink-100 bg-[#f3e8f5]/45 px-4 py-3.5 text-[0.9375rem] leading-relaxed text-slate-800 placeholder:italic placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200/80"
          />
        </div>
      </section>
    </div>
  );
}
