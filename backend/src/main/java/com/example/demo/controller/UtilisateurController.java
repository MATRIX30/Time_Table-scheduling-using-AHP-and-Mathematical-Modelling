package com.example.demo.controller;

import com.example.demo.model.Utilisateur;
import com.example.demo.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/enregistrer")
    public ResponseEntity<Utilisateur> enregistrerUtilisateur(@RequestBody Utilisateur utilisateur) {
        return ResponseEntity.ok(utilisateurService.enregistrerUtilisateur(utilisateur));
    }

    @PostMapping("/authentifier")
    public ResponseEntity<String> authentifierUtilisateur(@RequestParam String nomUtilisateur, @RequestParam String motDePasse) {
        if (utilisateurService.authentifier(nomUtilisateur, motDePasse)) {
            return ResponseEntity.ok("Authentification réussie");
        } else {
            return ResponseEntity.status(401).body("Identifiants invalides");
        }
    }
}
