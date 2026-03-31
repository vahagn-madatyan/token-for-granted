export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full h-8 flex items-center justify-between px-4 md:px-10 z-40 bg-surface/80 backdrop-blur-sm">
      <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30">
        &copy; 2142 ARCANUM LABS // v0.9.5-BETA
      </div>
      <div className="hidden md:flex gap-8">
        <a
          className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 hover:text-secondary transition-colors duration-300"
          href="https://github.com/djbeatbug/token-for-granted"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <a
          className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 hover:text-secondary transition-colors duration-300"
          href="https://developers.cloudflare.com/workers/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CLOUDFLARE_DOCS
        </a>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/20">
          BUILT_ON_WORKERS
        </span>
      </div>
    </footer>
  )
}
