import { SectionHeader } from "@/components/SectionHeader";
import { CourseCard } from "@/components/sections/CourseCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CITY_ORDER = ["Rio de Janeiro", "São Paulo", "Brasília"];

/**
 * CourseCards — grade de cursos (section.type === "course_cards").
 * Agrupa por cidade em abas quando o layout pede ou há mais de uma cidade
 * nos itens; caso contrário, mostra uma grade única.
 */
export function CourseCards({ section, onAskFollowUp }) {
  const items = section.items || [];
  if (!items.length) return null;

  const cities = [...new Set(items.map((item) => item.city).filter(Boolean))];
  const shouldUseTabs = section.layout === "tabs_by_city" || cities.length > 1;

  if (!shouldUseTabs) {
    return (
      <section>
        <SectionHeader title={section.title} intro={section.intro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((course) => (
            <CourseCard key={course.id} course={course} onAskFollowUp={onAskFollowUp} />
          ))}
        </div>
      </section>
    );
  }

  const orderedCities = CITY_ORDER.filter((city) => cities.includes(city)).concat(cities.filter((city) => !CITY_ORDER.includes(city)));

  return (
    <section>
      <SectionHeader title={section.title} intro={section.intro} />
      <Tabs defaultValue={orderedCities[0]}>
        <TabsList>
          {orderedCities.map((city) => (
            <TabsTrigger key={city} value={city}>
              {city}
            </TabsTrigger>
          ))}
        </TabsList>
        {orderedCities.map((city) => (
          <TabsContent key={city} value={city}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items
                .filter((course) => course.city === city)
                .map((course) => (
                  <CourseCard key={course.id} course={course} onAskFollowUp={onAskFollowUp} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
