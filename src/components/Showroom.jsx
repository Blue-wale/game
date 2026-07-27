import React, { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'

const Showroom = () => {
  const groupRef = useRef()
  const carState = useStore(state => state.carState)
  const { scene } = useThree()
  const [modelLoaded, setModelLoaded] = useState(false)

  // Try to load the GLB model
  let gltf = null
  try {
    gltf = useGLTF('/car.glb')
  } catch (e) {
    console.log('GLB model not found, using fallback car model')
  }

  useEffect(() => {
    if (!groupRef.current) return

    // Clear existing children
    while (groupRef.current.children.length > 0) {
      groupRef.current.remove(groupRef.current.children[0])
    }

    // If we have the GLB model, clone and use it
    if (gltf && gltf.scene) {
      const clonedModel = gltf.scene.clone()
      groupRef.current.add(clonedModel)
      setModelLoaded(true)
      
      // Apply material updates to the model
      clonedModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Update material properties based on car config
          if (child.material) {
            child.material.metalness = 0.8
            child.material.roughness = carState.paintFinish === 'metallic' ? 0.2 : 0.5
            child.material.color.setHex(carState.color.replace('#', '0x'))
          }
        }
      })
    } else {
      // Fallback: Create a procedural car model
      createFallbackCar(groupRef.current, carState)
      setModelLoaded(true)
    }
  }, [carState, gltf])

  const createFallbackCar = (group, carState) => {
    // Car body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4.5)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: carState.color,
      metalness: 0.8,
      roughness: carState.paintFinish === 'metallic' ? 0.2 : 0.5,
      envMapIntensity: 1,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.5
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Windshield
    const windshieldGeometry = new THREE.BoxGeometry(1.8, 0.8, 1.2)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: '#000000',
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
    })
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(0, 1.2, -0.8)
    windshield.castShadow = true
    group.add(windshield)

    // Spoiler
    if (carState.spoiler) {
      const spoilerGeometry = new THREE.BoxGeometry(1.6, 0.1, 0.4)
      const spoilerMaterial = new THREE.MeshStandardMaterial({
        color: carState.color,
        metalness: 0.8,
        roughness: 0.2,
      })
      const spoiler = new THREE.Mesh(spoilerGeometry, spoilerMaterial)
      spoiler.position.set(0, 1.1, -2.3)
      spoiler.rotation.z = 0.3
      spoiler.castShadow = true
      group.add(spoiler)
    }

    // Wheels
    const wheelPositions = [
      [-0.8, 0.4, 1.2],
      [0.8, 0.4, 1.2],
      [-0.8, 0.4, -1.2],
      [0.8, 0.4, -1.2],
    ]

    wheelPositions.forEach((pos) => {
      // Wheel rim
      const rimGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32)
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: carState.wheelColor,
        metalness: 0.9,
        roughness: 0.1,
      })
      const rim = new THREE.Mesh(rimGeometry, rimMaterial)
      rim.position.set(...pos)
      rim.rotation.z = Math.PI / 2
      rim.castShadow = true
      rim.receiveShadow = true
      group.add(rim)

      // Tire
      const tireGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 32)
      const tireMaterial = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.2,
        roughness: 0.8,
      })
      const tire = new THREE.Mesh(tireGeometry, tireMaterial)
      tire.position.set(...pos)
      tire.rotation.z = Math.PI / 2
      tire.castShadow = true
      tire.receiveShadow = true
      group.add(tire)
    })

    // Underglow effect
    if (carState.underglow) {
      const glowGeometry = new THREE.PlaneGeometry(2.2, 4.8)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: '#00ff88',
        transparent: true,
        opacity: 0.3,
        emissive: '#00ff88',
        emissiveIntensity: 0.5,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.set(0, 0.05, 0)
      glow.receiveShadow = false
      group.add(glow)
    }
  }

  useFrame(() => {
    if (groupRef.current && modelLoaded) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return <group ref={groupRef} />
}

export { Showroom }
