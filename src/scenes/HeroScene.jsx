import { Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei'

/**
 * Lightweight hero WebGL motif — TODO: swap meshes/materials for real assets.
 * Heavy choreography belongs in `src/scenes/`; shader-heavy materials go under `src/shaders/`.
 */
export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 7, 3]} intensity={1.15} />
      <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.55}>
        <mesh>
          <icosahedronGeometry args={[1.15, 0]} />
          <MeshDistortMaterial
            color="#f59e0b"
            emissive="#78350f"
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.6}
            distort={0.38}
            speed={2.2}
          />
        </mesh>
      </Float>
      <Sparkles count={28} scale={4.5} size={1.8} speed={0.32} opacity={0.55} />
      <Environment preset="city" />
    </>
  )
}
