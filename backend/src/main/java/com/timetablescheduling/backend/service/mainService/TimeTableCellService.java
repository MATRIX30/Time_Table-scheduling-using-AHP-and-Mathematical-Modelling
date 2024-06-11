package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeTableCellService {
    @Autowired
    private TimeTableCellRepository timeTableCellRepository;
}
