import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { HistoryDrawer } from "@/components/HistoryDrawer";

const API_ENDPOINT = "/api/generate-ui";
const MAX_HISTORY = 20;

export default function App() {
  // `history` guarda toda pergunta já respondida nesta sessão — nunca é
  // sobrescrita por uma pergunta nova. `activeId` diz qual delas está em
  // tela agora. Trocar de aba no histórico só muda `activeId`, sem refazer
  // a chamada à IA.
  const [history, setHistory] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState("");
  const [error, setError] = useState("");
  const [topQuery, setTopQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeEntry = history.find((entry) => entry.id === activeId) || null;

  async function runQuery(message) {
    if (!message.trim()) return;
    setLoading(true);
    setLoadingQuery(message);
    setError("");
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não conseguimos gerar essa resposta agora. Tente novamente em instantes.");
        return;
      }
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setHistory((prev) => [{ id, query: message, plan: data }, ...prev].slice(0, MAX_HISTORY));
      setActiveId(id);
    } catch (err) {
      setError("Não conseguimos falar com o servidor agora. Verifique sua conexão e tente de novo.");
    } finally {
      setLoading(false);
      setLoadingQuery("");
      setTopQuery("");
    }
  }

  function handleHome() {
    // Volta para a landing, mas preserva o histórico — a pessoa pode reabrir
    // a gaveta e retomar qualquer pergunta anterior a partir daqui também.
    setActiveId(null);
    setError("");
  }

  const showTopBar = Boolean(activeEntry) || loading || error;

  return (
    <div className="min-h-screen">
      <Header onHome={handleHome} onAskFollowUp={runQuery} />

      {showTopBar ? (
        <form
          className="sticky top-[70px] z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur"
          onSubmit={(event) => {
            event.preventDefault();
            runQuery(topQuery);
          }}
        >
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <div className="relative flex-1">
              <Input
                value={topQuery}
                onChange={(event) => setTopQuery(event.target.value)}
                placeholder="Pergunte outra coisa..."
                className="h-12 rounded-full pl-5 pr-14"
              />
              <Button type="submit" size="icon" className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full">
                ↑
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-12 shrink-0 rounded-full px-4"
              onClick={() => setDrawerOpen(true)}
              disabled={!history.length}
            >
              Histórico{history.length ? ` (${history.length})` : ""}
            </Button>
          </div>
        </form>
      ) : null}

      <main className="mx-auto max-w-3xl px-6 pb-24">
        {!activeEntry && !loading && !error ? <Hero onSubmit={runQuery} /> : null}

        {loading ? <LoadingSkeleton query={loadingQuery} /> : null}

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-medium text-red-800">{error}</div>
        ) : null}

        {activeEntry && !loading ? (
          <div className="mt-8 flex flex-col gap-10">
            <div className="rounded-3xl border border-[#cdd2ff] bg-[#f0f1ff] p-8">
              <div className="mb-4 text-sm text-[#3b4271]">
                Você perguntou: <strong className="text-foreground">{activeEntry.query}</strong>
              </div>
              <h2 className="text-3xl font-black tracking-tight">{activeEntry.plan.pageTitle}</h2>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{activeEntry.plan.answer}</p>
            </div>

            {(activeEntry.plan.sections || []).map((section, index) => (
              <SectionRenderer key={`${section.type}-${index}`} section={section} onAskFollowUp={runQuery} />
            ))}
          </div>
        ) : null}
      </main>

      <HistoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        history={history}
        activeId={activeId}
        onSelect={setActiveId}
      />
    </div>
  );
}
