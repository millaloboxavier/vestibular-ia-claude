import { Button } from "@/components/ui/button";

/**
 * HistoryDrawer — gaveta lateral com as perguntas já respondidas nesta
 * sessão. Nunca refaz a chamada à IA: só troca qual resposta (já guardada
 * em memória) está sendo exibida. Resolve o problema de a nova pergunta
 * "apagar" a resposta anterior.
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {Array<{id: string, query: string}>} history - mais recente primeiro
 * @param {string} activeId
 * @param {(id: string) => void} onSelect
 */
export function HistoryDrawer({ open, onClose, history, activeId, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button className="absolute inset-0 bg-black/30" aria-label="Fechar histórico" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-border bg-background p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Suas perguntas</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Volte para qualquer resposta anterior sem perguntar de novo.</p>

        <div className="mt-5 flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma pergunta ainda.</p>
          ) : (
            history.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => {
                  onSelect(entry.id);
                  onClose();
                }}
                className={`rounded-xl border p-3 text-left text-sm transition-colors ${
                  entry.id === activeId ? "border-foreground bg-secondary font-semibold" : "border-border hover:bg-secondary/60"
                }`}
              >
                <div className="text-xs text-muted-foreground mb-0.5">#{history.length - index}</div>
                {entry.query}
              </button>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
