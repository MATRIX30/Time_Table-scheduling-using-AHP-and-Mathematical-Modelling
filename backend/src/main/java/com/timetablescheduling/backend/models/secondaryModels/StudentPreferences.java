package com.timetablescheduling.backend.models.secondaryModels;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class StudentPreferences {
    private int courseOnMorning; // Est ce que l'etudiant prefère les cours très tôt  (entre 0 et 10)
    private int courseOnEvening; // Est ce que l'etudiant prefère les cours très tard (entre 0 et 10)
    private int havingDaysOff; // Est ce qu'il prefère avoir un jour libre par semaine   (entre 0 et 10)

}
