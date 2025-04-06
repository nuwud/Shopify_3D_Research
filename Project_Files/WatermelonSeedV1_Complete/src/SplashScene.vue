<template>
  <Canvas background="#ffffff">
    <PerspectiveCamera :position="[0, 0, 5]" />
    <OrbitControls />
    <PointLight :position="[5, 5, 5]" />
    <AmbientLight :intensity="0.3" />
    <Mesh>
      <BoxGeometry />
      <MeshStandardMaterial color="#66ccff" />
    </Mesh>
  </Canvas>
</template>

<script setup>
import {
  Canvas,
  PerspectiveCamera,
  OrbitControls,
  PointLight,
  AmbientLight,
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
} from 'troisjs'
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
