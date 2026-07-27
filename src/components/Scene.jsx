import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei'
import { Showroom } from './Showroom'
import { AnimatedLights } from './AnimatedLights'
import { useStore } from '../store'

const Scene = () => {
  const { camera } = useThree()
  const carState = useStore(state => state.carState)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cameraTargetRef = useRef({ x: 0, y: 0 })
  const controlsRef = useRef()

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - mouseX
        const deltaY = e.clientY - mouseY
        
        cameraTargetRef.current.x += deltaX * 0.001
        cameraTargetRef.current.y += deltaY * 0.001
        
        // Limit rotation
        cameraTargetRef.current.x = Math.max(-1, Math.min(1, cameraTargetRef.current.x))
        cameraTargetRef.current.y = Math.max(-0.5, Math.min(0.5, cameraTargetRef.current.y))
        
        setMouseX(e.clientX)
        setMouseY(e.clientY)
      }
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)
    const handleMouseLeave = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDragging, mouseX, mouseY])

  // Smooth camera animation
  useFrame(() => {
    // Smoothly return to center when not dragging
    if (!isDragging) {
      cameraTargetRef.current.x *= 0.95
      cameraTargetRef.current.y *= 0.95
    }

    // Apply camera movement
    camera.position.x += (cameraTargetRef.current.x - camera.position.x) * 0.05
    camera.position.y += (2 + cameraTargetRef.current.y - camera.position.y) * 0.05
    camera.lookAt(0, 1, 0)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      
      {/* Lighting System */}
      <AnimatedLights />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* Showroom */}
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0}>
        <Showroom />
      </Float>
      
      {/* Ground Plane with Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </>
  )
}

export default Scene
