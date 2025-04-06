// src/components/scene/WatermelonLogoPulse.jsx  
import React, { useRef } from 'react';  
import { useFrame } from '@react-three/fiber';  
import { Text } from '@react-three/drei';  
import \* as THREE from 'three';

/\*\*  
 \* Floating Watermelon logo during intro with soft glowing pulse.  
 \*/  
export const WatermelonLogoPulse \= () \=\> {  
  const textRef \= useRef();  
  let t \= 0;

  useFrame(() \=\> {  
    if (\!textRef.current) return;  
    t \+= 0.05;  
    const scale \= 1 \+ Math.sin(t) \* 0.05;  
    textRef.current.scale.set(scale, scale, scale);  
    const glow \= 0.2 \+ Math.sin(t) \* 0.3;  
    textRef.current.material.emissiveIntensity \= glow;  
  });

  return (  
    \<Text  
      ref={textRef}  
      position={\[0, 3, 0\]}  
      fontSize={0.6}  
      color="\#00ffaa"  
      anchorX="center"  
      anchorY="middle"  
    \>  
      🍉 Watermelon  
    \</Text\>  
  );  
};  
