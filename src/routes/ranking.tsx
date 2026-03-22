import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ranking')({
  component: Ranking,
})

function Ranking() {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="font-headline text-4xl text-primary-container">
        VALUE MATRIX
      </h1>
    </div>
  )
}
