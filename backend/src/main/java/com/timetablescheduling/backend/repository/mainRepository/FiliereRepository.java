package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Filiere;

@Repository
public interface FiliereRepository extends MongoRepository<Filiere, Integer> {
    Optional<Filiere> findByName(String name);
    boolean existsByName(String name);
}
