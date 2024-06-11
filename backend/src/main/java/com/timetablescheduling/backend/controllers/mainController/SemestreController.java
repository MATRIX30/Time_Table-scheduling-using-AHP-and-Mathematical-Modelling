package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Semestre;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.service.mainService.SemestreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/semestre")
public class SemestreController {

    @Autowired
    private SemestreService service;

    @PostMapping("/add")
    public ResponseEntity<?> create() {
        List<Semestre> obj = Semestre.createSemestre();
        for (Semestre element : obj) {
            service.create(element);
        }
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        List<Semestre> timeSlots = service.getAll();
        return  ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Optional<Semestre> timeSlot = service.getSemestre(id);
        if (timeSlot.isEmpty()) return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatus.OK);
        return  ResponseEntity.ok(timeSlot);
    }
}
