package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "preferences")
public class Preference {
    @Id
    private String id;
    private String nomUtilisateur;
    private String preference;

    // Getters et setters

    public Preference() {}

    public Preference(String nomUtilisateur, String preference) {
        this.nomUtilisateur = nomUtilisateur;
        this.preference = preference;
    }

    // Getters et setters
}
