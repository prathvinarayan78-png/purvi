import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry, MultiPolygon, Polygon, Position } from 'geojson'
import type { Topology } from 'topojson-specification'
import * as THREE from 'three'
import countriesTopology from 'world-atlas/countries-110m.json'
import { policyRegions, type PolicyRegion } from './policyRegions'

const MAP_SCALE = 0.0185
const MAP_OFFSET = 15
const DELHI: [number, number] = [77.209, 28.614]

const strategicCorridors: Array<{
  id: string
  color: string
  points: Array<[number, number]>
}> = [
  {
    id: 'north-atlantic',
    color: '#92c9ae',
    points: [[-75, 40], [-38, 48], [5, 51]],
  },
  {
    id: 'suez-indian-ocean',
    color: '#d6ae62',
    points: [[5, 51], [31, 31], [44, 12], [77, 8], [103, 1], [121, 15]],
  },
  {
    id: 'indo-pacific-maritime',
    color: '#c9df8d',
    points: [[77, 8], [103, 1], [122, 12], [141, 35]],
  },
]

function projectCoordinate([longitude, latitude]: [number, number], depth = 0.22): [number, number, number] {
  return [(longitude - MAP_OFFSET) * MAP_SCALE, latitude * MAP_SCALE, depth]
}

function normalizedRing(ring: Position[]) {
  const longitudes = ring.map((point) => point[0])
  const crossesDateLine = Math.max(...longitudes) - Math.min(...longitudes) > 300
  return ring.map(([longitude, latitude]) => [crossesDateLine && longitude < 0 ? longitude + 360 : longitude, latitude])
}

function pathFromRing(ring: Position[]) {
  const points = normalizedRing(ring)
  const path = new THREE.Path()
  points.forEach(([longitude, latitude], index) => {
    const x = (longitude - MAP_OFFSET) * MAP_SCALE
    const y = latitude * MAP_SCALE
    if (index === 0) path.moveTo(x, y)
    else path.lineTo(x, y)
  })
  path.closePath()
  return path
}

function shapeFromPolygon(polygon: Position[][]) {
  const outerRing = normalizedRing(polygon[0])
  const averageLatitude = outerRing.reduce((total, point) => total + point[1], 0) / outerRing.length
  if (averageLatitude < -67) return null

  const shape = new THREE.Shape()
  outerRing.forEach(([longitude, latitude], index) => {
    const x = (longitude - MAP_OFFSET) * MAP_SCALE
    const y = latitude * MAP_SCALE
    if (index === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  })
  shape.closePath()

  polygon.slice(1).forEach((hole) => shape.holes.push(pathFromRing(hole)))
  return shape
}

function makeCountryShapes() {
  const topology = countriesTopology as unknown as Topology
  const collection = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>
  const shapes: THREE.Shape[] = []

  collection.features.forEach((country) => {
    const geometry = country.geometry
    const polygons: Position[][][] = geometry.type === 'Polygon'
      ? [(geometry as Polygon).coordinates]
      : geometry.type === 'MultiPolygon'
        ? (geometry as MultiPolygon).coordinates
        : []

    polygons.forEach((polygon) => {
      const shape = shapeFromPolygon(polygon)
      if (shape) shapes.push(shape)
    })
  })

  return shapes
}

function MapGrid() {
  const geometry = useMemo(() => {
    const vertices: number[] = []
    for (let longitude = -165; longitude <= 165; longitude += 30) {
      const x = (longitude - MAP_OFFSET) * MAP_SCALE
      vertices.push(x, -1.3, 0.17, x, 1.55, 0.17)
    }
    for (let latitude = -60; latitude <= 75; latitude += 15) {
      const y = latitude * MAP_SCALE
      vertices.push(-3.55, y, 0.17, 3.25, y, 0.17)
    }
    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return buffer
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#8bbfa7" transparent opacity={0.18} />
    </lineSegments>
  )
}

function ScanLine() {
  const scan = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!scan.current) return
    const progress = (Math.sin(clock.elapsedTime * 0.52) + 1) / 2
    scan.current.position.y = THREE.MathUtils.lerp(-1.25, 1.5, progress)
  })

  return (
    <mesh ref={scan} position={[-0.15, 0, 0.31]}>
      <planeGeometry args={[6.8, 0.022]} />
      <meshBasicMaterial color="#b9f1cf" transparent opacity={0.48} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

function StrategicCorridor({
  points,
  color,
  offset,
}: {
  points: Array<[number, number]>
  color: string
  offset: number
}) {
  const marker = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const projected = points.map((point, index) => {
      const vector = new THREE.Vector3(...projectCoordinate(point, 0.31))
      if (index > 0 && index < points.length - 1) vector.z += 0.08
      return vector
    })
    return new THREE.CatmullRomCurve3(projected, false, 'centripetal')
  }, [points])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 72, 0.008, 5, false), [curve])

  useFrame(({ clock }) => {
    if (!marker.current) return
    marker.current.position.copy(curve.getPointAt((clock.elapsedTime * 0.055 + offset) % 1))
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={0.62} />
      </mesh>
      <mesh ref={marker}>
        <sphereGeometry args={[0.026, 10, 10]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

type RouteProps = {
  region: PolicyRegion
  active: boolean
  offset: number
}

function PolicyRoute({ region, active, offset }: RouteProps) {
  const traveler = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...projectCoordinate(DELHI, 0.3))
    const end = new THREE.Vector3(...projectCoordinate(region.coordinates, 0.3))
    const midpoint = start.clone().add(end).multiplyScalar(0.5)
    midpoint.z = 0.72 + start.distanceTo(end) * 0.12
    return new THREE.QuadraticBezierCurve3(start, midpoint, end)
  }, [region.coordinates])
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 40, active ? 0.014 : 0.007, 6, false),
    [active, curve],
  )

  useFrame(({ clock }) => {
    if (!traveler.current) return
    traveler.current.position.copy(curve.getPointAt((clock.elapsedTime * 0.1 + offset) % 1))
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={region.color} transparent opacity={active ? 0.95 : 0.3} />
      </mesh>
      <mesh ref={traveler} visible={active}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#f5fff7" toneMapped={false} />
      </mesh>
    </group>
  )
}

function MapNode({ region, active, onSelect }: { region: PolicyRegion, active: boolean, onSelect: (region: PolicyRegion) => void }) {
  const [hovered, setHovered] = useState(false)
  const pulse = useRef<THREE.Mesh>(null)
  const position = projectCoordinate(region.coordinates, 0.36)

  useFrame(({ clock }) => {
    if (!pulse.current) return
    const scale = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.16
    pulse.current.scale.setScalar(scale * (active ? 1.35 : 1))
  })

  const setPointerState = (event: ThreeEvent<PointerEvent>, state: boolean) => {
    event.stopPropagation()
    setHovered(state)
    document.body.style.cursor = state ? 'pointer' : 'default'
  }

  return (
    <group position={position}>
      <mesh scale={[1.65, 0.78, 1]}>
        <ringGeometry args={[0.19, 0.205, 56]} />
        <meshBasicMaterial color={region.color} transparent opacity={active ? 0.58 : 0.14} side={THREE.DoubleSide} />
      </mesh>
      <mesh scale={[1.65, 0.78, 1]}>
        <ringGeometry args={[0.275, 0.282, 56]} />
        <meshBasicMaterial color={region.color} transparent opacity={active ? 0.28 : 0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={pulse}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(region)
        }}
        onPointerOver={(event) => setPointerState(event, true)}
        onPointerOut={(event) => setPointerState(event, false)}
      >
        <ringGeometry args={[0.075, active || hovered ? 0.13 : 0.105, 32]} />
        <meshBasicMaterial color={region.color} transparent opacity={active ? 1 : 0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.032, 20]} />
        <meshBasicMaterial color="#f4fff4" toneMapped={false} />
      </mesh>
    </group>
  )
}

function DimensionalMap({ activeId, onSelect }: { activeId: string, onSelect: (region: PolicyRegion) => void }) {
  const mapGroup = useRef<THREE.Group>(null)
  const pointer = useThree((state) => state.pointer)
  const shapes = useMemo(() => makeCountryShapes(), [])
  const landGeometry = useMemo(() => new THREE.ExtrudeGeometry(shapes, {
    depth: 0.13,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.012,
    bevelSegments: 1,
    curveSegments: 1,
  }), [shapes])

  useFrame((_, delta) => {
    if (!mapGroup.current) return
    mapGroup.current.rotation.x = THREE.MathUtils.damp(mapGroup.current.rotation.x, -0.27 + pointer.y * 0.07, 3.5, delta)
    mapGroup.current.rotation.y = THREE.MathUtils.damp(mapGroup.current.rotation.y, pointer.x * 0.055, 3.5, delta)
    mapGroup.current.rotation.z = THREE.MathUtils.damp(mapGroup.current.rotation.z, -0.025 - pointer.x * 0.018, 3.5, delta)
  })

  return (
    <group ref={mapGroup} rotation={[-0.27, 0, -0.025]} position={[0, -0.03, 0]}>
      <mesh position={[-0.14, 0.08, -0.09]} receiveShadow>
        <boxGeometry args={[7.12, 3.45, 0.1]} />
        <meshStandardMaterial color="#0d3028" roughness={0.72} metalness={0.12} />
      </mesh>

      <MapGrid />

      <mesh geometry={landGeometry} castShadow receiveShadow>
        <meshStandardMaterial color="#286650" roughness={0.56} metalness={0.08} />
      </mesh>
      <mesh geometry={landGeometry} scale={[1.003, 1.003, 1.003]}>
        <meshBasicMaterial color="#a8d6b9" wireframe transparent opacity={0.17} />
      </mesh>

      <ScanLine />

      {strategicCorridors.map((corridor, index) => (
        <StrategicCorridor
          key={corridor.id}
          points={corridor.points}
          color={corridor.color}
          offset={index * 0.31}
        />
      ))}

      {policyRegions.map((region, index) => (
        <PolicyRoute key={region.id} region={region} active={activeId === region.id} offset={index * 0.24} />
      ))}

      <group position={projectCoordinate(DELHI, 0.39)}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.095, 0.095, 0.07]} />
          <meshStandardMaterial color="#e7c574" emissive="#e7c574" emissiveIntensity={1.1} />
        </mesh>
        <pointLight color="#d9eea9" intensity={1.8} distance={1.1} />
      </group>

      {policyRegions.map((region) => (
        <MapNode key={region.id} region={region} active={activeId === region.id} onSelect={onSelect} />
      ))}
    </group>
  )
}

type PolicyMap3DProps = {
  activeId: string
  onSelect: (region: PolicyRegion) => void
}

export default function PolicyMap3D({ activeId, onSelect }: PolicyMap3DProps) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [cameraDepth] = useState(() => window.innerWidth < 620 ? 10.8 : 8.1)

  return (
    <Canvas
      className="policy-map-canvas"
      camera={{ position: [0, 0.25, cameraDepth], fov: 43 }}
      dpr={[1, 1.6]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label="Interactive three-dimensional geopolitical policy map"
    >
      <ambientLight intensity={1.35} color="#d9eadc" />
      <hemisphereLight args={['#f2f1d8', '#173c31', 1.8]} />
      <directionalLight
        position={[2, 5, 6]}
        intensity={3.2}
        color="#f7f1d3"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, -1, 3]} color="#77d1ad" intensity={9} distance={8} />
      <DimensionalMap activeId={activeId} onSelect={onSelect} />
    </Canvas>
  )
}
