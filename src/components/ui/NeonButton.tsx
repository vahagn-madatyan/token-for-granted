import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const neonButtonVariants = cva(
  'group relative font-headline font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-crosshair',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white clipped-bl animate-pulse-glow',
        secondary:
          'bg-transparent border border-outline-variant/30 text-secondary hover:border-secondary/50',
        ghost:
          'bg-transparent text-primary-container hover:bg-primary-container/10',
      },
      size: {
        sm: 'py-2 px-6 text-xs',
        md: 'py-3 px-8 text-sm',
        lg: 'py-5 px-12 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  children: React.ReactNode
}

export function NeonButton({
  children,
  variant,
  size,
  className,
  ...props
}: NeonButtonProps) {
  return (
    <button
      className={cn(neonButtonVariants({ variant, size }), className)}
      {...props}
    >
      {/* Hover sweep overlay */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 bg-white/10" />
      <span className="relative z-10 flex items-center gap-4">{children}</span>
    </button>
  )
}
