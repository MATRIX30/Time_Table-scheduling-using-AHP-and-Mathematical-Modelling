package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.TimeSlotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeslotService {

    @Autowired
    private TimeSlotsRepository repository;

    public TimeSlot create(TimeSlot timeSlot) {
        return repository.save(timeSlot);
    }

    public void createTimeSlot() {
        List<TimeSlot> obj = TimeSlot.createTimeSlots();
        for (TimeSlot element : obj) {
            if (!repository.existsByTime(element.getTime())) {
                repository.save(element);
            }
        }
    }

    public List<TimeSlot> getAllTimeSlots() {
        return repository.findAll();
    }
    public Optional<TimeSlot> getTimeSlotTime(String time){
        return repository.findByTime(time);
    }

    public Optional<TimeSlot> getTimeSlot(int id) {
        return repository.findById(id);
    }

}
