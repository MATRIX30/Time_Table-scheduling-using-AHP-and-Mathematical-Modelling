package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, Integer> {
    Optional<Course> findByName(String name);
    boolean existsByName(String name);
    @Query("{ 'level.name' : ?0 }")
    Iterable<Course> findCourseByLevel(String  level);
    @Query("{ 'filiere.name' : ?0 }")
    Iterable<Course> findCourseByFiliere(String filiere);
    @Query(" {'semestre.name' : ?0} ")
    Iterable<Course> findCourseBySemestre(String semestre);
    @Query(" {'semestre.name' : ?0 , 'level.name' : ?1} ")
    Iterable<Course> findCourseBySemestreAndLevel(String semestre, String level);
    @Query(" {'semestre.name' : ?0 , 'filiere.name' : ?1} ")
    Iterable<Course> findCourseBySemestreAndFiliere(String semestre, String filiere);
    @Query(" {'filiere.name' :  ?0, 'level.name' :  ?1} ")
    Iterable<Course> findCourseByFiliereAndLevel(String filiere, String level);
    @Query(" {'filiere.name': ?0 , 'level.name':  ?1, 'semestre.name':  ?2} ")
    Iterable<Course> findCourseByFiliereSemesterAndLevel(String filiere, String level, String semestre);
}
