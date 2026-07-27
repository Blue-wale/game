import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'

const ConfiguratorPanel = ({ onClose }) => {
  const { carState, setCar } = useStore()
  const [activeTab, setActiveTab] = useState('paint')

  const paintOptions = [
    { name: 'Midnight Blue', color: '#1a5f7a' },
    { name: 'Pearl White', color: '#f5f5f5' },
    { name: 'Racing Red', color: '#cc0000' },
    { name: 'Stealth Black', color: '#0a0a0a' },
    { name: 'Gold Rush', color: '#fbbf24' },
    { name: 'Electric Green', color: '#00ff88' },
    { name: 'Midnight Purple', color: '#6b21a8' },
    { name: 'Deep Orange', color: '#ff6b35' },
  ]

  const wheelStyles = [
    { name: 'Modern', id: 'modern' },
    { name: 'Classic', id: 'classic' },
    { name: 'Sport', id: 'sport' },
    { name: 'Vintage', id: 'vintage' },
  ]

  const finishes = [
    { name: 'Metallic', id: 'metallic' },
    { name: 'Matte', id: 'matte' },
    { name: 'Pearl', id: 'pearl' },
    { name: 'Satin', id: 'satin' },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 500 }}
        transition={{ duration: 0.4 }}
        className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-6 border-b border-white/10">
          <h2 className="text-3xl font-black text-white mb-2">CONFIGURATOR</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Customize Your Hypercar</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-6 border-b border-white/10">
          {[
            { id: 'paint', label: 'Paint' },
            { id: 'wheels', label: 'Wheels' },
            { id: 'options', label: 'Options' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold uppercase text-xs tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'text-gold-400 border-b-2 border-gold-400'
                  : 'text-gray-400 hover:text-white border-b-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Paint Tab */}
          {activeTab === 'paint' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Paint Color Selection */}
              <div>
                <label className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4 block">
                  Paint Color
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {paintOptions.map((paint) => (
                    <button
                      key={paint.name}
                      onClick={() => setCar({ color: paint.color })}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        carState.color === paint.color
                          ? 'border-gold-400 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-full h-8 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: paint.color }}
                      />
                      <span className="text-xs font-semibold text-white">{paint.name}</span>
                      {carState.color === paint.color && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gold-400 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paint Finish */}
              <div>
                <label className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4 block">
                  Paint Finish
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {finishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setCar({ paintFinish: finish.id })}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        carState.paintFinish === finish.id
                          ? 'border-gold-400 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{finish.name}</span>
                      {carState.paintFinish === finish.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gold-400 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Wheels Tab */}
          {activeTab === 'wheels' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Wheel Style */}
              <div>
                <label className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4 block">
                  Wheel Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {wheelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCar({ wheelStyle: style.id })}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        carState.wheelStyle === style.id
                          ? 'border-gold-400 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{style.name}</span>
                      {carState.wheelStyle === style.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gold-400 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wheel Color */}
              <div>
                <label className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4 block">
                  Wheel Color
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ name: 'Gold', color: '#fbbf24' }, { name: 'Silver', color: '#c0c0c0' }, { name: 'Black', color: '#000000' }, { name: 'Bronze', color: '#cd7f32' }].map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setCar({ wheelColor: option.color })}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        carState.wheelColor === option.color
                          ? 'border-gold-400 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-full h-8 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-xs font-semibold text-white">{option.name}</span>
                      {carState.wheelColor === option.color && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gold-400 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Options Tab */}
          {activeTab === 'options' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="font-semibold text-white">Carbon Spoiler</span>
                <button
                  onClick={() => setCar({ spoiler: !carState.spoiler })}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    carState.spoiler ? 'bg-gold-400' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: carState.spoiler ? 24 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="font-semibold text-white">Underglow Lights</span>
                <button
                  onClick={() => setCar({ underglow: !carState.underglow })}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    carState.underglow ? 'bg-gold-400' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: carState.underglow ? 24 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-gold-400 to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-gold-400/50 transition-all uppercase tracking-wider">
            Customize Now
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all uppercase tracking-wider border border-white/10"
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConfiguratorPanel
