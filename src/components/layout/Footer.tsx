export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full h-8 flex items-center justify-between px-10 z-40 bg-transparent">
      <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30">
        &copy; 2142 ARCANUM LABS // v0.9.5-BETA
      </div>
      <div className="flex gap-8">
        <a
          className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 hover:text-secondary transition-opacity duration-300"
          href="#"
        >
          DISCORD
        </a>
        <a
          className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 hover:text-secondary transition-opacity duration-300"
          href="#"
        >
          DOCUMENTATION
        </a>
        <a
          className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 hover:text-secondary transition-opacity duration-300"
          href="#"
        >
          LEGAL_PROVISIONS
        </a>
      </div>
    </footer>
  )
}
