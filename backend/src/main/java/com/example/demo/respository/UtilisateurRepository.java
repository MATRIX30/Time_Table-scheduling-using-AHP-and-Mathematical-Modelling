package com.example.demo.repository;

import com.example.demo.model.Utilisateur;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UtilisateurRepository extends MongoRepository<Utilisateur, String> {
    Utilisateur findByNomUtilisateur(String nomUtilisateur);
}
