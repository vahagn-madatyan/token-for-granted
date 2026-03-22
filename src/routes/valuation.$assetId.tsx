import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/valuation/$assetId')({
  component: Valuation,
})

function Valuation() {
  const { assetId } = Route.useParams()

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="font-headline text-4xl text-primary-container">
        TACTICAL REVEAL
      </h1>
      <p className="mt-4 font-label text-sm text-outline uppercase tracking-widest">
        ASSET_ID: {assetId}
      </p>
    </div>
  )
}
