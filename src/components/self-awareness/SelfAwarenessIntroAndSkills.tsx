"use client";

import { useCallback } from "react";
import {
  JOURNAL_GLASS_BORDER,
  JOURNAL_GLASS_PANEL_BASE,
  RATING_SKILLS,
  RATING_TABLE_WIDTH_PCT,
} from "@/lib/self-awareness";
import { useJournalStorage } from "@/hooks/useJournalStorage";
import { SegmentedControl } from "./SegmentedControl";

const scaleStripLabelClass =
  "text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[0.6875rem]";

const skillNameClass =
  "text-[0.8125rem] font-medium leading-[1.45] tracking-[0.01em] text-slate-800 sm:text-[0.875rem]";

/** Whole-page title + lead + skills rating (sits above all six anchor sections). */
export function SelfAwarenessIntroAndSkills() {
  const { state, setRatings } = useJournalStorage();

  const setRating = useCallback(
    (sid: string, v: string | null) => {
      setRatings((r) => ({ ...r, [sid]: v }));
    },
    [setRatings],
  );

  return (
    <div className="bvm-page mx-auto max-w-[40rem] px-5 pb-12 pt-10 text-slate-800 sm:max-w-[42rem] sm:px-8 sm:pb-16 sm:pt-12">
      <section
        className={`mt-2 sm:mt-3 ${JOURNAL_GLASS_PANEL_BASE} ${JOURNAL_GLASS_BORDER.skillsRating}`}
        aria-labelledby="sa-rating-block-title"
      >
        <div className="mb-7 border-b border-slate-200/35 pb-6 sm:mb-8 sm:pb-7">
          <h2
            id="sa-rating-block-title"
            className="font-display text-center text-[1.125rem] font-semibold tracking-[0.05em] text-bvm-title sm:text-[1.25rem]"
          >
            <span className="text-balance">SKILLS RATING</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[26rem] text-center text-[0.8125rem] leading-relaxed text-slate-600 sm:text-[0.84375rem]">
            <span className="text-balance">
              Rate each area from 1 (very weak) to 5 (very strong).
            </span>
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-sky-300/40 bg-gradient-to-br from-white/95 via-white/75 to-bvm-tableHeader/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
          <div
            className="grid min-h-[4.5rem] items-stretch"
            style={{
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.5fr)",
            }}
          >
            <div className="flex items-center border-r border-slate-200/35 px-3 py-3.5 sm:px-4">
              <p className={`${scaleStripLabelClass} text-left leading-snug`}>
                SELF-AWARENESS SKILLS RATING
              </p>
            </div>
            <div
              className="min-w-0 bg-white/30"
              style={{ width: `${RATING_TABLE_WIDTH_PCT}%`, maxWidth: "100%" }}
            >
              <table
                className="h-full w-full border-collapse text-center text-[0.7rem] font-medium leading-tight text-slate-700 [&_td]:align-top"
                style={{ tableLayout: "fixed" }}
              >
                <tbody>
                  <tr>
                    {(
                      [
                        { n: "1", lines: ["Very", "Weak"] },
                        { n: "2", lines: ["Weak"] },
                        { n: "3", lines: ["Moderate"] },
                        { n: "4", lines: ["Strong"] },
                        { n: "5", lines: ["Very", "Strong"] },
                      ] as const
                    ).map((col) => (
                      <td key={col.n} className="w-[20%] align-top px-1 py-3 sm:px-1.5">
                        <div className="flex flex-col items-center">
                          <span className="text-[0.75rem] font-semibold tabular-nums leading-none text-slate-900">
                            {col.n}
                          </span>
                          <div className="mt-1.5 flex min-h-[2.625rem] w-full flex-col items-center justify-center gap-0 text-[0.625rem] font-normal leading-[1.25] text-slate-600 sm:min-h-[2.75rem]">
                            {col.lines.map((line) => (
                              <span key={`${col.n}-${line}`} className="block w-full text-center">
                                {line}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-3 divide-y divide-slate-200/35">
          {RATING_SKILLS.map(({ id: sid, label }) => {
            const v = state.ratings[sid];
            const labelId = `sa-skill-${sid}`;
            return (
              <div
                key={sid}
                className="grid items-center gap-x-3 gap-y-2.5 py-[1.125rem] first:pt-3 sm:gap-x-4 sm:py-5"
                style={{
                  gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.5fr)",
                }}
              >
                <div id={labelId} className={`${skillNameClass} pr-1`}>
                  {label}
                </div>
                <div className="min-w-0 w-full pl-0">
                  <SegmentedControl
                    value={v}
                    onChange={(n) => setRating(sid, n)}
                    ariaLabelledBy={labelId}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
