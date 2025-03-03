package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.TimeSlot;

@Repository
public interface TimeSlotsRepository extends MongoRepository<TimeSlot, Integer> {
    Optional<TimeSlot> findByTime(String time);
    boolean existsByTime(String name);
}
