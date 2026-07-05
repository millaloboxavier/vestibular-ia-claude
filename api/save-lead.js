// api/save-lead.js
//
// Recebe nome + e-mail antes de liberar o download/compartilhamento do
// resumo em PDF. Por enquanto só valida e responde sucesso — para ir para
// produção de verdade, troque o bloco comentado abaixo por uma chamada
// real (Google Sheets via Apps Script, Airtable, HubSpot, ou uma tabela
// própria). Nunca armazene isso só na memória da function: cada invocação
// do Vercel pode rodar numa instância diferente.

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async function handleSaveLead(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, reason } = req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  const lead = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    reason: reason || "unknown",
    receivedAt: new Date().toISOString()
  };

  try {
    // TODO produção: enviar `lead` para armazenamento real, por exemplo:
    //
    // await fetch(process.env.LEAD_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(lead)
    // });
    //
    // Por ora, só registramos no log da function (visível em
    // Vercel → Deployments → Functions → Logs) para fins de teste.
    console.log("Novo lead capturado:", lead);

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Não foi possível registrar seus dados agora." });
  }
};
