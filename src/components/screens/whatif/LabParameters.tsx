import { useState } from 'react'
import { cn } from '~/lib/cn'

interface LabParametersProps {
  onRunSimulation?: () => void
}

const engines = [
  { id: 'neural-void', name: 'NEURAL_VOID_V4', icon: '\u26A1', selected: true },
  { id: 'chronos-logic', name: 'CHRONOS_LOGIC', icon: '\u23F3', selected: false },
  { id: 'quantum-debate', name: 'QUANTUM_DEBATE', icon: '\u2B22', selected: false },
] as const

export function LabParameters({ onRunSimulation }: LabParametersProps) {
  const [selectedEngine, setSelectedEngine] = useState('neural-void')
  const [fuelValue, setFuelValue] = useState(78)

  const fuelDisplay = ((fuelValue / 100) * 11.8).toFixed(1) + 'M'

  return (
    <div className="w-80 border-r border-outline-variant/10 p-8 flex flex-col gap-8 bg-surface-container-low/40 backdrop-blur-sm relative overflow-hidden group/sidebar">
      {/* Scanning line on hover */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-primary-container/30 shadow-[0_0_15px_rgba(0,245,255,0.8)] pointer-events-none opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:animate-[scan-parameters_1.5s_linear_infinite] transition-opacity" />

      {/* Title */}
      <div className="space-y-2">
        <h2 className="font-headline text-2xl font-black text-primary-container tracking-tighter uppercase leading-none">
          Lab Parameters
        </h2>
        <div className="w-12 h-1 bg-primary-container" />
      </div>

      {/* AI Engine Architecture */}
      <div className="space-y-4">
        <label className="font-label text-[10px] text-outline tracking-widest uppercase">
          AI Engine Architecture
        </label>
        <div className="grid grid-cols-1 gap-2">
          {engines.map((engine) => {
            const isSelected = selectedEngine === engine.id
            return (
              <button
                key={engine.id}
                onClick={() => setSelectedEngine(engine.id)}
                className={cn(
                  'group flex items-center justify-between p-3 text-left relative overflow-hidden transition-all',
                  isSelected
                    ? 'bg-surface-container-highest border border-primary-container/20'
                    : 'bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container-highest'
                )}
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)' }}
              >
                <span
                  className={cn(
                    'font-headline font-bold text-xs transition-colors relative z-10',
                    isSelected
                      ? 'text-primary-container'
                      : 'text-outline group-hover:text-primary-container'
                  )}
                >
                  {engine.name}
                </span>
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span
                    className={cn(
                      'text-sm transition-transform relative z-10',
                      isSelected
                        ? 'text-primary-container'
                        : 'text-outline group-hover:text-primary-container'
                    )}
                  >
                    {engine.icon}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Token Fuel Allocation */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="font-label text-[10px] text-outline tracking-widest uppercase">
            Token Fuel Allocation
          </label>
          <span className="font-headline font-bold text-primary-container text-sm">
            {fuelDisplay}
          </span>
        </div>
        <div className="relative h-6 flex items-center">
          <div
            className="absolute inset-0 bg-surface-container-lowest border border-outline-variant/20"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%)' }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 bg-primary-container/20 border-r-2 border-primary-container"
            style={{ width: `${fuelValue}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={fuelValue}
            onChange={(e) => setFuelValue(Number(e.target.value))}
            className="w-full h-full opacity-0 cursor-pointer z-10 relative"
          />
        </div>
      </div>

      {/* RUN SIMULATION button */}
      <div className="mt-auto space-y-4">
        <button
          onClick={onRunSimulation}
          className="w-full bg-accent text-surface font-headline font-bold py-4 text-xs tracking-widest uppercase hover:bg-accent/90 transition-colors shadow-[0_0_15px_rgba(255,70,85,0.3)] relative overflow-hidden"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%)' }}
        >
          <span className="relative z-10">RUN SIMULATION</span>
        </button>
        <div className="font-label text-[8px] text-outline/30 text-center uppercase tracking-widest">
          VERIFYING_HEXTECH_STABILITY...
        </div>
      </div>
    </div>
  )
}
