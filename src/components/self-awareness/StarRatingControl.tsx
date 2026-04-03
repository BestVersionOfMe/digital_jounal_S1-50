"use client";

type Props = {
  value: string | null;
  onChange: (next: string) => void;
  ariaLabelledBy?: string;
};

const LEVELS = [1, 2, 3, 4, 5] as const;

export function StarRatingControl({ value, onChange, ariaLabelledBy }: Props) {
  const selected = value != null ? Number.parseInt(value, 10) : 0;
  const active =
    Number.isFinite(selected) && selected >= 1 && selected <= 5 ? selected : 0;

  return (
    <div role="radiogroup" aria-labelledby={ariaLabelledBy} className="w-full min-w-0">
      {/* Same 5-column track as segmented / radio — stars scale with column width */}
      <div className="grid w-full grid-cols-5 items-center justify-items-stretch gap-x-1 sm:gap-x-2">
        {LEVELS.map((n) => {
          const isOn = n <= active;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active === n}
              aria-label={`${n} out of 5`}
              onClick={() => onChange(String(n))}
              className={[
                "flex min-h-[2.75rem] w-full items-center justify-center rounded-md px-0.5 text-[clamp(1.35rem,4.5vw,2rem)] leading-none transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bvm-title",
                isOn ? "text-amber-400 drop-shadow-sm" : "text-slate-300 hover:text-slate-400",
              ].join(" ")}
            >
              ★
            </button>
          );
        })}
      </div>
      <p className="mt-1 w-full text-center text-sm font-semibold tabular-nums text-slate-600">
        {active > 0 ? `${active}/5` : <span className="font-normal text-slate-400">—</span>}
      </p>
    </div>
  );
}
