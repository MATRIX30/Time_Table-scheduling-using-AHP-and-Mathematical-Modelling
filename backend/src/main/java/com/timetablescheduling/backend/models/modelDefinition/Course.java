package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Course {
    private String id;
    private String name;
    private String code;
    private String category;
    private int credit;
    private List<Lecturer> lecturer;

    public Course(String name, String code, String category) {
        this.name = name;
        this.code = code;
        this.category = category;
    }
}