import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const hexCardVariants = cva('relative overflow-hidden', {
  variants: {
    elevation: {
      low: 'bg-surface-container-low',
      medium: 'bg-surface-container',
      high: 'bg-surface-container-high',
      highest: 'bg-surface-container-highest',
    },
    clip: {
      none: '',
      tr: 'clipped-tr',
      bl: 'clipped-bl',
      full: 'clipped-full',
    },
    glow: {
      none: '',
      cyan: 'shadow-[0_0_30px_rgba(0,245,255,0.15)]',
      accent: 'shadow-[0_0_30px_rgba(255,70,85,0.15)]',
    },
  },
  defaultVariants: {
    elevation: 'low',
    clip: 'tr',
    glow: 'none',
  },
})

interface HexCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hexCardVariants> {
  borderAccent?: 'primary' | 'secondary' | 'accent' | 'none'
}

export function HexCard({
  children,
  elevation,
  clip,
  glow,
  borderAccent = 'primary',
  className,
  ...props
}: HexCardProps) {
  const borderClasses = {
    primary: 'border-l border-primary-container/30',
    secondary: 'border-l border-secondary/30',
    accent: 'border-l border-accent/30',
    none: '',
  }

  return (
    <div
      className={cn(
        hexCardVariants({ elevation, clip, glow }),
        borderClasses[borderAccent],
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
