// components/KaiaLitePresenter.tsx  
import { useRef, useState, useEffect } from 'react';  
import { useFrame } from '@react-three/fiber';  
import { Html } from '@react-three/drei';  
import { animated, useSpring } from '@react-spring/three';  
import \* as dat from 'dat.gui';

/\*\*  
 \* KaiaLitePresenter  
 \* A lightweight 3D AI presenter avatar built in @react-three/fiber.  
 \* Includes intro animation, movement sync, and toggle support.  
 \*/  
export default function KaiaLitePresenter() {  
  const headRef \= useRef\<any\>();  
  const \[visible, setVisible\] \= useState(true);  
  const \[mounted, setMounted\] \= useState(false);

  // Intro scale-in animation  
  const { scale } \= useSpring({  
    from: { scale: 0 },  
    to: { scale: mounted ? 1.1 : 0 },  
    config: { mass: 1, tension: 180, friction: 20 },  
  });

  // Idle rotation  
  useFrame(({ clock }) \=\> {  
    if (headRef.current) {  
      headRef.current.rotation.y \= Math.sin(clock.getElapsedTime()) \* 0.2;  
      headRef.current.rotation.x \= Math.sin(clock.getElapsedTime() \* 0.5) \* 0.1;  
    }  
  });

  // Intro delay and animation trigger  
  useEffect(() \=\> {  
    const timeout \= setTimeout(() \=\> setMounted(true), 500);  
    return () \=\> clearTimeout(timeout);  
  }, \[\]);

  // dat.GUI toggle  
  useEffect(() \=\> {  
    const gui \= new dat.GUI();  
    const config \= { ShowKaia: visible };  
    gui.add(config, 'ShowKaia').name('Show KaiaLite').onChange(setVisible);  
    return () \=\> gui.destroy();  
  }, \[\]);

  if (\!visible) return null;

  return (  
    \<animated.group ref={headRef} scale={scale} position={\[0, 1.5, 0\]}\>  
      \<mesh\>  
        \<sphereGeometry args={\[0.6, 32, 32\]} /\>  
        \<meshStandardMaterial color="\#333" emissive="\#00faff" emissiveIntensity={0.6} /\>  
      \</mesh\>  
      \<Html center distanceFactor={10} transform\>  
        \<div className="text-white text-sm bg-black/70 px-3 py-2 rounded-xl shadow-lg"\>  
          👋 Initializing Nuwud AI Protocol...  
        \</div\>  
      \</Html\>  
    \</animated.group\>  
  );  
}

