import { Card, CardHeader, CardTitle, CardMeta, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * InfoCards — grade genérica de cards só-leitura, sem CTA.
 * Reaproveitado por: course_differentials, school_recognitions,
 * admission_details e prep_materials — tipos que só apresentam informação,
 * sem decisão de inscrição envolvida.
 */
export function InfoCards({ section }) {
  const items = section.items || [];
  if (!items.length) return null;

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Card key={item.id || index}>
            <CardHeader>
              <CardTitle>{item.title || item.label || item.name || "Informação"}</CardTitle>
              {item.type ? <CardMeta>{item.type}</CardMeta> : null}
            </CardHeader>
            <CardContent>{item.shortDescription || item.description || item.text || ""}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
