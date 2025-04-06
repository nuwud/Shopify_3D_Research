// Crystal Seed: Unity Prefab Setup for Tachikoma Mechs  
// Author: Nuwud (Patrick Wood)

using UnityEngine;  
using System.Collections.Generic;

public class TachikomaSpawner : MonoBehaviour  
{  
    \[System.Serializable\]  
    public class MechData {  
        public string role;  
        public GameObject prefab;  
        public Color glowColor;  
        public Vector3 spawnLocation;  
        public AudioClip voiceGreeting;  
        public GameObject seedPanelUIPrefab;  
    }

    public List\<MechData\> mechPrefabs;

    private Dictionary\<string, GameObject\> spawnedMechs \= new Dictionary\<string, GameObject\>();

    void Start() {  
        foreach (var mech in mechPrefabs) {  
            SpawnMech(mech);  
        }  
    }

    void SpawnMech(MechData data) {  
        GameObject mechInstance \= Instantiate(data.prefab, data.spawnLocation, Quaternion.identity);

        // Apply glow color to emissive material or shader  
        Renderer r \= mechInstance.GetComponentInChildren\<Renderer\>();  
        if (r \!= null && r.material.HasProperty("\_EmissionColor")) {  
            r.material.SetColor("\_EmissionColor", data.glowColor);  
        }

        // Attach voice and seed panel UI (optional)  
        AudioSource audioSource \= mechInstance.AddComponent\<AudioSource\>();  
        audioSource.clip \= data.voiceGreeting;  
        audioSource.Play();

        if (data.seedPanelUIPrefab \!= null) {  
            GameObject panel \= Instantiate(data.seedPanelUIPrefab, mechInstance.transform);  
            panel.transform.localPosition \= new Vector3(0, 2, 0);  
        }

        spawnedMechs\[data.role\] \= mechInstance;  
        Debug.Log($"{data.role} spawned at {data.spawnLocation}.");  
    }

    public GameObject GetMechByRole(string role) {  
        return spawnedMechs.ContainsKey(role) ? spawnedMechs\[role\] : null;  
    }  
}

