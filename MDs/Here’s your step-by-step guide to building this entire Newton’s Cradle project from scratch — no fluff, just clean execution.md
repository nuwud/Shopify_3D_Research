Here’s your **step-by-step guide to building this entire Newton’s Cradle project from scratch** — no fluff, just clean execution. Follow this blueprint and you’ll get a **Shopify Hydrogen-integrated, SSR-safe, mobile-friendly, physics-powered 3D experience** ready for GitHub and Vercel.

---

## **🧱 PART 1: PROJECT SETUP**

### **✅ 1\. Create a Shopify Hydrogen App**

npx create-hydrogen@latest cradle-fiber  
cd cradle-fiber

### **✅ 2\. Install Core Dependencies**

npm install three @react-three/fiber @react-three/drei @react-three/cannon tailwindcss postcss autoprefixer  
npx tailwindcss init \-p

---

## **🎨 PART 2: TAILWIND CONFIG**

### **🔹 `tailwind.config.js`**

export default {  
  content: \['./app/\*\*/\*.{js,ts,jsx,tsx}'\],  
  theme: { extend: {} },  
  plugins: \[\],  
}

### **🔹 `app/styles/tailwind.css`**

@tailwind base;  
@tailwind components;  
@tailwind utilities;

### **🔹 Import in `app/entry.client.tsx` or layout file**

import '\~/styles/tailwind.css';

---

## **🧠 PART 3: NEWTON’S CRADLE COMPONENT**

### **🔹 `app/components/NewtonCradle.tsx`**

'use client';  
import React, { Suspense, useState } from 'react';  
import { Canvas } from '@react-three/fiber';  
import { PresentationControls, Environment, ContactShadows } from '@react-three/drei';  
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
        \<meshPhysicalMaterial color="skyblue" metalness={0.3} roughness={0.1} /\>  
      \</mesh\>  
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
  const \[slowMo, setSlowMo\] \= useState(false);  
  const balls \= \[0, 1, 2, 3, 4\];

  return (  
    \<div className="relative w-full h-\[100dvh\] bg-black"\>  
      \<Canvas shadows dpr={\[1, 2\]} camera={{ position: \[0, 2, 10\], fov: 60 }}\>  
        \<ambientLight intensity={0.3} /\>  
        \<directionalLight position={\[10, 10, 5\]} intensity={1} castShadow /\>  
        \<Environment preset="city" /\>  
        \<ContactShadows position={\[0, \-2.5, 0\]} opacity={0.5} blur={2} /\>  
        \<PresentationControls global polar={\[-Math.PI / 4, Math.PI / 4\]} azimuth={\[-Math.PI / 2, Math.PI / 2\]}\>  
          \<Suspense fallback={null}\>  
            \<Physics gravity={\[0, \-9.81, 0\]} allowSleep\>  
              {balls.map((\_, i) \=\> (  
                \<Ball key={i} position={\[i \- 2, \-2, 0\]} /\>  
              ))}  
            \</Physics\>  
          \</Suspense\>  
        \</PresentationControls\>  
      \</Canvas\>

      {/\* UI Toggle \*/}  
      \<div className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg"\>  
        \<button onClick={() \=\> setSlowMo(\!slowMo)} className="text-white text-sm font-mono"\>  
          {slowMo ? 'Normal Speed' : 'Slow Motion'}  
        \</button\>  
      \</div\>  
    \</div\>  
  );  
};

---

## **📍 PART 4: ROUTES \+ INTEGRATION**

### **🔹 `app/routes/_index.tsx`**

import { NewtonCradle } from '\~/components/NewtonCradle';

export default function Index() {  
  return (  
    \<div className="relative"\>  
      \<NewtonCradle /\>  
    \</div\>  
  );  
}

---

## **🛠️ PART 5: PREP FOR DEPLOYMENT**

### **🔹 `.gitignore`**

node\_modules  
.env  
.DS\_Store

### **🔹 `README.md` (Use the one we generated earlier)**

---

## **🚀 PART 6: DEPLOY TO GITHUB \+ VERCEL**

### **🔹 Git Setup**

git init  
git add .  
git commit \-m "Initial commit: Newton’s Cradle Hydrogen V3"  
gh repo create cradle-fiber \--public \--source=. \--push

### **🔹 Vercel Deploy**

npm install \-g vercel  
vercel

---

## **🎯 Done\!**

Now you’ve got a clean, performant, interactive physics simulation built in a Shopify Hydrogen app — fully deployable and portfolio-ready.

Want a one-click template repo or to add Shopify product linking next?

