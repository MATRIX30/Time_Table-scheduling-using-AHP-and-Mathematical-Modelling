package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Day;

@Repository
public interface DayRepository extends MongoRepository<Day, Integer> {
    Optional<Day> findByName(String name);
    boolean existsByName(String name);
}
