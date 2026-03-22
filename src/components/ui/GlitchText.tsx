import { cn } from '~/lib/cn'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  className?: string
  active?: boolean
}

export function GlitchText({
  text,
  as: Tag = 'span',
  className,
  active = false,
}: GlitchTextProps) {
  return (
    <Tag
      data-text={text}
      className={cn(
        active ? 'glitch' : 'text-glitch-hover',
        'relative cursor-default',
        className
      )}
    >
      {text}
    </Tag>
  )
}
