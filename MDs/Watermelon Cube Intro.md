// src/components/scene/WatermelonCubeIntro.jsx  
import React, { useRef, useEffect } from 'react';  
import { useFrame, useThree } from '@react-three/fiber';  
import { a, useSpring } from '@react-spring/three';  
import \* as THREE from 'three';

/\*\*  
 \* Animated Watermelon cube that spins, pulses, and transitions camera for Showcase Mode.  
 \*/  
export const WatermelonCubeIntro \= ({ onIntroComplete }) \=\> {  
  const meshRef \= useRef();  
  const { camera } \= useThree();

  const \[spring, api\] \= useSpring(() \=\> ({  
    scale: \[0.1, 0.1, 0.1\],  
    rotation: \[0, 0, 0\],  
    config: { mass: 2, tension: 240, friction: 30 },  
  }));

  useEffect(() \=\> {  
    api.start({ scale: \[1.5, 1.5, 1.5\], rotation: \[Math.PI \* 2, Math.PI \* 2, 0\] });  
    setTimeout(() \=\> {  
      camera.position.set(0, 2, 6);  
      camera.lookAt(new THREE.Vector3(0, 1.5, 0));  
      onIntroComplete?.();  
    }, 2500);  
  }, \[\]);

  return (  
    \<a.mesh ref={meshRef} scale={spring.scale} rotation={spring.rotation} position={\[0, 1.5, 0\]}\>  
      \<boxGeometry args={\[1.5, 1.5, 1.5\]} /\>  
      \<meshStandardMaterial color={'\#00ffaa'} metalness={0.8} roughness={0.2} /\>  
    \</a.mesh\>  
  );  
};  
