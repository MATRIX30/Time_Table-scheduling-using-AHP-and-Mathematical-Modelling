package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Semestre;

@Repository
public interface SemestreRepository extends MongoRepository<Semestre, Integer> {
    Optional<Semestre> findByName(String name);
    boolean existsByName(String name);

}
