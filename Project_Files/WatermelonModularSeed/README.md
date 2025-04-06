# Watermelon Modular Seed

This is a modular Vue 3 + TroisJS setup for building immersive Shopify theme components.

## Structure

- `src/`
  - `modules/`
    - `SplashScene/` — A Vue component rendering a spinning 3D cube.
- `public/assets/` — For Vite build output.

## Instructions

1. Import `SplashScene.vue` into your `App.vue` or main entry file.
2. Place it inside the root DOM element (e.g., `#app`) or integrate dynamically via a HUD manager.
3. Drop new modules into the `modules/` folder for future features like:
   - Iridescent shader backgrounds
   - GLTF metafield-driven product visuals
   - Interactive HUD overlays

This structure is built to isolate features and preserve your working base.