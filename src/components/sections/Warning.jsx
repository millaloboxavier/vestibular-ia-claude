/**
 * Warning — aviso de pedido fora do escopo do site (section.type === "warning").
 */
export function Warning({ section }) {
  return (
    <section className="rounded-2xl border border-border bg-secondary p-5">
      <h3 className="text-base font-semibold">{section.title || "Não encontrei esse caminho"}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {section.intro || "Você pode perguntar por cursos, formas de ingresso, bolsas, provas, eventos ou inscrição."}
      </p>
    </section>
  );
}
