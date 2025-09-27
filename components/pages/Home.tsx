"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { RigidBody, useRapier, Physics } from "@react-three/rapier";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import Boundaries from "../Boundaries";

// 🔑 A small helper hook to apply a continuous force/torque
const useConstantForce = (ref: any, force: THREE.Vector3) => {
  const { world } = useRapier(); // Access the Rapier physics world

  useFrame(() => {
    if (ref.current) {
      // Apply the force to the rigid body object every frame
      ref.current.applyImpulse(force, true); // Use true for world-space force
    }
  });
};

function Ball({
  position,
  color,
  size,
  mass = 1,
  pullVector = [0, 0, 0],
}: {
  position: [number, number, number];
  color: string;
  size: number;
  mass?: number;
  pullVector?: [number, number, number];
}) {
  const meshRef = useRef<any>(null!);

  // Ensure the force vector also has no Z component, although locking Z translation will handle it
  const forceVector = new THREE.Vector3(...pullVector);
  forceVector.z = 0;
  forceVector.multiplyScalar(0.005);

  useConstantForce(meshRef, forceVector);

  return (
    <RigidBody
      ref={meshRef}
      colliders="ball"
      mass={mass}
      position={position}
      restitution={0.8}
      friction={0.1}
      linearDamping={0.1}
      angularDamping={0.1}
      // 🔑 KEY CHANGE: Lock the Z-axis translation
      // lockTranslations={true}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
}

function Floor() {
  return (
    // 'fixed' type means it won't move, perfect for a floor
    <RigidBody type="fixed" colliders="cuboid" position={[0, 0, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </RigidBody>
  );
}

function Wall({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      position={position}
      rotation={rotation}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[20, 5, 0.5]} /> {/* 20 long, 5 high, 0.5 thick */}
        <meshStandardMaterial color="#555555" />
      </mesh>
    </RigidBody>
  );
}

export default function Home() {
  const sceneCenter = [0, 0, 0];

  return (
    <div className="w-screen h-screen">
      <Canvas
        className="w-full h-full"
        shadows
        orthographic
        camera={{ position: [0, 10, 0], zoom: 50 }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <ambientLight intensity={2} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Boundaries />
          <Floor />

          {Array.from({ length: 10 }).map((_, i) => (
            <Ball
              color="red"
              key={`red-${i}`}
              position={[i * 0.5, 5, 0]}
              size={0.5}
              mass={5}
              pullVector={[-1, 0, 0]} // Pulling towards the X=0, Z=0 center
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <Ball
              color="yellow"
              key={`yellow-${i}`}
              position={[i * -0.5, 5, 5]}
              size={0.3}
              mass={0.5}
              pullVector={[1, 0, -1]}
            />
          ))}
        </Physics>
        <OrbitControls makeDefault /> {/* Allow camera control */}
      </Canvas>
    </div>
  );
}
