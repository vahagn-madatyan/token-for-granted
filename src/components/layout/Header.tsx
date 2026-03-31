import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

const navLinks = [
  { to: '/' as const, label: 'CONVERT' },
  { to: '/ranking' as const, label: 'LEADERBOARD' },
  { to: '/what-if' as const, label: 'WHAT IF LAB' },
  { to: '/terminal' as const, label: 'LIVE FEED' },
]

export function Header() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full h-16 z-50 bg-[#0a141e]/90 backdrop-blur-md border-b-2 border-primary-container/20 shadow-[0_4px_20px_rgba(0,245,255,0.1)] flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8 h-full">
          <Link to="/" className="text-lg md:text-2xl font-black tracking-widest text-accent italic font-headline uppercase text-glitch-hover cursor-crosshair">
            TOKEN FOR GRANTED
          </Link>
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
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 cursor-crosshair"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
          <div className="hidden md:flex items-center gap-4 text-primary-container">
            <Link
              to="/terminal"
              className="hover:scale-110 active:scale-95 transition-all cursor-crosshair text-lg"
              aria-label="Terminal"
            >
              &#x2756;
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-surface-dim/95 backdrop-blur-lg border-b-2 border-primary-container/20 md:hidden">
          <nav className="flex flex-col font-headline uppercase tracking-tighter font-bold text-sm">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-6 py-4 border-b border-outline-variant/10 transition-all cursor-crosshair ${
                    isActive
                      ? 'text-accent bg-accent/5 border-l-4 border-l-accent'
                      : 'text-outline hover:text-primary-container hover:bg-primary-container/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
