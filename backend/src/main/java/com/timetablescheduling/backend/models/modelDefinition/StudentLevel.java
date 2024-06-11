package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class StudentLevel {
    private int id;
    private String name;
    // private int nbOfStudents;

    public StudentLevel(String name) {
        this.name = name;
//        this.nbOfStudents = nbOfStudents;
    }

    public static List<StudentLevel> createLevel() {
        List<StudentLevel> levels = new ArrayList<>();
        levels.add(new StudentLevel("1"));
        levels.add(new StudentLevel("2"));
        levels.add(new StudentLevel("3"));
        levels.add(new StudentLevel("4"));
        levels.add(new StudentLevel("5"));
        return levels;
    }
}