package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.service.mainService.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/timetable")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;


}
