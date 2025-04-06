// File: /refinor/ui/RefinorSelector.tsx

import { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Card, CardContent } from '@/components/ui/card';  
import { Button } from '@/components/ui/button';

const personas \= \[  
  {  
    id: 'ZenArchitect',  
    name: 'Zen Architect',  
    style: 'Poetic & Calm',  
    glow: 'bg-blue-300/30 backdrop-blur-md',  
    quote: 'Let’s shape elegance from logic.'  
  },  
  {  
    id: 'TrugudPrime',  
    name: 'Trügüd Prime',  
    style: 'Visionary & Motivational',  
    glow: 'bg-yellow-300/30 backdrop-blur-md',  
    quote: 'We don’t just ship — we forge legacy.'  
  }  
\];

export default function RefinorSelector({ onSelect }: { onSelect: (personaId: string) \=\> void }) {  
  const \[selected, setSelected\] \= useState\<string\>('');

  return (  
    \<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"\>  
      {personas.map((persona) \=\> (  
        \<motion.div  
          key={persona.id}  
          whileHover={{ scale: 1.05 }}  
          whileTap={{ scale: 0.95 }}  
          className={\`rounded-2xl shadow-xl p-4 cursor-pointer transition-all duration-300 ${selected \=== persona.id ? 'ring-4 ring-white' : ''}\`}  
          onClick={() \=\> {  
            setSelected(persona.id);  
            onSelect(persona.id);  
          }}  
        \>  
          \<Card className={\`${persona.glow} border-none\`}\>  
            \<CardContent className="flex flex-col items-center justify-center text-center space-y-2"\>  
              \<h2 className="text-xl font-bold"\>{persona.name}\</h2\>  
              \<p className="text-sm italic opacity-70"\>{persona.style}\</p\>  
              \<blockquote className="text-md mt-2"\>“{persona.quote}”\</blockquote\>  
              \<Button className="mt-4" variant="outline"\>Morph into {persona.name}\</Button\>  
            \</CardContent\>  
          \</Card\>  
        \</motion.div\>  
      ))}  
    \</div\>  
  );  
}

