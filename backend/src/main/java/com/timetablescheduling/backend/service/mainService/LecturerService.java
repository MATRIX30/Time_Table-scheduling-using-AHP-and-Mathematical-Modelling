package com.timetablescheduling.backend.service.mainService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
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

    public Lecturer setLecturer(String course) {
        List<Lecturer> lecturers = repository.getByCourse(course);
        if (!lecturers.isEmpty()) {
            return lecturers.get(0);
        } else {
            return new Lecturer("DefaultLecturer", false);
        }
    }

    public Iterable<Lecturer> getByCourseCode(String code) {
        return repository.findByCourseCode(code);
    }
}
