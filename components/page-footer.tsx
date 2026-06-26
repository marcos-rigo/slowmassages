export function PageFooter() {
  return (
    <footer className="flex flex-col items-center gap-2 py-8 mt-4 animate-fade-in animation-delay-700">
      <div className="flex items-center gap-2 text-muted-foreground/60">
        <div className="w-4 h-px bg-border" />
        <span className="text-xs tracking-widest uppercase">Slow Massages</span>
        <div className="w-4 h-px bg-border" />
      </div>
      <p className="text-[11px] text-muted-foreground/40 tracking-wide">
        {'© 2025 · Con amor & calma'}
      </p>
    </footer>
  )
}
