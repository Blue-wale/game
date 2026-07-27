import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import ConfiguratorPanel from './components/ConfiguratorPanel'
import TopBar from './components/TopBar'
import { useStore } from './store'

export default function App() {
  const [showConfigurator, setShowConfigurator] = useState(false)
  const carState = useStore(state => state.carState)

  return (
    <div className="w-full h-screen bg-slate-950 relative overflow-hidden">
      {/* 3D Scene */}
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        className="!absolute inset-0"
      >
        <Scene />
      </Canvas>

      {/* Top Navigation */}
      <TopBar onConfiguratorToggle={() => setShowConfigurator(!showConfigurator)} />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-start pl-12 pointer-events-none">
        <div className="max-w-md animate-slide-in">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-white">
              PLANATMIUM:
              <br />
              <span className="text-gold-400">WHERE LEGENDS</span>
              <br />
              RACE.
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Unlock the ultimate in hypercar performance and bespoke engineering.
            </p>
          </div>
          <button
            onClick={() => setShowConfigurator(true)}
            className="pointer-events-auto px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 uppercase tracking-wide"
          >
            Configure Your Dream
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-sm text-gray-400 uppercase tracking-widest">Drag to explore</span>
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Configurator Panel */}
      {showConfigurator && (
        <ConfiguratorPanel onClose={() => setShowConfigurator(false)} />
      )}
    </div>
  )
}
