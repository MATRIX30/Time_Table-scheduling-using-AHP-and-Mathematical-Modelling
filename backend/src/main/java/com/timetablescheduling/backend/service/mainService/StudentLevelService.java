package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
import com.timetablescheduling.backend.repository.mainRepository.StudentLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentLevelService {
    @Autowired
    private StudentLevelRepository repository;

    public void create(StudentLevel obj) {
        Optional<StudentLevel> existing = repository.findByName(obj.getName());
        if (existing.isEmpty()) {
            repository.save(obj);
        }
    }

    public List<StudentLevel> getAll() {
        return repository.findAll();
    }
    public Optional<StudentLevel> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<StudentLevel> getStudentLevel(int id) {
        return repository.findById(id);
    }
}
