package com.timetablescheduling.backend.service.mainService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.repository.mainRepository.StudentLevelRepository;

@Service
public class StudentLevelService {
    @Autowired
    private StudentLevelRepository repository;

    public StudentLevel create(StudentLevel obj) {
        return repository.save(obj);
    }

    public void createStudentLevel() {
        List<StudentLevel> studentLevels = StudentLevel.createLevel();
        for (StudentLevel studentLevel : studentLevels) {
            if (!repository.existsByName(studentLevel.getName())){
                repository.save(studentLevel);
            }
        }
    }

    public List<StudentLevel> getAll() {
        return repository.findAll();
    }
    public Optional<StudentLevel> getByName(String name){
        return repository.findByName(name);
    }
    public boolean isPresent(String name) {
        return repository.existsByName(name);
    }
    public Optional<StudentLevel> getStudentLevel(int id) {
        return repository.findById(id);
    }
}
