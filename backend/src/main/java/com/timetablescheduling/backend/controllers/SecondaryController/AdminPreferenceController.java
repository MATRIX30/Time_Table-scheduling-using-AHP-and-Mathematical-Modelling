package com.timetablescheduling.backend.controllers.SecondaryController;

import com.timetablescheduling.backend.service.secondaryService.AdminPreferenceService;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adminsPreferences")
public class AdminPreferenceController {
    @Autowired
    private AdminPreferenceService service;

    @GetMapping("/")
    public AdminAndLecturerPreferenceResult getAllPreferences() {
        return service.averageForAdminPreference();
    }


}
