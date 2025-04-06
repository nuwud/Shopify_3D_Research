// \=== FILE: README.md \===

\# Shopify \+ Three.js Hydrogen Starter (Crystal Seed)

This is a full-stack Hydrogen-compatible 3D Shopify starter kit, integrating:  
\- 🛒 Shopify Hydrogen (v3+)  
\- 🎮 React Three Fiber (R3F)  
\- 🧠 Zustand (state management)  
\- 🎯 Cannon-es (physics)  
\- 🎨 Tailwind CSS v4 (via miniOxygen)  
\- 🌀 Three.js core for shader/geometry access  
\- 🧼 ESLint with Hydrogen plugin for strict type-safe linting

\---

\#\# What It Does  
\- Loads dynamic Shopify product data into a 3D scene  
\- glTF model loader for product showcase  
\- OrbitControls for camera nav  
\- Ground plane toggle  
\- Skyball environment dome (tetrahedron-based)  
\- Variant-based color or texture swapping (via Shopify metafields)  
\- Audio-reactive lighting & FX hooks (prepared)

\---

\#\# Folder Structure  
\`\`\`  
/components  
  ├── Scene.tsx  
  ├── Skyball.tsx  
  ├── Ground.tsx  
  ├── ModelLoader.tsx  
  ├── WatermelonMenu3D.tsx  
/lib  
  ├── shopify.ts  
  ├── gltf-utils.ts  
  ├── useStore.ts (Zustand store)  
/public  
  └── models/  
    └── defaultModel.glb  
/styles  
  └── tailwind.css  
\`\`\` 

\---

\#\# Getting Started  
\`\`\`bash  
npm install  
npm run dev  
\`\`\`

To use with your own Shopify store:  
\- Replace \`shopify.ts\` credentials  
\- Add metafields for model paths or variants  
\- Upload glTF models to \`/public/models\`

\---

\#\# Crystal Seed Tags  
\`\`\`ts  
// @seed-tag: hydrogen, r3f, shopify-3d  
// @mcp-step: load store data \-\> render glTF \-\> bind variant \-\> react to state  
// @copilot-hint: This 3D scene dynamically loads glTF models based on Shopify product variant metafields  
\`\`\`

\#\# Next Steps  
\- 🔲 Add dynamic cart integration to the 3D interface  
\- 🔲 AI Fit Recommender (via metafield \+ recommender-agent)  
\- 🔲 Add dat.GUI panel for in-browser seed tweaking  
\- 🔲 WatermelonCarousel3D as primary navigation

