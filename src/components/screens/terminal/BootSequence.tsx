import { useState, useEffect, useCallback, useRef } from 'react'
import type { LogEntry } from '~/components/ui/TerminalLog'

const BOOT_ENTRIES: LogEntry[] = [
  {
    timestamp: '08:42:12',
    level: 'INFO',
    source: 'BOOT_SEQUENCE',
    message: 'Initializing Tactical Arcana heuristic engine...',
  },
  {
    timestamp: '08:42:15',
    level: 'INFO',
    source: 'CORE_STATUS',
    message: 'Loading assets from VAL_ARCHIVE_SECTOR_07... [OK]',
  },
  {
    timestamp: '08:42:21',
    level: 'WARNING',
    source: 'WARNING',
    message:
      "Anomalous token detected in 'PHOENIX' profile valuation. Recalibrating...",
  },
  {
    timestamp: '08:43:02',
    level: 'INFO',
    source: 'SYS_LOG',
    message:
      "Processing asset: 'ORION_PRIME_VANDAL' -- Current Valuation: 4,200 ARC -- Market Latency: 12ms -- Sentiment Score: 0.89 (BULLISH)",
  },
  {
    timestamp: '08:44:18',
    level: 'INFO',
    source: 'AI_FEED',
    message:
      'Global volatility spike detected in Sector 4. Adjusting risk parameters.',
  },
  {
    timestamp: '08:45:01',
    level: 'INFO',
    source: 'SYS_LOG',
    message: "Node connection 'SHA-2' stabilized. Data throughput at 98%.",
  },
  {
    timestamp: '08:45:33',
    level: 'CRITICAL',
    source: 'CRITICAL',
    message:
      'Unidentified protocol access attempt from external IP: 192.168.0.XX. Firewall holding.',
  },
  {
    timestamp: '08:46:55',
    level: 'INFO',
    source: 'CORE',
    message: 'Ready for operator instruction. Terminal awaiting command...',
  },
]

const ONGOING_ENTRIES: Omit<LogEntry, 'timestamp'>[] = [
  {
    level: 'INFO',
    source: 'NET_SCAN',
    message: 'Heartbeat check: all 5 nodes responding within tolerance.',
  },
  {
    level: 'SUCCESS',
    source: 'CACHE',
    message: 'KV cache hit ratio: 94.2% -- operating above threshold.',
  },
  {
    level: 'WARNING',
    source: 'AI_CORE',
    message:
      'Model temperature drift detected: +0.03 above baseline. Auto-correcting.',
  },
  {
    level: 'INFO',
    source: 'VALUATION',
    message:
      'New asset ingested: QUANTUM_SILK_SCARF -- Preliminary tier: B',
  },
  {
    level: 'DEBUG',
    source: 'METRICS',
    message: 'System uptime: 14h 22m 41s -- No restart required.',
  },
]

function getCurrentTimestamp(): string {
  const now = new Date()
  return [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join(':')
}

export function useBootSequence() {
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [isBooting, setIsBooting] = useState(true)
  const ongoingIndex = useRef(0)

  // Boot sequence: add entries one at a time with staggered delay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_ENTRIES.forEach((entry, i) => {
      const timer = setTimeout(() => {
        setEntries((prev) => [...prev, entry])
        if (i === BOOT_ENTRIES.length - 1) {
          setIsBooting(false)
        }
      }, (i + 1) * 200)
      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  // Ongoing log entries after boot completes
  useEffect(() => {
    if (isBooting) return

    const interval = setInterval(
      () => {
        const template = ONGOING_ENTRIES[ongoingIndex.current % ONGOING_ENTRIES.length]
        const entry: LogEntry = {
          ...template,
          timestamp: getCurrentTimestamp(),
        }
        setEntries((prev) => [...prev, entry])
        ongoingIndex.current += 1
      },
      4000 + Math.random() * 2000,
    )

    return () => clearInterval(interval)
  }, [isBooting])

  const addEntry = useCallback((entry: LogEntry) => {
    setEntries((prev) => [...prev, entry])
  }, [])

  return { entries, isBooting, addEntry }
}
