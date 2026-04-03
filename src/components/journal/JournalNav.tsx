import { JOURNAL_NAV_ITEMS } from "@/lib/journal-nav";

/** Six quick-jump buttons — not sticky; scrolls with the page. */
export function JournalNav() {
  return (
    <div className="w-full border-b border-white/40 bg-gradient-to-b from-bvm-pageTop/90 to-bvm-pageTop/70">
      <nav
        className="mx-auto w-full max-w-[42rem] px-5 pb-4 pt-4 sm:px-8 sm:pb-5 sm:pt-5"
        aria-label="Self-Awareness sections"
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
          {JOURNAL_NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex min-h-[3.25rem] items-center justify-center rounded-lg bg-[#E1E8ED] px-3 py-3 text-center text-[0.7rem] font-bold uppercase leading-tight tracking-wide text-[#164E63] transition-colors hover:bg-[#d2dce4] sm:min-h-[3.5rem] sm:text-[0.72rem]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
