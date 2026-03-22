import { cn } from '~/lib/cn'

interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export function ProgressBar({
  value,
  label,
  showValue = true,
  color = 'primary',
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const colorClasses = {
    primary: 'bg-primary-container',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    accent: 'bg-accent',
  }

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="font-label text-[10px] text-outline uppercase tracking-widest">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-label text-[10px] text-on-surface-variant">
              {clampedValue.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('bg-surface-container-highest overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full',
            colorClasses[color],
            animated && 'transition-all duration-1000 ease-out'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
