import { cn } from '~/lib/cn'
import { useCountUp } from '~/components/animations/useCountUp'
import { HexCard } from './HexCard'

interface MetricDisplayProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  trend?: string
  trendColor?: 'primary' | 'secondary' | 'tertiary' | 'error'
  barValue?: number
  className?: string
}

export function MetricDisplay({
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  duration = 2000,
  trend,
  trendColor = 'primary',
  barValue,
  className,
}: MetricDisplayProps) {
  const animatedValue = useCountUp(value, duration)

  const trendColorClasses = {
    primary: 'text-primary-container',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    error: 'text-error',
  }

  return (
    <HexCard elevation="low" clip="tr" borderAccent="primary" className={className}>
      <div className="font-label text-[10px] text-outline mb-1 uppercase tracking-widest">
        {label}
      </div>
      <div className="text-3xl font-headline font-black text-primary-container">
        {prefix}
        {animatedValue.toFixed(decimals)}
        {suffix && (
          <span className="text-sm font-normal text-on-surface/40 ml-1">{suffix}</span>
        )}
      </div>
      {trend && (
        <div className={cn('text-xs font-bold mt-1', trendColorClasses[trendColor])}>
          {trend}
        </div>
      )}
      {barValue !== undefined && (
        <div className="mt-4 h-1 bg-surface-container-highest overflow-hidden">
          <div
            className="h-full bg-primary-container transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(barValue, 100)}%` }}
          />
        </div>
      )}
    </HexCard>
  )
}
