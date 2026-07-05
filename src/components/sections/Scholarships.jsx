import { Card, CardHeader, CardTitle, CardMeta, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Scholarships — cards de bolsas (section.type === "scholarships").
 */
export function Scholarships({ section }) {
  const items = section.items || [];
  if (!items.length) return null;

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Card key={item.id || index}>
            <CardHeader>
              <CardTitle>{item.name || item.title || "Bolsa"}</CardTitle>
              {item.type ? <CardMeta>{item.type}</CardMeta> : null}
            </CardHeader>
            <CardContent>{item.shortDescription || item.description || ""}</CardContent>
            {(item.cities || []).length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.cities.slice(0, 3).map((city) => (
                  <Badge key={city}>{city}</Badge>
                ))}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}
