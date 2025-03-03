package com.timetablescheduling.backend.service.secondaryService;

import com.timetablescheduling.backend.models.secondaryModels.LecturerPreferences;
import com.timetablescheduling.backend.repository.secondRepository.LecturerPreferenceRepository;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LecturePreferenceService {
    @Autowired
    private LecturerPreferenceRepository repository;

    public List<LecturerPreferences> getAllLecturerPreferences() {
        return repository.findAll();
    }

    public AdminAndLecturerPreferenceResult averageForLecturerPreference() {
        double courseOnMorning = 0.0;
        double courseEvening = 0.0;
        double havingDayOff = 0.0;
        double preferredNumberOfHour = 0.0;
        List<LecturerPreferences> list = getAllLecturerPreferences();
        for (LecturerPreferences item : list) {
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
