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
    public ResponseEntity<?> create() {
//        List<Course> obj = Course.createTimeSlots();
//        for (Course element : obj) {
//            service.createCourse(element);
//        }
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
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
}
