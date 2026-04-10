"use client";

import { OPTIONS_1_TO_5 } from "@/lib/self-awareness";

type Props = {
  name: string;
  value: string | null;
  onChange: (next: string) => void;
  ariaLabelledBy?: string;
};

export function RadioRowControl({ name, value, onChange, ariaLabelledBy }: Props) {
  const groupName = `sa-radio-${name}`;

  return (
    <fieldset
      className="m-0 w-full min-w-0 border-0 p-0"
      aria-labelledby={ariaLabelledBy}
    >
      <legend className="sr-only">Rating 1 to 5</legend>
      {/* Match segmented row: five equal columns, full width of rating cell */}
      <div className="grid w-full grid-cols-5 items-center gap-x-1 sm:gap-x-2">
        {OPTIONS_1_TO_5.map((n) => {
          const id = `${groupName}-${n}`;
          const checked = value === n;
          return (
            <label
              key={n}
              htmlFor={id}
              className="flex min-h-[2.75rem] w-full cursor-pointer select-none items-center justify-center gap-1.5 text-[0.95rem] font-semibold text-[#1a1a1a]"
            >
              <input
                id={id}
                type="radio"
                name={groupName}
                value={n}
                checked={checked}
                onChange={() => onChange(n)}
                className="h-4 w-4 shrink-0 accent-bvm-title"
              />
              <span className="tabular-nums">{n}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
