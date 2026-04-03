"use client";

type Props = {
  value: string | null;
  onChange: (next: string | null) => void;
  ariaLabelledBy?: string;
};

function parseNum(v: string | null): number | null {
  if (v == null) return null;
  const n = Number.parseInt(v, 10);
  if (!Number.isFinite(n) || n < 1 || n > 5) return null;
  return n;
}

export function StepperControl({ value, onChange, ariaLabelledBy }: Props) {
  const n = parseNum(value);
  const canDecrease = n != null;
  const canIncrease = n == null || n < 5;

  const dec = () => {
    if (n == null) return;
    if (n <= 1) onChange(null);
    else onChange(String(n - 1));
  };

  const inc = () => {
    if (n == null) onChange("1");
    else if (n < 5) onChange(String(n + 1));
  };

  return (
    <div
      className="flex w-full min-w-0 items-stretch overflow-hidden rounded-xl border border-[rgba(30,60,90,0.16)] bg-gradient-to-r from-[#f6fafd] via-white to-[#f6fafd] shadow-[0_1px_3px_rgba(43,106,158,0.08)]"
      role="group"
      aria-labelledby={ariaLabelledBy}
    >
      <button
        type="button"
        onClick={dec}
        disabled={!canDecrease}
        aria-label="Decrease rating"
        className="flex min-h-[2.75rem] min-w-[3rem] shrink-0 items-center justify-center border-r border-[rgba(30,60,90,0.12)] bg-[#eef5fb] text-xl font-semibold text-bvm-title transition-colors hover:bg-[#dbeaf7] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#eef5fb]"
      >
        −
      </button>
      <div className="flex min-h-[2.75rem] min-w-0 flex-1 flex-col items-center justify-center px-3 py-2">
        <output
          className="text-[1.85rem] font-bold leading-none tabular-nums tracking-tight text-bvm-title"
          aria-live="polite"
        >
          {n != null ? n : "—"}
        </output>
        <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-slate-500">
          {n != null ? "out of 5" : "not set"}
        </span>
      </div>
      <button
        type="button"
        onClick={inc}
        disabled={!canIncrease}
        aria-label="Increase rating"
        className="flex min-h-[2.75rem] min-w-[3rem] shrink-0 items-center justify-center border-l border-[rgba(30,60,90,0.12)] bg-[#eef5fb] text-xl font-semibold text-bvm-title transition-colors hover:bg-[#dbeaf7] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#eef5fb]"
      >
        +
      </button>
    </div>
  );
}
