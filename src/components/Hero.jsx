import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEFAULT_SUGGESTIONS = [
  "Quero me inscrever",
  "Quero conhecer os cursos",
  "Comparar cursos",
  "Ver provas anteriores",
  "Quais bolsas a FGV oferece?"
];

/**
 * Hero — tela inicial estilo landing conversacional. Contém:
 * - badge de prazo (âncora fixa, não depende de intenção)
 * - campo de busca central
 * - chips de sugestão
 * - banner de evento em destaque (vitrine institucional)
 *
 * @param {(message: string) => void} onSubmit
 */
export function Hero({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  }

  return (
    <section className="flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-6 py-14 text-center">
      <button
        className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-bold"
        onClick={() => onSubmit("quais são as datas de inscrição no processo seletivo 2027.1?")}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        Processo seletivo 2027.1 — inscrições a partir de 27/07
      </button>

      <div className="mb-8 h-16 w-16 rounded-full bg-gradient-to-br from-neutral-700 to-black" />

      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Oi! Vamos encontrar o que você precisa?</h1>
      <p className="mt-3 text-lg text-muted-foreground">Escreva do seu jeito ou escolha uma das opções abaixo.</p>

      <form onSubmit={handleSubmit} className="relative mt-8 w-full max-w-2xl">
        <Input
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="ex: quero saber quando termina a inscrição do curso de Direito"
          className="h-16 rounded-full pl-6 pr-16 text-base"
        />
        <Button type="submit" size="icon" className="absolute right-2 top-2 h-12 w-12 rounded-full text-lg">
          ↑
        </Button>
      </form>

      <div className="mt-6 flex max-w-2xl flex-wrap justify-center gap-3">
        {DEFAULT_SUGGESTIONS.map((text) => (
          <Button key={text} variant="outline" onClick={() => onSubmit(text)}>
            {text}
          </Button>
        ))}
      </div>

      <button
        onClick={() => onSubmit("quais eventos da graduação estão disponíveis?")}
        className="mt-12 flex w-full max-w-3xl items-center justify-between gap-6 rounded-3xl border border-border bg-background p-6 text-left"
      >
        <div>
          <small className="mb-1 block text-xs font-black uppercase tracking-wide text-muted-foreground">Evento em destaque</small>
          <strong className="block text-xl tracking-tight">Semana Imersiva FGV 2026</strong>
          <span className="block text-muted-foreground">Viva a experiência universitária na prática — Rio, São Paulo e Brasília</span>
        </div>
        <b className="whitespace-nowrap text-lg">Saiba mais →</b>
      </button>
    </section>
  );
}
