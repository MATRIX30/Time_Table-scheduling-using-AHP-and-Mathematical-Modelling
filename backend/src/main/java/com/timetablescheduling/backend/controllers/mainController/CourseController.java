package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.service.mainService.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService service;

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody Course course) {
        return service.createCourse(course);
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        List<Course> timeSlots = service.getAllCourses();
        return  ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Optional<Course> timeSlot = service.getCourse(id);
        if (timeSlot.isEmpty()) return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatus.OK);
        return  ResponseEntity.ok(timeSlot);
    }
    @GetMapping("/get_level/{level}")
    public Iterable<Course> getCourseByLevel(@PathVariable String level) {
        return  service.getCourseByLevel(level);
    }

    @GetMapping("/get_filiere/{filiere}")
    public Iterable<Course> getCourseByFiliere(@PathVariable String filiere) {
        return service.getCourseByFiliere(filiere);
    }

    @GetMapping("/get_semester/{semester}")
    public Iterable<Course> getCourseBySemester( @PathVariable String semester) {
        return service.getCourseBySemester(semester);
    }

    @GetMapping("/get_semester_filiere/{semester}/{filiere}")
    public Iterable<Course> getCourseByFiliereAndSemester(@PathVariable String filiere, @PathVariable String semester) {
        return service.getCourseByFiliereAndSemester(filiere, semester);
    }

    @GetMapping("/get_semester_level/{semester}/{level}")
    public Iterable<Course> getCourseBySemesterAndLevel(@PathVariable String semester, @PathVariable String level) {
        return service.getCourseBySemesterAndLevel(semester, level);
    }

    @GetMapping("/get_filiere_level/{filiere}/{level}")
    public Iterable<Course> getCourseByFiliereAndLevel(@PathVariable String filiere, @PathVariable String level) {
        return service.getCourseByFiliereAndLevel(filiere, level);
    }

    @GetMapping("/get_semester_filiere_level/{semester}/{filiere}/{level}")
    public Iterable<Course> getCourseBySemesterFiliereAndLevel(@PathVariable String semester, @PathVariable String filiere, @PathVariable String level) {
        return service.getCourseBySemesterFiliereAndLevel(semester, filiere, level);
    }
}
