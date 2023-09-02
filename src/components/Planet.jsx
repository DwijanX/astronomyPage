import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';



function Planet({ texturePath, ringsTexture = null }) {
  const mountRef = useRef();
  const rendererRef = useRef();
  const sphereRef = useRef();
  const ringRef = useRef();
  const isMouseDown = useRef(false);
  const rotationSpeed = 0.005;
  const rotationSpeedMultiplier = 0.1;
  const maxRotationX = Math.PI / 2;
  const minRotationX = -Math.PI / 2;
  const rotationDeceleration = 0.0005;
  const radius = 1;

  const [currentTexturePath, setCurrentTexturePath] = useState(texturePath);


  const addStars = (scene, starCount=1000, starSize, starColor) => {
    if (scene) {
      const stars = new THREE.Group();
      
      // Create a random distribution of stars
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];
      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      
      const starMaterial = new THREE.PointsMaterial({ 
        size: starSize || 1.5,  // Adjust star size as needed
        color: starColor || 0xffffff,  // Set star color, default to white
        transparent: true,
        opacity: 0.8,
      });
  
      const starField = new THREE.Points(starGeometry, starMaterial);
      stars.add(starField);
  
      scene.add(stars);
    }
  };
  
  useEffect(() => {
    setCurrentTexturePath(texturePath);
  }, [texturePath]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

    if (ringsTexture) {
      // Create Saturn's rings
      const ringGeometry = new THREE.RingGeometry(1.7, 2.1, 64);
      const ringMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
      ringMaterial.map = new THREE.TextureLoader().load(ringsTexture);
      ringMaterial.map.wrapS = THREE.RepeatWrapping;
      ringMaterial.map.repeat.x = 150;
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.x = 1.5;
      ring.rotation.x = Math.PI / 5;
      scene.add(ring);
      ringRef.current = ring;
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Adjust the intensity as needed
    scene.add(ambientLight);
    addStars(scene)
    const animate = () => {
      requestAnimationFrame(animate);
      const sphere = sphereRef.current;
      const ring = ringRef.current;

      if (isMouseDown.current) {
        const rotationDeltaX = (prevMouseX.current - mouseX.current) * rotationSpeedMultiplier;
        const rotationDeltaY = (prevMouseY.current - mouseY.current) * rotationSpeedMultiplier;
        sphere.rotation.y += rotationDeltaX;
        sphere.rotation.x += rotationDeltaY;
        if(ring)
        {
          ring.rotation.y += rotationDeltaX;
          ring.rotation.x += rotationDeltaY;
        }

        sphere.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, sphere.rotation.x));
      } else {
        sphere.rotation.y -= rotationDeceleration * (sphere.rotation.y - rotationSpeed);
        sphere.rotation.x -= rotationDeceleration * (sphere.rotation.x - rotationSpeed);
        if(ring)
        {
          ring.rotation.y -= rotationDeceleration * (ring.rotation.y - rotationSpeed);
          ring.rotation.x -= rotationDeceleration * (ring.rotation.x - rotationSpeed);
        }

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
