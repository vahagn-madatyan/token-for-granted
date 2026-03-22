import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-headline text-4xl text-primary tracking-tight">
          TOKEN FOR GRANTED
        </h1>
        <p className="mt-4 text-on-surface-variant font-body text-lg">
          TACTICAL ARCANA // SYSTEM ONLINE
        </p>
      </div>
    </div>
  )
}
