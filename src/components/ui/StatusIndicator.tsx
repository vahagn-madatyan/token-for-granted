import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const statusVariants = cva(
  'inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest',
  {
    variants: {
      status: {
        active: 'text-primary-container',
        stable: 'text-tertiary',
        warning: 'text-secondary',
        error: 'text-error',
        pending: 'text-on-surface-variant',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
)

const dotVariants = cva('w-2 h-2 rounded-full', {
  variants: {
    status: {
      active: 'bg-primary-container animate-pulse',
      stable: 'bg-tertiary',
      warning: 'bg-secondary animate-pulse',
      error: 'bg-error animate-pulse',
      pending: 'bg-on-surface-variant',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
})

interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  label: string
}

export function StatusIndicator({
  status,
  label,
  className,
  ...props
}: StatusIndicatorProps) {
  return (
    <div className={cn(statusVariants({ status }), className)} {...props}>
      <span className={dotVariants({ status })} />
      {label}
    </div>
  )
}
