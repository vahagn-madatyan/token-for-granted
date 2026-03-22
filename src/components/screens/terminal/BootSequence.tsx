import { useState, useEffect, useCallback, useRef } from 'react'
import type { LogEntry } from '~/components/ui/TerminalLog'
import type { ValuationResult } from '~/core/types'
import { formatTokenCount, getBestValueProvider } from '~/core/token-pricing'

const BOOT_ENTRIES: LogEntry[] = [
  {
    timestamp: '08:42:12',
    level: 'INFO',
    source: 'BOOT_SEQUENCE',
    message: 'Initializing Token Conversion Engine...',
  },
  {
    timestamp: '08:42:15',
    level: 'INFO',
    source: 'CORE_STATUS',
    message: 'Connecting to AI provider network... [OK]',
  },
  {
    timestamp: '08:42:21',
    level: 'WARNING',
    source: 'WARNING',
    message:
      'Loading pricing matrix for 8 providers. Calibrating token rates...',
  },
  {
    timestamp: '08:43:02',
    level: 'INFO',
    source: 'SYS_LOG',
    message:
      'Provider sync complete: OpenAI, Anthropic, Google, Meta, Mistral -- All endpoints active',
  },
  {
    timestamp: '08:44:18',
    level: 'INFO',
    source: 'AI_FEED',
    message:
      'Token conversion pipeline ready. Monitoring for new submissions...',
  },
  {
    timestamp: '08:45:01',
    level: 'INFO',
    source: 'SYS_LOG',
    message: 'D1 database connection established. Feed throughput at 98%.',
  },
  {
    timestamp: '08:45:33',
    level: 'CRITICAL',
    source: 'CRITICAL',
    message:
      'Reminder: every dollar you spend is AI tokens you did not buy. Firewall holding.',
  },
  {
    timestamp: '08:46:55',
    level: 'INFO',
    source: 'CORE',
    message: 'Live feed active. Streaming conversion data...',
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

/**
 * Convert a ValuationResult to a log entry for the terminal feed.
 */
export function valuationToLogEntry(valuation: ValuationResult): LogEntry {
  const itemName = valuation.item_name ?? 'Unknown'
  const itemPrice = valuation.item_price ?? 0
  const priceStr = '$' + itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  let bestTokenStr = '?'
  let topAction = 'pending analysis'

  if (valuation.token_conversions && valuation.token_conversions.length > 0) {
    const bestValue = getBestValueProvider(valuation.token_conversions)
    bestTokenStr = formatTokenCount(bestValue.tokens_you_get_input)
  }

  if (valuation.what_you_could_do && valuation.what_you_could_do.length > 0) {
    topAction = valuation.what_you_could_do[0].action
  }

  // Use the valuation's created_at for timestamp, or current time
  let timestamp = getCurrentTimestamp()
  if (valuation.created_at) {
    try {
      const d = new Date(valuation.created_at)
      timestamp = [
        String(d.getHours()).padStart(2, '0'),
        String(d.getMinutes()).padStart(2, '0'),
        String(d.getSeconds()).padStart(2, '0'),
      ].join(':')
    } catch {
      // use current time
    }
  }

  return {
    timestamp,
    level: 'SUCCESS',
    source: 'CONVERSION',
    message: `"${itemName}" -> ${priceStr} -> ${bestTokenStr} tokens -> "${topAction}"`,
  }
}

export function useBootSequence() {
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [isBooting, setIsBooting] = useState(true)
  const bootComplete = useRef(false)

  // Boot sequence: add entries one at a time with staggered delay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_ENTRIES.forEach((entry, i) => {
      const timer = setTimeout(() => {
        setEntries((prev) => [...prev, entry])
        if (i === BOOT_ENTRIES.length - 1) {
          setIsBooting(false)
          bootComplete.current = true
        }
      }, (i + 1) * 200)
      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  const addEntry = useCallback((entry: LogEntry) => {
    setEntries((prev) => [...prev, entry])
  }, [])

  const addEntries = useCallback((newEntries: LogEntry[]) => {
    setEntries((prev) => [...prev, ...newEntries])
  }, [])

  return { entries, isBooting, addEntry, addEntries }
}
