package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.mainModels.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ParsingResult {
    private List<StudentLevel> studentLevels;
    private List<Course> courses;
    private List<Semestre> semestres;
    private List<Lecturer> lecturers;
    private List<Filiere> filieres;
    private List<Room> rooms;
}
