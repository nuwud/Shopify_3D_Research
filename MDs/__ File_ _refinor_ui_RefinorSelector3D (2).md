// File: /refinor/ui/RefinorSelector3D.tsx

import { Canvas } from '@react-three/fiber';  
import { OrbitControls, Html, Float, Text3D } from '@react-three/drei';  
import { useState } from 'react';

const personas \= \[  
  {  
    id: 'ZenArchitect',  
    name: 'Zen Architect',  
    quote: 'Elegance from logic.',  
    color: 'skyblue'  
  },  
  {  
    id: 'TrugudPrime',  
    name: 'Trügüd Prime',  
    quote: 'We forge legacy.',  
    color: 'gold'  
  }  
\];

function PersonaCrystal({ persona, onSelect, isSelected }: any) {  
  return (  
    \<Float floatIntensity={1} rotationIntensity={0.3}\>  
      \<mesh  
        onClick={() \=\> onSelect(persona.id)}  
        scale={isSelected ? 1.3 : 1}  
        position={\[persona.id \=== 'ZenArchitect' ? \-2 : 2, 0, 0\]}  
      \>  
        \<icosahedronGeometry args={\[1, 1\]} /\>  
        \<meshStandardMaterial color={persona.color} emissive={persona.color} emissiveIntensity={0.4} /\>  
        \<Html center className="text-center"\>  
          \<div className="bg-white/20 backdrop-blur-md p-2 rounded-xl"\>  
            \<h3 className="font-bold text-white"\>{persona.name}\</h3\>  
            \<p className="text-xs italic text-white"\>{persona.quote}\</p\>  
          \</div\>  
        \</Html\>  
      \</mesh\>  
    \</Float\>  
  );  
}

export default function RefinorSelector3D({ onSelect }: { onSelect: (personaId: string) \=\> void }) {  
  const \[selected, setSelected\] \= useState\<string\>('');

  return (  
    \<Canvas camera={{ position: \[0, 0, 5\] }}\>  
      \<ambientLight intensity={0.5} /\>  
      \<pointLight position={\[10, 10, 10\]} /\>  
      \<OrbitControls enableZoom={false} /\>

      {personas.map((persona) \=\> (  
        \<PersonaCrystal  
          key={persona.id}  
          persona={persona}  
          onSelect={(id: string) \=\> {  
            setSelected(id);  
            onSelect(id);  
          }}  
          isSelected={selected \=== persona.id}  
        /\>  
      ))}  
    \</Canvas\>  
  );  
}

