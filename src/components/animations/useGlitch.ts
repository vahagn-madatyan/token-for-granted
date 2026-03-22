import { useCallback, useEffect, useRef, useState } from 'react'

export function useGlitch(): {
  ref: React.RefObject<HTMLElement | null>
  triggerGlitch: () => void
  isGlitching: boolean
} {
  const ref = useRef<HTMLElement | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return

    setIsGlitching(true)
    if (ref.current) {
      ref.current.classList.add('glitch')
    }

    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
      if (ref.current) {
        ref.current.classList.remove('glitch')
      }
      timeoutRef.current = null
    }, 300)
  }, [isGlitching])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { ref, triggerGlitch, isGlitching }
}
