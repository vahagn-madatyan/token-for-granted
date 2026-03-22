import * as React from 'react'
import { ScanlineOverlay } from '~/components/ui/ScanlineOverlay'
import { Header } from '~/components/layout/Header'
import { Footer } from '~/components/layout/Footer'

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Scanline Overlay */}
      <ScanlineOverlay />

      {/* Tactical HUD Frame */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[20px] border-transparent">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary-container/40 animate-bracket-in" />
        <div
          className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary-container/40 animate-bracket-in"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary-container/40 animate-bracket-in"
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary-container/40 animate-bracket-in"
          style={{ animationDelay: '0.3s' }}
        />

        {/* Top-left corner info */}
        <div className="absolute top-4 left-4 font-label text-[10px] text-outline opacity-40 flex flex-col">
          <span>COORD_REF: 40.7128 N, 74.0060 W</span>
          <span>SYSTEM_STABLE: 99.98%</span>
        </div>

        {/* Bottom-right corner info */}
        <div className="absolute bottom-4 right-4 font-label text-[10px] text-outline opacity-40 flex flex-col items-end">
          <span>VERSION: 0.9.5-BETA</span>
          <span>ENCRYPTION: AES-ARCANA-256</span>
        </div>

        {/* Center horizontal lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-primary-container/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-primary-container/20" />
      </div>

      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface-container-high/40 via-surface to-surface" />
        <div className="absolute inset-0 noise-bg" />
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] animate-flicker" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] animate-flicker"
          style={{ animationDelay: '1.5s' }}
        />
        {/* Dot grid */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#00f5ff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
