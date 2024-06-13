package com.example.demo.service;

import com.example.demo.model.Utilisateur;
import com.example.demo.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur enregistrerUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur trouverParNomUtilisateur(String nomUtilisateur) {
        return utilisateurRepository.findByNomUtilisateur(nomUtilisateur);
    }

    public boolean authentifier(String nomUtilisateur, String motDePasse) {
        Utilisateur utilisateur = utilisateurRepository.findByNomUtilisateur(nomUtilisateur);
        return utilisateur != null && utilisateur.getMotDePasse().equals(motDePasse);
    }
}
