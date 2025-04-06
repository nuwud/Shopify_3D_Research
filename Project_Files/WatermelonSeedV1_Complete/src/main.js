// main.js
import { createApp } from 'vue'
import App from './App.vue'

const raw = document.getElementById('metafields')?.textContent
const metafields = raw ? JSON.parse(raw) : {}

createApp(App).mount('#app')
