import { Card, CardHeader, CardTitle, CardMeta, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";

/**
 * AdmissionOptions — cards de formas de ingresso (section.type === "admission_options").
 * Cada item já vem com .cta calculado no backend (admissionCta), então o
 * componente só decide como desenhar, nunca se mostra link real ou aviso.
 */
export function AdmissionOptions({ section, onAskFollowUp }) {
  const items = section.items || [];
  if (!items.length) return null;

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const label = item.label || item.name || "Forma de ingresso";
          return (
            <Card key={item.id || label}>
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardMeta>{[item.cycle, item.status].filter(Boolean).join(" · ")}</CardMeta>
              </CardHeader>
              <CardContent>{item.description || "Modalidade de ingresso para a graduação FGV."}</CardContent>
              {item.period ? (
                <div className="mt-3">
                  <Badge>{item.period}</Badge>
                </div>
              ) : null}
              <CardFooter>
                <Button variant="ghost" onClick={() => onAskFollowUp(`quero saber mais sobre ${label}`)}>
                  Entender esta opção
                </Button>
                <CtaButton cta={item.cta} onAskFollowUp={onAskFollowUp} fallbackLabel={label} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
