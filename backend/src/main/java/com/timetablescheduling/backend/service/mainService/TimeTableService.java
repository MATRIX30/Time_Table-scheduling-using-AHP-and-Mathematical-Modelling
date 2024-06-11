package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.repository.mainRepository.TimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeTableService {
    @Autowired
    private TimeTableRepository timeTableRepository;


}
