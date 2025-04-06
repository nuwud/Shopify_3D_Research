// themeSwitcher.js  
// Lightweight UI to switch mech themes from TachikomaReplica, auto-loads if holoMode is true

export function createThemeSwitcher(tachikomaInstance) {  
  if (\!tachikomaInstance.holoMode) return; // Only attach if holoMode is enabled

  const container \= document.createElement('div');  
  container.className \= 'theme-switcher';  
  container.style.position \= 'absolute';  
  container.style.bottom \= '10px';  
  container.style.left \= '10px';  
  container.style.padding \= '8px';  
  container.style.background \= 'rgba(0, 0, 0, 0.75)';  
  container.style.borderRadius \= '8px';  
  container.style.fontFamily \= 'monospace';  
  container.style.zIndex \= '9999';

  const label \= document.createElement('div');  
  label.innerText \= 'Theme:';  
  label.style.color \= '\#fff';  
  label.style.marginBottom \= '4px';  
  container.appendChild(label);

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

    btn.onclick \= () \=\> {  
      tachikomaInstance.applyTheme(theme.name);  
    };

    container.appendChild(btn);  
  });

  document.body.appendChild(container);  
}

