"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Raycaster, Vector2 } from "three";

export default function Orb({
  totalImages = 4,
  totalItems = 36,
  baseWidth = 2,
  baseHeight = 1.2,
  sphereRadius = 5,
}) {
  const orbRef = useRef();

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const links = [
    "https://www.wildyriftian.com/",
    "https://www.purposetalent.xyz/",
    "https://www.getty.edu/tracingart/",
    "https://nvg8.io/",

    // ... more links
  ];

  const onCanvasClick = (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    Raycaster.setFromCamera(mouse, camera);

    // Find all objects the ray intersects
    const intersects = Raycaster.intersectObjects(orbGroup.children);

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

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(parseInt(backgroundColor, 16));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // Updated property

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

    const getRandomImagePath = () => {
      return `/assets/OrbImages/${
        Math.floor(Math.random() * totalImages) + 1
      }.png`;
    };

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

    const loadImageMesh = (phi, theta, linkUrl) => {
      textureLoader.load(
        getRandomImagePath(),
        (texture) => {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace; // Updated property

          const geometry = createImagePlane(texture);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: false,
            depthWrite: true,
            colorSpace: THREE.SRGBColorSpace, // Updated property
          });

          const mesh = new THREE.Mesh(geometry, material);

          mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
          mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          mesh.position.z = sphereRadius * Math.cos(phi);

          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);
          mesh.userData.link = linkUrl;

          orbGroup.add(mesh);

          loadedCount++;
          if (loadedCount === totalItems) {
            animate();
          }
        },
        undefined,
        (error) => console.error(error)
      );
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        const linkUrl = links[i % links.length]; // cycle through the links
        loadImageMesh(phi, theta, linkUrl);
      }
    };

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      orbGroup.rotation.y += 0.0005;
      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    renderer.domElement.addEventListener("mousedown", onCanvasClick, false);

    createSphere();

    return () => {
      if (orbRef.current) {
        resizeObserver.unobserve(orbRef.current);
        if (renderer.domElement) {
          orbRef.current.removeChild(renderer.domElement);
          renderer.domElement.removeEventListener("mousedown", onCanvasClick);
        }
      }
    };
  }, [totalImages, totalItems, baseHeight, baseWidth, sphereRadius, links]);

  return <div className="orb" ref={orbRef}></div>;
}
