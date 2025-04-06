// File: /agents/SkaraAgent.ts

import { fetchTrendingTopics } from '../modules/SkaraTrendTracker';  
import { analyzeStripeStats } from '../modules/SkaraRevenuePulse';

export type SkaraInsight \= {  
  type: 'Trend' | 'Product' | 'RevenueLeak' | 'Opportunity';  
  message: string;  
  confidence: number; // 0.0 \- 1.0  
  tags?: string\[\];  
};

export class SkaraAgent {  
  async scan(): Promise\<SkaraInsight\[\]\> {  
    const insights: SkaraInsight\[\] \= \[\];

    const trends \= await fetchTrendingTopics();  
    trends.forEach((trend) \=\> {  
      insights.push({  
        type: 'Trend',  
        message: \`Trending topic detected: ${trend.title}\`,  
        confidence: trend.score,  
        tags: trend.tags  
      });  
    });

    const stripeFindings \= await analyzeStripeStats();  
    stripeFindings.forEach((op) \=\> {  
      insights.push({  
        type: op.type,  
        message: op.message,  
        confidence: op.confidence,  
        tags: op.tags  
      });  
    });

    return insights;  
  }

  async recommendNextMove(): Promise\<string\> {  
    const insights \= await this.scan();  
    const highImpact \= insights  
      .filter(i \=\> i.confidence \> 0.8)  
      .sort((a, b) \=\> b.confidence \- a.confidence);

    if (highImpact.length \> 0\) {  
      return \`Top recommendation: ${highImpact\[0\].message}\`;  
    } else {  
      return 'No strong signals detected yet. Try again later or widen the scope.';  
    }  
  }  
}

