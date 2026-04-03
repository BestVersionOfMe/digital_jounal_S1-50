"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TOP_SECTIONS: { href: string; label: string; disabled?: boolean }[] = [
  { href: "/", label: "Self-Awareness" },
  { href: "/self-management", label: "Self-Management", disabled: true },
  { href: "/social-awareness", label: "Social Awareness", disabled: true },
  { href: "/leadership", label: "Leadership", disabled: true },
];

export function SiteTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-3.5 lg:px-12">
        <Link
          href="/"
          className="shrink-0 font-display text-[0.95rem] font-semibold tracking-[0.06em] text-bvm-title sm:text-base"
        >
          BEST VERSION OF ME
        </Link>
        <nav
          className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:gap-x-6 lg:gap-x-10"
          aria-label="Main journal areas"
        >
          {TOP_SECTIONS.map(({ href, label, disabled }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            if (disabled) {
              return (
                <span
                  key={href}
                  className="cursor-default whitespace-nowrap text-[0.75rem] font-medium text-slate-400 sm:text-sm"
                  aria-disabled="true"
                >
                  {label}
                </span>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={[
                  "whitespace-nowrap text-[0.75rem] font-medium transition-colors sm:text-sm",
                  active
                    ? "text-bvm-title underline decoration-bvm-title/40 underline-offset-4"
                    : "text-slate-600 hover:text-bvm-title",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
