import {
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { HexCard } from '~/components/ui/HexCard'
import { GlitchText } from '~/components/ui/GlitchText'
import { NeonButton } from '~/components/ui/NeonButton'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error('DefaultCatchBoundary Error:', error)

  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred'

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <HexCard
        elevation="high"
        glow="accent"
        borderAccent="accent"
        clip="tr"
        className="max-w-lg w-full text-center space-y-6"
      >
        <GlitchText
          text="SYSTEM ERROR"
          as="h1"
          active
          className="text-4xl text-error font-headline font-black"
        />

        <div className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
          ERR_TRACE: {errorMessage}
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <NeonButton
            variant="primary"
            onClick={() => router.invalidate()}
          >
            REINITIALIZE
          </NeonButton>

          {isRoot ? (
            <Link
              to="/"
              className="font-label text-xs text-primary-container hover:text-primary transition-colors uppercase tracking-widest"
            >
              RETURN TO BASE
            </Link>
          ) : (
            <Link
              to="/"
              className="font-label text-xs text-primary-container hover:text-primary transition-colors uppercase tracking-widest"
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
            >
              RETURN TO BASE
            </Link>
          )}
        </div>
      </HexCard>
    </div>
  )
}
