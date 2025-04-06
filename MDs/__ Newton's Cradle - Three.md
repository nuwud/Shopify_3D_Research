// Newton's Cradle \- Three.js \+ Cannon-es Starter

import \* as THREE from 'three';  
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';  
import \* as CANNON from 'cannon-es';

let scene, camera, renderer, world;  
let balls \= \[\], ballBodies \= \[\], constraints \= \[\];

init();  
animate();

function init() {  
  scene \= new THREE.Scene();  
  scene.background \= new THREE.Color(0x111111);

  camera \= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);  
  camera.position.set(0, 5, 15);

  renderer \= new THREE.WebGLRenderer({ antialias: true });  
  renderer.setSize(window.innerWidth, window.innerHeight);  
  document.body.appendChild(renderer.domElement);

  const controls \= new OrbitControls(camera, renderer.domElement);

  const ambientLight \= new THREE.AmbientLight(0xffffff, 0.3);  
  scene.add(ambientLight);

  const dirLight \= new THREE.DirectionalLight(0xffffff, 1);  
  dirLight.position.set(10, 10, 10);  
  scene.add(dirLight);

  // Physics  
  world \= new CANNON.World();  
  world.gravity.set(0, \-9.82, 0);

  const numBalls \= 5;  
  const ballRadius \= 0.5;  
  const spacing \= ballRadius \* 2.2;

  for (let i \= 0; i \< numBalls; i++) {  
    // THREE Ball  
    const geo \= new THREE.SphereGeometry(ballRadius, 32, 32);  
    const mat \= new THREE.MeshStandardMaterial({ color: 0x6699ff });  
    const mesh \= new THREE.Mesh(geo, mat);  
    const x \= (i \- (numBalls \- 1\) / 2\) \* spacing;  
    mesh.position.set(x, \-2, 0);  
    scene.add(mesh);  
    balls.push(mesh);

    // CANNON Body  
    const shape \= new CANNON.Sphere(ballRadius);  
    const body \= new CANNON.Body({ mass: 1, shape });  
    body.position.set(x, \-2, 0);  
    world.addBody(body);  
    ballBodies.push(body);

    // Constraints  
    const pivot \= new CANNON.Vec3(x, 2, 0);  
    const constraint \= new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 0, 0), null, pivot);  
    world.addConstraint(constraint);  
    constraints.push(constraint);

    // Wire (visual only)  
    const wireGeo \= new THREE.BufferGeometry().setFromPoints(\[  
      new THREE.Vector3(x, 2, 0),  
      mesh.position  
    \]);  
    const wire \= new THREE.Line(wireGeo, new THREE.LineBasicMaterial({ color: 0xffffff }));  
    mesh.userData.wire \= wire;  
    scene.add(wire);  
  }

  // Pull first ball  
  ballBodies\[0\].position.x \-= 3;  
  ballBodies\[0\].velocity.x \= 5;

  window.addEventListener('resize', onWindowResize);  
}

function animate() {  
  requestAnimationFrame(animate);  
  world.step(1 / 60);

  for (let i \= 0; i \< balls.length; i++) {  
    balls\[i\].position.copy(ballBodies\[i\].position);  
    balls\[i\].quaternion.copy(ballBodies\[i\].quaternion);

    const wire \= balls\[i\].userData.wire;  
    wire.geometry.setFromPoints(\[  
      new THREE.Vector3(ballBodies\[i\].position.x, 2, 0),  
      ballBodies\[i\].position  
    \]);  
  }

  renderer.render(scene, camera);  
}

function onWindowResize() {  
  camera.aspect \= window.innerWidth / window.innerHeight;  
  camera.updateProjectionMatrix();  
  renderer.setSize(window.innerWidth, window.innerHeight);  
}

Ohhh, now we’re talkin’. You just unlocked **Boss Level Dev Mode™**.

Challenge accepted. Here’s the mission breakdown for bringing **Newton’s Cradle** into the **Shopify Hydrogen \+ React Three Fiber \+ TypeScript \+ Tailwind CSS v4** universe — bulletproof, scalable, and worthy of the Nuwud portfolio.

---

## **🧠 Project Name: `CradleFiber`**

**Environment:**

* **Shopify Hydrogen** (Remix-based custom storefront framework)

* **TypeScript** for safety and scale

* **React Three Fiber** (R3F) for 3D rendering

* **Three.js** (used under the hood, but extendable)

* **Tailwind CSS v4** for styling and layout

* **Cannon-es** for physics

* **@react-three/cannon** for binding physics to R3F

---

## **✅ Step-by-Step Plan**

### **1\. Setup Your Hydrogen \+ Tailwind Project**

npx create-hydrogen@latest cradle-fiber  
cd cradle-fiber  
npm install \-D tailwindcss postcss autoprefixer  
npx tailwindcss init \-p

Configure `tailwind.config.js`:

/\*\* @type {import('tailwindcss').Config} \*/  
export default {  
  content: \['./app/\*\*/\*.{js,ts,jsx,tsx}'\],  
  theme: {  
    extend: {},  
  },  
  plugins: \[\],  
}

Import Tailwind in `app/styles/tailwind.css`:

@tailwind base;  
@tailwind components;  
@tailwind utilities;

### **2\. Install R3F & Cannon Packages**

npm install three @react-three/fiber @react-three/drei @react-three/cannon

---

### **3\. Build the Component**

Inside `app/components/NewtonCradle.tsx`:

'use client';  
import React, { Suspense } from 'react';  
import { Canvas } from '@react-three/fiber';  
import { OrbitControls } from '@react-three/drei';  
import { Physics, useSphere, usePointToPointConstraint } from '@react-three/cannon';  
import \* as THREE from 'three';

const Ball \= ({ position }: { position: \[number, number, number\] }) \=\> {  
  const \[ref\] \= useSphere(() \=\> ({  
    mass: 1,  
    position,  
    args: \[0.5\],  
  }));

  usePointToPointConstraint(ref, null, {  
    pivotA: \[0, 0.5, 0\],  
    pivotB: \[position\[0\], 2, 0\],  
  });

  return (  
    \<\>  
      \<mesh ref={ref as any} castShadow receiveShadow\>  
        \<sphereGeometry args={\[0.5, 32, 32\]} /\>  
        \<meshStandardMaterial color="skyblue" /\>  
      \</mesh\>  
      {/\* Optional: add wires \*/}  
      \<line\>  
        \<bufferGeometry  
          attach="geometry"  
          setFromPoints={\[  
            new THREE.Vector3(position\[0\], 2, 0),  
            new THREE.Vector3(...position),  
          \]}  
        /\>  
        \<lineBasicMaterial attach="material" color="white" /\>  
      \</line\>  
    \</\>  
  );  
};

export const NewtonCradle \= () \=\> {  
  const balls \= \[0, 1, 2, 3, 4\];

  return (  
    \<div className="w-full h-screen bg-black"\>  
      \<Canvas shadows camera={{ position: \[0, 2, 10\], fov: 50 }}\>  
        \<ambientLight intensity={0.3} /\>  
        \<directionalLight position={\[10, 10, 5\]} intensity={1} castShadow /\>  
        \<Suspense fallback={null}\>  
          \<Physics gravity={\[0, \-9.81, 0\]}\>  
            {balls.map((\_, i) \=\> (  
              \<Ball key={i} position={\[i \- 2, \-2, 0\]} /\>  
            ))}  
          \</Physics\>  
        \</Suspense\>  
        \<OrbitControls /\>  
      \</Canvas\>  
    \</div\>  
  );  
};

---

### **4\. Embed It Into a Hydrogen Page**

Inside `app/routes/_index.tsx` (or wherever you want):

import { NewtonCradle } from '\~/components/NewtonCradle';

export default function Index() {  
  return (  
    \<div className="relative"\>  
      \<NewtonCradle /\>  
    \</div\>  
  );  
}

---

## **✨ Optional Upgrades (Trügüd Mode)**

* 🎵 Add synthesized audio per collision using `Tone.js`.

* 🎛 Add a floating UI panel (Tailwind \+ Headless UI or Radix) to toggle:

  * Slow motion

  * Add/Remove balls

  * Change materials or gravity

* 🌐 Pull colors or themes from Shopify metafields or admin settings

* 🛒 Make balls clickable: on click, open a product modal or add to cart

---

## **💾 Need It in Repo Form?**

Say the word and I’ll generate the full GitHub repo or ready-to-deploy CodeSandbox link with this entire setup baked in.

Ready to deploy or want to add any Trügüd twists before I zip it up?

Absolutely, here is a rephrased, reorganized, and reworded version of the provided text, maintaining the core technical content and structure:

**Newton's Cradle: Shopify Hydrogen \+ React Three Fiber \+ TypeScript \+ Tailwind CSS v4**

**🧠 Project Name: CradleFiber**

**Environment:**

* Shopify Hydrogen (Remix-based storefront framework)  
* TypeScript  
* React Three Fiber (R3F) for 3D rendering  
* Three.js  
* Tailwind CSS v4  
* Cannon-es for physics  
* @react-three/cannon for connecting physics to R3F

**✅ Step-by-Step Plan**

**1\. Setup Your Hydrogen \+ Tailwind Project**

npx create-hydrogen@latest cradle-fiber

cd cradle-fiber

npm install \-D tailwindcss postcss autoprefixer

npx tailwindcss init \-p

Configure tailwind.config.js:

/\*\* @type {import('tailwindcss').Config} \*/

export default {

  content: \['./app/\*\*/\*.{js,ts,jsx,tsx}'\],

  theme: {

    extend: {},

  },

  plugins: \[\],

}

Import Tailwind in app/styles/tailwind.css:

@tailwind base;

@tailwind components;

@tailwind utilities;

**2\. Install R3F & Cannon Packages**

npm install three @react-three/fiber @react-three/drei @react-three/cannon

**3\. Build the Cradle Component**

Inside app/components/NewtonCradle.tsx:

'use client';

import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';

import { Physics, useSphere, usePointToPointConstraint } from '@react-three/cannon';

import \* as THREE from 'three';

// ... (rest of component code)

**4\. Embed It Into a Hydrogen Page**

Inside app/routes/\_index.tsx (or wherever you desire):

import { NewtonCradle } from '\~/components/NewtonCradle';

export default function Index() {

  return (

    \<div className="relative"\>

      \<NewtonCradle /\>

    \</div\>

  );

}

**✨ Optional Upgrades**

* 🎵 Add synthesized audio per collision using Tone.js.  
* 🎛 Add a floating UI panel (Tailwind \+ Headless UI or Radix) to toggle:  
  * Slow motion  
  * Add/Remove balls  
  * Change materials or gravity  
* 🌐 Pull colors or themes from Shopify metafields or admin settings  
* 🛒 Make balls clickable: on click, open a product modal or add to cart

**💾 Need It in Repo Form?**

Let me know, and I can generate the full GitHub repo or a ready-to-deploy CodeSandbox link with this entire setup included.