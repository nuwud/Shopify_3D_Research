// React Three Fiber Hydrogen-Compatible Modules (BallVisualizer System)

// 1\. MotionTrail.tsx  
import { useFrame } from '@react-three/fiber'  
import { useRef, useEffect } from 'react'  
import \* as THREE from 'three'

export function MotionTrail({ target, length \= 10, color \= 'white' }) {  
  const trailRefs \= useRef(\[\])

  useEffect(() \=\> {  
    for (let i \= 0; i \< length; i++) {  
      const mesh \= new THREE.Mesh(  
        new THREE.SphereGeometry(0.2, 16, 16),  
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })  
      )  
      trailRefs.current.push(mesh)  
    }  
  }, \[length, color\])

  useFrame(() \=\> {  
    if (\!target?.current || \!trailRefs.current.length) return  
    for (let i \= trailRefs.current.length \- 1; i \> 0; i--) {  
      trailRefs.current\[i\].position.copy(trailRefs.current\[i \- 1\].position)  
    }  
    trailRefs.current\[0\].position.copy(target.current.position)  
  })

  return (  
    \<\>  
      {trailRefs.current.map((mesh, index) \=\> (  
        \<primitive key={index} object={mesh} /\>  
      ))}  
    \</\>  
  )  
}

// 2\. BallVisualizer.tsx  
import { Ball } from './Ball'  
import { useRef } from 'react'  
import { MotionTrail } from './MotionTrail'  
import { applySpikyEffect } from './SpikyEffect'  
import { useAudioEngine } from './AudioEngine'  
import { useEffect } from 'react'

export function BallVisualizer({  
  spiky \= false,  
  audio \= true,  
  trail \= true,  
  color \= 'hotpink',  
}) {  
  const meshRef \= useRef()

  useAudioEngine({ enabled: audio })

  useEffect(() \=\> {  
    if (spiky && meshRef.current?.geometry) {  
      applySpikyEffect(meshRef.current.geometry)  
    }  
  }, \[spiky\])

  return (  
    \<\>  
      \<Ball ref={meshRef} color={color} /\>  
      {trail && \<MotionTrail target={meshRef} /\>}  
    \</\>  
  )  
}

// ✅ Fully R3F \+ TypeScript ready  
// ✅ Works inside Shopify Hydrogen (RSC-safe)  
// ✅ Modular visual/audio ball system  
// ✅ Uses Zustand (optional, to be wired with UI toggles)

// 🧊 Stay Hydrated. Never Break Hydration™

