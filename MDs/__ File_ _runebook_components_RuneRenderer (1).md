// File: /runebook/components/RuneRenderer.tsx

import { motion } from 'framer-motion';  
import { useEffect, useState } from 'react';

export type RuneProps \= {  
  agentName: string;  
  shape?: 'spiral' | 'triangle' | 'hex' | 'orbital';  
  color?: string;  
  animate?: boolean;  
};

export default function RuneRenderer({ agentName, shape \= 'orbital', color \= '\#00f0ff', animate \= true }: RuneProps) {  
  const \[glow, setGlow\] \= useState(0);

  useEffect(() \=\> {  
    if (animate) {  
      const interval \= setInterval(() \=\> {  
        setGlow((prev) \=\> (prev \>= 1 ? 0 : prev \+ 0.05));  
      }, 100);  
      return () \=\> clearInterval(interval);  
    }  
  }, \[animate\]);

  const shapes \= {  
    spiral: \<circle cx="50" cy="50" r="40" stroke={color} strokeWidth="4" fill="none" /\>, // placeholder spiral  
    triangle: \<polygon points="50,15 90,85 10,85" stroke={color} strokeWidth="4" fill="none" /\>,  
    hex: \<polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke={color} strokeWidth="4" fill="none" /\>,  
    orbital: \<circle cx="50" cy="50" r="30" stroke={color} strokeWidth="2" fill="none" /\>  
  };

  return (  
    \<motion.div  
      className="w-28 h-28 flex items-center justify-center"  
      animate={{ scale: animate ? \[1, 1.05, 1\] : 1, opacity: 1 }}  
      transition={{ duration: 2, repeat: Infinity }}  
    \>  
      \<svg viewBox="0 0 100 100" className="w-full h-full"\>  
        {shapes\[shape\]}  
        \<text x="50" y="95" textAnchor="middle" fontSize="10" fill={color}\>{agentName}\</text\>  
      \</svg\>  
    \</motion.div\>  
  );  
}

