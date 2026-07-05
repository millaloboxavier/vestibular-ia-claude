import { Button } from "@/components/ui/button";

/**
 * CtaButton — único lugar do código que decide entre "Inscreva-se" (link real)
 * e "Quero receber aviso" (reabre a conversa com um pedido de notificação).
 *
 * A decisão em si (cta.type === "apply" | "notify") já vem pronta do backend
 * (função `admissionCta` em api/generate-ui.js), calculada a partir do status
 * real da forma de ingresso — nunca decidida aqui no front nem pela IA a cada
 * resposta. Isso garante que o mesmo curso sempre mostra o mesmo botão,
 * consistente em toda a interface.
 *
 * @param {{type: "apply"|"notify", label: string, url?: string, reason?: string}} cta
 * @param {(prompt: string) => void} onAskFollowUp - dispara uma nova pergunta na conversa
 * @param {string} fallbackLabel - usado no texto do pedido de aviso, se cta.reason faltar
 */
export function CtaButton({ cta, onAskFollowUp, fallbackLabel = "essa forma de ingresso" }) {
  if (!cta) return null;

  if (cta.type === "apply" && cta.url) {
    return (
      <Button asChild variant="default">
        <a href={cta.url} target="_blank" rel="noopener noreferrer">
          {cta.label || "Inscreva-se"}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => onAskFollowUp(`quero receber aviso sobre ${cta.reason || fallbackLabel}`)}
    >
      {cta.label || "Quero receber aviso"}
    </Button>
  );
}
