import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

import { policyRegions, type PolicyRegion } from './policyRegions'

const DELHI: [number, number, number] = [0.83, 0.34, 1.22]

function surfacePoint(point: [number, number, number], radius = 1.6) {
  return new THREE.Vector3(...point).normalize().multiplyScalar(radius)
}

function latLonToVector(lat: number, lon: number, radius: number) {
  const latitude = THREE.MathUtils.degToRad(lat)
  const longitude = THREE.MathUtils.degToRad(lon)
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.sin(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.cos(longitude),
  )
}

function makeLandPoints() {
  const clusters = [
    [47, -102, 18, 32, 90],
    [-14, -61, 29, 14, 62],
    [50, 12, 11, 22, 52],
    [5, 22, 31, 18, 92],
    [40, 79, 22, 53, 155],
    [6, 111, 15, 28, 55],
    [-25, 134, 13, 20, 42],
  ]
  const points: number[] = []

  clusters.forEach(([lat, lon, latSpread, lonSpread, amount], clusterIndex) => {
    for (let index = 0; index < amount; index += 1) {
      const angle = index * 2.399963 + clusterIndex
      const radius = Math.sqrt((index + 0.5) / amount)
      const jitter = Math.sin(index * 19.17 + clusterIndex) * 0.16
      const point = latLonToVector(
        lat + Math.sin(angle) * latSpread * radius,
        lon + Math.cos(angle) * lonSpread * radius + jitter,
        1.615,
      )
      points.push(point.x, point.y, point.z)
    }
  })

  return new Float32Array(points)
}

function LandPointCloud() {
  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(makeLandPoints(), 3))
    return buffer
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#dfff72" size={0.031} sizeAttenuation transparent opacity={0.94} />
    </points>
  )
}

function GlobeGrid() {
  const latitudes = [-1.05, -0.55, 0, 0.55, 1.05]
  const meridians = [0, Math.PI / 3, (Math.PI * 2) / 3]

  return (
    <group>
      {latitudes.map((height) => (
        <mesh key={height} position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[Math.sqrt(1.6 ** 2 - height ** 2), 0.005, 4, 96]} />
          <meshBasicMaterial color="#dce6ff" transparent opacity={0.34} />
        </mesh>
      ))}
      {meridians.map((rotation) => (
        <mesh key={rotation} rotation={[0, rotation, 0]}>
          <torusGeometry args={[1.6, 0.005, 4, 128]} />
          <meshBasicMaterial color="#dce6ff" transparent opacity={0.29} />
        </mesh>
      ))}
    </group>
  )
}

type FlowArcProps = {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  offset: number
}

function FlowArc({ start, end, color, offset }: FlowArcProps) {
  const traveler = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const from = surfacePoint(start, 1.62)
    const to = surfacePoint(end, 1.62)
    const midpoint = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.15)
    return new THREE.QuadraticBezierCurve3(from, midpoint, to)
  }, [start, end])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.009, 6, false), [curve])

  useFrame(({ clock }) => {
    if (!traveler.current) return
    const progress = (clock.elapsedTime * 0.12 + offset) % 1
    traveler.current.position.copy(curve.getPointAt(progress))
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={0.82} />
      </mesh>
      <mesh ref={traveler}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
  )
}

type RegionNodeProps = {
  region: PolicyRegion
  active: boolean
  onSelect: (region: PolicyRegion) => void
}

function RegionNode({ region, active, onSelect }: RegionNodeProps) {
  const [hovered, setHovered] = useState(false)
  const pulse = useRef<THREE.Mesh>(null)
  const position = useMemo(() => surfacePoint(region.point, 1.65), [region.point])

  useFrame(({ clock }) => {
    if (!pulse.current) return
    const rhythm = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.12
    pulse.current.scale.setScalar((active ? 1.5 : 1) * rhythm)
  })

  const handlePointer = (event: ThreeEvent<PointerEvent>, isHovered: boolean) => {
    event.stopPropagation()
    setHovered(isHovered)
    document.body.style.cursor = isHovered ? 'pointer' : 'default'
  }

  return (
    <group position={position}>
      <mesh
        scale={active || hovered ? 1.24 : 1}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(region)
        }}
        onPointerOver={(event) => handlePointer(event, true)}
        onPointerOut={(event) => handlePointer(event, false)}
      >
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color={region.color} emissive={region.color} emissiveIntensity={1.5} roughness={0.2} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.15, 18, 18]} />
        <meshBasicMaterial color={region.color} transparent opacity={active ? 0.16 : 0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function OrbitRing({ rotation, color, speed }: { rotation: [number, number, number], color: string, speed: number }) {
  const ring = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * speed
  })

  return (
    <mesh ref={ring} rotation={rotation} scale={[1, 0.42, 1]}>
      <torusGeometry args={[2.06, 0.009, 6, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.46} />
    </mesh>
  )
}

function GlobeModel({ activeId, onSelect }: { activeId: string, onSelect: (region: PolicyRegion) => void }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useThree((state) => state.pointer)
  const delhiPosition = useMemo(() => surfacePoint(DELHI, 1.65), [])

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const targetX = pointer.y * 0.12 + Math.sin(clock.elapsedTime * 0.35) * 0.025
    const targetY = -0.43 + pointer.x * 0.2 + Math.sin(clock.elapsedTime * 0.22) * 0.05
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta)
    group.current.position.y = Math.sin(clock.elapsedTime * 0.62) * 0.045
  })

  return (
    <>
      <group ref={group} rotation={[0, -0.43, -0.06]}>
        <mesh castShadow>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshPhysicalMaterial
            color="#5367f5"
            emissive="#1237c7"
            emissiveIntensity={0.24}
            metalness={0.06}
            roughness={0.24}
            clearcoat={0.85}
            clearcoatRoughness={0.18}
          />
        </mesh>
        <mesh scale={1.018}>
          <sphereGeometry args={[1.6, 36, 36]} />
          <meshBasicMaterial color="#e7edff" wireframe transparent opacity={0.13} />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[1.6, 40, 40]} />
          <meshBasicMaterial color="#4fe3d5" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>

        <GlobeGrid />
        <LandPointCloud />

        {policyRegions.map((region, index) => (
          <FlowArc key={`arc-${region.id}`} start={DELHI} end={region.point} color={region.color} offset={index * 0.23} />
        ))}

        <group position={delhiPosition}>
          <mesh>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.8} />
          </mesh>
          <pointLight color="#ffb647" intensity={1.2} distance={1.3} />
        </group>

        {policyRegions.map((region) => (
          <RegionNode key={region.id} region={region} active={activeId === region.id} onSelect={onSelect} />
        ))}

        <OrbitRing rotation={[0.9, 0.35, -0.18]} color="#ff6846" speed={0.08} />
        <OrbitRing rotation={[-0.65, 0.15, 0.42]} color="#49dacb" speed={-0.055} />
      </group>

      <mesh position={[0, -1.92, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.25, 64]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  )
}

type PolicyGlobe3DProps = {
  activeId: string
  onSelect: (region: PolicyRegion) => void
}

export default function PolicyGlobe3D({ activeId, onSelect }: PolicyGlobe3DProps) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  return (
    <Canvas
      className="policy-canvas"
      camera={{ position: [0, 0.05, 5.3], fov: 41 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      dpr={[1, 1.65]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label="Interactive 3D policy globe with global cooperation routes"
    >
      <ambientLight intensity={1.65} color="#dbe7ff" />
      <hemisphereLight args={['#ffffff', '#ffb164', 2.15]} />
      <directionalLight
        position={[3.5, 5, 5]}
        intensity={3.1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 1.3, 2.5]} color="#4ce2cf" intensity={16} distance={7} />
      <pointLight position={[3, -1.5, 2.5]} color="#ff704d" intensity={12} distance={7} />
      <GlobeModel activeId={activeId} onSelect={onSelect} />
    </Canvas>
  )
}
