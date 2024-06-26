package com.timetablescheduling.backend.service.secondaryService;

import com.timetablescheduling.backend.models.secondaryModels.StudentPreferences;
import com.timetablescheduling.backend.repository.secondRepository.StudentPreferenceRepository;
import com.timetablescheduling.backend.service.secondaryService.Results.StudentPreferenceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentPreferenceService {
    @Autowired
    private StudentPreferenceRepository repository;

    public List<StudentPreferences> getAllStudentPreferences() {
        return repository.findAll();
    }

    public StudentPreferenceResult averageForStudentPreference() {
        double courseOnMorning = 0.0;
        double courseEvening = 0.0;
        double havingDayOff = 0.0;
        List<StudentPreferences> studentPreferencesList = getAllStudentPreferences();
        for (StudentPreferences item : studentPreferencesList) {
            courseEvening += item.getCourseOnEvening();
            courseOnMorning += item.getCourseOnMorning();
            havingDayOff += item.getHavingDaysOff();
        }
        return StudentPreferenceResult.builder()
                .courseOnEvening(courseEvening / studentPreferencesList.size())
                .courseOnMorning(courseOnMorning / studentPreferencesList.size())
                .haveDayOff(havingDayOff / studentPreferencesList.size())
                .build();
    }
}
