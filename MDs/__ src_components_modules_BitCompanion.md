// src/components/modules/BitCompanion.jsx  
import React, { useState, useEffect } from 'react';  
import { useFrame } from '@react-three/fiber';  
import { Text } from '@react-three/drei';  
import { animated, useSpring } from '@react-spring/three';  
import { Howl } from 'howler';

const yesSound \= new Howl({ src: \['/audio/bit\_yes.mp3'\], volume: 0.7 });  
const noSound \= new Howl({ src: \['/audio/bit\_no.mp3'\], volume: 0.7 });

export const BitCompanion \= () \=\> {  
  const \[state, setState\] \= useState('YES');  
  const \[yPos, setYPos\] \= useState(0);

  const { scale } \= useSpring({  
    scale: state \=== 'YES' ? \[1.2, 1.2, 1.2\] : \[0.9, 0.9, 0.9\],  
    config: { tension: 200, friction: 18 },  
  });

  useEffect(() \=\> {  
    const toggleBit \= () \=\> {  
      const next \= state \=== 'YES' ? 'NO' : 'YES';  
      setState(next);  
      if (next \=== 'YES') yesSound.play();  
      else noSound.play();  
    };  
    const keyHandler \= (e) \=\> {  
      if (e.key \=== 'b') toggleBit();  
    };  
    window.addEventListener('keydown', keyHandler);  
    return () \=\> window.removeEventListener('keydown', keyHandler);  
  }, \[state\]);

  useFrame(({ clock }) \=\> {  
    setYPos(Math.sin(clock.getElapsedTime() \* 3\) \* 0.1);  
  });

  return (  
    \<animated.group scale={scale} position={\[0.8, 1.4 \+ yPos, 0\]}\>   
      \<mesh\>  
        \<sphereGeometry args={\[0.15, 32, 32\]} /\>  
        \<meshStandardMaterial color={state \=== 'YES' ? 'cyan' : 'magenta'} emissive={state \=== 'YES' ? 'cyan' : 'magenta'} /\>  
      \</mesh\>  
      \<Text  
        position={\[0, 0.25, 0\]}  
        fontSize={0.12}  
        color="white"  
        anchorX="center"  
        anchorY="middle"  
      \>  
        {state}  
      \</Text\>  
    \</animated.group\>  
  );  
};

