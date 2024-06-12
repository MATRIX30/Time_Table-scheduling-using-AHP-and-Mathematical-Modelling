package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Lecturer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LecturerRepository extends MongoRepository<Lecturer, Integer> {
    Optional<Lecturer> findByName(String name);
    boolean existsByName(String name);
    @Query(" {'course.name' : ?0} ")
    Iterable<Lecturer> findByCourse(String course);
}
