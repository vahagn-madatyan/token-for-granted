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
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-container/10 via-accent/5 to-primary-container/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className={cn(
          'relative bg-surface-container-high/60 border border-outline-variant/20 overflow-hidden',
          'group-focus-within:border-primary-container/40 transition-colors duration-300',
          className
        )}>
          {/* Floating label */}
          {label && (
            <div className="absolute -top-3 left-6 bg-surface-container-high px-3 py-0.5 font-label text-[10px] text-primary-container/70 uppercase tracking-widest z-10">
              {label}
            </div>
          )}

          <div className="flex items-center gap-4 px-6 py-5">
            {icon && (
              <span className="text-primary-container shrink-0">{icon}</span>
            )}
            <input
              ref={ref}
              className={cn(
                'bg-transparent border-none focus:ring-0 focus:outline-none',
                'text-2xl md:text-3xl font-headline font-bold text-on-surface',
                'w-full uppercase tracking-tight',
                'placeholder-on-surface-variant/30'
              )}
              {...props}
            />
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 opacity-60 group-focus-within:opacity-100 transition-opacity" />
          {/* Corner accent marks */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary-container/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary-container/30" />
        </div>
      </div>
    )
  }
)

TokenInput.displayName = 'TokenInput'
