"use client";

import { SEGMENTED_SOLID_BG } from "@/lib/self-awareness";

type Props = {
  value: string | null;
  onChange: (next: string) => void;
  ariaLabelledBy?: string;
};

export function SegmentedControl({ value, onChange, ariaLabelledBy }: Props) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
      className="flex w-full min-w-0 flex-1 overflow-hidden rounded-md border border-[rgba(30,60,90,0.14)]"
    >
      {SEGMENTED_SOLID_BG.map((bg, i) => {
        const n = String(i + 1);
        const selected = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(n)}
            className={[
              "min-h-[2.75rem] flex-1 border-r border-[rgba(30,60,90,0.14)] px-1 py-[0.45rem] text-[0.95rem] font-semibold text-[#1a1a1a] transition-[filter] last:border-r-0 hover:brightness-[1.03] active:brightness-[0.97]",
              selected
                ? "z-[1] outline outline-2 outline-offset-[-2px] outline-[rgba(0,0,0,0.32)]"
                : "",
            ].join(" ")}
            style={{
              backgroundColor: bg,
              backgroundImage: "none",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
