package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class TimeTableCell extends BaseEntity {
    private TimeSlot timeSlot;
    private Day day;
    private Room room;
    private Filiere filiere;
    private Course course;
    private Semestre semestre;
    private Lecturer lecturer;
    private StudentLevel level;
}
