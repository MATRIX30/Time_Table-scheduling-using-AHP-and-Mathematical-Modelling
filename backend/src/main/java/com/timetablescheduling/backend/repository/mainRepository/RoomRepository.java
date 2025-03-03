package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Room;

@Repository
public interface RoomRepository extends MongoRepository<Room, Integer> {
    Optional<Room> findByName(String name);
    boolean existsByName(String name);
    @Query(" {'filiere.name' : ?0} ")
    Iterable<Room> findByFiliere(String filiere);
}
