"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChecklistStepId = "formaIngresso" | "edital" | "provasAntigas" | "locaisProva" | "inscricao";

export type JourneyChecklist = {
  confirmedCourseId: string;
  confirmedCourseName: string;
  confirmedCourseCity?: string;
  steps: Record<ChecklistStepId, boolean>;
};

export const CHECKLIST_STEP_ORDER: { id: ChecklistStepId; label: string }[] = [
  { id: "formaIngresso", label: "Forma de ingresso" },
  { id: "edital", label: "Edital" },
  { id: "provasAntigas", label: "Provas antigas" },
  { id: "locaisProva", label: "Local de prova" },
  { id: "inscricao", label: "Inscrição" },
];

export function createChecklist(courseId: string, courseName: string, courseCity?: string): JourneyChecklist {
  return {
    confirmedCourseId: courseId,
    confirmedCourseName: courseName,
    confirmedCourseCity: courseCity,
    steps: { formaIngresso: false, edital: false, provasAntigas: false, locaisProva: false, inscricao: false },
  };
}

export function isChecklistComplete(checklist: JourneyChecklist) {
  return CHECKLIST_STEP_ORDER.every((step) => checklist.steps[step.id]);
}

export function ChecklistCard({ checklist }: { checklist: JourneyChecklist }) {
  const doneCount = CHECKLIST_STEP_ORDER.filter((step) => checklist.steps[step.id]).length;

  return (
    <div className="mb-6 rounded-2xl border bg-muted/30 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Próximos passos recomendados · {checklist.confirmedCourseName}
        </p>
        <span className="text-xs text-muted-foreground">{doneCount}/{CHECKLIST_STEP_ORDER.length}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {CHECKLIST_STEP_ORDER.map((step) => {
          const done = checklist.steps[step.id];
          return (
            <span
              key={step.id}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                done ? "border-foreground/20 bg-foreground text-background" : "text-muted-foreground"
              )}
            >
              {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
              {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
