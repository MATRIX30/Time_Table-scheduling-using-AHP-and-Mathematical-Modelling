package com.timetablescheduling.backend.models.modelDefinition;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Lecturer {
    private int id;
    private String name;
    private boolean isAssistant;

    public Lecturer(String name, boolean assistant) {
        this.name = name;
        this.isAssistant = assistant;
    }
}
