"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Orb({
  totalImages = 4,
  totalItems = 36,
  baseWidth = 2,
  baseHeight = 1.2,
  sphereRadius = 5,
}) {
  const orbRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const orbGroupRef = useRef();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Move orbData outside of the component or use useMemo to prevent re-renders
  const orbData = [
    {
      imagePath: "/assets/OrbImages/1.png",
      linkUrl: "https://www.getty.edu/tracingart/",
    },
    {
      imagePath: "/assets/OrbImages/2.png",
      linkUrl: "https://nvg8.io/",
    },
    {
      imagePath: "/assets/OrbImages/3.png",
      linkUrl: "https://www.purposetalent.xyz/",
    },
    {
      imagePath: "/assets/OrbImages/4.png",
      linkUrl: "https://www.wildyriftian.com/",
    },
    // Add more entries here
  ];

  const onCanvasClick = (event) => {
    if (!rendererRef.current || !cameraRef.current || !orbGroupRef.current)
      return;

    // Calculate mouse position in normalized device coordinates
    mouseRef.current.x =
      (event.clientX / rendererRef.current.domElement.clientWidth) * 2 - 1;
    mouseRef.current.y =
      -(event.clientY / rendererRef.current.domElement.clientHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

    // Find all objects the ray intersects
    const intersects = raycasterRef.current.intersectObjects(
      orbGroupRef.current.children
    );

    if (intersects.length > 0) {
      // The first object in the array is the closest one
      const clickedObject = intersects[0].object;
      if (clickedObject.userData.link) {
        window.open(clickedObject.userData.link, "_blank");
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });

    // Store in refs so they can be accessed by the click handler
    rendererRef.current = renderer;
    cameraRef.current = camera;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.damping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.2;
    controls.minDistance = 6;
    controls.maxDistance = 10;
    controls.enableZoom = true;
    controls.enablePan = false;

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;

    const createImagePlane = (texture) => {
      const imageAspect = texture.image.width / texture.image.height;
      let width = baseWidth;
      let height = baseHeight;

      if (imageAspect > 1) {
        height = width / imageAspect;
      } else {
        width = height * imageAspect;
      }

      return new THREE.PlaneGeometry(width, height);
    };

    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Store in ref so it can be accessed by the click handler
    orbGroupRef.current = orbGroup;

    const loadImageMesh = (phi, theta, orbPosition) => {
      textureLoader.load(
        orbPosition.imagePath,
        (texture) => {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace;

          const geometry = createImagePlane(texture);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: false,
            depthWrite: true,
            colorSpace: THREE.SRGBColorSpace,
          });

          const mesh = new THREE.Mesh(geometry, material);

          mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
          mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          mesh.position.z = sphereRadius * Math.cos(phi);

          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);
          mesh.userData.link = orbPosition.linkUrl;

          orbGroup.add(mesh);

          loadedCount++;
          if (loadedCount === totalItems) {
            animate();
          }
        },
        undefined,
        (error) =>
          console.error("Error loading texture:", orbPosition.imagePath, error)
      );
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        const orbPosition = orbData[i % orbData.length];
        loadImageMesh(phi, theta, orbPosition);
      }
    };

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      orbGroup.rotation.y += 0.0005;
      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("click", onCanvasClick, false);

    createSphere();

    return () => {
      if (orbRef.current && renderer.domElement) {
        window.removeEventListener("resize", handleResize);
        renderer.domElement.removeEventListener("click", onCanvasClick);
        orbRef.current.removeChild(renderer.domElement);
      }
      // Clean up refs
      rendererRef.current = null;
      cameraRef.current = null;
      orbGroupRef.current = null;
    };
  }, [totalItems, baseHeight, baseWidth, sphereRadius]); // Removed orbData from dependencies

  return <div className="orb" ref={orbRef}></div>;
}
