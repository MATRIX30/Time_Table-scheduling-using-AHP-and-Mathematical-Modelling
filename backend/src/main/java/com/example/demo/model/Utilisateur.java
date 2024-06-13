package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "utilisateurs")
public class Utilisateur {
    @Id
    private String id;
    private String nomUtilisateur;
    private String motDePasse;
    private String role; // ici "administration"

    // Getters et setters

    public Utilisateur() {}

    public Utilisateur(String nomUtilisateur, String motDePasse, String role) {
        this.nomUtilisateur = nomUtilisateur;
        this.motDePasse = motDePasse;
        this.role = role;
    }

    // Getters et setters
}
