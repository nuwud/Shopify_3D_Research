// InteractiveBallScene.tsx \- Hydrogen \+ R3F \+ Audio from scratch

import { Canvas } from '@react-three/fiber';  
import { OrbitControls, Icosahedron, Html } from '@react-three/drei';  
import { Suspense, useEffect, useRef, useState } from 'react';  
import \* as THREE from 'three';

import { useSoundSynth } from './hooks/useSoundSynth';  
import { useSpring, a } from '@react-spring/three';

export default function InteractiveBallScene() {  
  return (  
    \<div className="w-full h-screen"\>  
      \<Canvas camera={{ position: \[0, 0, 2\], fov: 75 }}\>  
        \<Suspense fallback={\<Html\>Loading...\</Html\>}\>  
          \<ambientLight intensity={0.5} /\>  
          \<pointLight position={\[0, 0, 2\]} intensity={2} color={'\#00FFFF'} /\>  
          \<InteractiveBall /\>  
          \<OrbitControls enableDamping={true} enablePan={false} /\>  
        \</Suspense\>  
      \</Canvas\>  
    \</div\>  
  );  
}

function InteractiveBall() {  
  const meshRef \= useRef\<THREE.Mesh\>(null);  
  const { playFacetSound, ensureAudioInitialized } \= useSoundSynth();  
  const \[hovered, setHovered\] \= useState(false);  
  const \[facetIndex, setFacetIndex\] \= useState\<number | null\>(null);  
  const \[scale, setScale\] \= useState(1);

  const { scaleSpring } \= useSpring({  
    scaleSpring: hovered ? 1.1 : 1.0,  
    config: { tension: 300, friction: 15 },  
  });

  useEffect(() \=\> {  
    const handleClick \= () \=\> ensureAudioInitialized();  
    window.addEventListener('click', handleClick, { once: true });  
    return () \=\> window.removeEventListener('click', handleClick);  
  }, \[ensureAudioInitialized\]);

  const handlePointerOver \= (e: any) \=\> {  
    e.stopPropagation();  
    setHovered(true);  
  };

  const handlePointerOut \= (e: any) \=\> {  
    e.stopPropagation();  
    setHovered(false);  
  };

  const handlePointerMove \= (e: any) \=\> {  
    e.stopPropagation();  
    if (\!meshRef.current) return;  
    const face \= e.faceIndex;  
    if (face \!== facetIndex) {  
      playFacetSound(face);  
      setFacetIndex(face);  
    }  
  };

  return (  
    \<a.mesh  
      ref={meshRef}  
      scale={scaleSpring.to((s) \=\> \[s, s, s\])}  
      onPointerOver={handlePointerOver}  
      onPointerOut={handlePointerOut}  
      onPointerMove={handlePointerMove}  
    \>  
      \<icosahedronGeometry args={\[1, 4\]} /\>  
      \<meshStandardMaterial  
        color={hovered ? '\#FF66CC' : '\#00FFFF'}  
        flatShading={true}  
        wireframe={true}  
        opacity={0.6}  
        transparent  
      /\>  
    \</a.mesh\>  
  );  
}

