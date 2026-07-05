const NAV_ITEMS = [
  { label: "Cursos", prompt: "quais cursos a FGV oferece?" },
  { label: "Processo seletivo", prompt: "quais são as datas de inscrição no vestibular?" },
  { label: "Formas de ingresso", prompt: "quais formas de ingresso posso usar?" },
  { label: "Bolsas", prompt: "quais bolsas de estudo a FGV oferece?" }
];

/**
 * Header — âncora fixa do site (nunca muda, independente da intenção).
 * @param {() => void} onHome - volta para a tela inicial
 * @param {(prompt: string) => void} onAskFollowUp
 */
export function Header({ onHome, onAskFollowUp }) {
  return (
    <header className="sticky top-0 z-50 h-[70px] border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <button className="flex items-center gap-3 text-xl font-black tracking-tight" onClick={onHome}>
          <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-neutral-700 to-black" />
          Vestibular FGV
        </button>
        <nav className="hidden gap-6 text-[15px] text-muted-foreground sm:flex">
          {NAV_ITEMS.map((item) => (
            <button key={item.label} className="hover:text-foreground" onClick={() => onAskFollowUp(item.prompt)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
