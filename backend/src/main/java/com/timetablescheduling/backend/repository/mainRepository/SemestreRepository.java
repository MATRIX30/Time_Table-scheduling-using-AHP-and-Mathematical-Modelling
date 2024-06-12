package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Semestre;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SemestreRepository extends MongoRepository<Semestre, Integer> {
    Optional<Semestre> findByName(String name);
    boolean existsByName(String name);

}
