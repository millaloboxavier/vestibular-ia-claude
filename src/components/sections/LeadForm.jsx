import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * LeadForm — formulário de "avise-me" (section.type === "lead_form").
 * Aparece sempre que a forma de ingresso relevante não está aberta — essa
 * regra é decidida no backend (resolveSections), não aqui; este componente
 * só desenha o formulário e o estado local de "enviado".
 */
export function LeadForm({ section }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Aqui entraria a chamada real para salvar o lead (endpoint próprio,
    // planilha, CRM, etc.) — fica de fora do escopo deste protótipo.
    setSent(true);
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-semibold">{section.title || "Receba novidades"}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{section.intro || "Deixe seus dados para acompanhar novidades sobre seu interesse."}</p>
      {sent ? (
        <div className="mt-4 text-sm font-medium">Pronto. Seu contato foi registrado.</div>
      ) : (
        <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" required />
          <Input name="email" type="email" placeholder="E-mail" required />
          <Button type="submit">Enviar</Button>
        </form>
      )}
    </section>
  );
}
