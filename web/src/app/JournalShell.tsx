import type { ReactNode } from "react";
import { SiteFooter } from "@/components/journal/SiteFooter";
import { SiteTopNav } from "@/components/journal/SiteTopNav";

export function JournalShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteTopNav />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
