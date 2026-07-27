import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AnimatedLights = () => {
  const spotLight1Ref = useRef()
  const spotLight2Ref = useRef()
  const spotLight3Ref = useRef()
  const pointLightRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Animated spotlight 1
    if (spotLight1Ref.current) {
      spotLight1Ref.current.position.x = Math.sin(time * 0.5) * 8
      spotLight1Ref.current.intensity = 1 + Math.sin(time * 0.8) * 0.3
    }

    // Animated spotlight 2
    if (spotLight2Ref.current) {
      spotLight2Ref.current.position.z = Math.cos(time * 0.5) * 8
      spotLight2Ref.current.intensity = 1.2 + Math.cos(time * 0.7) * 0.4
    }

    // Animated spotlight 3
    if (spotLight3Ref.current) {
      spotLight3Ref.current.intensity = 0.8 + Math.sin(time * 1) * 0.2
    }

    // Ambient light pulse
    if (pointLightRef.current) {
      pointLightRef.current.intensity = 0.3 + Math.sin(time * 0.6) * 0.1
    }
  })

  return (
    <>
      {/* Main spotlight from above */}
      <spotLight
        ref={spotLight1Ref}
        position={[5, 8, 5]}
        angle={Math.PI / 3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#ffffff"
      />

      {/* Side spotlight */}
      <spotLight
        ref={spotLight2Ref}
        position={[-8, 6, 0]}
        angle={Math.PI / 2.5}
        penumbra={0.8}
        intensity={1.2}
        castShadow
        color="#ffffff"
      />

      {/* Accent spotlight */}
      <spotLight
        ref={spotLight3Ref}
        position={[3, 7, -6]}
        angle={Math.PI / 3}
        penumbra={1}
        intensity={0.8}
        castShadow
        color="#fbbf24"
      />

      {/* Ambient fill light */}
      <ambientLight intensity={0.4} />

      {/* Point light for overall glow */}
      <pointLight
        ref={pointLightRef}
        position={[0, 3, 0]}
        intensity={0.3}
        color="#ffffff"
        distance={20}
      />
    </>
  )
}

export { AnimatedLights }
