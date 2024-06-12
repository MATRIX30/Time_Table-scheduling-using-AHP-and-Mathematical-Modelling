package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, Integer> {
    Optional<Room> findByName(String name);
    boolean existsByName(String name);
}
