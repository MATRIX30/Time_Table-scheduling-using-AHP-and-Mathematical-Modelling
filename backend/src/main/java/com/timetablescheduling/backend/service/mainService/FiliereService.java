package com.timetablescheduling.backend.service.mainService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timetablescheduling.backend.models.mainModels.Filiere;
import com.timetablescheduling.backend.repository.mainRepository.FiliereRepository;

@Service
public class FiliereService {
    @Autowired
    private FiliereRepository repository;

    public Filiere create(Filiere filiere) {
        return repository.save(filiere);
    }

    public void createFiliere() {
        List<Filiere> filieres = Filiere.createFiliere();
        for (Filiere filiere : filieres) {
            if (!repository.existsByName(filiere.getName())) {
                repository.save(filiere);
            }
        }
    }

    public List<Filiere> getAll() {
        return repository.findAll();
    }
    public Optional<Filiere> getByName(String name){
        return repository.findByName(name);
    }
    public boolean isPresent(String name) {
        return repository.existsByName(name);
    }

    public Optional<Filiere> getFiliere(int id) {
        return repository.findById(id);
    }
}
