"use client";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect } from "react";
import gsap from "gsap";

function Ball({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody colliders="ball" restitution={0.5} friction={0.8}>
      <mesh position={position} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="silver" metalness={0.8} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
}

function Ground() {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh receiveShadow>
        {/* Giant flat plane */}
        <boxGeometry args={[200, 1, 200]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </RigidBody>
  );
}

// Component that animates gravity
function TiltGravity() {
  const { world } = useRapier();

  useEffect(() => {
    const gravity = { x: 0, y: -9.81, z: 0 };

    gsap.to(gravity, {
      x: 3, // tilt gravity in x
      z: 3, // tilt gravity in z
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        world.raw.setGravity(gravity);
      },
    });
  }, [world]);

  return null;
}

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

      {/* Physics world with animated gravity */}
      <Physics>
        <TiltGravity />

        {/* Infinite ground */}
        <Ground />

        {/* Balls */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Ball
            key={i}
            position={[
              (Math.random() - 0.5) * 5,
              Math.random() * 5 + 5,
              (Math.random() - 0.5) * 5,
            ]}
          />
        ))}
      </Physics>
    </Canvas>
  );
}
