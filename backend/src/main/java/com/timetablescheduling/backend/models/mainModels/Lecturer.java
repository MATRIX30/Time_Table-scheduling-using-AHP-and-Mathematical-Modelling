package com.timetablescheduling.backend.models.mainModels;


import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Lecturer extends BaseEntity {
    @Indexed(unique = true)
    private String name;
    private boolean isAssistant;
    private Course course;

    public Lecturer(String name, boolean assistant) {
        this.name = name;
        this.isAssistant = assistant;
    }
}
