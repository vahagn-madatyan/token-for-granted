import { useState, useEffect } from 'react'

// --- System Health ---

function useFluctuatingValue(initial: number, range: number, interval: number) {
  const [value, setValue] = useState(initial)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        const delta = (Math.random() - 0.5) * 2 * range
        return Math.max(0, Math.min(100, Math.round(prev + delta)))
      })
    }, interval)
    return () => clearInterval(timer)
  }, [range, interval])

  return value
}

function SystemHealthCard() {
  const processorLoad = useFluctuatingValue(42, 3, 2500)
  const aetherConsumption = useFluctuatingValue(89, 2, 3000)

  return (
    <div
      className="bg-surface-container-low border border-outline-variant/20 p-5 relative overflow-hidden"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 92%)',
      }}
    >
      <h3 className="font-headline text-xs font-bold text-secondary mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-secondary" /> System Health
      </h3>

      <div className="space-y-4">
        {/* Processor Load */}
        <div>
          <div className="flex justify-between font-label text-[10px] text-outline mb-1 uppercase">
            <span>Conversion Engine</span>
            <span>{processorLoad}%</span>
          </div>
          <div className="h-1 bg-outline-variant/20 overflow-hidden relative">
            <div
              className="h-full bg-primary-container transition-all duration-500"
              style={{
                width: `${processorLoad}%`,
                boxShadow: '0 0 8px rgba(0, 238, 252, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Aether Consumption */}
        <div>
          <div className="flex justify-between font-label text-[10px] text-outline mb-1 uppercase">
            <span>Token Throughput</span>
            <span>{aetherConsumption}%</span>
          </div>
          <div className="h-1 bg-outline-variant/20 overflow-hidden relative">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{
                width: `${aetherConsumption}%`,
                boxShadow: '0 0 8px rgba(255, 70, 85, 0.6)',
              }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-outline-variant/10">
          <p className="font-label text-[10px] text-outline/60 italic leading-tight">
            All systems operational. Token conversion pipeline active.
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Token Latency ---

function TokenLatencyCard() {
  const [arcNet, setArcNet] = useState(12)
  const [valFeed, setValFeed] = useState(8)
  const [globalReach, setGlobalReach] = useState(144)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setArcNet((prev) =>
          Math.max(1, prev + Math.round((Math.random() - 0.5) * 6)),
        )
        setValFeed((prev) =>
          Math.max(1, prev + Math.round((Math.random() - 0.5) * 4)),
        )
        setGlobalReach((prev) =>
          Math.max(50, prev + Math.round((Math.random() - 0.5) * 30)),
        )
      },
      2000 + Math.random() * 1000,
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container-low border border-outline-variant/20 p-5 relative overflow-hidden">
      <h3 className="font-headline text-xs font-bold text-secondary mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-secondary" /> Provider Latency
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container-highest p-3 border-l-2 border-primary-container">
          <span className="block font-label text-[9px] text-outline uppercase mb-1">
            API_NET
          </span>
          <span className="block font-headline text-xl font-bold text-primary-container">
            {String(arcNet).padStart(2, '0')}
            <small className="text-[10px] ml-1">ms</small>
          </span>
        </div>

        <div className="bg-surface-container-highest p-3 border-l-2 border-primary-container">
          <span className="block font-label text-[9px] text-outline uppercase mb-1">
            CONV_FEED
          </span>
          <span className="block font-headline text-xl font-bold text-primary-container">
            {String(valFeed).padStart(2, '0')}
            <small className="text-[10px] ml-1">ms</small>
          </span>
        </div>

        <div className="col-span-2 bg-surface-container-highest p-3 border-l-2 border-accent/50">
          <span className="block font-label text-[9px] text-outline uppercase mb-1">
            PROVIDER_AVG
          </span>
          <span className="block font-headline text-xl font-bold text-on-surface">
            {globalReach}
            <small className="text-[10px] ml-1">ms</small>
          </span>
        </div>
      </div>
    </div>
  )
}

// --- Node Connections ---

type NodeStatus = 'online' | 'offline' | 'locked' | 'syncing'

interface NodeEntry {
  name: string
  initialStatus: NodeStatus
}

const NODES: NodeEntry[] = [
  { name: 'OPENAI_NODE-01', initialStatus: 'online' },
  { name: 'ANTHROPIC_NODE-02', initialStatus: 'online' },
  { name: 'GOOGLE_NODE-03', initialStatus: 'offline' },
  { name: 'META_NODE-04', initialStatus: 'locked' },
  { name: 'MISTRAL_NODE-05', initialStatus: 'online' },
]

const CYCLEABLE_STATUSES: NodeStatus[] = ['online', 'syncing', 'offline']

function NodeStatusDot({ status }: { status: NodeStatus }) {
  if (status === 'online') {
    return (
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full bg-primary-container"
          style={{ boxShadow: '0 0 5px rgba(0, 238, 252, 0.8)' }}
        />
        <div
          className="absolute inset-[-4px] rounded-full bg-primary-container/50 animate-pulse"
        />
      </div>
    )
  }
  if (status === 'syncing') {
    return (
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full bg-secondary"
          style={{ boxShadow: '0 0 5px rgba(255, 89, 227, 0.8)' }}
        />
        <div
          className="absolute inset-[-4px] rounded-full bg-secondary/50 animate-pulse"
        />
      </div>
    )
  }
  if (status === 'offline') {
    return (
      <div
        className="w-2 h-2 rounded-full bg-accent"
        style={{ boxShadow: '0 0 5px rgba(255, 70, 85, 0.8)' }}
      />
    )
  }
  // locked
  return <div className="w-2 h-2 rounded-full bg-outline" />
}

function NodeIcon({ status }: { status: NodeStatus }) {
  if (status === 'locked') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    )
  }
  if (status === 'offline') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline group-hover:text-primary-container transition-colors">
        <path d="M15 7h3a5 5 0 010 10h-3M9 17H6a5 5 0 010-10h3" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline group-hover:text-primary-container transition-colors">
      <path d="M15 7h3a5 5 0 010 10h-3M9 17H6a5 5 0 010-10h3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function NodeConnectionsCard() {
  const [statuses, setStatuses] = useState<NodeStatus[]>(
    NODES.map((n) => n.initialStatus),
  )

  useEffect(() => {
    const interval = setInterval(
      () => {
        setStatuses((prev) => {
          const next = [...prev]
          // Pick a random non-locked node to cycle
          const mutableIndices = prev
            .map((s, i) => (s !== 'locked' ? i : -1))
            .filter((i) => i !== -1)
          if (mutableIndices.length === 0) return prev
          const idx =
            mutableIndices[Math.floor(Math.random() * mutableIndices.length)]
          const newStatus =
            CYCLEABLE_STATUSES[
              Math.floor(Math.random() * CYCLEABLE_STATUSES.length)
            ]
          next[idx] = newStatus
          return next
        })
      },
      5000 + Math.random() * 3000,
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-grow bg-surface-container-low border border-outline-variant/20 p-5 flex flex-col">
      <h3 className="font-headline text-xs font-bold text-secondary mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-secondary" /> Node Connections
      </h3>

      <div className="flex-grow space-y-3 overflow-y-auto pr-2">
        {NODES.map((node, i) => {
          const status = statuses[i]
          return (
            <div
              key={node.name}
              className={`flex items-center justify-between p-2 hover:bg-surface-container-highest transition-colors cursor-pointer group ${
                status === 'locked' ? 'opacity-40' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <NodeStatusDot status={status} />
                <span className="font-label text-xs uppercase tracking-tight">
                  {node.name}
                </span>
              </div>
              <NodeIcon status={status} />
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-center">
        <button className="text-secondary font-headline text-[10px] font-bold tracking-widest uppercase hover:text-primary-container transition-colors flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-6.219-8.56" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
          Scan_Providers
        </button>
      </div>
    </div>
  )
}

// --- Combined SystemMonitor ---

export function SystemMonitor() {
  return (
    <aside className="w-80 flex flex-col gap-6 relative z-10">
      <SystemHealthCard />
      <TokenLatencyCard />
      <NodeConnectionsCard />
    </aside>
  )
}
