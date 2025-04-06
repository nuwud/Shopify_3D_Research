// OrientationUtility.ts — NUDUN System  
// Utility for consistent 3D object alignment and camera-facing orientation

/\*\*  
 \* @AI-PROMPT  
 \* This utility handles all rotation/orientation needs for 3D UI elements.  
 \* It ensures stable behavior for camera-facing buttons, clock-style layouts, and scene-based transforms.  
 \* Use this as the source of truth for anything that must "face out," "face 3 o'clock," or follow a player.  
 \*/

import \* as THREE from 'three';

export class OrientationUtility {  
  /\*\*  
   \* Make an object face the camera directly (billboarding)  
   \*/  
  static faceCamera(object: THREE.Object3D, camera: THREE.Camera) {  
    const target \= new THREE.Vector3();  
    camera.getWorldPosition(target);  
    object.lookAt(target);  
  }

  /\*\*  
   \* Rotate an object so it faces a world-space direction like a clock (12, 3, 6, 9 o'clock)  
   \* @param object Object to rotate  
   \* @param hour Clock position (e.g. 3 for 3 o'clock)  
   \*/  
  static alignToClock(object: THREE.Object3D, hour: number) {  
    const radians \= (hour / 12\) \* Math.PI \* 2;  
    object.rotation.set(0, radians, 0);  
  }

  /\*\*  
   \* Match the orientation (rotation) of another object  
   \*/  
  static matchRotation(target: THREE.Object3D, source: THREE.Object3D) {  
    target.quaternion.copy(source.quaternion);  
  }

  /\*\*  
   \* Reset rotation to identity  
   \*/  
  static resetRotation(object: THREE.Object3D) {  
    object.rotation.set(0, 0, 0);  
  }

  /\*\*  
   \* Lock an object's up vector to Y (optional)  
   \*/  
  static lockUpToY(object: THREE.Object3D) {  
    object.up.set(0, 1, 0);  
  }  
}

