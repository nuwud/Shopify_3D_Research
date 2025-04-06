
# 🚀 Welcome to Ball Watermelon OS for Hydrogen
_A modular 3D front-end engine for immersive Shopify storefronts._

---

## 🧠 What Is It?

**Ball Watermelon OS** is a custom UI system that overrides the Shopify Hydrogen root layout with a fully 3D interface powered by:
- **React Three Fiber**
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (state management)
- **Shopify Metafields**

It's built to feel like a 3D operating system layered on top of Shopify — modular, fluid, and admin-configurable.

---

## 🧩 Core Features

| Feature                | Description |
|------------------------|-------------|
| 🎡 3D Carousel UI       | Main nav and nested Ferris wheel-style submenus |
| 🌐 Geodesic Skyball     | Tetrahedron dome synced to carousel (optional) |
| 🪵 Optional Ground Plane | Togglable 3D base layer (off by default) |
| 🧠 Zustand State        | Controls for UI, sync, environment, product slots |
| 📦 glTF Loader          | Load/unload models from metafields or local sources |
| 🛠️ Shopify Metafields   | Admin config for all layout/feature toggles |
| 🧃 HUD via `<Html />`   | Floating 3D UI, Tailwind-powered |
| 💧 Hydration-Safe       | Fully compatible with Hydrogen and SSR |

---

## 🧪 How to Run Locally

1. Clone the repo or extract the showcase ZIP
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open `localhost:3000`

---

## 🛒 Shopify Integration

- Create a metafield for your store:
  - **Namespace:** `watermelon3d`
  - **Key:** `ui_config`
  - **Type:** JSON
- Use `metafields/watermelon3d-ui-config.json` as your schema starter

---

## 🧠 File Overview

| Path                              | Purpose |
|-----------------------------------|---------|
| `src/Root.server.tsx`             | Overrides Hydrogen root with `<WatermelonCanvas />` |
| `src/components/WatermelonCanvas` | Main canvas + lighting + camera |
| `src/components/SceneBuilder`     | Orchestrates skyball, ground, carousel, glTFs |
| `src/components/SkyballDome`      | Environment skyball |
| `src/components/GroundPlane`      | Optional visual base |
| `src/components/ProductGLTF3D`    | Loads glTF models |
| `src/hooks/useSkyballSync`        | Zustand toggle for dome sync |
| `src/hooks/useCustomizerConfig`   | Loads config from Shopify metafield |
| `src/components/WatermelonHUD`    | In-scene UI controls using Tailwind `<Html />` |

---

## 🧠 Philosophy

> “**Stay hydrated. Never break hydration.™**”  
> — Trügüd, Patron Saint of Modular 3D Commerce

---

## 📬 Need Help?

Reach out to **Patrick Allan Wood**, Chief Architect, at [Nuwud Multimedia](https://nuwudmultimedia.com). Or summon Trügüd in the Slack #3d-ui-channel.

