import { SectionPlaceholder } from "@/components/journal/SectionPlaceholder";
import { JOURNAL_GLASS_BORDER } from "@/lib/self-awareness";

type Props = { headingId: string };

/** EMOTIONAL AWARENESS — placeholder until content is built. */
export function EmotionalAwarenessSection({ headingId }: Props) {
  return (
    <SectionPlaceholder
      title="EMOTIONAL AWARENESS"
      headingId={headingId}
      rimClassName={JOURNAL_GLASS_BORDER.emotionalAwareness}
    />
  );
}
