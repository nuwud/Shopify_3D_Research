// Modular React Three Fiber Components for BallVisualizer System

// 1\. Ball.tsx  
import { useRef } from 'react'  
import { useFrame } from '@react-three/fiber'  
import { Mesh } from 'three'

export function Ball({ color \= 'hotpink' }: { color?: string }) {  
  const meshRef \= useRef\<Mesh\>(null)

  useFrame(() \=\> {  
    if (meshRef.current) {  
      meshRef.current.rotation.y \+= 0.01  
    }  
  })

  return (  
    \<mesh ref={meshRef} castShadow receiveShadow\>  
      \<sphereGeometry args={\[1, 32, 32\]} /\>  
      \<meshPhysicalMaterial color={color} roughness={0.3} metalness={0.6} /\>  
    \</mesh\>  
  )  
}

// 2\. AudioEngine.tsx  
import { useEffect } from 'react'

export function useAudioEngine({ enabled \= true }: { enabled?: boolean }) {  
  useEffect(() \=\> {  
    if (\!enabled) return  
    const audioContext \= new (window.AudioContext || window.webkitAudioContext)()  
    const oscillator \= audioContext.createOscillator()  
    const gainNode \= audioContext.createGain()

    oscillator.type \= 'sine'  
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)  
    oscillator.connect(gainNode)  
    gainNode.connect(audioContext.destination)  
    oscillator.start()

    return () \=\> {  
      oscillator.stop()  
      audioContext.close()  
    }  
  }, \[enabled\])  
}

// 3\. SpikyEffect.tsx  
import { useEffect } from 'react'  
import { BufferGeometry, Float32BufferAttribute } from 'three'

export function applySpikyEffect(geometry: BufferGeometry, strength: number \= 0.3) {  
  const posAttr \= geometry.attributes.position as Float32BufferAttribute  
  const count \= posAttr.count

  for (let i \= 0; i \< count; i++) {  
    const x \= posAttr.getX(i)  
    const y \= posAttr.getY(i)  
    const z \= posAttr.getZ(i)  
    const length \= Math.sqrt(x \* x \+ y \* y \+ z \* z)  
    const scale \= 1 \+ Math.random() \* strength  
    posAttr.setXYZ(i, x / length \* scale, y / length \* scale, z / length \* scale)  
  }

  posAttr.needsUpdate \= true  
}

// Example usage in \<Ball /\>:  
// useEffect(() \=\> {  
//   if (meshRef.current?.geometry) {  
//     applySpikyEffect(meshRef.current.geometry)  
//   }  
// }, \[\])

