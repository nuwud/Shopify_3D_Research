// src/components/modules/MenuItem3D.jsx  
import React from 'react';  
import { Text } from '@react-three/drei';  
import { animated, useSpring } from '@react-spring/three';  
import { useSceneState } from '../../store/useSceneState';

export const MenuItem3D \= ({ id, label, icon }) \=\> {  
  const { openSubmenu, activeParentId } \= useSceneState();

  const isActive \= activeParentId \=== id;  
  const { scale } \= useSpring({  
    scale: isActive ? \[1.2, 1.2, 1.2\] : \[1, 1, 1\],  
    config: { mass: 1, tension: 170, friction: 18 },  
  });

  return (  
    \<animated.group scale={scale} onClick={() \=\> openSubmenu(id)}\>  
      \<mesh\>  
        \<sphereGeometry args={\[0.3, 16, 16\]} /\>  
        \<meshStandardMaterial color={isActive ? 'orange' : 'hotpink'} /\>  
      \</mesh\>  
      \<Text  
        position={\[0, 0.5, 0\]}  
        fontSize={0.15}  
        color={'white'}  
        anchorX="center"  
        anchorY="middle"  
      \>  
        {label}  
      \</Text\>  
    \</animated.group\>  
  );  
};

