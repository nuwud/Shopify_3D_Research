# 🧠 Ball Features Summary (Three.js Project)

This document provides a deduplicated list of all features developed for the "ball" object across different versions and commits of the Three.js project. Use this as a reference to restore, modularize, or expand on past capabilities.

---

## 🧱 Structure & Rendering
- Created with `THREE.Mesh` using `SphereGeometry` and various materials (e.g., `MeshPhysicalMaterial`, `MeshStandardMaterial`)
- Runtime material changes (e.g., dynamic updates via UI or interaction)
- Facet highlighting for individual mesh faces

## 🌀 Motion & Interaction
- Real-time position manipulation
- Visual motion trail effect
- “Spiky” mode (likely modifies vertices for a jagged appearance)
- Dynamic scaling (linked to user input or audio feedback)
- Responds to high-frequency input events like `mousemove` and `touchmove`
- DOM/pointer event listeners for click and hover interactivity

## 🔊 Audio Features
- Audio integration using `THREE.Audio` and the Web Audio API
- Multi-oscillator support (polyphonic/harmonic layering)
- Oscillator-based sound generation (sine waves, etc.)
- Audio responds to ball movement (e.g., position affects frequency)
- GainNode control for volume modulation
- Reverb effects included in audio pipeline
- Looping sound effects
- Audio triggered via user interaction
- Web Audio context resume support for autoplay policies
- Rate-limiting/throttling to prevent audio spam
- Emergency retry logic for audio context initialization

## 🎨 Visual Enhancements
- Dynamic gradient textures (some responsive to audio or motion)
- Real-time color change based on audio frequency data

## ⚙️ Utilities & Debug
- Ball initialization encapsulated in `initBall()` for modular control
- Error handling during ball/audio setup using try/catch
- Logging of ball position, velocity, and mesh properties
- Script merging utility to combine modular JS files

---

🧩 Use this list as a feature matrix when porting over functionality into Hydrogen or React Three Fiber.

