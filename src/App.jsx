import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

const API_ENDPOINT = "/api/generate-ui";

export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [topQuery, setTopQuery] = useState("");

  async function runQuery(message) {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    setLastQuery(message);
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não conseguimos gerar essa resposta agora. Tente novamente em instantes.");
        setPlan(null);
        return;
      }
      setPlan(data);
    } catch (err) {
      setError("Não conseguimos falar com o servidor agora. Verifique sua conexão e tente de novo.");
      setPlan(null);
    } finally {
      setLoading(false);
      setTopQuery("");
    }
  }

  function handleHome() {
    setPlan(null);
    setError("");
    setLastQuery("");
  }

  return (
    <div className="min-h-screen">
      <Header onHome={handleHome} onAskFollowUp={runQuery} />

      {plan || loading || error ? (
        <form
          className="sticky top-[70px] z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur"
          onSubmit={(event) => {
            event.preventDefault();
            runQuery(topQuery);
          }}
        >
          <div className="relative mx-auto max-w-3xl">
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
        </form>
      ) : null}

      <main className="mx-auto max-w-3xl px-6 pb-24">
        {!plan && !loading && !error ? <Hero onSubmit={runQuery} /> : null}

        {loading ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 text-lg font-bold">
              <span className="h-3 w-3 animate-pulse rounded-full bg-foreground" />
              Organizando sua jornada...
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="rounded-full border border-border bg-secondary px-3 py-1.5">entendendo o que você precisa</span>
              <span className="rounded-full border border-border bg-secondary px-3 py-1.5">identificando curso, cidade e momento</span>
              <span className="rounded-full border border-border bg-secondary px-3 py-1.5">organizando os próximos caminhos</span>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-medium text-red-800">{error}</div>
        ) : null}

        {plan && !loading ? (
          <div className="mt-8 flex flex-col gap-10">
            <div className="rounded-3xl border border-[#cdd2ff] bg-[#f0f1ff] p-8">
              <div className="mb-4 text-sm text-[#3b4271]">
                Você perguntou: <strong className="text-foreground">{lastQuery}</strong>
              </div>
              <h2 className="text-3xl font-black tracking-tight">{plan.pageTitle}</h2>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{plan.answer}</p>
            </div>

            {(plan.sections || []).map((section, index) => (
              <SectionRenderer key={`${section.type}-${index}`} section={section} onAskFollowUp={runQuery} />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
