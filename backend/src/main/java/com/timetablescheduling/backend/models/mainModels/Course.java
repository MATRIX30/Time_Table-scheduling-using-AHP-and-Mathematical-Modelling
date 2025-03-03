package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Course extends BaseEntity {
    private String name;
    @Indexed(unique = true)
    private String code;
    private String category;
    private int credit;
    private Filiere filiere;
    private StudentLevel level;
    private Semestre semestre;

    public Course(String name, String code, String category) {
        this.name = name;
        this.code = code;
        this.category = category;
    }

}