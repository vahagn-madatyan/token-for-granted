import { Link, useRouterState } from '@tanstack/react-router'

const navLinks = [
  { to: '/' as const, label: 'PROTOCOL: ACTIVE' },
  { to: '/ranking' as const, label: 'VALUE MATRIX' },
  { to: '/what-if' as const, label: 'WHAT IF LAB' },
  { to: '/terminal' as const, label: 'TERMINAL' },
]

export function Header() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <header className="fixed top-0 w-full h-16 z-50 bg-[#0a141e]/90 backdrop-blur-md border-b-2 border-primary-container/20 shadow-[0_4px_20px_rgba(0,245,255,0.1)] flex justify-between items-center px-6">
      <div className="flex items-center gap-8 h-full">
        <div className="text-2xl font-black tracking-widest text-accent italic font-headline uppercase text-glitch-hover cursor-default">
          TACTICAL ARCANA
        </div>
        <nav className="hidden md:flex items-center h-full divide-x divide-primary-container/30 font-headline uppercase tracking-tighter font-bold text-xs">
          {navLinks.map((link) => {
            const isActive = currentPath === link.to

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 h-full flex items-center transition-all duration-150 hover:skew-x-2 cursor-crosshair ${
                  isActive
                    ? 'text-accent border-b-2 border-accent bg-accent/5'
                    : 'text-outline hover:text-primary-container hover:bg-primary-container/10'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4 text-primary-container">
        <button
          className="hover:scale-110 active:scale-95 transition-all cursor-crosshair text-lg"
          aria-label="Terminal"
        >
          &#x2756;
        </button>
        <button
          className="hover:scale-110 active:scale-95 transition-all cursor-crosshair text-lg"
          aria-label="Settings"
        >
          &#x2699;
        </button>
      </div>
    </header>
  )
}
