/**
 * Full-bleed intro band — sits under site header; six section links follow in {@link JournalNav}.
 */
export function SelfAwarenessHeroBanner() {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-white/60 bg-gradient-to-b from-[#e4edf7] via-[#dce8f4] to-[#d6e6f3]"
      aria-labelledby="sa-hero-title"
    >
      {/* Soft light pools — brand-tinted, no neon */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-30%,rgba(43,106,158,0.14),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[min(22rem,50vw)] w-[min(22rem,50vw)] -translate-y-1/2 rounded-full bg-bvm-title/[0.09] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#8eb8db]/25 blur-3xl"
        aria-hidden
      />
      {/* Subtle horizon line */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-[4.25rem]">
        <div className="max-w-2xl">
          <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-bvm-title/65 sm:text-[0.72rem]">
            Best Version of Me
          </p>
          <h1
            id="sa-hero-title"
            className="mt-3 font-display text-[clamp(1.875rem,5vw,2.875rem)] font-semibold leading-[1.06] tracking-[0.06em] text-[#1e5278] sm:tracking-[0.07em]"
          >
            SELF-AWARENESS
          </h1>
          <p className="mt-5 max-w-[min(28rem,100%)] text-[clamp(0.9375rem,1.15vw+0.82rem,1.0625rem)] leading-[1.78] text-slate-600">
            <span className="text-pretty">
              Self-awareness is understanding your thoughts, feelings, and behaviours.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
