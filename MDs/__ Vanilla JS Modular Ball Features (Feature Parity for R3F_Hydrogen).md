// Vanilla JS Modular Ball Features (Feature Parity for R3F/Hydrogen)

// 1\. initBall.js  
export function initBall(scene, options \= {}) {  
  const geometry \= new THREE.SphereGeometry(1, 32, 32\)  
  const material \= new THREE.MeshPhysicalMaterial({  
    color: options.color || 0xff69b4,  
    roughness: 0.3,  
    metalness: 0.6,  
  })

  const ball \= new THREE.Mesh(geometry, material)  
  ball.castShadow \= true  
  ball.receiveShadow \= true  
  scene.add(ball)

  return ball  
}

// 2\. spikyEffect.js  
export function applySpikyEffect(geometry, strength \= 0.3) {  
  const posAttr \= geometry.attributes.position  
  const count \= posAttr.count

  for (let i \= 0; i \< count; i++) {  
    const x \= posAttr.getX(i)  
    const y \= posAttr.getY(i)  
    const z \= posAttr.getZ(i)  
    const length \= Math.sqrt(x \* x \+ y \* y \+ z \* z)  
    const scale \= 1 \+ Math.random() \* strength  
    posAttr.setXYZ(i, (x / length) \* scale, (y / length) \* scale, (z / length) \* scale)  
  }

  posAttr.needsUpdate \= true  
}

// 3\. audioEngine.js  
export function initAudioEngine({ frequency \= 440, waveform \= 'sine' } \= {}) {  
  const context \= new (window.AudioContext || window.webkitAudioContext)()  
  const oscillator \= context.createOscillator()  
  const gain \= context.createGain()

  oscillator.type \= waveform  
  oscillator.frequency.setValueAtTime(frequency, context.currentTime)  
  oscillator.connect(gain)  
  gain.connect(context.destination)

  oscillator.start()

  return {  
    context,  
    oscillator,  
    gain,  
    stop: () \=\> oscillator.stop(),  
  }  
}

// ⚠️ "Inside Hydrogen or React RSC components (breaks hydration)" — let this be our ethos:  
// ✅ Keep Hydrated. Never Break Hydration.™

