// Boundaries.js (Corrected for Dynamic Sizing)
import { RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

// Define wall properties
const WALL_THICKNESS = 0.5;

// Component for a single invisible boundary plane (keep this helper)
function BoundaryPlane({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  // We use a large size for the box geometry to ensure the balls can't slip past the edges.
  const WALL_SIZE = 100;
  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      position={position}
      rotation={rotation}
    >
      <mesh>
        <boxGeometry args={[WALL_SIZE, WALL_SIZE, WALL_THICKNESS]} />
        <meshBasicMaterial transparent opacity={0} /> {/* Make it invisible */}
      </mesh>
    </RigidBody>
  );
}

// Component to combine the four walls
export default function Boundaries() {
  // 🔑 Get the dynamic viewport width and height in world units
  const { viewport } = useThree();

  // Half the width and height of the visible area
  // We subtract half the thickness of the wall to make the inner edge perfectly aligned
  const limitX = viewport.width / 2 - WALL_THICKNESS / 2;
  const limitY = viewport.height / 2 - WALL_THICKNESS / 2;

  // The floor is on the Y=0 plane, and the camera looks down the Y axis.
  // The plane of the balls' movement is the XZ plane.
  const limitZ = limitY; // Since the orthographic view is X vs Z (depth)

  return (
    <>
      {/* Wall 1: Front (+Z) - Positioned at the positive Z limit */}
      <BoundaryPlane
        position={[0, 0, limitZ]}
        rotation={[0, 0, 0]} // Wall runs along the X axis
      />
      {/* Wall 2: Back (-Z) - Positioned at the negative Z limit */}
      <BoundaryPlane position={[0, 0, -limitZ]} rotation={[0, 0, 0]} />
      {/* Wall 3: Right (+X) - Positioned at the positive X limit */}
      <BoundaryPlane
        position={[limitX, 0, 0]}
        rotation={[0, Math.PI / 2, 0]} // Wall runs along the Z axis
      />
      {/* Wall 4: Left (-X) - Positioned at the negative X limit */}
      <BoundaryPlane
        position={[-limitX, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}
