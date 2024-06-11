package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.service.mainService.StudentLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("level")
public class StudentLevelController {
    @Autowired
    private StudentLevelService service;


    @PostMapping("/add")
    public ResponseEntity<?> create() {
//        List<StudentLevel> obj = StudentLevel.();
//        for (StudentLevel element : obj) {
//            service.create(element);
//        }
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        List<StudentLevel> timeSlots = service.getAll();
        return  ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Optional<StudentLevel> timeSlot = service.getStudentLevel(id);
        if (timeSlot.isEmpty()) return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatus.OK);
        return  ResponseEntity.ok(timeSlot);
    }

}
