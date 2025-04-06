Absolutely\! Here's the **full consolidated version** of your `TachikomaReplica` class — with all current upgrades fully integrated:

* ✅ Shader FX (pulsing ring)

* ✅ Upgrade progress HUD ring

* ✅ Theme system

* ✅ Everything else up to this point

// TachikomaReplica.js (Full)  
// Author: Nuwud (Patrick Wood)

import \* as THREE from 'three';  
import { SeedPanelHUD } from './SeedPanelHUD.js';  
import { MechCommandConsole } from './MechCommandConsole.js';

export class TachikomaReplica {  
  constructor(scene, options \= {}) {  
    this.scene \= scene;  
    this.options \= options;  
    this.group \= new THREE.Group();  
    this.profile \= this.loadProfile(options.profile);

    this.color \= this.profile?.chassisColor || 0x3e8ed0;  
    this.glowColor \= this.profile?.glowColor || 0x66ccff;  
    this.position \= options.position || new THREE.Vector3(0, 0, 0);  
    this.holoMode \= options.holoMode || false;  
    this.stressLevel \= 0;

    this.initBody();  
    this.initEyes();  
    this.initShaderFX();  
    this.initOverlayHUD();  
    this.initThemeSelector();  
    this.attachHUD();  
    this.attachConsole();  
    this.scene.add(this.group);  
    this.initGamepad();  
  }

  loadProfile(profile) {  
    const saved \= localStorage.getItem(\`mechProfile\_${profile.name}\`);  
    if (saved) {  
      const parsed \= JSON.parse(saved);  
      parsed.evolution.upgrades \= parsed.evolution.upgrades.map((u, i) \=\> ({  
        ...profile.evolution.upgrades\[i\],  
        unlocked: u.unlocked  
      }));  
      return parsed;  
    }  
    return profile;  
  }

  saveProfile() {  
    localStorage.setItem(\`mechProfile\_${this.profile.name}\`, JSON.stringify(this.profile));  
    if (window.firebase) {  
      const db \= window.firebase.firestore();  
      const user \= window.firebase.auth().currentUser;  
      if (user) {  
        db.collection('mechProfiles')  
          .doc(user.uid \+ '\_' \+ this.profile.name)  
          .set(this.profile)  
          .then(() \=\> console.log('Profile synced to Firebase'))  
          .catch(err \=\> console.warn('Firebase sync error:', err));  
      }  
    }  
  }

  initBody() {  
    const bodyGeo \= new THREE.SphereGeometry(1.2, 32, 32);  
    const bodyMat \= new THREE.MeshStandardMaterial({ color: this.color });  
    this.body \= new THREE.Mesh(bodyGeo, bodyMat);  
    this.group.add(this.body);

    if (this.holoMode) {  
      const ringGeo \= new THREE.TorusGeometry(1.4, 0.02, 8, 64);  
      const ringMat \= new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6 });  
      this.holoRing \= new THREE.Mesh(ringGeo, ringMat);  
      this.holoRing.rotation.x \= Math.PI / 2;  
      this.group.add(this.holoRing);  
    }

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

  initShaderFX() {  
    if (\!this.holoMode) return;

    const shaderMaterial \= new THREE.ShaderMaterial({  
      uniforms: {  
        time: { value: 0.0 },  
        color: { value: new THREE.Color(this.glowColor) }  
      },  
      vertexShader: \`  
        varying vec2 vUv;  
        void main() {  
          vUv \= uv;  
          gl\_Position \= projectionMatrix \* modelViewMatrix \* vec4(position, 1.0);  
        }  
      \`,  
      fragmentShader: \`  
        uniform float time;  
        uniform vec3 color;  
        varying vec2 vUv;  
        void main() {  
          float pulse \= 0.5 \+ 0.5 \* sin(time \* 2.0);  
          gl\_FragColor \= vec4(color \* pulse, 1.0);  
        }  
      \`,  
      transparent: true  
    });

    const fxRingGeo \= new THREE.RingGeometry(1.1, 1.4, 64);  
    this.fxShaderRing \= new THREE.Mesh(fxRingGeo, shaderMaterial);  
    this.fxShaderRing.rotation.x \= \-Math.PI / 2;  
    this.fxShaderRing.position.y \= 1.2;  
    this.group.add(this.fxShaderRing);  
  }

  initOverlayHUD() {  
    const ringGeo \= new THREE.RingGeometry(1.45, 1.5, 32);  
    const ringMat \= new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });  
    this.overlayRing \= new THREE.Mesh(ringGeo, ringMat);  
    this.overlayRing.rotation.x \= \-Math.PI / 2;  
    this.overlayRing.position.y \= 1.22;  
    this.group.add(this.overlayRing);  
  }

  updateOverlayHUD() {  
    if (this.overlayRing) {  
      const percent \= this.profile.evolution.upgrades.filter(u \=\> u.unlocked).length / this.profile.evolution.upgrades.length;  
      this.overlayRing.material.color.setHSL(0.33 \* (1 \- percent), 1, 0.5);  
    }  
    if (this.fxShaderRing) {  
      this.fxShaderRing.material.uniforms.time.value \= performance.now() / 1000;  
    }  
  }

  initThemeSelector() {  
    this.availableThemes \= \[  
      { name: 'default', glowColor: '\#66ccff', ringColor: 0x00ffff },  
      { name: 'danger', glowColor: '\#ff3333', ringColor: 0xff0000 },  
      { name: 'spirit', glowColor: '\#cc66ff', ringColor: 0xcc00ff }  
    \];  
  }

  applyTheme(themeName) {  
    const theme \= this.availableThemes.find(t \=\> t.name \=== themeName);  
    if (\!theme) return;  
    this.glowColor \= theme.glowColor;  
    if (this.holoRing) this.holoRing.material.color.set(theme.ringColor);  
    if (this.overlayRing) this.overlayRing.material.color.set(theme.ringColor);  
  }

  attachHUD() {  
    this.hud \= new SeedPanelHUD(this.profile);  
    this.hud.attachTo(this.group);  
  }

  attachConsole() {  
    this.console \= new MechCommandConsole(this.profile, (upgrade) \=\> {  
      console.log(\`${this.profile.name} unlocked:\`, upgrade);  
      this.triggerUpgradeFX();  
      this.playVoiceReaction(upgrade);  
      this.showDialogue(\`${this.profile.name} has unlocked ${upgrade.id}\!\`);  
      this.saveProfile();  
    });  
    this.console.attachTo(this.group);  
  }

  triggerUpgradeFX() {  
    const flash \= new THREE.PointLight(this.glowColor, 2, 10);  
    flash.position.set(0, 2, 0);  
    this.group.add(flash);  
    setTimeout(() \=\> this.group.remove(flash), 500);  
  }

  playVoiceReaction(upgrade) {  
    const audio \= new Audio(\`./voices/${this.profile.voice}\`);  
    audio.play().catch(err \=\> console.warn("Voice playback issue:", err));  
  }

  showDialogue(text) {  
    const bubble \= document.createElement('div');  
    bubble.className \= 'mech-dialogue';  
    bubble.style.position \= 'absolute';  
    bubble.style.background \= 'rgba(0, 0, 0, 0.8)';  
    bubble.style.color \= '\#0ff';  
    bubble.style.padding \= '10px';  
    bubble.style.borderRadius \= '8px';  
    bubble.style.fontFamily \= 'monospace';  
    bubble.style.top \= '10%';  
    bubble.style.left \= '50%';  
    bubble.style.transform \= 'translateX(-50%)';  
    bubble.style.zIndex \= 9999;  
    bubble.innerText \= text;  
    document.body.appendChild(bubble);  
    setTimeout(() \=\> document.body.removeChild(bubble), 3000);  
  }

  update(delta) {  
    const hover \= Math.sin(Date.now() \* 0.002) \* 0.1;  
    this.group.position.y \= this.position.y \+ hover;  
    this.updateOverlayHUD();  
    if (this.holoRing) this.holoRing.rotation.z \+= 0.01;  
    this.monitorStress();  
  }

  monitorStress() {  
    if (this.profile.name \=== 'Kaia' && this.stressLevel \> 7\) {  
      this.showDialogue("Take a breath. You're doing great. 💙");  
      this.stressLevel \= 0;  
    }  
  }

  toggleHUD() {  
    if (this.hud) this.hud.toggle();  
  }

  toggleConsole() {  
    if (this.console) this.console.toggle();  
  }

  initGamepad() {  
    window.addEventListener("gamepadconnected", (e) \=\> {  
      console.log("Gamepad connected:", e.gamepad);  
      this.gamepadIndex \= e.gamepad.index;  
    });  
  }  
}

Would you like a small `themeSwitcher.js` next to activate those presets from a button UI?

