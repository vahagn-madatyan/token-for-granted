import { forwardRef } from 'react'
import { cn } from '~/lib/cn'

interface TokenInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  ({ label, icon, className, ...props }, ref) => {
    return (
      <div className="relative group">
        {/* Ambient glow on focus */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-container/5 via-accent/5 to-primary-container/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />

        <div className={cn(
          'relative bg-surface-container-lowest clipped-full overflow-hidden',
          className
        )}>
          {/* Floating label */}
          {label && (
            <div className="absolute -top-3 left-8 bg-surface px-3 font-label text-[10px] text-accent border border-accent/30 z-10">
              {label}
            </div>
          )}

          <div className="flex items-center gap-4 px-6 py-4">
            {icon && (
              <span className="text-primary-container shrink-0">{icon}</span>
            )}
            <input
              ref={ref}
              className={cn(
                'bg-transparent border-none focus:ring-0 focus:outline-none',
                'text-3xl md:text-4xl font-headline font-bold text-on-surface',
                'w-full uppercase tracking-tight',
                'placeholder-on-surface-variant/20'
              )}
              {...props}
            />
          </div>

          {/* Scanning line at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_10px_#ff4655]" />
        </div>
      </div>
    )
  }
)

TokenInput.displayName = 'TokenInput'
