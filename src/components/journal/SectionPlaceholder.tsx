type Props = { title: string; headingId: string };

/** Section title + dashed empty panel until real content ships. */
export function SectionPlaceholder({ title, headingId }: Props) {
  return (
    <div className="mx-auto max-w-[40rem] px-5 pb-20 pt-8 sm:max-w-[42rem] sm:px-8 sm:pb-28 sm:pt-10">
      <section aria-labelledby={headingId}>
        <h2
          id={headingId}
          className="font-display text-center text-[1.25rem] font-semibold tracking-[0.04em] text-bvm-title sm:text-[1.375rem]"
        >
          {title}
        </h2>
        <div
          className="mt-8 min-h-[10rem] rounded-2xl border border-dashed border-slate-300/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
          aria-hidden
        />
      </section>
    </div>
  );
}
