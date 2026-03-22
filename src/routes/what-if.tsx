import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/what-if')({
  component: WhatIf,
})

function WhatIf() {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="font-headline text-4xl text-primary-container">
        WHAT IF LAB
      </h1>
    </div>
  )
}
