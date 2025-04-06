// File: /runebook/core/SkillTreeCore.ts

export type SkillNode \= {  
  id: string;  
  name: string;  
  description: string;  
  unlocked: boolean;  
  tier: number;  
  prerequisites?: string\[\];  
  cost?: number; // Points or tokens  
};

export type AgentSkillTree \= {  
  agent: string;  
  runeId: string;  
  skills: SkillNode\[\];  
};

const defaultSkillTrees: AgentSkillTree\[\] \= \[  
  {  
    agent: 'Kaia',  
    runeId: 'spiral',  
    skills: \[  
      {  
        id: 'flow-checkin',  
        name: 'Flow Check-In',  
        description: 'Kaia checks in gently to redirect your focus and energy.',  
        unlocked: true,  
        tier: 1  
      },  
      {  
        id: 'gentle-reminder',  
        name: 'Gentle Reminder',  
        description: 'Deploys a soft tone and voice nudge to keep you on track.',  
        unlocked: false,  
        tier: 1  
      },  
      {  
        id: 'pulse-soothe',  
        name: 'Pulse Soothe',  
        description: 'Uses sound and light to calm overwhelm.',  
        unlocked: false,  
        tier: 2,  
        prerequisites: \['gentle-reminder'\]  
      }  
    \]  
  },  
  {  
    agent: 'Skara',  
    runeId: 'triangle',  
    skills: \[  
      {  
        id: 'trend-detector',  
        name: 'Trend Detector',  
        description: 'Fetch and analyze trending product niches.',  
        unlocked: true,  
        tier: 1  
      },  
      {  
        id: 'stripe-sync',  
        name: 'Stripe Sync',  
        description: 'Analyzes incoming revenue flows in real-time.',  
        unlocked: false,  
        tier: 1  
      },  
      {  
        id: 'profit-surge',  
        name: 'Profit Surge',  
        description: 'Amplifies top-selling product momentum via AI signals.',  
        unlocked: false,  
        tier: 2,  
        prerequisites: \['stripe-sync'\]  
      }  
    \]  
  }  
\];

export function getSkillTree(agentName: string): AgentSkillTree | undefined {  
  return defaultSkillTrees.find((tree) \=\> tree.agent \=== agentName);  
}

export function unlockSkill(agentName: string, skillId: string): boolean {  
  const tree \= getSkillTree(agentName);  
  if (\!tree) return false;  
  const skill \= tree.skills.find((s) \=\> s.id \=== skillId);  
  if (skill && \!skill.unlocked) {  
    const prereqsMet \= (skill.prerequisites || \[\]).every((prereqId) \=\> {  
      return tree.skills.find((s) \=\> s.id \=== prereqId && s.unlocked);  
    });  
    if (prereqsMet) {  
      skill.unlocked \= true;  
      return true;  
    }  
  }  
  return false;  
}

