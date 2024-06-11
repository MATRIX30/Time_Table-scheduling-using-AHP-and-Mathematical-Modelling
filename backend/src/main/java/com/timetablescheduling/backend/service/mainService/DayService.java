package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DayService {
    @Autowired
    private DayRepository repository;

    public void create(Day day) {
        Optional<Day> existingDay = repository.findByName(day.getName());
        if (existingDay.isEmpty()) {
            repository.save(day);
        }
    }

    public List<Day> getAll() {
        return repository.findAll();
    }
    public Optional<Day> getByName(String name){
        return repository.findByName(name);
    }

    public Optional<Day> getDay(int id) {
        return repository.findById(id);
    }
}
