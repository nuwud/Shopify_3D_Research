// TachikomaReplica.js  
// Crystal Seed: Stylized Tachikoma Replica (Three.js Version) \+ HUD \+ Console  
// Author: Nuwud (Patrick Wood)

import \* as THREE from 'three';  
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  
import { SeedPanelHUD } from './SeedPanelHUD.js';  
import { MechCommandConsole } from './MechCommandConsole.js';

export class TachikomaReplica {  
  constructor(scene, options \= {}) {  
    this.scene \= scene;  
    this.options \= options;  
    this.group \= new THREE.Group();

    // Load profile data  
    this.profile \= options.profile;

    // Colors and profile options  
    this.color \= this.profile?.chassisColor || 0x3e8ed0;  
    this.glowColor \= this.profile?.glowColor || 0x66ccff;  
    this.position \= options.position || new THREE.Vector3(0, 0, 0);

    // Init systems  
    this.initBody();  
    this.initEyes();  
    this.attachHUD();  
    this.attachConsole();

    this.scene.add(this.group);  
  }

  initBody() {  
    const bodyGeo \= new THREE.SphereGeometry(1.2, 32, 32);  
    const bodyMat \= new THREE.MeshStandardMaterial({ color: this.color });  
    this.body \= new THREE.Mesh(bodyGeo, bodyMat);  
    this.group.add(this.body);

    // Legs  
    this.legs \= \[\];  
    for (let i \= 0; i \< 4; i++) {  
      const legGeo \= new THREE.CylinderGeometry(0.1, 0.1, 1, 16);  
      const legMat \= new THREE.MeshStandardMaterial({ color: 0x444444 });  
      const leg \= new THREE.Mesh(legGeo, legMat);  
      leg.rotation.z \= Math.PI / 2;  
      leg.position.set(Math.cos(i \* Math.PI / 2\) \* 1.2, \-0.8, Math.sin(i \* Math.PI / 2\) \* 1.2);  
      this.group.add(leg);  
      this.legs.push(leg);  
    }

    this.group.position.copy(this.position);  
  }

  initEyes() {  
    const eyeGeo \= new THREE.SphereGeometry(0.2, 16, 16);  
    const eyeMat \= new THREE.MeshStandardMaterial({ emissive: new THREE.Color(this.glowColor), emissiveIntensity: 1 });  
    this.eyes \= \[\];

    const positions \= \[  
      new THREE.Vector3(0.4, 0.6, 1),  
      new THREE.Vector3(-0.4, 0.6, 1),  
      new THREE.Vector3(0, 0.9, 1),  
      new THREE.Vector3(0, \-1.0, 0\)  
    \];

    positions.forEach(pos \=\> {  
      const eye \= new THREE.Mesh(eyeGeo, eyeMat);  
      eye.position.copy(pos);  
      this.group.add(eye);  
      this.eyes.push(eye);  
    });  
  }

  attachHUD() {  
    this.hud \= new SeedPanelHUD(this.profile);  
    this.hud.attachTo(this.group);  
  }

  attachConsole() {  
    this.console \= new MechCommandConsole(this.profile, (upgrade) \=\> {  
      console.log(\`${this.profile.name} unlocked:\`, upgrade);  
      this.playVoiceReaction(upgrade);  
    });  
    this.console.attachTo(this.group);  
  }

  playVoiceReaction(upgrade) {  
    const audio \= new Audio(\`./voices/${this.profile.voice}\`);  
    audio.play().catch(err \=\> console.warn("Voice playback issue:", err));  
  }

  update(delta) {  
    const hover \= Math.sin(Date.now() \* 0.002) \* 0.1;  
    this.group.position.y \= this.position.y \+ hover;  
  }

  toggleHUD() {  
    if (this.hud) this.hud.toggle();  
  }

  toggleConsole() {  
    if (this.console) this.console.toggle();  
  }  
}

// Usage:  
// import { TachikomaReplica } from './TachikomaReplica.js';  
// const tachikoma \= new TachikomaReplica(scene, { position: new THREE.Vector3(0,0,0), profile: mechProfile\['KAIA'\] });  
// In animation loop: tachikoma.update(delta);  
// On interaction: tachikoma.toggleHUD(); or tachikoma.toggleConsole();  
