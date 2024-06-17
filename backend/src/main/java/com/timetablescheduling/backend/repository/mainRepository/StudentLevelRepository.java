package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.StudentLevel;

@Repository
public interface StudentLevelRepository extends MongoRepository<StudentLevel, Integer> {
    Optional<StudentLevel> findByName(String name);
    boolean existsByName(String name);
}
