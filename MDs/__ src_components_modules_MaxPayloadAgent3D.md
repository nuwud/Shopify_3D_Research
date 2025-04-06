// src/components/modules/MaxPayloadAgent3D.jsx  
import React, { useEffect, useState } from 'react';  
import { useFrame } from '@react-three/fiber';  
import { animated, useSpring } from '@react-spring/three';  
import { Text } from '@react-three/drei';

export const MaxPayloadAgent3D \= () \=\> {  
  const \[active, setActive\] \= useState(false);  
  const \[hoverY, setHoverY\] \= useState(0);

  const { position, scale, rotation } \= useSpring({  
    position: active ? \[1.5, 1.5, 0\] : \[0, \-5, 0\],  
    scale: active ? \[1, 1, 1\] : \[0, 0, 0\],  
    rotation: active ? \[0, Math.PI \* 2, 0\] : \[0, 0, 0\],  
    config: { mass: 1, tension: 160, friction: 30 },  
  });

  useEffect(() \=\> {  
    const handler \= (e) \=\> {  
      if (e.ctrlKey && e.key \=== 'm') setActive((a) \=\> \!a);  
    };  
    window.addEventListener('keydown', handler);  
    return () \=\> window.removeEventListener('keydown', handler);  
  }, \[\]);

  useFrame(({ clock }) \=\> {  
    if (active) setHoverY(Math.sin(clock.getElapsedTime() \* 2\) \* 0.2);  
  });

  return (  
    \<animated.group position={position} scale={scale} rotation={rotation}\>  
      \<mesh position={\[0, hoverY, 0\]}\>  
        \<icosahedronGeometry args={\[0.4, 1\]} /\>  
        \<meshStandardMaterial color="silver" metalness={1} roughness={0.2} emissive="blue" /\>  
      \</mesh\>  
      \<Text  
        position={\[0, 0.7 \+ hoverY, 0\]}  
        fontSize={0.12}  
        color="white"  
        anchorX="center"  
        anchorY="middle"  
      \>  
        MAX  
      \</Text\>  
    \</animated.group\>  
  );  
};

