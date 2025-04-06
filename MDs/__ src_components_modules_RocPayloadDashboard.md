// src/components/modules/RocPayloadDashboard.jsx  
import React, { useEffect, useState } from 'react';  
import { useSpring, animated } from '@react-spring/three';  
import { Text } from '@react-three/drei';

export const RocPayloadDashboard \= () \=\> {  
  const \[active, setActive\] \= useState(false);

  const { position, scale, rotation } \= useSpring({  
    position: active ? \[-1.5, 1.2, 0\] : \[0, \-5, 0\],  
    scale: active ? \[1, 1, 1\] : \[0, 0, 0\],  
    rotation: active ? \[0, 0, 0\] : \[0, Math.PI \* 2, 0\],  
    config: { mass: 1, tension: 180, friction: 22 },  
  });

  useEffect(() \=\> {  
    const toggle \= (e) \=\> {  
      if (e.ctrlKey && e.key \=== 'r') setActive((prev) \=\> \!prev);  
    };  
    window.addEventListener('keydown', toggle);  
    return () \=\> window.removeEventListener('keydown', toggle);  
  }, \[\]);

  return (  
    \<animated.group position={position} scale={scale} rotation={rotation}\>  
      \<mesh\>  
        \<boxGeometry args={\[0.8, 0.5, 0.2\]} /\>  
        \<meshStandardMaterial color="black" emissive="red" metalness={0.5} roughness={0.2} /\>  
      \</mesh\>

      \<Text  
        position={\[0, 0.3, 0.11\]}  
        fontSize={0.1}  
        color="lime"  
        anchorX="center"  
        anchorY="middle"  
      \>  
        FLUX OVERRIDE  
      \</Text\>

      \<Text  
        position={\[0, \-0.3, 0.11\]}  
        fontSize={0.08}  
        color="orange"  
        anchorX="center"  
        anchorY="middle"  
      \>  
        DANGER: DO NOT TOUCH  
      \</Text\>  
    \</animated.group\>  
  );  
};

