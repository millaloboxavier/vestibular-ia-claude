import { SectionHeader } from "@/components/SectionHeader";

/**
 * Timeline — lista vertical de prazos/marcos (section.type === "timeline").
 */
export function Timeline({ section }) {
  const items = section.items || [];
  if (!items.length) return null;

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4">
            <div className="w-32 shrink-0 text-sm font-semibold">{item.value || item.period || "Em breve"}</div>
            <div>
              <div className="text-sm font-semibold">{item.label || item.name || "Data"}</div>
              {item.description ? <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
