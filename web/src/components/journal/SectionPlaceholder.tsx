type Props = {
  title: string;
  headingId: string;
  /** Colored rim — match other journal glass cards */
  rimClassName: string;
};

/** Section title + frosted placeholder panel until real content ships. */
export function SectionPlaceholder({ title, headingId, rimClassName }: Props) {
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
          className={`mt-8 min-h-[10rem] rounded-[1.25rem] border-2 bg-white/30 shadow-[0_1px_0_rgba(43,106,158,0.06),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[2px] ${rimClassName}`}
          aria-hidden
        />
      </section>
    </div>
  );
}
