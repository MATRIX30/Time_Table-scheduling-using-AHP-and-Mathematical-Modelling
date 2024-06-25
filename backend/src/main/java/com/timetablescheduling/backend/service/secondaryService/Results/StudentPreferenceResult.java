package com.timetablescheduling.backend.service.secondaryService.Results;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentPreferenceResult {
    private double courseOnMorning;
    private double courseOnEvening;
    private double haveDayOff;
}
