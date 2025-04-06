// useSoundSynth.ts \- Hook for Web Audio-based sound effects  
import { useEffect, useRef } from 'react';

export function useSoundSynth() {  
  const audioContextRef \= useRef\<AudioContext | null\>(null);  
  const masterGainRef \= useRef\<GainNode | null\>(null);

  useEffect(() \=\> {  
    const ctx \= new (window.AudioContext || (window as any).webkitAudioContext)();  
    const gain \= ctx.createGain();  
    gain.gain.value \= 0.6;  
    gain.connect(ctx.destination);

    audioContextRef.current \= ctx;  
    masterGainRef.current \= gain;  
  }, \[\]);

  const ensureAudioInitialized \= () \=\> {  
    const ctx \= audioContextRef.current;  
    if (\!ctx) return;  
    if (ctx.state \=== 'suspended') {  
      ctx.resume();  
    }  
  };

  const playFacetSound \= (facetIndex: number) \=\> {  
    const ctx \= audioContextRef.current;  
    const master \= masterGainRef.current;  
    if (\!ctx || \!master) return;

    const osc \= ctx.createOscillator();  
    const gain \= ctx.createGain();

    const midiNote \= 60 \+ (facetIndex % 12);  
    const freq \= 440 \* Math.pow(2, (midiNote \- 69\) / 12);

    osc.type \= 'sawtooth';  
    osc.frequency.value \= freq;

    gain.gain.setValueAtTime(0.2, ctx.currentTime);  
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime \+ 0.3);

    osc.connect(gain);  
    gain.connect(master);

    osc.start(ctx.currentTime);  
    osc.stop(ctx.currentTime \+ 0.35);  
  };

  const playWarmChord \= (rootHz: number \= 261.6) \=\> {  
    const ctx \= audioContextRef.current;  
    const master \= masterGainRef.current;  
    if (\!ctx || \!master) return;

    const freqs \= \[rootHz, rootHz \* 1.25, rootHz \* 1.5\];

    freqs.forEach((freq, i) \=\> {  
      const osc \= ctx.createOscillator();  
      const gain \= ctx.createGain();

      osc.type \= i \=== 0 ? 'sine' : i \=== 1 ? 'triangle' : 'sine';  
      osc.frequency.value \= freq;

      const now \= ctx.currentTime;  
      const attack \= 0.1;  
      const release \= 0.6;

      gain.gain.setValueAtTime(0, now);  
      gain.gain.linearRampToValueAtTime(0.2, now \+ attack);  
      gain.gain.linearRampToValueAtTime(0, now \+ attack \+ release);

      osc.connect(gain);  
      gain.connect(master);

      osc.start(now);  
      osc.stop(now \+ attack \+ release \+ 0.1);  
    });  
  };

  return {  
    playFacetSound,  
    playWarmChord,  
    ensureAudioInitialized,  
  };  
}

