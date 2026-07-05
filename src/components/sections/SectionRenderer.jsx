import { CourseCards } from "@/components/sections/CourseCards";
import { CourseDetail } from "@/components/sections/CourseDetail";
import { CourseCompare } from "@/components/sections/CourseCompare";
import { AdmissionOptions } from "@/components/sections/AdmissionOptions";
import { Timeline } from "@/components/sections/Timeline";
import { Events } from "@/components/sections/Events";
import { InfoCards } from "@/components/sections/InfoCards";
import { Scholarships } from "@/components/sections/Scholarships";
import { LeadForm } from "@/components/sections/LeadForm";
import { NextStep } from "@/components/sections/NextStep";
import { Warning } from "@/components/sections/Warning";

/**
 * Mapa único de tipo de seção → componente. Este é o "catálogo" da
 * biblioteca: para adicionar um novo tipo de bloco (ex: "faq"), crie o
 * componente em sections/ e registre aqui — nada mais precisa mudar.
 * O `type` de cada entrada tem que bater com o enum `type` do
 * RESPONSE_SCHEMA em api/generate-ui.js.
 */
const SECTION_COMPONENTS = {
  course_cards: CourseCards,
  course_detail: CourseDetail,
  course_compare: CourseCompare,
  admission_options: AdmissionOptions,
  timeline: Timeline,
  events: Events,
  course_differentials: InfoCards,
  school_recognitions: InfoCards,
  admission_details: InfoCards,
  prep_materials: InfoCards,
  scholarships: Scholarships,
  lead_form: LeadForm,
  next_step: NextStep,
  warning: Warning
};

/**
 * SectionRenderer — recebe uma seção vinda da API e desenha o componente
 * correspondente. Tipos desconhecidos são ignorados silenciosamente (nunca
 * quebram a página).
 */
export function SectionRenderer({ section, onAskFollowUp }) {
  const Component = SECTION_COMPONENTS[section?.type];
  if (!Component) return null;
  return <Component section={section} onAskFollowUp={onAskFollowUp} />;
}
