// TachikomaReplica.js  
// Crystal Seed: Stylized Tachikoma Replica (Three.js Version)  
// Author: Nuwud (Patrick Wood)

import \* as THREE from 'three';  
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class TachikomaReplica {  
  constructor(scene, options \= {}) {  
    this.scene \= scene;  
    this.options \= options;  
    this.group \= new THREE.Group();

    // Colors and options  
    this.color \= options.color || 0x3e8ed0;  
    this.glowColor \= options.glowColor || 0x66ccff;  
    this.position \= options.position || new THREE.Vector3(0, 0, 0);

    // Call init  
    this.initBody();  
    this.initEyes();  
    this.scene.add(this.group);  
  }

  initBody() {  
    // Core body \- blue sphere  
    const bodyGeo \= new THREE.SphereGeometry(1.2, 32, 32);  
    const bodyMat \= new THREE.MeshStandardMaterial({ color: this.color });  
    this.body \= new THREE.Mesh(bodyGeo, bodyMat);  
    this.group.add(this.body);

    // Legs (4 cylinder struts)  
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
    // Glowing eyes (3 front, 1 under)  
    const eyeGeo \= new THREE.SphereGeometry(0.2, 16, 16);  
    const eyeMat \= new THREE.MeshStandardMaterial({ emissive: new THREE.Color(this.glowColor), emissiveIntensity: 1 });  
    this.eyes \= \[\];

    const positions \= \[  
      new THREE.Vector3(0.4, 0.6, 1),  
      new THREE.Vector3(-0.4, 0.6, 1),  
      new THREE.Vector3(0, 0.9, 1),  
      new THREE.Vector3(0, \-1.0, 0\) // belly eye  
    \];

    positions.forEach(pos \=\> {  
      const eye \= new THREE.Mesh(eyeGeo, eyeMat);  
      eye.position.copy(pos);  
      this.group.add(eye);  
      this.eyes.push(eye);  
    });  
  }

  update(delta) {  
    // Simple idle hover animation  
    const hover \= Math.sin(Date.now() \* 0.002) \* 0.1;  
    this.group.position.y \= this.position.y \+ hover;  
  }  
}

// Usage:  
// import { TachikomaReplica } from './TachikomaReplica.js';  
// const tachikoma \= new TachikomaReplica(scene, { position: new THREE.Vector3(0, 0, 0\) });  
// In animation loop: tachikoma.update(delta);

