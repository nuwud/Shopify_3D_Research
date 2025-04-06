// File: /uml/core/UMLCoreAgent.ts

import { initializeScheduleWeaver } from '../modules/ScheduleWeaver';  
import { initializeMoodMonitor } from '../modules/MoodMonitor';  
import { mountTaskSync } from '../modules/TaskSyncModule';  
import { routeSeedActivity } from '../modules/SeedRouter';  
import { startLocalSocketBridge } from '../modules/LocalSocketBridge';

export type UMLSettings \= {  
  autoMount: boolean;  
  triggerMode: 'voice' | 'keyboard' | 'manual';  
  moodTracking: boolean;  
  notifyOnWake: boolean;  
};

export class UMLCoreAgent {  
  private settings: UMLSettings;  
  private isActive: boolean \= false;

  constructor(settingsOverride?: Partial\<UMLSettings\>) {  
    this.settings \= {  
      autoMount: true,  
      triggerMode: 'voice',  
      moodTracking: true,  
      notifyOnWake: true,  
      ...settingsOverride  
    };  
  }

  public boot() {  
    if (this.settings.autoMount) {  
      this.activate();  
    } else {  
      this.listenForTrigger();  
    }  
  }

  private activate() {  
    this.isActive \= true;  
    console.log('\[UML\] Tachikoma activated. Unfucking shall commence.');  
    if (this.settings.notifyOnWake) {  
      this.notify("Let's unfuck this, one win at a time.");  
    }  
    initializeScheduleWeaver();  
    initializeMoodMonitor();  
    mountTaskSync();  
    startLocalSocketBridge();  
    routeSeedActivity();  
  }

  private listenForTrigger() {  
    switch (this.settings.triggerMode) {  
      case 'voice':  
        console.log('\[UML\] Listening for voice trigger...');  
        break;  
      case 'keyboard':  
        console.log('\[UML\] Keyboard shortcut trigger ready.');  
        break;  
      default:  
        console.log('\[UML\] Manual trigger mode enabled.');  
        break;  
    }  
  }

  private notify(message: string) {  
    // Future: Add sound/voice, desktop toast, or 3D shimmer alert  
    console.log(\`\[UML\] ${message}\`);  
  }  
}

