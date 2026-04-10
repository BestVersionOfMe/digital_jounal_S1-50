import { SelfAwarenessIntroAndSkills } from "@/components/self-awareness/SelfAwarenessIntroAndSkills";
import  SelfCompassion  from "@/components/self-compassion/SelfCompassion";
import { EmotionalAwarenessSection } from "@/components/self-awareness/EmotionalAwarenessSection";
import { HonestySection } from "@/components/self-awareness/HonestySection";
import { JournalPageFooter } from "@/components/self-awareness/JournalPageFooter";
import { MindfulnessSection } from "@/components/self-awareness/MindfulnessSection";
import { SelfReflectionSection } from "@/components/self-awareness/SelfReflectionSection";
import { SeekingFeedbackSection } from "@/components/self-awareness/SeekingFeedbackSection";
import { JournalNav } from "@/components/journal/JournalNav";
import { JOURNAL_NAV_ITEMS } from "@/lib/journal-nav";

/** Offset for in-page anchors under sticky site top bar */
const sectionScrollClass = "scroll-mt-20 sm:scroll-mt-24";

export default function Home() {
  return (
    <main>
      <JournalNav />
      <SelfAwarenessIntroAndSkills />

      {JOURNAL_NAV_ITEMS.map(({ id }) => {
        const headingId = `${id}-heading`;
        const title =
          id === "self-compassion"
            ? "SELF COMPASSION"
            : id === "seeking-feedback"
              ? "SEEKING FEEDBACK"
              : id === "honesty"
                ? "HONESTY"
                : id === "self-reflection"
                  ? "SELF REFLECTION"
                  : "";
        return (
          <section key={id} id={id} className={sectionScrollClass} aria-labelledby={headingId}>
            {title ? (
              <h2
                id={headingId}
                className="font-display text-center text-[1.25rem] font-semibold tracking-[0.04em] text-bvm-title sm:text-[1.375rem]"
              >
                {title}
              </h2>
            ) : null}
            {id === "self-compassion" && <SelfCompassion />}
            {id === "seeking-feedback" && <SeekingFeedbackSection headingId={headingId} />}
            {id === "honesty" && <HonestySection headingId={headingId} />}
            {id === "self-reflection" && <SelfReflectionSection headingId={headingId} />}
            {id === "mindfulness" && <MindfulnessSection headingId={headingId} />}
            {id === "emotional-awareness" && <EmotionalAwarenessSection headingId={headingId} />}
          </section>
        );
      })}

      <JournalPageFooter />
    </main>
  );
}
