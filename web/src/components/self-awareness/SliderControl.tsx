"use client";

import { OPTIONS_1_TO_5, SLIDER_TRACK_WIDTH_PCT } from "@/lib/self-awareness";

type Props = {
  value: string;
  onChange: (next: string) => void;
  ariaLabelledBy?: string;
};

export function SliderControl({ value, onChange, ariaLabelledBy }: Props) {
  const v = OPTIONS_1_TO_5.includes(value as (typeof OPTIONS_1_TO_5)[number])
    ? value
    : "3";

  return (
    <div
      className="w-full pt-[0.35rem] pb-[0.15rem]"
      style={{ width: `${SLIDER_TRACK_WIDTH_PCT}%`, maxWidth: `${SLIDER_TRACK_WIDTH_PCT}%` }}
    >
      <input
        id={`${ariaLabelledBy}-slider`}
        type="range"
        className="bvm-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-bvm-title"
        min={1}
        max={5}
        step={1}
        value={Number(v)}
        aria-labelledby={ariaLabelledBy}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={Number(v)}
        onChange={(e) => onChange(String(e.target.value))}
      />
      <div className="mt-1 flex justify-between px-0.5 text-[0.65rem] font-medium text-slate-600">
        {OPTIONS_1_TO_5.map((n) => (
          <span key={n} className={n === v ? "font-bold text-bvm-title" : ""}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
