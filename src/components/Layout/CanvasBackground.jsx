import React, { useRef, useEffect } from 'react';
/* eslint-disable */
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Points } from 'three';
import { Vector3 } from 'three';
import gsap from "gsap";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Glitch,
  BrightnessContrast
} from "@react-three/postprocessing";
import {
  Html,
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial
} from "@react-three/drei";
import { BoxBlurMaterial, BoxBlurPass, GaussianBlurPass, HueSaturationEffect, RenderPass } from 'postprocessing';
/* eslint-disable */

function CustomModel(props) {
    // const { nodes } = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/balloonPoly.glb`);
    const { nodes } = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/station.glb`);
  
    // Create the geometry from the model
    // const geometry = nodes.balloon.geometry;
    const geometry = nodes.Cylinder.geometry;
    console.log(geometry)
  
    // Create the material for the points
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x800080,
      size: 0.01,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      sizeAttenuation: true,
      alphaMap: new THREE.TextureLoader().load(`${process.env.PUBLIC_URL}/particle-texture.jpg`),
    });
  
    return <points geometry={geometry} material={pointsMaterial} {...props} />;
}
  
  let ok = 1;
  function Modifications(props) {
    const ref = useRef();
    const { camera, scene } = useThree();
      camera.position.set(0.01,0.3,10.5)
      scene.add(camera)
     
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;
        const vector = new Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = 0.5; // smaller distance value
        let mousePosition = camera.position.clone();
        mousePosition = camera.position.clone().add(dir.multiplyScalar(distance));
          
        const maxZ = 5; // maximum Z value
        const minZ = 0; // minimum Z value
        const zRange = maxZ - minZ;
        const zRatio = (y + 1) / 2;
        const zOffset = zRange * zRatio;
        mousePosition.z = Math.max(minZ, Math.min(maxZ, mousePosition.z + zOffset));
  
        // console.log(mousePosition)
        gsap.to(camera.position, {
          x: mousePosition.x,
          y: mousePosition.y,
          z: mousePosition.z,
          duration: 2, // duration of the animation in seconds
          ease: "power2.out" // easing function to use
        });
      };
      useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

    useFrame(() => {
      ref.current.rotation.y += 0.00003;

    });
  
  
    return (
      <mesh ref={ref} {...props} position={[0.03, -0.15, 3.3]}>
        <CustomModel />
      </mesh>
    );
  }

  function CanvasBackground(){
    const canvasRef = useRef();
  return (
    <Canvas className='animation-heart' ref={canvasRef} style={{ position: 'absolute', zIndex: 2, top: 0, right: 0, bottom: 0, left: 0 }}>
      <EffectComposer multisampling={0} disableNormalPass={true}>
              <Noise opacity={0.125} />
              <Vignette eskil={false} offset={0.55} darkness={1.1} />
              <Bloom
                luminanceThreshold={0.1}
                luminanceSmoothing={0.7}
                height={100}
                opacity={0.2}
              />
              <DepthOfField
                focusDistance={2}
                focalLength={2.4}
                bokehScale={0}
                height={480}
              />
              <Glitch
                delay={new THREE.Vector2(6, 6)}
              />
            </EffectComposer>
      <Modifications/>
    </Canvas>
  );
}

export default CanvasBackground;