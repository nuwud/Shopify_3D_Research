  
// seedOS-toolbar.js  
// Expanded Trügüd-style SeedOS UI for mech interaction, theme control, and prompt seeding

export function createSeedOSToolbar(tachikomaInstance) {  
  if (\!tachikomaInstance.holoMode) return;

  const container \= document.createElement('div');  
  container.className \= 'seedos-toolbar';  
  container.style.position \= 'absolute';  
  container.style.bottom \= '10px';  
  container.style.left \= '10px';  
  container.style.padding \= '12px';  
  container.style.background \= 'rgba(0, 0, 0, 0.85)';  
  container.style.borderRadius \= '12px';  
  container.style.fontFamily \= 'monospace';  
  container.style.zIndex \= '10000';  
  container.style.color \= '\#fff';

  const title \= document.createElement('div');  
  title.innerText \= 'SeedOS Toolbar 🌱';  
  title.style.fontWeight \= 'bold';  
  title.style.marginBottom \= '8px';  
  container.appendChild(title);

  // Theme Controls  
  const themeLabel \= document.createElement('div');  
  themeLabel.innerText \= 'Theme:';  
  themeLabel.style.marginBottom \= '4px';  
  container.appendChild(themeLabel);

  tachikomaInstance.availableThemes.forEach(theme \=\> {  
    const btn \= document.createElement('button');  
    btn.innerText \= theme.name;  
    btn.style.marginRight \= '6px';  
    btn.style.padding \= '4px 8px';  
    btn.style.background \= theme.glowColor;  
    btn.style.color \= '\#000';  
    btn.style.border \= 'none';  
    btn.style.borderRadius \= '4px';  
    btn.style.cursor \= 'pointer';  
    btn.onclick \= () \=\> tachikomaInstance.applyTheme(theme.name);  
    container.appendChild(btn);  
  });

  container.appendChild(document.createElement('hr'));

  // Prompt Seeding  
  const promptLabel \= document.createElement('div');  
  promptLabel.innerText \= 'Crystal Prompt:';  
  promptLabel.style.marginTop \= '6px';  
  container.appendChild(promptLabel);

  const promptInput \= document.createElement('textarea');  
  promptInput.placeholder \= 'e.g. Build a glowing mech with pulse FX and upgrade console';  
  promptInput.rows \= 3;  
  promptInput.style.width \= '100%';  
  promptInput.style.marginTop \= '4px';  
  promptInput.style.borderRadius \= '6px';  
  promptInput.style.padding \= '6px';  
  promptInput.style.fontFamily \= 'monospace';  
  container.appendChild(promptInput);

  // Insert Mega Prompt Button  
  const megaPromptBtn \= document.createElement('button');  
  megaPromptBtn.innerText \= 'Insert Starter Mega Prompt';  
  megaPromptBtn.style.marginTop \= '6px';  
  megaPromptBtn.style.marginBottom \= '4px';  
  megaPromptBtn.style.padding \= '4px 10px';  
  megaPromptBtn.style.background \= '\#88ff88';  
  megaPromptBtn.style.border \= 'none';  
  megaPromptBtn.style.borderRadius \= '6px';  
  megaPromptBtn.style.cursor \= 'pointer';  
  megaPromptBtn.onclick \= () \=\> {  
    promptInput.value \= \`Build a modular AI mech seed system using Three.js called 'TachikomaReplica', featuring:\\n\\n- Hover-animated 3D mech with legs, eyes, and glowing effects\\n- CSS2D HUD displaying upgrade status from a mechProfile JSON\\n- CSS2D Command Console with unlock buttons that trigger voice feedback and light burst FX\\n- Persistent upgrade state via localStorage, with optional Firebase sync\\n- Holographic ring UI that spins in holoMode, using GLSL pulse shaders\\n- A progress ring that shifts color based on % of upgrades unlocked (HSL-based)\\n- Modular theme system with presets (default, danger, spirit), switchable at runtime\\n- A floating UI toolbar (SeedOS Toolbar) that includes:\\n  \- Theme switcher buttons\\n  \- Prompt text area for seeding AI code ideas\\n  \- 'Generate Seed' button (mock or linked)\\n- All components delivered as modular JS files with clear comments\\n- Generate a zip with TachikomaReplica.js, seedOS-toolbar.js, themeSwitcher.js, and a Crystal\_Seed\_Prompt\_Guide.md with prompt examples\`;  
  };  
  container.appendChild(megaPromptBtn);

  const runPrompt \= document.createElement('button');  
  runPrompt.innerText \= 'Generate Seed';  
  runPrompt.style.marginTop \= '8px';  
  runPrompt.style.padding \= '6px 12px';  
  runPrompt.style.background \= '\#66ccff';  
  runPrompt.style.border \= 'none';  
  runPrompt.style.borderRadius \= '6px';  
  runPrompt.style.cursor \= 'pointer';  
  runPrompt.onclick \= () \=\> {  
    alert(\`🌱 Seed generated: ${promptInput.value}\`);  
    // TODO: Connect to actual seed generator or backend  
  };  
  container.appendChild(runPrompt);

  document.body.appendChild(container);  
}  
