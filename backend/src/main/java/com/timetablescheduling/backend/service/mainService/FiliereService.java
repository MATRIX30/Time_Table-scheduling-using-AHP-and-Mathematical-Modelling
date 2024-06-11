package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.Filiere;
import com.timetablescheduling.backend.repository.mainRepository.FiliereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FiliereService {
    @Autowired
    private FiliereRepository repository;

    public void create(Filiere filiere) {
        Optional<Filiere> existing = repository.findByName(filiere.getName());
        if (existing.isEmpty()) {
            repository.save(filiere);
        }
    }

    public List<Filiere> getAll() {
        return repository.findAll();
    }
    public Optional<Filiere> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<Filiere> getFiliere(int id) {
        return repository.findById(id);
    }
}
