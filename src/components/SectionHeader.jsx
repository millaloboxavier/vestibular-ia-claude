/**
 * SectionHeader — título + texto de introdução, usado no topo de toda seção.
 * @param {{title?: string, intro?: string}} section
 */
export function SectionHeader({ title, intro }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {intro ? <p className="mt-1 text-sm text-muted-foreground">{intro}</p> : null}
    </div>
  );
}
