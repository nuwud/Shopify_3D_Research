// React Three Fiber Hydrogen-Compatible Modules (BallVisualizer System)

// 1\. MotionTrail.tsx  
import { useFrame } from '@react-three/fiber'  
import { useRef, useEffect } from 'react'  
import \* as THREE from 'three'

interface MotionTrailProps {  
  target: React.RefObject\<THREE.Mesh\>  
  length?: number  
  color?: string  
}

export function MotionTrail({ target, length \= 10, color \= 'white' }: MotionTrailProps) {  
  const trailRefs \= useRef\<THREE.Mesh\[\]\>(\[\])

  useEffect(() \=\> {  
    if (trailRefs.current.length \=== 0\) {  
      for (let i \= 0; i \< length; i++) {  
        const mesh \= new THREE.Mesh(  
          new THREE.SphereGeometry(0.2, 16, 16),  
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })  
        )  
        trailRefs.current.push(mesh)  
      }  
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

// 2\. GradientTexture.tsx  
import \* as THREE from 'three'

export function createGradientTexture(colors: string\[\] \= \['\#ff00ff', '\#00ffff'\]): THREE.Texture {  
  const size \= 512  
  const canvas \= document.createElement('canvas')  
  canvas.width \= size  
  canvas.height \= size  
  const ctx \= canvas.getContext('2d')

  if (\!ctx) throw new Error('Failed to get 2D context')

  const gradient \= ctx.createLinearGradient(0, 0, size, size)  
  const step \= 1 / (colors.length \- 1\)  
  colors.forEach((color, i) \=\> gradient.addColorStop(i \* step, color))

  ctx.fillStyle \= gradient  
  ctx.fillRect(0, 0, size, size)

  const texture \= new THREE.CanvasTexture(canvas)  
  texture.needsUpdate \= true

  return texture  
}

// 3\. FacetHighlighter.tsx  
import \* as THREE from 'three'

export function highlightFacets(geometry: THREE.BufferGeometry, faceIndices: number\[\] \= \[\], color: THREE.ColorRepresentation \= 0xffff00) {  
  const newColors: number\[\] \= \[\]  
  const count \= geometry.attributes.position.count

  for (let i \= 0; i \< count; i++) {  
    const isHighlighted \= faceIndices.includes(i)  
    const c \= new THREE.Color(isHighlighted ? color : 0xffffff)  
    newColors.push(c.r, c.g, c.b)  
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3))  
  geometry.attributes.color.needsUpdate \= true  
}

// 4\. BallVisualizer.tsx  
import { Ball } from './Ball'  
import { useRef, useEffect } from 'react'  
import { MotionTrail } from './MotionTrail'  
import { applySpikyEffect } from './SpikyEffect'  
import { highlightFacets } from './FacetHighlighter'  
import { useAudioEngine } from './AudioEngine'  
import { useVisualizerControls } from './useVisualizerControls'  
import { createGradientTexture } from './GradientTexture'  
import \* as THREE from 'three'

interface BallVisualizerProps {  
  color?: string  
}

export function BallVisualizer({ color \= 'hotpink' }: BallVisualizerProps) {  
  const meshRef \= useRef\<THREE.Mesh\>(null)  
  const { audio, trail, spiky, gradient } \= useVisualizerControls()

  useAudioEngine({ enabled: audio })

  useEffect(() \=\> {  
    if (spiky && meshRef.current?.geometry) {  
      applySpikyEffect(meshRef.current.geometry)  
    }  
  }, \[spiky\])

  useEffect(() \=\> {  
    if (gradient && meshRef.current?.material instanceof THREE.MeshPhysicalMaterial) {  
      meshRef.current.material.map \= createGradientTexture()  
      meshRef.current.material.needsUpdate \= true  
    }  
  }, \[gradient\])

  useEffect(() \=\> {  
    if (meshRef.current?.geometry) {  
      highlightFacets(meshRef.current.geometry, \[1, 5, 9, 12\])  
    }  
  }, \[\])

  return (  
    \<\>  
      \<Ball ref={meshRef} color={color} /\>  
      {trail && \<MotionTrail target={meshRef} /\>}  
    \</\>  
  )  
}

// ✅ FacetHighlighter added  
// ✅ BallVisualizer now supports gradient \+ facet highlighting  
// ✅ Final module: BallScene — coming next

// 🧊 Stay Hydrated. Never Break Hydration™

