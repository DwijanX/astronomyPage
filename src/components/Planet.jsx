import React, { useEffect, useRef,useState } from 'react';
import * as THREE from 'three';

function Planet({texturePath}) {
  const mountRef = useRef();
  const rendererRef = useRef();
  const sphereRef = useRef();
  const isMouseDown = useRef(false);
  const rotationSpeed = 0.005;
  const rotationSpeedMultiplier = 0.1;
  const maxRotationX = Math.PI / 2;
  const minRotationX = -Math.PI / 2;
  const rotationDeceleration = 0.0005;
  const radius = 1;

  const [currentTexturePath, setCurrentTexturePath] = useState(texturePath);
  useEffect(() => {
    setCurrentTexturePath(texturePath);
  }, [texturePath]);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
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

    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.x = 12; // Initial rotation
    sphere.position.x = 1.5;
    material.map = new THREE.TextureLoader().load(currentTexturePath);
    scene.add(sphere);
    sphereRef.current = sphere;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Adjust the intensity as needed
    scene.add(ambientLight);
    
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
  }, [currentTexturePath]);

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

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }}>
    </div>
  );
}

export default Planet;
