package com.timetablescheduling.backend.controllers.SecondaryController;

import com.timetablescheduling.backend.service.secondaryService.Results.StudentPreferenceResult;
import com.timetablescheduling.backend.service.secondaryService.StudentPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studentsPreferences")
public class StudentPreferenceController {
    @Autowired
    private StudentPreferenceService service;

    @GetMapping("/")
    public StudentPreferenceResult getAllPreferences() {
        return service.averageForStudentPreference();
    }
}
