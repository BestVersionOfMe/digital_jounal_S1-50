"use client";

import { OPTIONS_1_TO_5, PILL_BUTTON_GAP_REM } from "@/lib/self-awareness";

type Props = {
  value: string | null;
  onChange: (next: string) => void;
  ariaLabelledBy?: string;
};

export function PillsControl({ value, onChange, ariaLabelledBy }: Props) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
      className="flex w-full min-w-0 flex-wrap justify-stretch gap-y-2"
      style={{ gap: `${PILL_BUTTON_GAP_REM}rem` }}
    >
      {OPTIONS_1_TO_5.map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(n)}
            className={[
              "min-h-[2.75rem] min-w-[2.5rem] flex-1 rounded-full border px-2 py-[0.45rem] text-[0.95rem] font-semibold transition-colors",
              selected
                ? "border-bvm-title bg-bvm-title/10 text-[#1a1a1a] ring-2 ring-bvm-title/35"
                : "border-slate-300/90 bg-white/70 text-[#1a1a1a] hover:bg-white",
            ].join(" ")}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
