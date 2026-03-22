import { useEffect, useState } from 'react'

export function useTypewriter(
  text: string,
  speed: number = 50
): { displayText: string; isComplete: boolean } {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex >= text.length) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(intervalId)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => {
      clearInterval(intervalId)
    }
  }, [text, speed, currentIndex >= text.length])

  return {
    displayText: text.slice(0, currentIndex),
    isComplete: currentIndex >= text.length,
  }
}
