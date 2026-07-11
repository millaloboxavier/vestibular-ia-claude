"use client";

import { Check } from "lucide-react";
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
          Próximos passos · {checklist.confirmedCourseName}
        </p>
        <span className="text-xs text-muted-foreground">{doneCount}/{CHECKLIST_STEP_ORDER.length}</span>
      </div>
      <div className="mt-4 flex items-start">
        {CHECKLIST_STEP_ORDER.map((step, index) => {
          const done = checklist.steps[step.id];
          const isLast = index === CHECKLIST_STEP_ORDER.length - 1;
          return (
            <div key={step.id} className="flex flex-1 flex-col items-center text-center last:flex-none">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    done ? "border-foreground bg-foreground text-background" : "border-muted-foreground/30 bg-background"
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : null}
                </div>
                {!isLast ? <div className={cn("h-px flex-1", done ? "bg-foreground/40" : "bg-muted-foreground/20")} /> : null}
              </div>
              <p className={cn("mt-1.5 max-w-[4.5rem] text-[0.65rem] leading-tight", done ? "font-medium text-foreground" : "text-muted-foreground")}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
