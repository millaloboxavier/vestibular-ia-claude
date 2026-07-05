import { Card, CardHeader, CardTitle, CardMeta, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/CtaButton";

function cleanTag(value = "") {
  const text = String(value || "").trim();
  if (!text || /consultar página|página do curso|site oficial/i.test(text)) return "";
  return text.replace(/\s*indicado\s+na\s+página(\s+de\s+processo\s+seletivo)?/i, "").trim();
}

/**
 * CourseCard — card de um curso dentro de uma grade (course_cards).
 * @param {object} course - item vindo da seção course_cards
 * @param {(prompt: string) => void} onAskFollowUp
 */
export function CourseCard({ course, onAskFollowUp }) {
  const title = course.displayName || course.name || "Curso";
  const tags = [course.duration, course.period, course.entry, course.candidatePerSeat ? `${String(course.candidatePerSeat).replace(/\.$/, "")} candidato/vaga` : ""]
    .map(cleanTag)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardMeta>{[course.school, course.city && `${course.city}${course.state ? ` / ${course.state}` : ""}`].filter(Boolean).join(" · ")}</CardMeta>
      </CardHeader>
      <CardContent>{course.summary || "Veja informações sobre o curso, cidade, formas de ingresso e próximos caminhos."}</CardContent>
      {tags.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
      <CardFooter>
        <Button variant="ghost" onClick={() => onAskFollowUp(`quero detalhes do curso de ${title} em ${course.city || ""}`)}>
          Ver detalhes
        </Button>
        <CtaButton cta={course.cta} onAskFollowUp={onAskFollowUp} fallbackLabel={title} />
      </CardFooter>
    </Card>
  );
}
