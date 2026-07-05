import { SectionHeader } from "@/components/SectionHeader";
import { CourseCards } from "@/components/sections/CourseCards";

function cleanTag(value = "") {
  const text = String(value || "").trim();
  if (!text || /consultar página|página do curso/i.test(text)) return "";
  return text;
}

const ROWS = [
  ["Cidade", (c) => [c.city, c.state].filter(Boolean).join(" / ")],
  ["Escola", (c) => c.school || ""],
  ["Duração", (c) => cleanTag(c.duration) || "A definir"],
  ["Período", (c) => cleanTag(c.period) || "A definir"],
  ["Formas de ingresso", (c) => (c.admissions || []).join(", ") || "A definir"]
];

/**
 * CourseCompare — tabela lado a lado (section.type === "course_compare").
 * Precisa de pelo menos 2 cursos; com menos, cai para o card simples
 * (CourseCards), igual ao comportamento original.
 */
export function CourseCompare({ section, onAskFollowUp }) {
  const items = section.items || [];
  if (items.length < 2) {
    return <CourseCards section={{ ...section, type: "course_cards" }} onAskFollowUp={onAskFollowUp} />;
  }

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              <th className="p-3 text-left"></th>
              {items.map((course) => (
                <th key={course.id} className="p-3 text-left font-semibold">
                  {course.displayName || course.name || "Curso"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, getter]) => (
              <tr key={label} className="border-t border-border">
                <th className="p-3 text-left font-medium text-muted-foreground">{label}</th>
                {items.map((course) => (
                  <td key={course.id} className="p-3">
                    {getter(course)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
