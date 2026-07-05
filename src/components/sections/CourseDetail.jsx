import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";

/**
 * CourseDetail — grade de campos de um único curso (section.type === "course_detail").
 * section.course carrega o curso original (com .cta) para o botão final.
 */
export function CourseDetail({ section, onAskFollowUp }) {
  const items = section.items || [];
  if (!items.length) return null;
  const course = section.course;
  const courseName = course?.displayName || course?.name || "esse curso";

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="text-xs text-muted-foreground">{item.title || item.label || "Informação"}</div>
            <div className="text-sm font-semibold mt-0.5">{item.value || item.shortDescription || item.description || ""}</div>
          </div>
        ))}
      </div>
      {course?.cta ? (
        <div className="mt-4 flex gap-2">
          <CtaButton cta={course.cta} onAskFollowUp={onAskFollowUp} fallbackLabel={courseName} />
        </div>
      ) : null}
    </section>
  );
}
