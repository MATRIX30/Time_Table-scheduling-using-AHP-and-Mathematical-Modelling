package com.timetablescheduling.backend.service.secondaryService;

import com.timetablescheduling.backend.models.secondaryModels.AdminPreferences;
import com.timetablescheduling.backend.models.secondaryModels.StudentPreferences;
import com.timetablescheduling.backend.repository.secondRepository.AdminPreferencesRepository;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import com.timetablescheduling.backend.service.secondaryService.Results.StudentPreferenceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminPreferenceService {
    @Autowired
    private AdminPreferencesRepository repository;


    public List<AdminPreferences> getAllAdminPreferences() {
        return repository.findAll();
    }

    public AdminAndLecturerPreferenceResult averageForAdminPreference() {
        double courseOnMorning = 0.0;
        double courseEvening = 0.0;
        double havingDayOff = 0.0;
        double preferredNumberOfHour = 0.0;
        List<AdminPreferences> list = getAllAdminPreferences();
        for (AdminPreferences item : list) {
            courseEvening += item.getCourseOnEvening();
            courseOnMorning += item.getCourseOnMorning();
            havingDayOff += item.getHavingDaysOff();
            preferredNumberOfHour += item.getPreferenceNumberOfHours();
        }
        return AdminAndLecturerPreferenceResult.builder()
                .courseOnEvening(courseEvening / list.size())
                .courseOnMorning(courseOnMorning / list.size())
                .havingDaysOff(havingDayOff / list.size())
                .preferredNumberOfHour(preferredNumberOfHour / list.size())
                .build();
    }


}
