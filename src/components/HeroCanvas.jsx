import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from '../scenes/HeroScene'
import { useIsMobile } from '../hooks/useIsMobile'

/**
 * React Three Fiber: isolates WebGL in its own suspense boundary.
 * Lazy-loaded from HeroSection so first paint stays HTML/CSS-first.
 *
 * drei used inside HeroScene for lighting/environment helpers.
 */
export default function HeroCanvas({ className }) {
  const mobile = useIsMobile()

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        /** Cap pixel ratio on phones */
        dpr={mobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
