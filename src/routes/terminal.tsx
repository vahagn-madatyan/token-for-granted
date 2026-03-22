import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terminal')({
  component: Terminal,
})

function Terminal() {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="font-headline text-4xl text-primary-container">
        TACTICAL TERMINAL
      </h1>
    </div>
  )
}
