package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Semestre;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
import com.timetablescheduling.backend.repository.mainRepository.SemestreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SemestreService {
    @Autowired
    private SemestreRepository repository;

    public void create(Semestre obj) {
        Optional<Semestre> existing = repository.findByName(obj.getName());
        if (existing.isEmpty()) {
            repository.save(obj);
        }
    }

    public List<Semestre> getAll() {
        return repository.findAll();
    }
    public Optional<Semestre> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<Semestre> getSemestre(int id) {
        return repository.findById(id);
    }
}
