// components/RollingBalls.tsx

"use client";
import { Canvas } from "@react-three/fiber";

import gsap from "gsap";
import { Mesh } from "three";

export default function RollingBallsBackground() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 20], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh position={}>
        <boxGeometry />
        <meshStandardMaterial color={"blue"} />
      </mesh>
    </Canvas>
  );
}
