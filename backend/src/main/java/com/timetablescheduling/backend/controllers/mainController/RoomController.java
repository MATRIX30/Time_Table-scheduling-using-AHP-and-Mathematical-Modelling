package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.RoomRepository;
import com.timetablescheduling.backend.service.mainService.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private RoomService service;

    @PostMapping("/add")
    public ResponseEntity<?> create() {
//        List<Room> obj = TimeSlot.createTimeSlots();
//        for (Room element : obj) {
//            service.create(element);
//        }
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        List<Room> timeSlots = service.getAll();
        return  ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Optional<Room> timeSlot = service.getRoom(id);
        if (timeSlot.isEmpty()) return CustomResponseEntity.fromKey("RESSOURCE_INTROUVABLE", HttpStatus.OK);
        return  ResponseEntity.ok(timeSlot);
    }

    @GetMapping("/get_filiere/{filiere}")
    public ResponseEntity<?> getFiliere(@PathVariable String filiere) {
        return ResponseEntity.ok(service.getByFiliere(filiere));
    }

}
