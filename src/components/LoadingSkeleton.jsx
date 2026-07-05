import { Skeleton } from "@/components/ui/skeleton";

/**
 * Heurística leve, só para escolher o formato do skeleton — não decide nada
 * de verdade sobre a resposta (isso continua sendo trabalho exclusivo da IA
 * no backend). Errar aqui só custa um esqueleto com formato levemente
 * diferente do resultado final por 1-2 segundos, nunca um dado incorreto.
 */
export function guessLayout(message = "") {
  const q = message.toLowerCase();
  if (/compar|diferença|diferenca|versus| vs /.test(q)) return "table";
  if (/prova|gabarito|prazo|data|calend[aá]rio|cronograma/.test(q)) return "list";
  return "grid";
}

function AnswerSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-secondary/40 p-8">
      <Skeleton className="h-4 w-40 mb-4" />
      <Skeleton className="h-8 w-2/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border p-5">
      <Skeleton className="h-4 w-1/3 mb-3" />
      <Skeleton className="h-3 w-1/2 mb-4" />
      <Skeleton className="h-3 w-full mb-1.5" />
      <Skeleton className="h-3 w-4/5 mb-4" />
      <Skeleton className="h-8 w-28 rounded-full" />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="grid grid-cols-3 gap-px bg-border">
        {[0, 1, 2].map((col) => (
          <div key={col} className="bg-secondary p-3">
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="grid grid-cols-3 gap-px bg-border">
          {[0, 1, 2].map((col) => (
            <div key={col} className="bg-card p-3">
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border rounded-2xl border border-border">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-start gap-4 p-4">
          <Skeleton className="h-4 w-28 shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

const BODY_BY_LAYOUT = {
  grid: GridSkeleton,
  table: TableSkeleton,
  list: ListSkeleton
};

function ThinkingStatus() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 text-lg font-bold">
        <span className="h-3 w-3 animate-pulse rounded-full bg-foreground" />
        Organizando sua jornada.
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span className="rounded-full border border-border bg-secondary px-3 py-1.5">entendendo o que você precisa</span>
        <span className="rounded-full border border-border bg-secondary px-3 py-1.5">identificando curso, cidade e momento</span>
        <span className="rounded-full border border-border bg-secondary px-3 py-1.5">organizando os próximos caminhos</span>
      </div>
    </div>
  );
}

/**
 * LoadingSkeleton — substitui o spinner genérico. O formato do corpo
 * (grid/tabela/lista) é escolhido por guessLayout() a partir da pergunta,
 * para que o esqueleto já sugira o tipo de resposta que está a caminho.
 * O bloco "Organizando sua jornada" continua no topo, dando contexto em
 * texto do que está acontecendo, enquanto o skeleton dá a expectativa
 * visual do formato que está por vir.
 */
export function LoadingSkeleton({ query = "" }) {
  const layout = guessLayout(query);
  const Body = BODY_BY_LAYOUT[layout] || GridSkeleton;

  return (
    <div className="mt-8 flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <ThinkingStatus />
      <AnswerSkeleton />
      <Body />
    </div>
  );
}
