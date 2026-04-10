import { SectionPlaceholder } from "@/components/journal/SectionPlaceholder";
import { JOURNAL_GLASS_BORDER } from "@/lib/self-awareness";

type Props = { headingId: string };

/** MINDFULNESS — placeholder until content is built. */
export function MindfulnessSection({ headingId }: Props) {
  return (
    <SectionPlaceholder
      title="MINDFULNESS"
      headingId={headingId}
      rimClassName={JOURNAL_GLASS_BORDER.mindfulness}
    />
  );
}
