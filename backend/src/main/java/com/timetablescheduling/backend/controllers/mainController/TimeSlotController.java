package com.timetablescheduling.backend.controllers.mainController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.service.mainService.TimeslotService;

@RestController
@RequestMapping("/timeslots")
public class TimeSlotController {
    @Autowired
    private TimeslotService service;

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody TimeSlot timeSlot) {
        TimeSlot _timeslot = service.create(timeSlot);
        return ResponseEntity.status(HttpStatus.CREATED).body(_timeslot);
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        List<TimeSlot> timeSlots = service.getAllTimeSlots();
        return  ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<TimeSlot> timeSlot = service.getTimeSlot(id);
        if (timeSlot.isEmpty()) return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatus.OK);
        return  ResponseEntity.ok(timeSlot);
    }

}
