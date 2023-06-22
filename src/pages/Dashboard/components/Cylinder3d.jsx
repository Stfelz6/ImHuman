import React, { useRef } from 'react';
/* eslint-disable */
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three';
import { Points } from 'three';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette
} from "@react-three/postprocessing";
import {
  Html,
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial
} from "@react-three/drei";
/* eslint-disable */

function CustomModel(props) {
  const { nodes } = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/balloonPoly.glb`);

  // Create the geometry from the model
  const geometry = nodes.balloon.geometry;

  // Create the material for the points
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xff00e0,
    size: 0.007,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    sizeAttenuation: true,
    alphaMap: new THREE.TextureLoader().load(`${process.env.PUBLIC_URL}/particle-texture.jpg`),
  });
  
  // Create an array to store the initial positions of the points
  const initialPositions = geometry.attributes.position.array.slice();

  let range = 0.7; // initial range value
  const rangeStep = 1 / (5 * 60); // step size to decrease range from 1 to 0 in 5 seconds
  
  // Set the positions of the geometry to the initial positions
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(initialPositions, 3));
  
  // Animate the points by updating their positions in the animation loop
  // const [ok, setOK] = useState('');
  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const positions = geometry.attributes.position.array;
  
    if (range > 0 && time > 2.5 && ok === 0 && props.inputClicked.inputClicked.current === true) {
      range -= rangeStep;
    }
    // console.log(props.inputClicked.inputClicked)
  
    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];
      const z = initialPositions[i + 2];
  
      const noiseX = range * (Math.random() - 0.5);
      const noiseY = range * (Math.random() - 0.5);
      const noiseZ = range * (Math.random() - 0.7);
  
      positions[i] = x + noiseX * Math.sin(time/3);
      positions[i + 1] = y + noiseY * Math.sin(time/3 + i);
      positions[i + 2] = z + noiseZ * Math.sin(time/3 + i * 2);
    }
  
    geometry.attributes.position.needsUpdate = true;
});
  

  // setOk('');
  return <points geometry={geometry} material={pointsMaterial} {...props} />;
}

let ok = 1;

function Modifications(props) {
  const ref = useRef();
  const { camera, scene } = useThree();
    camera.position.set(0.01,0.3,3.5)
    scene.add(camera)
   
  useFrame(() => {
    if (ref.current.rotation.y < 0.2 && ok === 1) 
      ref.current.rotation.y += 0.0003;
    else {
      ok = 0;
      ref.current.rotation.y -= 0.0003;
    }
    if (ref.current.rotation.y <= -0.2) ok = 1;

  });


  return (
    <mesh ref={ref} {...props} position={[0.03, -0.15, 2.4]}>
      <CustomModel inputClicked={props.inputClicked}/>
    </mesh>
  );
}

function Scene(inputClicked) {
  return (
    <>
      {/* <pointLight position={[10, 20, 0]} color={'white'} />
      <pointLight position={[20, -120, 0]} color={'white'} />
      <pointLight position={[-60, 30, 30]} color={'white'} />
      <ambientLight position={[10, 20, 0]} color={'red'} /> */}
      <Modifications inputClicked={inputClicked}/>
    </>
  );
}

export default Scene;