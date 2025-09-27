"use client";
import { Canvas } from "@react-three/fiber";

function Ball({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function Home() {
  return (
    <Canvas shadows className="w-full h-full">
      {/* Lights for subtle shading */}
      <ambientLight intensity={2} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Ball color="red" key={i} position={[i + 1, i + 1, 0]} size={0.3} />
        );
      })}
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Ball
            color="yellow"
            key={i}
            position={[i * -1, i * -1, 0]}
            size={0.3}
          />
        );
      })}
      <Ball color="green" position={[0, 5, 0]} size={3} />
    </Canvas>
  );
}
