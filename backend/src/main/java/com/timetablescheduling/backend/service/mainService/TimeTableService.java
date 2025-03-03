package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.*;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeTableService {
    @Autowired
    private TimeTableRepository timeTableRepository;


    public Timetable save(Timetable timetable) {
        return timeTableRepository.save(timetable);
    }

    public Timetable addTimeTableCell(TimeTableCell timeTableCell, int id){
        Timetable timetable = timeTableRepository.findById(id).get();
        timetable.getTimetableCells().add(timeTableCell);
        return timeTableRepository.save(timetable);
    }


}
