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

    public void createTimeSlot(TimeSlot timeSlot) {
        Optional<TimeSlot> existingTimeSlot = repository.findByTime(timeSlot.getTime());
        if (existingTimeSlot.isEmpty()) {
            repository.save(timeSlot);
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
