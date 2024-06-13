package com.example.demo.repository;

import com.example.demo.model.Preference;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PreferenceRepository extends MongoRepository<Preference, String> {
    Preference findByNomUtilisateur(String nomUtilisateur);
}
