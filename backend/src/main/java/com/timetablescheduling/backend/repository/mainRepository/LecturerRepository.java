package com.timetablescheduling.backend.repository.mainRepository;


import java.util.List;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Lecturer;

@Repository
public interface LecturerRepository extends MongoRepository<Lecturer, Integer> {
    Optional<Lecturer> findByName(String name);
    boolean existsByName(String name);
    @Query(" {'course.name' : ?0} ")
    Iterable<Lecturer> findByCourse(String course);

    @Query(" {'course.code' : ?0} ")
    Iterable<Lecturer> findByCourseCode(String code);

    @Query(" {'course.name' : ?0} ")
    List<Lecturer> getByCourse(String course);
}
