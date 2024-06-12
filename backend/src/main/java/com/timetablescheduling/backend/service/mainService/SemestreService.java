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

    public Semestre create(Semestre obj) {
        return repository.save(obj);
    }

    public void createSemestre(){
        List<Semestre> semestre = Semestre.createSemestre();
        for (Semestre s : semestre) {
            if (!repository.existsByName(s.getName())){
                repository.save(s);
            }
        }
    }

    public List<Semestre> getAll() {
        return repository.findAll();
    }
    public Optional<Semestre> getByName(String name){
        return repository.findByName(name);
    }
    public boolean isPresent(String name) {
        return repository.existsByName(name);
    }
    public Optional<Semestre> getSemestre(int id) {
        return repository.findById(id);
    }
}
