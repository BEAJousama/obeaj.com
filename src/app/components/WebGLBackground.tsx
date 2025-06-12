'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSectionContext } from './SectionContext'

// Organic tunnel/torus structure
function OrganicTunnel({ position, color = '#00ffff', scale = 1, speed = 1 }: { 
  position: [number, number, number], 
  color: string, 
  scale: number,
  speed?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create custom geometry for organic tunnel
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = []
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
    geo.computeVertexNormals()
    
    return geo
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05 * speed
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  )
}

// Flowing organic curves
// function FlowingCurves({ color = '#00ffff' }) {
//   const groupRef = useRef<THREE.Group>(null)
  
//   const curves = useMemo(() => {
//     const curveGeometries = []
    
//     // Create multiple organic curves
//     for (let curveIndex = 0; curveIndex < 5; curveIndex++) {
//       const points = []
//       const segments = 200
      
//       for (let i = 0; i <= segments; i++) {
//         const t = (i / segments) * Math.PI * 4
//         const offset = curveIndex * Math.PI * 0.4
        
//         // Create organic flowing curves
//         const radius = 3 + Math.sin(t * 0.5 + offset) * 1.5
//         const height = Math.sin(t + offset) * 2
//         const spiral = t * 0.3
        
//         const x = Math.cos(spiral + offset) * radius + Math.sin(t * 2) * 0.5
//         const y = height + Math.cos(t * 3 + offset) * 0.8
//         const z = Math.sin(spiral + offset) * radius + Math.cos(t * 1.5) * 0.3
        
//         points.push(new THREE.Vector3(x, y, z))
//       }
      
//       const curve = new THREE.CatmullRomCurve3(points)
//       const geometry = new THREE.TubeGeometry(curve, segments, 0.02, 8, false)
//       curveGeometries.push(geometry)
//     }
    
//     return curveGeometries
//   }, [])
  
//   useFrame((state) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
//       groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
//     }
//   })
  
//   return (
//     <group ref={groupRef}>
//       {curves.map((geometry, index) => (
//         <mesh key={index} geometry={geometry}>
//           <meshBasicMaterial 
//             color={color} 
//             wireframe 
//             transparent 
//             opacity={0.6 - index * 0.1} 
//           />
//         </mesh>
//       ))}
//     </group>
//   )
// }

// Particle constellation with organic movement
function OrganicParticles({ color = '#00ffff' }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 150
  
  const { positions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in organic pattern
      const angle = (i / particleCount) * Math.PI * 2 * 3
      const radius = 5 + Math.random() * 5
      const height = (Math.random() - 0.5) * 10
      
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = height + Math.sin(angle * 2) * 2
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      
      // Add subtle movement
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    
    return { positions: pos, velocities: vel }
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      // Organic floating movement
      for (let i = 0; i < particleCount; i++) {
        const time = state.clock.elapsedTime
        const index = i * 3
        
        positions[index] += Math.sin(time + i * 0.1) * 0.001
        positions[index + 1] += Math.cos(time + i * 0.15) * 0.001
        positions[index + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.001
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        color={color} 
        size={0.08} 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

// // Web-like connecting lines
// function ConnectingWeb({ color = '#00ffff' }) {
//   const linesRef = useRef<THREE.LineSegments>(null)
  
//   const geometry = useMemo(() => {
//     const geo = new THREE.BufferGeometry()
//     const vertices = []
    
//     // Create web-like connections
//     const rings = 8
//     const segments = 16
    
//     for (let ring = 0; ring < rings; ring++) {
//       const ringRadius = 2 + ring * 0.8
//       const ringHeight = (ring - rings / 2) * 1.5
      
//       for (let seg = 0; seg < segments; seg++) {
//         const angle = (seg / segments) * Math.PI * 2
//         const nextAngle = ((seg + 1) / segments) * Math.PI * 2
        
//         // Current ring points
//         const x1 = Math.cos(angle) * ringRadius
//         const z1 = Math.sin(angle) * ringRadius
//         const x2 = Math.cos(nextAngle) * ringRadius
//         const z2 = Math.sin(nextAngle) * ringRadius
        
//         // Connect segments in ring
//         vertices.push(x1, ringHeight, z1, x2, ringHeight, z2)
        
//         // Connect to next ring
//         if (ring < rings - 1) {
//           const nextRingRadius = 2 + (ring + 1) * 0.8
//           const nextRingHeight = (ring + 1 - rings / 2) * 1.5
//           const x3 = Math.cos(angle) * nextRingRadius
//           const z3 = Math.sin(angle) * nextRingRadius
          
//           vertices.push(x1, ringHeight, z1, x3, nextRingHeight, z3)
//         }
//       }
//     }
    
//     geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
//     return geo
//   }, [])
  
//   useFrame((state) => {
//     if (linesRef.current) {
//       linesRef.current.rotation.y = state.clock.elapsedTime * 0.015
//       linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
//     }
//   })
  
//   return (
//     <lineSegments ref={linesRef} geometry={geometry}>
//       <lineBasicMaterial color={color} transparent opacity={0.3} />
//     </lineSegments>
//   )
// }

// Main 3D scene component
function Scene({ currentColor }: { currentColor: string }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 12)
  }, [camera])
  
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color={currentColor} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color={currentColor} />
      
      {/* Main organic structures */}
      <OrganicTunnel position={[0, 0, -10]} color={currentColor} scale={10} speed={-0.9} />
      {/* <OrganicTunnel position={[0, 0, -10]} color={currentColor} scale={20} speed={-0.9} /> */}
      
      {/* Flowing curves */}
      {/* <FlowingCurves color={currentColor} /> */}
      
      {/* Particle field */}
      <OrganicParticles color={currentColor} />
      
      {/* Connecting web */}
      {/* <ConnectingWeb color={currentColor} /> */}
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
export default function WebGLBackground() {
  const { currentSection } = useSectionContext()
  const [currentColor, setCurrentColor] = useState('#00ffff')
  const [webglSupported, setWebglSupported] = useState(true)
  
  // Color mapping for different sections
  
  useEffect(() => {
      const sectionColors = {
        home: '#00ffff',     // Cyan
        about: '#00ff7f',    // Spring green
        projects: '#0066ff', // Blue
        contact: '#ff6600',  // Orange
        resume: '#ff00ff'    // Magenta
      }
    setCurrentColor(sectionColors[currentSection as keyof typeof sectionColors] || sectionColors.home)
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
          <Scene currentColor={currentColor} />
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