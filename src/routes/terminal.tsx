import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { LogEntry } from '~/components/ui/TerminalLog'
import { useBootSequence, valuationToLogEntry } from '~/components/screens/terminal/BootSequence'
import { TerminalSidebar } from '~/components/screens/terminal/TerminalSidebar'
import { SystemMonitor } from '~/components/screens/terminal/SystemMonitor'
import { getRecentValuations } from '~/core/functions/valuation.functions'

export const Route = createFileRoute('/terminal')({
  loader: async () => {
    try {
      const valuations = await getRecentValuations({ data: { limit: 20 } })
      return { valuations }
    } catch {
      // D1 table may not exist yet — return empty
      return { valuations: [] as Awaited<ReturnType<typeof getRecentValuations>> }
    }
  },
  component: Terminal,
})

const levelColor: Record<string, string> = {
  INFO: 'text-primary-container',
  SUCCESS: 'text-tertiary',
  WARNING: 'text-accent',
  CRITICAL: 'text-accent',
  DEBUG: 'text-on-surface-variant',
}

function Terminal() {
  const { valuations } = Route.useLoaderData()
  const { entries, isBooting, addEntry, addEntries } = useBootSequence()
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasLoadedRealData = useRef(false)

  // Auto-scroll to bottom as new entries appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries.length])

  // After boot sequence completes, show real entries from D1
  useEffect(() => {
    if (isBooting || hasLoadedRealData.current) return
    hasLoadedRealData.current = true

    // Filter to only completed valuations
    const completedValuations = valuations.filter(
      (v) => v.item_name && v.item_price != null
    )

    if (completedValuations.length > 0) {
      // Add a separator entry
      addEntry({
        timestamp: new Date().toTimeString().slice(0, 8),
        level: 'INFO',
        source: 'FEED_SYNC',
        message: `Loading ${completedValuations.length} recent conversion(s) from database...`,
      })

      // Stagger real entries to appear over time
      completedValuations.forEach((valuation, i) => {
        setTimeout(() => {
          addEntry(valuationToLogEntry(valuation))
        }, (i + 1) * 500)
      })
    } else {
      addEntry({
        timestamp: new Date().toTimeString().slice(0, 8),
        level: 'INFO',
        source: 'FEED_SYNC',
        message: 'No conversions in database yet. Awaiting first submission...',
      })
    }
  }, [isBooting, valuations, addEntry])

  // Poll for new valuations every 15 seconds
  useEffect(() => {
    if (isBooting) return

    const interval = setInterval(async () => {
      try {
        const fresh = await getRecentValuations({ data: { limit: 5 } })
        const completed = fresh.filter(
          (v) => v.item_name && v.item_price != null
        )
        if (completed.length > 0) {
          // Check for entries we haven't seen yet by comparing IDs
          const existingIds = new Set(
            entries
              .filter((e) => e.source === 'CONVERSION')
              .map((e) => e.message)
          )
          const newEntries = completed.filter((v) => {
            const logEntry = valuationToLogEntry(v)
            return !existingIds.has(logEntry.message)
          })
          if (newEntries.length > 0) {
            addEntries(newEntries.map(valuationToLogEntry))
          }
        }
      } catch {
        // Silently ignore poll failures
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isBooting, entries, addEntries])

  function handleCommand() {
    if (!inputValue.trim()) return

    const now = new Date()
    const timestamp = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join(':')

    const entry: LogEntry = {
      timestamp,
      level: 'SUCCESS',
      source: 'CMD_EXEC',
      message: 'COMMAND ACKNOWLEDGED. PROCESSING... [NO_OP_MODE_ACTIVE]',
    }

    addEntry(entry)
    setInputValue('')
  }

  return (
    <>
      {/* Inject blink keyframe + grid-bg styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .grid-bg {
          background-image: radial-gradient(circle at 2px 2px, rgba(58, 73, 74, 0.15) 1px, transparent 0);
          background-size: 24px 24px;
        }
        @keyframes type-in {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        .type-animation {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          animation: type-in 0.6s ease-out forwards;
        }
        @keyframes pulse-ring-glow {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        .hex-shimmer-layer {
          animation: hex-shimmer 8s ease-in-out infinite;
        }
        @keyframes hex-shimmer {
          0% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.05) rotate(1deg); }
          100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar -- hidden on tablet */}
        <div className="hidden lg:block">
          <TerminalSidebar />
        </div>

        {/* Center: Main Terminal */}
        <section className="flex-grow flex flex-col gap-4 p-4 md:p-8 relative grid-bg overflow-hidden">
          {/* Background hex shimmer decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-container/5 blur-[120px] rounded-full hex-shimmer-layer" />
            <div
              className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full hex-shimmer-layer"
              style={{ animationDelay: '-2s' }}
            />
          </div>

          {/* Console header */}
          <header className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-8 bg-primary-container"
                style={{ boxShadow: '0 0 15px rgba(0, 238, 252, 0.5)' }}
              />
              <div>
                <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface uppercase italic">
                  Live_Feed.v01
                </h1>
                <p className="font-label text-xs text-outline tracking-wider">
                  TOKEN CONVERSION STREAM // ENCRYPTION: AES-256
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-surface-container-high border-l-2 border-primary-container text-[10px] font-label text-primary-container uppercase tracking-widest">
                Feed: LIVE
              </div>
              <div className="px-3 py-1 bg-accent/10 border-l-2 border-accent text-[10px] font-label text-accent uppercase tracking-widest">
                Providers: 08
              </div>
            </div>
          </header>

          {/* Terminal output area */}
          <div
            className="flex-grow bg-surface-container-low/80 border border-outline-variant/20 relative p-1"
            style={{
              clipPath:
                'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 0 100%)',
            }}
          >
            {/* Watermark */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
              <span className="font-headline text-8xl font-black">
                TOKEN_FEED
              </span>
            </div>

            {/* Scrollable log area */}
            <div
              ref={scrollRef}
              className="h-full w-full overflow-y-auto p-6 font-label text-sm leading-relaxed relative z-10"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 238, 252, 0.2) rgba(58, 73, 74, 0.05)',
              }}
            >
              {entries.map((entry, i) => (
                <div
                  key={`${entry.timestamp}-${entry.source}-${i}`}
                  className="mb-4"
                  style={{
                    animation: 'type-in 0.6s ease-out forwards',
                    animationDelay: `${i < 8 ? i * 0.2 : 0}s`,
                    opacity: i < 8 ? 0 : 1,
                  }}
                >
                  {/* CRITICAL entries get special treatment */}
                  {entry.level === 'CRITICAL' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-accent animate-pulse">
                        {'\u25CF'}
                      </span>
                      <span className="text-accent font-bold">
                        {entry.source}:
                      </span>{' '}
                      <span className="text-on-surface">{entry.message}</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-secondary">
                        [{entry.timestamp}]
                      </span>{' '}
                      <span
                        className={
                          levelColor[entry.level] ?? 'text-primary-container'
                        }
                      >
                        {entry.source}:
                      </span>{' '}
                      <span className="text-on-surface">{entry.message}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Command input bar */}
          <form
            className="h-16 bg-surface-container-highest border border-outline-variant/30 flex items-center px-6 gap-4 relative z-10"
            style={{
              clipPath:
                'polygon(0% 0%, 100% 0%, 100% 100%, 4% 100%, 0% 60%)',
            }}
            onSubmit={(e) => {
              e.preventDefault()
              handleCommand()
            }}
          >
            <span className="font-label text-primary-container font-bold text-lg select-none">
              {'>>'}
            </span>
            <div className="flex-grow relative flex items-center">
              <input
                type="text"
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none font-label text-primary uppercase placeholder:text-outline/40 tracking-widest text-lg"
                placeholder="EXECUTE COMMAND..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="w-2.5 h-6 bg-primary-container cursor-blink ml-1" />
            </div>
            <button
              type="submit"
              className="bg-accent/10 border border-accent/40 text-accent px-6 py-2 font-headline font-bold text-xs tracking-widest hover:bg-accent hover:text-on-surface transition-all active:scale-95"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)',
              }}
            >
              EXECUTE_LINK
            </button>
          </form>
        </section>

        {/* Right Panel: System Monitor -- hidden on tablet */}
        <div className="hidden lg:block">
          <SystemMonitor />
        </div>
      </div>
    </>
  )
}
