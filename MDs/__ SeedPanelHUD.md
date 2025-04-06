// SeedPanelHUD.js  
// Crystal Seed: 3D Interactive Mech SeedPanel HUD  
// Author: Nuwud (Patrick Wood)

import \* as THREE from 'three';  
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export class SeedPanelHUD {  
  constructor(mechData, position \= new THREE.Vector3(0, 2.5, 0)) {  
    this.mechData \= mechData;  
    this.panel \= this.createPanel();  
    this.panel.position.copy(position);  
  }

  createPanel() {  
    const container \= document.createElement('div');  
    container.className \= 'seed-panel';  
    container.style.background \= 'rgba(30, 30, 40, 0.9)';  
    container.style.color \= '\#fff';  
    container.style.padding \= '12px';  
    container.style.borderRadius \= '12px';  
    container.style.fontFamily \= 'monospace';  
    container.style.minWidth \= '220px';  
    container.style.textAlign \= 'left';  
    container.innerHTML \= \`  
      \<h3\>${this.mechData.name}\</h3\>  
      \<p\>\<strong\>Role:\</strong\> ${this.mechData.role}\</p\>  
      \<p\>\<strong\>Version:\</strong\> ${this.mechData.version}\</p\>  
      \<hr/\>  
      \<strong\>Abilities:\</strong\>  
      \<ul\>  
        ${this.mechData.abilities.map(a \=\> \`\<li\>${a}\</li\>\`).join('')}  
      \</ul\>  
      \<hr/\>  
      \<strong\>Upgrades:\</strong\>  
      \<ul\>  
        ${this.mechData.evolution.upgrades.map(upg \=\> \`  
          \<li style="opacity:${upg.unlocked ? 1 : 0.3}"\>  
            ${upg.unlocked ? '✅' : '⬜️'} ${upg.id} \- \<em\>${upg.desc}\</em\>  
          \</li\>\`).join('')}  
      \</ul\>  
    \`;

    const label \= new CSS2DObject(container);  
    label.name \= \`${this.mechData.name}\_SeedPanel\`;  
    return label;  
  }

  attachTo(mesh) {  
    mesh.add(this.panel);  
  }

  show() {  
    this.panel.element.style.display \= 'block';  
  }

  hide() {  
    this.panel.element.style.display \= 'none';  
  }

  toggle() {  
    const el \= this.panel.element;  
    el.style.display \= (el.style.display \=== 'none' || \!el.style.display) ? 'block' : 'none';  
  }  
}

// Usage:  
// import { SeedPanelHUD } from './SeedPanelHUD.js';  
// const panel \= new SeedPanelHUD(mechProfile\['KAIA'\]);  
// panel.attachTo(tachikoma.group);  
// On click: panel.toggle();

