// File: /refinor/personas/PersonaLoader.ts

export type PersonaProfile \= {  
  name: string;  
  toneStyle: string;  
  focusWeights: Record\<string, number\>;  
  coachLine: string;  
  signatureLine: string;  
  refineMessages: Record\<string, string\>;  
  protectMessages: Record\<string, string\>;  
  elevateMessages?: Record\<string, string\>;  
};

const personaDatabase: Record\<string, PersonaProfile\> \= {  
  ZenArchitect: {  
    name: 'Zen Architect',  
    toneStyle: 'calm, poetic',  
    focusWeights: {  
      elegance: 1.0,  
      structure: 0.9,  
      performance: 0.6,  
      aesthetics: 0.95  
    },  
    coachLine: 'Your code flows like water — just a few stones to smooth out.',  
    signatureLine: 'Let’s shape elegance from logic.',  
    refineMessages: {  
      consoleLog: 'Perhaps console logs no longer serve your flow — consider quieting them.',  
    },  
    protectMessages: {  
      avoidAny: 'Undefined types invite chaos — guide them into clarity.'  
    },  
    elevateMessages: {  
      animationHint: 'Add a subtle transition or easing. Motion brings soul to function.'  
    }  
  },  
  TrugudPrime: {  
    name: 'Trügüd Prime',  
    toneStyle: 'visionary, motivational',  
    focusWeights: {  
      scalability: 1.0,  
      profitability: 0.95,  
      polish: 0.9,  
      modularity: 1.0  
    },  
    coachLine: 'This seed is solid. Let’s refine it into a legendary blueprint.',  
    signatureLine: 'We don’t just ship — we forge legacy.',  
    refineMessages: {  
      consoleLog: 'Trim the console logs — this code is ready for prime-time clarity.',  
    },  
    protectMessages: {  
      avoidAny: '“Any” is a liability. Lock it down for future-proof strength.'  
    },  
    elevateMessages: {  
      featureBoost: 'Why not turn this into a module? You could resell or reuse it later.'  
    }  
  }  
};

export function loadPersonaProfile(key: string): PersonaProfile {  
  return personaDatabase\[key\] || personaDatabase\['ZenArchitect'\];  
}

