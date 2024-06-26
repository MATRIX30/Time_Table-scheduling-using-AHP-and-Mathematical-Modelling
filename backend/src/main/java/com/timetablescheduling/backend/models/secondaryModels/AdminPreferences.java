package com.timetablescheduling.backend.models.secondaryModels;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class AdminPreferences {
    private int courseOnMorning; // Est ce que l'enseignant prefère les cours très tôt  (entre 0 et 10)
    private int courseOnEvening; // Est ce que l'enseignant prefère les cours très tart (entre 0 et 10)
    private int havingDaysOff; // nombre de jour libre par semaine   (entre 0 et 7 car on a 7 jours de la semaine)
    private int preferenceNumberOfHours; // Le nombre d'heure de travail qu'il prefere  (multiple de 3 inférieure à 15)
}
