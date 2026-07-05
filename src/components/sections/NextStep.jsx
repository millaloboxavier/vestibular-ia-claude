import { Button } from "@/components/ui/button";

/**
 * NextStep — chips de continuidade (section.type === "next_step").
 * É o componente que resolve a "continuidade da jornada" do conceito do
 * projeto: a pessoa nunca fica sem um próximo passo sugerido.
 */
export function NextStep({ section, onAskFollowUp }) {
  const items = (section.items || section.actions || []).filter((item) => item.label || item.text);
  if (!items.length) return null;

  return (
    <section className="rounded-2xl border border-dashed border-border p-5">
      <h3 className="text-base font-semibold">{section.title || "Quer seguir por onde agora?"}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{section.intro || "Escolha um próximo passo."}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Button
            key={index}
            variant={item.tone === "primary" ? "default" : "outline"}
            onClick={() => onAskFollowUp(item.prompt || item.text || item.label)}
          >
            {item.label || item.text}
          </Button>
        ))}
      </div>
    </section>
  );
}
