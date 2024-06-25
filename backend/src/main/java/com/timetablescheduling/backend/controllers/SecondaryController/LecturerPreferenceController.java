package com.timetablescheduling.backend.controllers.SecondaryController;


import com.timetablescheduling.backend.service.secondaryService.LecturePreferenceService;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lecturersPreferences")
public class LecturerPreferenceController {
    @Autowired
    private LecturePreferenceService service;

    @GetMapping("/")
    public AdminAndLecturerPreferenceResult getAllPreferences() {
        return service.averageForLecturerPreference();
    }
}
