/**
 * React Three Fiber JSX type bridge for React 19.
 *
 * R3F v8 augments the legacy global `JSX.IntrinsicElements` namespace.
 * React 19 uses `React.JSX.IntrinsicElements`. This file bridges the gap
 * so that <mesh>, <sphereGeometry>, <pointLight>, etc. type-check correctly.
 */
import type { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
