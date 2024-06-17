package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class StudentLevel extends BaseEntity {
    @Indexed(unique = true)
    private String name;
    private int nbOfStudents;

    public StudentLevel(String name) {
        this.name = name;
    }

    public static List<StudentLevel> createLevel() {
        StudentLevel level1 = new StudentLevel("1");
        level1.setNbOfStudents(500);
        StudentLevel level2 = new StudentLevel("2");
        level2.setNbOfStudents(400);
        StudentLevel level3 = new StudentLevel("3");
        level3.setNbOfStudents(300);
        StudentLevel level4 = new StudentLevel("4");
        level4.setNbOfStudents(200);
        StudentLevel level5 = new StudentLevel("5");
        level5.setNbOfStudents(100);
        List<StudentLevel> levels = new ArrayList<>();
        levels.add(level1);
        levels.add(level2);
        levels.add(level3);
        levels.add(level4);
        levels.add(level5);
        return levels;
    }
}