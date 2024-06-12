package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public ResponseEntity<?> createCourse(Course course) {
        if (!courseRepository.existsByName(course.getName())) {
           return CustomResponseEntity.ok(courseRepository.save(course));
        }
        return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatusCode.valueOf(200));
    }
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Optional<Course> getByName(String name){
        return courseRepository.findByName(name);
    }
    public boolean isPresent(String name) {
        return courseRepository.existsByName(name);
    }
    public Optional<Course> getCourse(int id) {
        return courseRepository.findById(id);
    }
    public Iterable<Course> getCourseByLevel(String level) {
        return  courseRepository.findCourseByLevel(level);
    }
    public Iterable<Course> getCourseByFiliere(String filiere) {
        return courseRepository.findCourseByFiliere(filiere);
    }
    public Iterable<Course> getCourseBySemester(String semester) {
        return courseRepository.findCourseBySemestre(semester);
    }
    public Iterable<Course> getCourseByFiliereAndSemester(String filiere, String semester) {
        return courseRepository.findCourseBySemestreAndFiliere(filiere, semester);
    }
    public Iterable<Course> getCourseBySemesterAndLevel(String semester, String level) {
        return courseRepository.findCourseBySemestreAndLevel(semester, level);
    }
    public Iterable<Course> getCourseByFiliereAndLevel(String filiere, String level) {
        return courseRepository.findCourseByFiliereAndLevel(filiere, level);
    }
    public Iterable<Course> getCourseBySemesterFiliereAndLevel(String semester, String filiere, String level) {
        return courseRepository.findCourseByFiliereSemesterAndLevel(semester, filiere, level);
    }
}
