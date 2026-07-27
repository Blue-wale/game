import { create } from 'zustand'

const useStore = create((set) => ({
  carState: {
    rotation: 0,
    color: '#1a5f7a',
    wheelColor: '#fbbf24',
    wheelStyle: 'modern',
    spoiler: true,
    underglow: true,
    paintFinish: 'metallic',
  },
  setCar: (updates) => set((state) => ({
    carState: { ...state.carState, ...updates },
  })),
  setRotation: (rotation) => set((state) => ({
    carState: { ...state.carState, rotation },
  })),
}))

export { useStore }
