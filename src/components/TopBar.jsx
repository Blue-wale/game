import React from 'react'

const TopBar = ({ onConfiguratorToggle }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-black tracking-tighter text-white group">
            <span className="text-gold-400 group-hover:text-white transition-colors">PLANAT</span>
            <span>MIUM</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['ABOUT US', 'GARAGE SERVICES', 'CUSTOM BUILDS', 'COLLECTION', 'TRACK EVENTS', 'CONTACT'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-semibold text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
