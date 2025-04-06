Search Labs | AI Overview  
[Learn more](https://support.google.com/websearch?p=ai_overviews&hl=en)  
React Three Fiber supports various 3D model formats, with GLTF, FBX, and OBJ being the most common. These formats can be loaded using the `useLoader` hook from Drei, a helper library for React Three Fiber.

Code

import { useLoader } from '@react-three/drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function Model({ url, format }) {

 const loader \=

   format \=== 'gltf' ? GLTFLoader :

   format \=== 'fbx' ? FBXLoader :

   format \=== 'obj' ? OBJLoader : null;

 const model \= useLoader(loader, url);

 return \<primitive object={model.scene || model} /\>;

}

The code snippet above shows how to load models dynamically based on their file format. The `useLoader` hook handles the asynchronous loading of the model, and the component renders the loaded model or its scene.

To use this component, you would specify the URL of the model and its format:

Code

\<Model url="/models/shiba.gltf" format="gltf" /\>

This approach allows for flexibility in handling different model types within your React Three Fiber scene.

How to Load 3D Models in React Three FiberReact Three Fiber, a popular 3D rendering library for React, supports various 3D model formats, including GLTF, FBX, and OBJ. The 'useLoader' hook from Drei, a helper library, can efficiently load these formats.

The provided code snippet demonstrates how to dynamically load 3D models based on their format using the 'useLoader' hook. This hook manages the asynchronous loading process, and the component renders the loaded model or its scene.  
import { useLoader } from '@react-three/drei';  
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';  
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';  
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function Model({ url, format }) {  
  const loader \=  
    format \=== 'gltf' ? GLTFLoader :  
    format \=== 'fbx' ? FBXLoader :  
    format \=== 'obj' ? OBJLoader : null;

  const model \= useLoader(loader, url);  
  return \<primitive object={model.scene || model} /\>;  
}  
To use this component, specify the model's URL and format:  
\<Model url="/models/shiba.gltf" format="gltf" /\>  
This approach offers a flexible way to manage different 3D model types within your React Three Fiber projects.  
