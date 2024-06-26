package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
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
