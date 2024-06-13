package com.example.demo.controller;

import com.example.demo.model.Preference;
import com.example.demo.service.PreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
public class PreferenceController {
    @Autowired
    private PreferenceService preferenceService;

    @PostMapping("/enregistrer")
    public ResponseEntity<Preference> enregistrerPreference(@RequestBody Preference preference) {
        return ResponseEntity.ok(preferenceService.enregistrerPreference(preference));
    }

    @GetMapping("/revoir")
    public ResponseEntity<Preference> revoirPreference(@RequestParam String nomUtilisateur) {
        Preference preference = preferenceService.trouverParNomUtilisateur(nomUtilisateur);
        if (preference != null) {
            return ResponseEntity.ok(preference);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/modifier")
    public ResponseEntity<Preference> modifierPreference(@RequestParam String nomUtilisateur, @RequestBody String nouvellePreference) {
        Preference updatedPreference = preferenceService.modifierPreference(nomUtilisateur, nouvellePreference);
        if (updatedPreference != null) {
            return ResponseEntity.ok(updatedPreference);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}
