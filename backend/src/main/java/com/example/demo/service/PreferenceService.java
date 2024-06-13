package com.example.demo.service;

import com.example.demo.model.Preference;
import com.example.demo.repository.PreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreferenceService {
    @Autowired
    private PreferenceRepository preferenceRepository;

    public Preference enregistrerPreference(Preference preference) {
        return preferenceRepository.save(preference);
    }

    public Preference trouverParNomUtilisateur(String nomUtilisateur) {
        return preferenceRepository.findByNomUtilisateur(nomUtilisateur);
    }

    public Preference modifierPreference(String nomUtilisateur, String nouvellePreference) {
        Preference pref = preferenceRepository.findByNomUtilisateur(nomUtilisateur);
        if (pref != null) {
            pref.setPreference(nouvellePreference);
            return preferenceRepository.save(pref);
        }
        return null;
    }
}
