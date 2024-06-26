package com.timetablescheduling.backend.models.mainModels;

import org.springframework.data.mongodb.core.mapping.Document;

import com.timetablescheduling.backend.models.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
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
