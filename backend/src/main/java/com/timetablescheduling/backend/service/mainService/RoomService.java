package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
import com.timetablescheduling.backend.repository.mainRepository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository repository;

    public void create(Room obj) {
        Optional<Room> existing = repository.findByName(obj.getName());
        if (existing.isEmpty()) {
            repository.save(obj);
        }
    }

    public List<Room> getAll() {
        return repository.findAll();
    }
    public Optional<Room> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<Room> getRoom(int id) {
        return repository.findById(id);
    }
}
