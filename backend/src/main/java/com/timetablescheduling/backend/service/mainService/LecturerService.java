package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Filiere;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.repository.mainRepository.FiliereRepository;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class LecturerService {
    @Autowired
    private LecturerRepository repository;

    public void create(Lecturer obj) {
        if (!repository.existsByName(obj.getName())) {
            repository.save(obj);
        }
    }

    public List<Lecturer> getAll() {
        return repository.findAll();
    }
    public Optional<Lecturer> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<Lecturer> getTimeSlot(int id) {
        return repository.findById(id);
    }

    public Iterable<Lecturer> getByCourse(String course) {
        return repository.findByCourse(course);
    }
}
