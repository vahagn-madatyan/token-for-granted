import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const tierBadgeVariants = cva(
  'inline-flex items-center justify-center font-headline font-black uppercase tracking-widest',
  {
    variants: {
      tier: {
        S: 'text-primary-container bg-primary-container/10',
        A: 'text-secondary bg-secondary/10',
        B: 'text-tertiary bg-tertiary/10',
        C: 'text-on-surface-variant bg-on-surface-variant/10',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-lg px-4 py-2',
      },
    },
    defaultVariants: {
      tier: 'C',
      size: 'md',
    },
  }
)

interface TierBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tierBadgeVariants> {}

export function TierBadge({
  tier,
  size,
  className,
  ...props
}: TierBadgeProps) {
  return (
    <span
      className={cn(tierBadgeVariants({ tier, size }), className)}
      {...props}
    >
      {tier}
    </span>
  )
}
