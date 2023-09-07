import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



function CelestiaBody({ texturePath, ringsTexture = null,type="planet" }) {
  const mountRef = useRef();
  const rendererRef = useRef();
  const mainBodyRef = useRef();
  const ringRef = useRef();
  const isMouseDown = useRef(false);
  const rotationSpeed = 0.005;
  const rotationSpeedMultiplier = 0.1;
  const maxRotationX = Math.PI / 2;
  const minRotationX = -Math.PI / 2;
  const rotationDeceleration = 0.0002;
  const loader=new GLTFLoader()
  const radius = 1;
  const controls = useRef();
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
  const addRing=(scene)=>{
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
  const addPlanet=(scene)=>{
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.x = 15; 
    sphere.rotation.y = -20; 
    sphere.position.x = 1.5;
    material.map = new THREE.TextureLoader().load(currentTexturePath);
    scene.add(sphere);
    mainBodyRef.current = sphere;
  }
  const addCelestialGLTF=(scene)=>{
    loader.load(texturePath, (gltf) => {
        const gltfModel = gltf.scene;
        const scaleFactor = 0.1; // Adjust the scale factor as needed
    
        if(type=="ISS")
        {
          gltfModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
        if(gltfModel)
        {
            gltfModel.rotation.x = 15;
            gltfModel.rotation.y = -20;
        }
        gltfModel.position.x = 1.5;
    
        scene.add(gltfModel);
        mainBodyRef.current = gltfModel;

      });
  }
  const addLight=(scene)=>{
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Adjust the intensity as needed
    scene.add(ambientLight);
  }
  useEffect(() => {
    setCurrentTexturePath(texturePath);
  }, [texturePath]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        type === 'planet' ? 50 : 100,
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
    controls.current = new OrbitControls(camera, renderer.domElement);
    controls.current.enableDamping = true; // Add damping for smooth zooming
    controls.current.dampingFactor = 0.1;
    controls.current.zoomSpeed = 0.5; // Adjust the zoom speed as needed
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    mount.appendChild(renderer.domElement);

    if(type=="planet")
    {   
        addPlanet(scene)
    }
    else{
        addCelestialGLTF(scene)
    }

    if (ringsTexture) {
      addRing(scene)
    }

    addLight(scene)
    addStars(scene)


    const animate = () => {
      requestAnimationFrame(animate);
      const mainBody = mainBodyRef.current;
      const ring = ringRef.current;

      if (isMouseDown.current) {
        const rotationDeltaX = (prevMouseX.current - mouseX.current) * rotationSpeedMultiplier;
        const rotationDeltaY = (prevMouseY.current - mouseY.current) * rotationSpeedMultiplier;
        mainBody.rotation.y += rotationDeltaX;
        mainBody.rotation.x += rotationDeltaY;
        if(ring)
        {
          ring.rotation.y += rotationDeltaX;
          ring.rotation.x += rotationDeltaY;
        }

        mainBody.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, mainBody.rotation.x));
      } else {
        if(ring)
        {
            ring.rotation.y -= rotationDeceleration * (ring.rotation.y - rotationSpeed);
            ring.rotation.x -= rotationDeceleration * (ring.rotation.x - rotationSpeed);
        }
        if (mainBody) {
            mainBody.rotation.y -= rotationDeceleration * (mainBody.rotation.y - rotationSpeed);
            mainBody.rotation.x -= rotationDeceleration * (mainBody.rotation.x - rotationSpeed);
            mainBody.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, mainBody.rotation.x));
        }
        controls.current.update();
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

export default CelestiaBody;
