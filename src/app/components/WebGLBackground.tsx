'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSectionContext } from './SectionContext'
import { getPageColor } from '../lib/utils'

// Custom hook for scroll tracking
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return scrollProgress
}

// Organic tunnel/torus structure with scroll-based wave
function OrganicTunnel({ position, color = '#00ffff', scale = 1, speed = 1, scrollProgress = 0 }: { 
  position: [number, number, number], 
  color: string, 
  scale: number,
  speed?: number,
  scrollProgress?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [previousColor, setPreviousColor] = useState(color)
  const [currentColor, setCurrentColor] = useState(color)
  const [spreadProgress, setSpreadProgress] = useState(0)
  const [isSpreading, setIsSpreading] = useState(false)
  
  // Color spreading effect
  useEffect(() => {
    if (color !== currentColor) {
      setPreviousColor(currentColor)
      setCurrentColor(color)
      setSpreadProgress(0)
      setIsSpreading(true)
    }
  }, [color, currentColor])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Color spreading animation
      if (isSpreading && spreadProgress < 1) {
        const newProgress = spreadProgress + 0.002 // Much slower for dramatic effect
        setSpreadProgress(newProgress)
        
        // Update vertex colors for artistic random spreading
        const colors = meshRef.current.geometry.attributes.color.array as Float32Array
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array
        const newColor = new THREE.Color(currentColor)
        const oldColor = new THREE.Color(previousColor)
        
                // Create highly artistic spreading pattern
        const time = state.clock.elapsedTime
        const spreadRadius = spreadProgress * 20 // Larger radius for complete coverage
        
        for (let i = 0; i < colors.length; i += 3) {
          const vertexIndex = i / 3
          const vertexX = positions[vertexIndex * 3]
          const vertexY = positions[vertexIndex * 3 + 1]
          const vertexZ = positions[vertexIndex * 3 + 2]
          
          // Create multiple artistic spreading centers with complex movement
          const centers = [
            { 
              x: Math.sin(time * 0.3) * 3 + Math.cos(time * 0.7) * 1.5, 
              y: -6 + spreadProgress * 12 + Math.sin(time * 0.4) * 2, 
              z: Math.cos(time * 0.2) * 2.5 + Math.sin(time * 0.6) * 1.8 
            },
            { 
              x: Math.cos(time * 0.5) * 2.5 + Math.sin(time * 0.9) * 1.2, 
              y: -4 + spreadProgress * 10 + Math.cos(time * 0.3) * 1.5, 
              z: Math.sin(time * 0.4) * 3 + Math.cos(time * 0.8) * 1.3 
            },
            { 
              x: Math.sin(time * 0.8) * 2 + Math.cos(time * 0.4) * 2.2, 
              y: -5 + spreadProgress * 11 + Math.sin(time * 0.6) * 1.8, 
              z: Math.cos(time * 0.5) * 2.8 + Math.sin(time * 0.7) * 1.6 
            },
            { 
              x: Math.cos(time * 0.6) * 1.8 + Math.sin(time * 0.2) * 2.5, 
              y: -3 + spreadProgress * 9 + Math.cos(time * 0.5) * 2.1, 
              z: Math.sin(time * 0.3) * 2.2 + Math.cos(time * 0.9) * 1.4 
            }
          ]
          
          // Calculate distance to nearest spreading center with artistic weighting
          let minDistance = Infinity
          let nearestCenter = centers[0]
          
          centers.forEach((center, centerIndex) => {
            const baseDistance = Math.sqrt(
              Math.pow(vertexX - center.x, 2) + 
              Math.pow(vertexY - center.y, 2) + 
              Math.pow(vertexZ - center.z, 2)
            )
            
            // Add artistic weighting based on center index and time
            const artisticWeight = 1 + Math.sin(time * (0.3 + centerIndex * 0.2)) * 0.3
            const weightedDistance = baseDistance * artisticWeight
            
            if (weightedDistance < minDistance) {
              minDistance = weightedDistance
              nearestCenter = center
            }
          })
          
          // Create complex organic noise patterns
          const noise1 = Math.sin(vertexX * 4 + time * 0.8) * Math.cos(vertexZ * 3 + time * 0.4) * 0.6
          const noise2 = Math.cos(vertexY * 2 + time * 0.6) * Math.sin(vertexX * 2.5 + time * 0.3) * 0.4
          const noise3 = Math.sin(vertexZ * 3.5 + time * 0.7) * Math.cos(vertexY * 1.8 + time * 0.5) * 0.5
          const combinedNoise = noise1 + noise2 + noise3
          const adjustedDistance = minDistance + combinedNoise
          
          // Create artistic spreading threshold with complex variation
          const baseThreshold = spreadRadius + Math.sin(vertexIndex * 0.15 + time * 0.8) * 1.5
          const artisticVariation = Math.cos(vertexX * 0.5 + time * 0.4) * Math.sin(vertexZ * 0.7 + time * 0.6) * 0.8
          const spreadThreshold = baseThreshold + artisticVariation
          
                      if (adjustedDistance < spreadThreshold) {
              // Calculate highly artistic transition progress
              const baseProgress = Math.max(0, Math.min(1, (spreadThreshold - adjustedDistance) / 3.0))
              
              // Create complex artistic curve with multiple influences
              const curve1 = Math.pow(baseProgress, 0.6)
              const curve2 = Math.sin(baseProgress * Math.PI) * 0.3
              const curve3 = Math.cos(baseProgress * Math.PI * 2) * 0.1
              const artisticProgress = Math.max(0, Math.min(1, curve1 + curve2 + curve3))
              
              // Smooth transition from old to new color
              const lerpedColor = oldColor.clone().lerp(newColor, artisticProgress)
              
              colors[i] = lerpedColor.r
              colors[i + 1] = lerpedColor.g
              colors[i + 2] = lerpedColor.b
            }
            // Vertices outside the spread keep the old color
        }
        
        meshRef.current.geometry.attributes.color.needsUpdate = true
        
        if (newProgress >= 1) {
          setIsSpreading(false)
        }
      }
      
      // Keep existing rotation animation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05 * speed
      
      // Add scroll-based wave animation
      const waveIntensity = Math.sin(scrollProgress * Math.PI * 4) * 0.3
      const waveOffset = scrollProgress * Math.PI * 2
      
      // Apply wave effect to scale and position
      meshRef.current.scale.setScalar(scale + waveIntensity * 0.2)
      meshRef.current.position.y = position[1] + Math.sin(waveOffset) * 2
      meshRef.current.position.x = position[0] + Math.cos(waveOffset) * 1.5
    }
  })
  
  // Create custom geometry for organic tunnel with vertex colors
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = []
    const colors = []
    const indices = []
    
    const segments = 64
    const rings = 32
    
    // Create tunnel with varying radius
    for (let i = 0; i <= rings; i++) {
      const v = i / rings
      const angle = v * Math.PI * 2
      
      // Varying radius for organic feel
      const baseRadius = 2 + Math.sin(v * Math.PI * 4) * 0.5
      
      for (let j = 0; j <= segments; j++) {
        const u = j / segments
        const segmentAngle = u * Math.PI * 2
        
        // Create organic variation
        const radiusVariation = 1 + Math.sin(u * Math.PI * 8) * 0.2 + Math.cos(v * Math.PI * 6) * 0.1
        const radius = baseRadius * radiusVariation
        
        const x = Math.cos(segmentAngle) * radius
        const y = Math.sin(segmentAngle) * radius
        const z = Math.sin(angle) * 3 + Math.cos(angle * 2) * 1.5
        
        vertices.push(x, y, z)
        
        // Add vertex colors for spreading effect - use initial color
        const color = new THREE.Color(previousColor)
        colors.push(color.r, color.g, color.b)
      }
    }
    
    // Create indices for wireframe
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j
        const b = a + segments + 1
        const c = a + 1
        const d = b + 1
        
        // Create lines instead of triangles for wireframe effect
        indices.push(a, c, a, b, b, d, c, d)
      }
    }
    
    geo.setIndex(indices)
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    
    return geo
  }, []) // Remove currentColor dependency to prevent geometry recreation
  
  useFrame((state) => {
    if (meshRef.current) {
      // Keep existing rotation animation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05 * speed
      
      // Add scroll-based wave animation
      const waveIntensity = Math.sin(scrollProgress * Math.PI * 4) * 0.3
      const waveOffset = scrollProgress * Math.PI * 2
      
      // Apply wave effect to scale and position
      meshRef.current.scale.setScalar(scale + waveIntensity * 0.2)
      meshRef.current.position.y = position[1] + Math.sin(waveOffset) * 2
      meshRef.current.position.x = position[0] + Math.cos(waveOffset) * 1.5
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} />
      <meshBasicMaterial 
        vertexColors={true}
        wireframe 
        transparent 
        opacity={0.4} 
      />
    </mesh>
  )
}

// Main 3D scene component with scroll integration
function Scene({ currentColor, scrollProgress }: { currentColor: string, scrollProgress: number }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 12)
  }, [camera])
  
  useFrame((state) => {
    // Add subtle camera movement based on scroll
    const waveOffset = scrollProgress * Math.PI * 2
    camera.position.x = Math.sin(waveOffset) * 0.5
    camera.position.y = Math.cos(waveOffset) * 0.3
    camera.lookAt(0, 0, 0)
  })
  
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color={currentColor} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color={currentColor} />
      
      {/* Main organic structures with scroll wave */}
      <OrganicTunnel 
        position={[0, 0, -10]} 
        color={currentColor} 
        scale={12} 
        speed={0.1} 
        scrollProgress={scrollProgress}
      />
    </>
  )
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-cyan-400 text-lg">Loading WebGL...</div>
      </div>
    </div>
  )
}

// Main WebGL Background component
export default function WebGLBackground({ scrollY }: { scrollY?: number }) {
  const { currentSection } = useSectionContext()
  const [currentColor, setCurrentColor] = useState('#00ffff')
  const [webglSupported, setWebglSupported] = useState(true)
  const scrollProgress = useScrollProgress()
  
  // Color mapping for different sections
  
  useEffect(() => {
    setCurrentColor(getPageColor(currentSection))
  }, [currentSection])
  
  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      setWebglSupported(false)
    }
  }, [])
  
  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
        </div>
      </div>
    )
  }
  
  // Convert scrollY to scroll progress (0-1)
  const scrollProgressValue = scrollY ? scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0
  
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
          gl={{ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0a', 1)
          }}
        >
          <Scene currentColor={currentColor} scrollProgress={scrollProgressValue} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}