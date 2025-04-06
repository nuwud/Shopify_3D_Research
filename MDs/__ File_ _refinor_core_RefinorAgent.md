// File: /refinor/core/RefinorAgent.ts

import { loadPersonaProfile, PersonaProfile } from '../personas/PersonaLoader';

export type RefinorSuggestion \= {  
  category: 'Refine' | 'Protect' | 'Elevate' | 'Encourage';  
  message: string;  
  persona?: string;  
  priority?: number;  
};

export type RefinorContext \= {  
  input: string;  
  fileType?: 'js' | 'ts' | 'html' | 'css' | 'json' | 'glsl' | '3dscene';  
  activePersona: string;  
  userState?: {  
    mood?: string;  
    fatigueLevel?: number;  
    lastBreakMinutesAgo?: number;  
  };  
};

export class RefinorAgent {  
  private personaProfile: PersonaProfile;

  constructor(private context: RefinorContext) {  
    this.personaProfile \= loadPersonaProfile(context.activePersona);  
  }

  generateSuggestions(): RefinorSuggestion\[\] {  
    const { input } \= this.context;  
    const suggestions: RefinorSuggestion\[\] \= \[\];

    // Refine patterns  
    if (input.includes('console.log')) {  
      suggestions.push({  
        category: 'Refine',  
        message: this.personaProfile.refineMessages.consoleLog,  
        persona: this.context.activePersona,  
        priority: 0.6  
      });  
    }

    if (input.includes('any')) {  
      suggestions.push({  
        category: 'Protect',  
        message: this.personaProfile.protectMessages.avoidAny,  
        persona: this.context.activePersona,  
        priority: 0.9  
      });  
    }

    suggestions.push({  
      category: 'Encourage',  
      message: this.personaProfile.coachLine,  
      persona: this.context.activePersona,  
      priority: 1.0  
    });

    return suggestions;  
  }  
}

