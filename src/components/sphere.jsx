import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeSphere() {
  const mountRef = useRef();
  const rendererRef = useRef();
  const sphereRef = useRef();
  const spriteRef = useRef();
  const isMouseDown = useRef(false);
  const rotationSpeed = 0.005;
  const rotationSpeedMultiplier = 0.1;
  const maxRotationX = Math.PI / 2;
  const minRotationX = -Math.PI / 2;
  const rotationDeceleration = 0.0005;
  const coordinates = [
    { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    { latitude: -65.2551396 , longitude: -19.0280477},  // New York
    // Add more coordinates here...
  ];
  const radius=1
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    const textureLoader = new THREE.TextureLoader();
    camera.position.z = 5;

    const renderer = rendererRef.current || new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const mount = mountRef.current;
    mount.addEventListener('mousedown', handleMouseDown);
    mount.addEventListener('mouseup', handleMouseUp);
    mount.addEventListener('mousemove', handleMouseMove);
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(radius,32,32);
    const material = new THREE.MeshPhongMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.x = 12; // Initial rotation
    material.map = textureLoader.load('src\\assets\\textures\\earthlights1k.jpg');
    scene.add(sphere);
    sphereRef.current = sphere;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Locate the United States marker by default
    coordinates.forEach(coord => locateCoordinate(coord, sphere));

    const animate = () => {
      requestAnimationFrame(animate);
      const sphere = sphereRef.current;

      if (isMouseDown.current) {
        const rotationDeltaX = (prevMouseX.current - mouseX.current) * rotationSpeedMultiplier;
        const rotationDeltaY = (prevMouseY.current - mouseY.current) * rotationSpeedMultiplier;
        sphere.rotation.y += rotationDeltaX;
        sphere.rotation.x += rotationDeltaY;

        sphere.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, sphere.rotation.x));
      } else {
        sphere.rotation.y -= rotationDeceleration * (sphere.rotation.y - rotationSpeed);
        sphere.rotation.x -= rotationDeceleration * (sphere.rotation.x - rotationSpeed);

        sphere.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, sphere.rotation.x));
      }

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseDown = (event) => {
    isMouseDown.current = true;
    prevMouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
    prevMouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseMove = (event) => {
    mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const locateCoordinate = (coordinate, sphere) => {
    const { latitude, longitude } = coordinate;
  
    let normalizedLatitude = 2.0 * (((latitude + 90.0) / 180.0) - 0.5);
  //Longitude goes between -180 and +180 degrees
  let normalizedLongitude = 2.0 * (((longitude + 180.0) / 360.0) - 0.5);

    const x=normalizedLongitude * 640;
    const y=normalizedLatitude * 400;
    
    const spriteMaterial = new THREE.SpriteMaterial({ color: 0xff0000 });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.1, 0.1, 0.1);
  
    // Place the sprite at the calculated 3D coordinates
    sprite.position.set(x, y).multiplyScalar(1.1); // Multiply by 1.1 for better visibility
    sphere.add(sprite);
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }}>
    </div>
  );
}

export default ThreeSphere;
