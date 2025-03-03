package com.timetablescheduling.backend.service.secondaryService.Results;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminAndLecturerPreferenceResult {
    private double courseOnMorning;
    private double courseOnEvening;
    private double havingDaysOff;
    private double preferredNumberOfHour;
}
