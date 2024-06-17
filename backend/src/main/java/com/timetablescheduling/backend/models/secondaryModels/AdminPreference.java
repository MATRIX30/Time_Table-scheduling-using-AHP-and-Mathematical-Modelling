package com.timetablescheduling.backend.models.secondaryModels;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class AdminPreference {
    private int oursWeekend;
    private int equilibreProgrammation;
    private int matiereMultipleProfesseurs;
}
