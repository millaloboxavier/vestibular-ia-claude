import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * HistorySummaryGate — trava o resumo em PDF atrás de um formulário curto
 * (nome + e-mail). Depois de enviado, libera duas ações:
 * - Baixar PDF (sempre funciona, qualquer navegador)
 * - Compartilhar no WhatsApp (usa a Web Share API com o arquivo anexado;
 *   em navegadores/desktops sem suporte, cai para abrir o WhatsApp com uma
 *   mensagem de texto, já que não há como anexar o arquivo nesse caso sem
 *   hospedar o PDF em algum lugar — isso pode ser um próximo passo).
 *
 * O módulo de geração de PDF (@/lib/pdf) é carregado sob demanda — jsPDF
 * pesa mais de 150kb, e a maioria das visitas nunca vai clicar nesse botão.
 * Isso mantém o carregamento inicial do site leve para todo mundo.
 */
export function HistorySummaryGate({ history }) {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  const canShareFiles = typeof navigator !== "undefined" && navigator.canShare && navigator.share;

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setSending(true);
    try {
      const res = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason: "download_pdf_summary" })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || "Não conseguimos registrar seus dados agora.");
        return;
      }
      setUnlocked(true);
    } catch (err) {
      setFormError("Sem conexão agora — tente de novo em instantes.");
    } finally {
      setSending(false);
    }
  }

  async function handleDownload() {
    const { buildHistoryPdf } = await import("@/lib/pdf");
    const doc = buildHistoryPdf(history, { name });
    doc.save("resumo-vestibular-fgv.pdf");
  }

  async function handleShareWhatsapp() {
    const { buildHistoryPdf, pdfToFile } = await import("@/lib/pdf");
    const doc = buildHistoryPdf(history, { name });
    const file = pdfToFile(doc);

    if (canShareFiles && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Resumo Vestibular FGV",
          text: "Olha o resumo da minha busca no Vestibular FGV:"
        });
        return;
      } catch (err) {
        // Pessoa cancelou o compartilhamento — não faz nada.
        return;
      }
    }

    // Sem suporte a compartilhar arquivo (ex: desktop): baixa o PDF e abre
    // o WhatsApp Web com um texto pronto, para a pessoa anexar manualmente.
    doc.save("resumo-vestibular-fgv.pdf");
    const text = encodeURIComponent(
      "Baixei meu resumo do Vestibular FGV com os cursos e prazos que pesquisei — o arquivo já está salvo no seu computador, é só anexar aqui."
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  }

  if (!history.length) return null;

  if (!unlocked) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-border p-5">
        <h4 className="text-sm font-bold">Quer levar isso com você?</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha seus dados para baixar um PDF com o resumo de tudo que você pesquisou.
        </p>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Seu e-mail" required />
          <Button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Liberar resumo"}
          </Button>
        </form>
        {formError ? <p className="mt-2 text-sm text-red-700">{formError}</p> : null}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
      <h4 className="text-sm font-bold">Seu resumo está pronto</h4>
      <p className="mt-1 text-sm text-muted-foreground">Baixe o PDF ou envie direto para o seu WhatsApp.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleDownload}>
          Baixar PDF
        </Button>
        <Button onClick={handleShareWhatsapp}>Enviar por WhatsApp</Button>
      </div>
    </div>
  );
}
