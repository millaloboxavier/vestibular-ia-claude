import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Events — lista de eventos da graduação (section.type === "events").
 */
export function Events({ section, onAskFollowUp }) {
  const items = section.items || [];
  if (!items.length) return null;

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="flex flex-col gap-3">
        {items.map((event) => {
          const name = event.name || event.title || "Evento";
          return (
            <div key={event.id || name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="w-28 shrink-0 text-center">
                <div className="text-sm font-semibold">{event.displayDate || event.date || "Data"}</div>
                <div className="text-xs text-muted-foreground">{event.displayTime || ""}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{name}</div>
                {event.city ? <div className="text-xs text-muted-foreground">{[event.city, event.state].filter(Boolean).join(" / ")}</div> : null}
                <p className="text-sm text-muted-foreground mt-1">{event.description || ""}</p>
              </div>
              <Button variant="outline" onClick={() => onAskFollowUp(`quero participar do evento ${name}`)}>
                Tenho interesse
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
