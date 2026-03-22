import { cn } from '~/lib/cn'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  active?: boolean
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'DASHBOARD',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    label: 'ARSENAL',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 19L19 5M5 5l14 14" />
        <path d="M15 3l3 3-3 3M9 15l-3 3 3 3" />
      </svg>
    ),
  },
  {
    label: 'ARCHIVES',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
        <path d="M8 7h6" />
      </svg>
    ),
  },
  {
    label: 'PROTOCOL',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    active: true,
  },
]

export function TerminalSidebar() {
  return (
    <aside
      className="w-20 bg-surface-container-low flex flex-col items-center py-6 gap-8 border-r border-outline-variant/20"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 80% 100%, 0% 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-8 w-full">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex flex-col items-center gap-1 w-full py-2 transition-transform duration-200 hover:translate-x-1 active:opacity-80',
              item.active
                ? 'bg-primary-container/10 text-primary-container border-l-4 border-primary-container'
                : 'text-outline hover:bg-surface-bright hover:text-secondary',
            )}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-headline font-medium text-[8px] tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center">
        <div className="w-10 h-0.5 bg-outline/20 mb-4" />
        <span
          className="font-headline text-[10px] text-primary-container font-bold mb-4"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          UNITS: 04
        </span>
      </div>
    </aside>
  )
}
