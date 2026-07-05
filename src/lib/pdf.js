import { jsPDF } from "jspdf";

const PAGE_WIDTH = 210; // A4 em mm
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

/**
 * buildHistoryPdf — monta um PDF com o resumo de tudo que a pessoa
 * perguntou nesta sessão, na ordem em que perguntou (mais antiga primeiro,
 * como uma linha do tempo da jornada de decisão).
 *
 * @param {Array<{query: string, plan: {pageTitle: string, answer: string}}>} history
 * @param {{name?: string}} lead
 * @returns {jsPDF} instância pronta para .save() ou .output("blob")
 */
export function buildHistoryPdf(history, lead = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ordered = [...history].reverse(); // mais antiga primeiro
  let y = MARGIN;

  function ensureSpace(nextBlockHeight) {
    if (y + nextBlockHeight > 297 - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Vestibular FGV", MARGIN, y);
  y += 8;

  doc.setFontSize(13);
  doc.setTextColor(90);
  doc.text(lead.name ? `Resumo da busca de ${lead.name}` : "Resumo da sua busca", MARGIN, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }), MARGIN, y);
  y += 12;

  doc.setDrawColor(220);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 10;

  ordered.forEach((entry, index) => {
    const titleLines = doc.splitTextToSize(entry.plan.pageTitle || entry.query, CONTENT_WIDTH);
    const answerLines = doc.splitTextToSize(entry.plan.answer || "", CONTENT_WIDTH);
    const blockHeight = 6 + titleLines.length * 6 + answerLines.length * 5 + 10;

    ensureSpace(blockHeight);

    doc.setTextColor(140);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Pergunta ${index + 1} de ${ordered.length} · "${entry.query}"`, MARGIN, y);
    y += 6;

    doc.setTextColor(20);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(titleLines, MARGIN, y);
    y += titleLines.length * 6 + 2;

    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70);
    doc.text(answerLines, MARGIN, y);
    y += answerLines.length * 5 + 8;

    doc.setDrawColor(235);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 10;
  });

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    "Este resumo não substitui o edital oficial. Confirme sempre datas, valores e vagas em vestibular.fgv.br.",
    MARGIN,
    290
  );

  return doc;
}

/**
 * Converte o PDF em um File — necessário para usar a Web Share API
 * (navigator.share com anexo), que é o mecanismo que permite "enviar pelo
 * WhatsApp" o próprio arquivo em vez de só um link de texto.
 */
export function pdfToFile(doc, filename = "resumo-vestibular-fgv.pdf") {
  const blob = doc.output("blob");
  return new File([blob], filename, { type: "application/pdf" });
}
