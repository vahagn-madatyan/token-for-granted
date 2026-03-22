import { cn } from '~/lib/cn'

type LogLevel = 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS' | 'DEBUG'

interface LogEntry {
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

interface TerminalLogProps {
  entries: LogEntry[]
  maxHeight?: string
  className?: string
}

const levelColors: Record<LogLevel, string> = {
  INFO: 'text-primary-container',
  SUCCESS: 'text-tertiary',
  WARNING: 'text-secondary',
  CRITICAL: 'text-error',
  DEBUG: 'text-on-surface-variant',
}

const levelBgColors: Record<LogLevel, string> = {
  INFO: 'bg-primary-container/10',
  SUCCESS: 'bg-tertiary/10',
  WARNING: 'bg-secondary/10',
  CRITICAL: 'bg-error/10',
  DEBUG: 'bg-on-surface-variant/10',
}

export function TerminalLog({ entries, maxHeight = '400px', className }: TerminalLogProps) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest font-mono text-sm overflow-y-auto',
        className
      )}
      style={{ maxHeight }}
    >
      {entries.map((entry, i) => (
        <div
          key={i}
          className={cn(
            'flex items-start gap-3 px-4 py-1.5 border-b border-outline-variant/10',
            'hover:bg-surface-container-low/50 transition-colors'
          )}
        >
          {/* Timestamp */}
          <span className="text-outline shrink-0 tabular-nums">
            [{entry.timestamp}]
          </span>

          {/* Level badge */}
          <span className={cn(
            'shrink-0 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
            levelColors[entry.level],
            levelBgColors[entry.level]
          )}>
            {entry.level}
          </span>

          {/* Source */}
          <span className="text-on-surface-variant shrink-0">
            {entry.source}:
          </span>

          {/* Message */}
          <span className="text-on-surface break-all">
            {entry.message}
          </span>
        </div>
      ))}
    </div>
  )
}

export type { LogEntry, LogLevel }
